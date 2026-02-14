from django.urls import path
from . import views

urlpatterns = [
    path('', views.users_list, name='users_list'),
    
    path('disable_user/<int:user_id>/', views.disable_user, name='disable_user'),
    path('enable_user/<int:user_id>/', views.enable_user, name='enable_user'),
    path('delete_user/<int:user_id>/', views.delete_user, name='delete_user'),

    
    path('drivers/', views.drivers_list, name='drivers_list'),

    path('approve_driver/<int:driver_id>/', views.approve_driver, name='approve_driver'),
    path('reject_driver/<int:driver_id>/', views.reject_driver, name='reject_driver'),

    path('disable_driver/<int:driver_id>/', views.disable_driver, name='disable_driver'),
    path('enable_driver/<int:driver_id>/', views.enable_driver, name='enable_driver'),
    path('delete_driver/<int:driver_id>/', views.delete_driver, name='delete_driver'),
]