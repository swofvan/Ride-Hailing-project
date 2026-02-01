from django.http import HttpResponse
from django.shortcuts import render

# auth_app/views.py

from rest_framework import status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.contrib.auth import authenticate

from .forms import SignupForm


#  ------------------------------------------------------------------------   signup

@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
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
@permission_classes((permissions.AllowAny,))
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

    return Response(
        {
            "message": "Login successful",
            "user": {
                "id": user.id,
                "name": user.name,
                "email": user.email,
                "role": user.role,
            }
        },
        status=status.HTTP_200_OK
    )
