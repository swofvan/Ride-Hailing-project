from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.core.validators import validate_email, RegexValidator


class User(AbstractUser):    # AbstractUser  allows you to customize the User model.
    username = None
    first_name = None
    last_name = None

    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True, validators=[validate_email])
    phone = models.CharField(
        max_length=15,
        validators=[RegexValidator(r'^\+?\d{10,15}$', 'Enter a valid phone number')]
    )

    USERNAME_FIELD = 'email' 
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email

# ------------------------------------------------------------------------------- User profile model

class Driver(models.Model): 
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    vehicle_number = models.CharField(max_length=20)
    license_number = models.CharField(max_length=20)
    status_choices = (
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('rejected', 'Rejected'),
    )
    status = models.CharField(max_length=10, choices=status_choices, default='pending')

    def __str__(self):
        return f"{self.user.name} - {self.vehicle_number} ({self.status})"
