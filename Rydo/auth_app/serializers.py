# auth_app/serializers.py

from rest_framework import serializers
from .models import User, Driver
from .forms import SignupForm, DriverForm


# -------------------------------------------------------------------------- signup

class SignupSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['name', 'email', 'phone', 'password', 'confirm_password']
        extra_kwargs = {'password': {'write_only': True}}

# --------------------------------------------------------------------------  Diver signup

class DriverSerializer(serializers.ModelSerializer):

    class Meta:
        model = Driver
        fields = '__all__'
        read_only_fields = ['status', 'user']
