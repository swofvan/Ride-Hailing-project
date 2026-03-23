from django.urls import path
from . import views

urlpatterns = [
    path('profile/', views.profile_view, name='profile'),
    
    path('ride_booking/', views.ride_booking, name='ride_booking'),

    path('ride_requests/', views.ride_requests, name='ride_requests'),
    path('ride-accept/<int:ride_id>/', views.accept_ride, name='accept_ride'),

    path('current_drive/', views.current_drive, name='current_drive'),
    path('ride-cancel/<int:ride_id>/', views.cancel_ride, name='cancel_ride'),
    path('ride-complete/<int:ride_id>/', views.complete_ride, name='complete_ride'),
    path('history/', views.user_history, name='user_history'),

    path('current_ride/', views.current_ride, name='current_ride'),
]