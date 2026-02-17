# auth_app/forms.py

from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import User, Driver

# -------------------------------------------------------------------------   User Signup Form

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
