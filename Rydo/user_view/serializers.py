from rest_framework import serializers
from .models import Ride

class RideSerializer(serializers.ModelSerializer):
    user_phone = serializers.CharField(source='user.phone', read_only=True)
    class Meta:
        model = Ride
        fields = '__all__'
