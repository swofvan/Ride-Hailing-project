# auth_app/serializers.py

from rest_framework import serializers
from .models import User
from .forms import SignupForm


# -------------------------------------------------------------------------- signup

class SignupSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['name', 'email', 'password', 'confirm_password', 'role']

    def validate(self, data):
        form = SignupForm(data)
        if not form.is_valid():
            raise serializers.ValidationError(form.errors)
        return data

    def create(self, validated_data):
        validated_data.pop('confirm_password')

        user = User.objects.create(
            name=validated_data['name'],
            email=validated_data['email'],
            role=validated_data['role']
        )
        user.set_password(validated_data['password']) 
        user.save()
        return user
