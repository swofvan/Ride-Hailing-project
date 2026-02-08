from django.http import HttpResponse
from django.shortcuts import render

from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.contrib.auth import authenticate

from .models import Driver
from .serializers import DriverSerializer
from .forms import SignupForm, DriverForm

from rest_framework_simplejwt.tokens import RefreshToken


#  ------------------------------------------------------------------------   signup

@api_view(['POST'])
@permission_classes([AllowAny])
def signup(request):
    form = SignupForm(data=request.data)

    if form.is_valid():
        form.save()
        return Response(
            {"message": "Account created successfully"},
            status=status.HTTP_201_CREATED
        )

    return Response(
        form.errors,
        status=status.HTTP_400_BAD_REQUEST
    )


#  ------------------------------------------------------------------------   login

@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):

    email = request.data.get('email')
    password = request.data.get('password')

    if not email or not password:
        return Response(
            {"error": "Email and password are required"},
            status=status.HTTP_400_BAD_REQUEST
        )

    user = authenticate(request, username=email, password=password)

    if user is None:
        return Response(
            {"error" : "Invalid email or password"},
            status=status.HTTP_401_UNAUTHORIZED
        )
    
    
    refresh = RefreshToken.for_user(user)

    return Response(
        {
            "message": "Login successful",
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "user": {
                "id": user.id,
                "name": user.name,
                "email": user.email,
            }
        },
        status=status.HTTP_200_OK
    )


# ------------------------------------------------------------------------   driver request


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def request_driver(request):

    if Driver.objects.filter(user=request.user).exists():
        return Response(
            {"message": "You have already submitted a driver request"},
            status=status.HTTP_400_BAD_REQUEST
        )

    form = DriverForm(request.data)

    if form.is_valid():
        driver_request = form.save(commit=False)
        driver_request.user = request.user
        driver_request.save()

        serializer = DriverSerializer(driver_request)

        return Response(
            {
                "message": "Driver request submitted successfully",
                "data": serializer.data
            },
            status=status.HTTP_201_CREATED
        )

    return Response(
        form.errors,
        status=status.HTTP_400_BAD_REQUEST
    )
