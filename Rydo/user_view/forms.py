from django import forms
from .models import Ride

class RideForm(forms.ModelForm):
    class Meta:
        model = Ride
        fields = ['pickup_lat', 'pickup_lng', 'drop_lat', 'drop_lng', 'distance', 'ride_type']

    def clean_distance(self):
        distance = self.cleaned_data.get('distance')
        if distance <= 0:
            raise forms.ValidationError("Distance must be greater than 0")
        return distance
