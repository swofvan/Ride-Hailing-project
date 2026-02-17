from django.db import models
from django.conf import settings


class Ride(models.Model):

    RIDE_TYPES = (
        ('economy', 'Economy'),
        ('premium', 'Premium'),
        ('luxury', 'Luxury'),
    )

    STATUS_TYPES = (
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('completed', 'Completed'),
    )

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='rides'
    )
    driver = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='assigned_rides'
    )
    
    pickup_lat = models.FloatField()
    pickup_lng = models.FloatField()
    drop_lat = models.FloatField()
    drop_lng = models.FloatField()

    distance = models.FloatField()

    ride_type = models.CharField(max_length=20, choices=RIDE_TYPES)

    fare = models.FloatField()

    status = models.CharField(max_length=20, choices=STATUS_TYPES, default='pending')

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Ride {self.id} - {self.user.name}"
