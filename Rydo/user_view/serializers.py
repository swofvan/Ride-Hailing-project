from rest_framework import serializers
from .models import Ride

class RideSerializer(serializers.ModelSerializer):
    user_phone = serializers.CharField(source='user.phone', read_only=True)

    driver_id = serializers.IntegerField(source='driver.id', read_only=True)
    driver_name = serializers.CharField(source='driver.user.name', read_only=True, default=None)
    driver_phone = serializers.CharField(source='driver.user.phone', read_only=True, default=None)
    vehicle_number = serializers.CharField(source='driver.vehicle_number', read_only=True, default=None)

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
            "created_at",
            "rating",     
            "review",
        ]


# ----------------------------------------------------------------------------------------  User History

class ReceiptSerializer(serializers.ModelSerializer):
    
    driver_id = serializers.IntegerField(source='driver.id', read_only=True)
    driver_name = serializers.CharField(source='driver.name', read_only=True)
    vehicle_number = serializers.CharField(source='driver.vehicle_number', read_only=True)

    class Meta:
        model = Ride
        fields = [
            'id',
            'pickup_address',
            'drop_address',
            'distance',
            'status',
            'fare',
            'driver_id',
            'driver_name',
            'vehicle_number',
            'created_at'
        ]