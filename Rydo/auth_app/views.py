from django.shortcuts import render

from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.contrib.auth import authenticate

from .models import User, Driver
from .forms import UserSignupForm, DriverSignupForm
from .serializers import UserSerializer, DriverSerializer

from rest_framework_simplejwt.tokens import RefreshToken


# ------------------------------------------------------------------------------- User signup

@api_view(['POST'])
@permission_classes([AllowAny])
def user_signup(request):

    form = UserSignupForm(data=request.data)

    if form.is_valid():
        user = form.save()
        serializer = UserSerializer(user)

        return Response({"message": "User signup successful", "data": serializer.data}, status=201)

    return Response(form.errors, status=400)

# ------------------------------------------------------------------------------- Driver signup

@api_view(['POST'])
@permission_classes([AllowAny])
def driver_signup(request):

    form = DriverSignupForm(data=request.data) 

    if form.is_valid():
        driver_user = form.save()
        driver = Driver.objects.get(user=driver_user)
        serializer = DriverSerializer(driver)

        return Response({
            "message": "Driver signup request sent. Waiting for admin approval",
            "data": serializer.data
            },
            status=201)

    return Response(form.errors, status=400)

# ------------------------------------------------------------------------   login

@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):

    user = authenticate(
        username=request.data.get('email'),
        password=request.data.get('password')
    )

    if not user:
        return Response({"error": "Invalid email or password"}, status=401)
    
    try:
        driver = Driver.objects.get(user=user)

        if driver.status != 'accepted':
            return Response(
                {"error": "Driver account not approved by admin"},
                status=403
            )

    except Driver.DoesNotExist:
        pass

    refresh = RefreshToken.for_user(user)

    return Response({
        "message": "Login success",
        "access": str(refresh.access_token),
        "refresh": str(refresh),
    }, status=200)


# ------------------------------------------------------------------------   login

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    try:
        refresh_token = request.data.get("refresh")

        if not refresh_token:
            return Response(
                {"error": "Refresh token is required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        token = RefreshToken(refresh_token)
        token.blacklist()

        return Response(
            {"message": "Logout successful"},
            status=status.HTTP_205_RESET_CONTENT
        )

    except Exception:
        return Response(
            {"error": "Invalid token"},
            status=status.HTTP_400_BAD_REQUEST
        )