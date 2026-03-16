from rest_framework import serializers
from .models import Ride

class RideSerializer(serializers.ModelSerializer):
    user_phone = serializers.CharField(source='user.phone', read_only=True)
    class Meta:
        model = Ride
        fields = '__all__'

# ----------------------------------------------------------------------------------------  User History

class HistorySerializer(serializers.ModelSerializer):

    driver_id = serializers.IntegerField(source="driver.id", read_only=True)

    class Meta:
        model = Ride
        fields = [
            "id",
            "driver_id",
            "pickup_lat",
            "pickup_lng",
            "drop_lat",
            "drop_lng",
            'pickup_address',
            'drop_address',
            "distance",
            "fare",
            "ride_type",
            "status",
            "created_at",
        ]