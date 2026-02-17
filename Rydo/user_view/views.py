from django.shortcuts import render

# Create your views here.

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from auth_app.models import Driver
from auth_app.serializers import UserSerializer, DriverSerializer

from .forms import RideForm
from .serializers import RideSerializer

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

        ride.save()

        serializer = RideSerializer(ride)
        return Response(serializer.data)

    return Response(form.errors)