from django.shortcuts import render

# Create your views here.

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from auth_app.models import Driver
from auth_app.serializers import UserSerializer, DriverSerializer

from .forms import RideForm
from .serializers import RideSerializer
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

        pickup_res = requests.get(pickup_url)
        drop_res = requests.get(drop_url)

        if pickup_res.status_code == 200:
            ride.pickup_address = pickup_res.json().get("display_name")

        if drop_res.status_code == 200:
            ride.drop_address = drop_res.json().get("display_name")

        ride.save()

        serializer = RideSerializer(ride)
        return Response(serializer.data)

    return Response(form.errors)


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
def current_ride(request):
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