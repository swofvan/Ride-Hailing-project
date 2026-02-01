from django.db import models

from django.contrib.auth.models import AbstractUser

from django.core.validators import validate_email

# Create your models here.


class User(AbstractUser):

    ROLE_CHOICES = (
        ('user', 'User'),
        ('driver', 'Driver'),
    )
    
    username = None                 # Remove username field
    first_name = None
    last_name = None
    
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True, max_length=100, validators=[validate_email])
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email