# auth_app/forms.py

from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import User, Driver

# -------------------------------------------------------------------------   Signup Form

# class SignupForm(forms.ModelForm):
#     confirm_password = forms.CharField(max_length=100)

#     class Meta:
#         model = User
#         fields = ['name', 'email', 'phone', 'password', 'confirm_password']

#     def clean(self):
#         cleaned_data = super().clean()
#         password = cleaned_data.get('password')
#         confirm_password = cleaned_data.get('confirm_password')

#         if password != confirm_password:
#             raise forms.ValidationError("Password and Confirm Password must match")

#         return cleaned_data

#     def save(self, commit=True):
#             user = super().save(commit=False)
#             user.set_password(self.cleaned_data['password'])
#             if commit:
#                 user.save()
#             return user


# # -------------------------------------------------------------------------   Driver Form


# class DriverForm(forms.ModelForm):

#     class Meta:
#         model = Driver
#         fields = ['name', 'email', 'phone', 'vehicle_number', 'licence_number']

#     def clean_vehicle_number(self):
#         vehicle_number = self.cleaned_data.get('vehicle_number')
#         if len(vehicle_number) < 5:
#             raise forms.ValidationError("Vehicle number is too short")
#         return vehicle_number

# --------------------------------------------------------------------------   User Form

# class UserForm(forms.Form):

#     name = forms.CharField()
#     phone = forms.CharField()
#     email = forms.EmailField()
#     password = forms.CharField()
#     confirm_password = forms.CharField()

#     def clean(self):
#         data = super().clean()

#         if data.get('password') != data.get('confirm_password'):
#             raise forms.ValidationError("Passwords do not match")

#         if User.objects.filter(email=data.get('email')).exists():
#             raise forms.ValidationError("Email already exists")
        
#         if User.objects.filter(phone=data.get('phone')).exists():
#             raise forms.ValidationError("Phone number already exists")

#         return data

# # --------------------------------------------------------------------------   Driver Form

# class DriverForm(forms.Form):

#     name = forms.CharField()
#     phone = forms.CharField()
#     email = forms.EmailField()
#     vehicle_number = forms.CharField()
#     licence_number = forms.CharField()
#     password = forms.CharField()
#     confirm_password = forms.CharField()

#     def clean(self):
#         data = super().clean()
#         if data.get('password') != data.get('confirm_password'):
#             raise forms.ValidationError("Passwords do not match")
        
#         if User.objects.filter(email=data.get('email')).exists():
#             raise forms.ValidationError("Email already exists")
        
#         if User.objects.filter(phone=data.get('phone')).exists():
#             raise forms.ValidationError("Phone number already exists")
        
#         return data


class UserSignupForm(UserCreationForm):
    name = forms.CharField(max_length=100, required=True)
    phone = forms.CharField(max_length=15, required=True)

    class Meta:
        model = User
        fields = ['name', 'email', 'phone', 'password1', 'password2']

    def clean_email(self):
        email = self.cleaned_data.get('email')
        if User.objects.filter(email=email).exists():
            raise forms.ValidationError("Email already exists")
        return email

    def clean_phone(self):
        phone = self.cleaned_data.get('phone')
        if User.objects.filter(phone=phone).exists():
            raise forms.ValidationError("Phone number already exists")
        return phone

# -------------------------------------------------------------------------   Driver Signup Form

class DriverSignupForm(UserCreationForm):
    name = forms.CharField(max_length=100, required=True)
    phone = forms.CharField(max_length=15, required=True)
    vehicle_number = forms.CharField(max_length=20, required=True)
    license_number = forms.CharField(max_length=20, required=True)

    class Meta:
        model = User
        fields = ['name', 'email', 'phone', 'password1', 'password2']

    def clean_email(self):
        email = self.cleaned_data.get('email')
        if User.objects.filter(email=email).exists():
            raise forms.ValidationError("Email already exists")
        return email

    def clean_phone(self):
        phone = self.cleaned_data.get('phone')
        if User.objects.filter(phone=phone).exists():
            raise forms.ValidationError("Phone number already exists")
        return phone

    def save(self, commit=True):

        user = super().save(commit=False)
        user.name = self.cleaned_data['name']
        user.phone = self.cleaned_data['phone']

        if commit:
            user.save()
            
            Driver.objects.create(
                user=user,
                vehicle_number=self.cleaned_data['vehicle_number'],
                license_number=self.cleaned_data['license_number'],
                status='pending'  # driver request is pending admin approval
            )
        return user
