from django.urls import path
from . import views

urlpatterns = [
    path('user_signup/', views.user_signup, name='user_signup'),
    path('driver_signup/', views.driver_signup, name='driver_signup'),
    path('login/', views.login, name='login'),
    path('logout/', views.logout, name='logout'),
]