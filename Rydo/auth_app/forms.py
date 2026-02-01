# auth_app/forms.py

from django import forms
from .models import User

# -------------------------------------------------------------------------   Signup Form

class SignupForm(forms.ModelForm):
    confirm_password = forms.CharField(max_length=100)

    class Meta:
        model = User
        fields = ['name', 'email', 'password', 'confirm_password', 'role']

    def clean(self):
        cleaned_data = super().clean()
        password = cleaned_data.get('password')
        confirm_password = cleaned_data.get('confirm_password')

        if password != confirm_password:
            raise forms.ValidationError("Password and Confirm Password must match")

        return cleaned_data

    def save(self, commit=True):
            user = super().save(commit=False)
            user.set_password(self.cleaned_data['password'])
            if commit:
                user.save()
            return user