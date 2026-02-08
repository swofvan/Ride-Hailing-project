from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import validate_email
from django.conf import settings

# ------------------------------------------------------------------------------- User model

class User(AbstractUser):
    
    username = None                 # Remove username field
    first_name = None
    last_name = None
    
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=15)
    email = models.EmailField(unique=True, max_length=100, validators=[validate_email])

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email


# ------------------------------------------------------------------------------- driver model

class Driver(models.Model):

    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('rejected', 'Rejected'),
    )

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )

    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=15)

    vehicle_number = models.CharField(max_length=20)
    licence_number = models.CharField(max_length=50)

    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default='pending'
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.email} - {self.status}"