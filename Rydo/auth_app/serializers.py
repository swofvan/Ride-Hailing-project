# auth_app/serializers.py

from rest_framework import serializers
from .models import User, Driver

# --------------------------------------------------------------------------  User profile

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['name', 'email', 'phone']


# --------------------------------------------------------------------------  Driver profile

class DriverSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(source='user.email', read_only=True)
    name = serializers.CharField(source='user.name', read_only=True)
    phone = serializers.CharField(source='user.phone', read_only=True)

    class Meta:
        model = Driver
        fields = ['email', 'name', 'phone', 'vehicle_number', 'license_number', 'status']