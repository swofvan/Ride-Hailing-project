from django.shortcuts import render

# Create your views here.

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from auth_app.models import Driver
from auth_app.serializers import UserSerializer, DriverSerializer

from .forms import RideForm
from .serializers import RideSerializer, HistorySerializer
from .models import Ride

from django.db.models import Q
from rest_framework.pagination import PageNumberPagination
from rest_framework import status

import requests  # needed for location API

# ----------------------------------------------------------------------------- Profle view

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile_view(request):

    current_user = request.user

    try:
        driver = Driver.objects.get(user=current_user)
        serializer = DriverSerializer(driver)
        return Response(serializer.data)

    except Driver.DoesNotExist:
        serializer = UserSerializer(current_user)
        return Response(serializer.data)


# ----------------------------------------------------------------------------- ride booking

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def ride_booking(request):

    form = RideForm(request.data)

    if form.is_valid():

        ride = form.save(commit=False)

        ride.user = request.user
        ride.status = 'pending'


        distance = ride.distance
        ride_type = ride.ride_type

        if ride_type == 'economy':
            ride.fare = distance * 50

        elif ride_type == 'premium':
            ride.fare = distance * 100

        elif ride_type == 'luxury':
            ride.fare = distance * 200

        pickup_url = f"https://nominatim.openstreetmap.org/reverse?format=json&lat={ride.pickup_lat}&lon={ride.pickup_lng}"
        drop_url = f"https://nominatim.openstreetmap.org/reverse?format=json&lat={ride.drop_lat}&lon={ride.drop_lng}"

        headers = {
            "User-Agent": "ride-hailing-app"
        }

        pickup_res = requests.get(pickup_url, headers=headers)
        drop_res = requests.get(drop_url, headers=headers)

        # pickup_res = requests.get(pickup_url)
        # drop_res = requests.get(drop_url)

        if pickup_res.status_code == 200:
            ride.pickup_address = pickup_res.json().get("display_name")

        if drop_res.status_code == 200:
            ride.drop_address = drop_res.json().get("display_name")

        ride.save()

        serializer = RideSerializer(ride)
        return Response(serializer.data)

    return Response(form.errors)


# ----------------------------------------------------------------------------- change lat and lon to address

def get_address(lat, lon):
    url = "https://nominatim.openstreetmap.org/reverse"

    params = {
        "format": "json",
        "lat": lat,
        "lon": lon
    }
    
    headers = {
        "User-Agent": "ride-hailing-app"
    }

    response = requests.get(url, params=params, headers=headers)

    if response.status_code == 200:
        data = response.json()
        return data.get("display_name", "")
    
    return ""

# ----------------------------------------------------------------------------- rides list for Drivers

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def ride_requests(request):
    try:
        driver = Driver.objects.get(user=request.user, status='accepted')
    except Driver.DoesNotExist:
        return Response({"error": "You are not an approved driver."}, status=403)

    search = request.GET.get('search', '')

    rides = Ride.objects.filter(
        status='pending',
        driver__isnull = True
        ).filter(
            Q(ride_type__icontains=search) |
            Q(status__icontains=search) |
            Q(pickup_address__icontains=search) |
            Q(drop_address__icontains=search)
        ).order_by('-created_at')

    paginator = PageNumberPagination()
    paginator.page_size = 10
    result_page = paginator.paginate_queryset(rides, request)

    serializer = RideSerializer(result_page, many=True)
    return paginator.get_paginated_response(serializer.data)



# ----------------------------------------------------------------------------- Accept Ride for Drivers

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def accept_ride(request, ride_id):
    try:
        driver = Driver.objects.get(user=request.user, status='accepted')
    except Driver.DoesNotExist:
        return Response({"error": "Not an approved driver"}, status=403)

    try:
        ride = Ride.objects.get(id=ride_id, status='pending', driver__isnull=True)
    except Ride.DoesNotExist:
        return Response({"error": "Ride not available"}, status=404)

    ride.driver = request.user
    ride.status = 'accepted'
    ride.save()

    return Response({"message": "Ride accepted successfully"})


# ----------------------------------------------------------------------------- Drivers current ride

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def current_drive(request):
    try:
        driver = Driver.objects.get(user=request.user, status='accepted')
    except Driver.DoesNotExist:
        return Response({"error": "You are not an approved driver."}, status=403)

    search = request.GET.get('search', '')

    rides = Ride.objects.filter(
        driver=request.user,
        status='accepted'
    ).order_by('-created_at')

    serializer = RideSerializer(rides, many=True)
    return Response(serializer.data)


# ----------------------------------------------------------------------------- Cancel Ride for Drivers

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def cancel_ride(request, ride_id):
    try:
        ride = Ride.objects.get(id=ride_id, driver=request.user, status='accepted')
    except Ride.DoesNotExist:
        return Response({"error": "Ride not found"}, status=404)

    ride.driver = None
    ride.status = 'pending'
    ride.save()

    return Response({"message": "Ride cancelled successfully"})


# ----------------------------------------------------------------------------- Complete Ride for Drivers

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def complete_ride(request, ride_id):
    try:
        ride = Ride.objects.get(id=ride_id, driver=request.user, status='accepted')
    except Ride.DoesNotExist:
        return Response({"error": "Ride not found"}, status=404)

    ride.status = 'completed'
    ride.save()

    return Response({"message": "Ride completed successfully"})


# ----------------------------------------------------------------------------- user history

# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def user_history(request):

#     user = request.user

#     try:
#         driver = Driver.objects.get(user=user)

#         rides = Ride.objects.filter(
#             driver=driver,
#             status__in=['completed', 'cancelled']
#         ).order_by('-created_at')

#     except Driver.DoesNotExist:

#         rides = Ride.objects.filter(
#             user=user,
#             status__in=['completed', 'cancelled']
#         ).order_by('-created_at')

#     serializer = HistorySerializer(rides, many=True)

#     return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_history(request):

    user = request.user

    try:
        # check if this user has a Driver profile
        Driver.objects.get(user=user)

        # if driver exists, get rides where this user is the driver
        rides = Ride.objects.filter(
            driver=user,
            status__in=['completed', 'cancelled']
        ).order_by('-created_at')

    except Driver.DoesNotExist:

        # otherwise get rides where this user is the passenger
        rides = Ride.objects.filter(
            user=user,
            status__in=['completed', 'cancelled']
        ).order_by('-created_at')

    serializer = HistorySerializer(rides, many=True)

    return Response(serializer.data)



# ----------------------------------------------------------------------------- Current ride (for users)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def current_ride(request):

    ride = Ride.objects.filter(
        user=request.user
    ).exclude(
        status__in=['completed', 'cancelled']
    ).order_by('-created_at').first()          # cunvert many to one ride

    serializer = RideSerializer(ride)
    return Response(serializer.data)
    


# ----------------------------------------------------------------------------- review

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def review(request, ride_id):
    
    try:
        ride = Ride.objects.get(id=ride_id)
    except Ride.DoesNotExist:
        return Response({'error': 'Ride not found'}, status=404)

    if ride.user != request.user:
        return Response({'error': 'Not allowed'}, status=403)

    if ride.status != 'completed':
        return Response({'error': 'Ride not completed'}, status=400)

    if ride.rating is not None:
        return Response({'error': 'Already rated'}, status=400)

    rating = request.data.get('rating')
    review = request.data.get('review', '')

    if not rating or int(rating) < 1 or int(rating) > 5:
        return Response({'error': 'Rating must be between 1 and 5'}, status=400)

    ride.rating = rating
    ride.review = review
    ride.save()

    return Response({'message': 'Rating submitted successfully'})

