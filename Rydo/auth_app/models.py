from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.core.validators import validate_email


# # ------------------------------------------------------------------------------- User model

# class User(AbstractUser):
    
#     username = None                 # Remove username field
#     first_name = None
#     last_name = None
    
#     name = models.CharField(max_length=100)
#     phone = models.CharField(max_length=15)
#     email = models.EmailField(unique=True, max_length=100, validators=[validate_email])

#     USERNAME_FIELD = 'email'
#     REQUIRED_FIELDS = []

#     def __str__(self):
#         return self.email


# # ------------------------------------------------------------------------------- driver model

# class Driver(models.Model):

#     STATUS_CHOICES = (
#         ('pending', 'Pending'),
#         ('accepted', 'Accepted'),
#         ('rejected', 'Rejected'),
#     )

#     user = models.OneToOneField(
#         settings.AUTH_USER_MODEL,
#         on_delete=models.CASCADE
#     )

#     name = models.CharField(max_length=100)
#     email = models.EmailField()
#     phone = models.CharField(max_length=15)

#     vehicle_number = models.CharField(max_length=20)
#     licence_number = models.CharField(max_length=50)

#     status = models.CharField(
#         max_length=10,
#         choices=STATUS_CHOICES,
#         default='pending'
#     )

#     created_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return f"{self.user.email} - {self.status}"

# ------------------------------------------------------------------------------- User manager

# class UserManager(BaseUserManager):       # Custom user manager to handle user creation,     logic (how a user is created, saved, validated) 
#     def create_user(self, email, phone, password=None, **extra_fields):
#         if not email:
#             raise ValueError("Email is required")
#         if not phone:
#             raise ValueError("Phone number is required")

#         email = self.normalize_email(email)
#         user = self.model(email=email, phone=phone, **extra_fields)
#         user.set_password(password)
#         user.save(using=self._db)
#         return user

#     def create_superuser(self, email, phone, password=None, **extra_fields):
#         extra_fields.setdefault('is_staff', True)
#         extra_fields.setdefault('is_superuser', True)

#         return self.create_user(email, phone, password, **extra_fields)



# # ------------------------------------------------------------------------------- User model


# class User(AbstractUser):     # Who can login   structure (fields like email, phone, password)

#     username = None
#     first_name = None
#     last_name = None

#     name = models.CharField(max_length=100)
#     phone = models.CharField(unique=True, max_length=15)
#     email = models.EmailField(unique=True, validators=[validate_email])

#     USERNAME_FIELD = 'email'
#     REQUIRED_FIELDS = []

#     objects = UserManager()

#     def __str__(self):
#         return self.email
    
    
# # ------------------------------------------------------------------------------- Normal User model


from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator, validate_email

# ------------------------------------------------------------------------------- User model

class User(AbstractUser):    # AbstractUser → allows you to customize the User model.
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
