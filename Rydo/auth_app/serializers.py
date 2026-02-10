# auth_app/serializers.py

from rest_framework import serializers
from .models import User, Driver

# # -------------------------------------------------------------------------- signup

# class SignupSerializer(serializers.ModelSerializer):
#     name = serializers.CharField()
#     phone = serializers.CharField()
#     confirm_password = serializers.CharField(write_only=True)

#     class Meta:
#         model = User
#         fields = ['name', 'email', 'phone', 'password', 'confirm_password']
#         extra_kwargs = {'password': {'write_only': True}}

# # --------------------------------------------------------------------------  Diver signup

# class DriverSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = Driver
#         fields = '__all__'
#         read_only_fields = ['status', 'user']

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