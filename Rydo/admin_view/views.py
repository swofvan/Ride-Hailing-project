from django.shortcuts import render
from django.contrib.auth.decorators import user_passes_test
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.core.paginator import Paginator

from auth_app.models import User, Driver

from django.db.models import Q

from django.shortcuts import get_object_or_404, redirect
from django.contrib import messages

from user_view.models import Ride
from django.db.models import Sum

from user_view.models import Ride 
# from django.contrib.auth.decorators import user_passes_test 
# from rest_framework.decorators import permission_classes
# from rest_framework.permissions import BasePermission
from django.http import HttpResponseForbidden


# def is_admin(user):
#     return user.is_superuser

# class IsSuperUser(BasePermission):
#     def has_permission(self, request, view):
#         return (
#             request.user and
#             request.user.is_authenticated and
#             request.user.is_superuser
#         )

def superuser_required(view_func):
    def wrapper(request, *args, **kwargs):
        if not request.user.is_authenticated or not request.user.is_superuser:
            return HttpResponseForbidden("You are not allowed here")
        return view_func(request, *args, **kwargs)
    return wrapper


# ----------------------------------------------------------------------------- users list

# @user_passes_test(is_admin)
# @permission_classes([IsSuperUser])
@superuser_required
def users_list(request):

    print("USER OBJECT :", request.user)
    print("IS AUTHENTICATED :", request.user.is_authenticated)
    print("IS SUPERUSER :", request.user.is_superuser)
    print("IS STAFF :", request.user.is_staff)

    search = request.GET.get('search', '').strip()

    driver_ids = Driver.objects.values_list('user_id', flat=True)
    users = User.objects.exclude(id__in=driver_ids)

    if search:
        users = users.filter (
            Q(name__icontains=search) |
            Q(email__icontains=search) |
            Q(phone__icontains=search)
        )

    paginator = Paginator(users, 5)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    context = {
        "page_obj": page_obj,
        "search": search,
    }

    return render(request, "users_list.html", context)

# ----------------------------------------------------------------------------- disable user

# @user_passes_test(is_admin)
# @permission_classes([IsSuperUser])
@superuser_required
def disable_user(request, user_id):
    user = get_object_or_404(User, id=user_id)

    user.is_active = False
    user.save()

    messages.success(request, "User disabled successfully.")
    return redirect('users_list')

# ----------------------------------------------------------------------------- enable user

# @user_passes_test(is_admin)
# @permission_classes([IsSuperUser])
@superuser_required
def enable_user(request, user_id):
    user = get_object_or_404(User, id=user_id)

    user.is_active = True
    user.save()

    messages.success(request, "User enabled successfully.")
    return redirect('users_list')

# ----------------------------------------------------------------------------- delete user

# @user_passes_test(is_admin)
# @permission_classes([IsSuperUser])
@superuser_required
def delete_user(request, user_id):
    user = get_object_or_404(User, id=user_id)

    user.delete()

    messages.success(request, "User deleted successfully.")
    return redirect('users_list')


# ------------------------------------------------------------------------------ Drivers list

# @user_passes_test(is_admin)
# @permission_classes([IsSuperUser])
@superuser_required
def drivers_list(request):

    search = request.GET.get('search', '').strip()
    
    drivers = Driver.objects.select_related('user')

    if search:
        drivers = drivers.filter (
            Q(user__name__icontains=search) |
            Q(user__email__icontains=search) |
            Q(user__phone__icontains=search) |
            Q(vehicle_number__icontains=search)
        )

    paginator = Paginator(drivers, 5)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    context = {
        "page_obj": page_obj,
        "search": search,
    }

    return render(request, "drivers_list.html", context)

# ----------------------------------------------------------------------------- Approve driver

# @user_passes_test(is_admin)
# @permission_classes([IsSuperUser])
@superuser_required
def approve_driver(request, driver_id):
    driver = get_object_or_404(Driver, id=driver_id)
    
    driver.status = 'accepted'
    driver.user.is_active = True

    driver.user.save()
    driver.save()

    messages.success(request, "Driver approved successfully.")
    return redirect('drivers_list')


# ----------------------------------------------------------------------------- Reject driver

# @user_passes_test(is_admin)
# @permission_classes([IsSuperUser])
@superuser_required
def reject_driver(request, driver_id):
    driver = get_object_or_404(Driver, id=driver_id)
    
    driver.status = 'rejected'
    driver.user.is_active = False
    
    driver.user.save()
    driver.save()

    messages.success(request, "Driver rejected successfully.")
    return redirect('drivers_list')


# ----------------------------------------------------------------------------- disable driver

# @user_passes_test(is_admin)
# @permission_classes([IsSuperUser])
@superuser_required
def disable_driver(request, driver_id):
    driver = get_object_or_404(Driver, id=driver_id)

    driver.user.is_active = False
    driver.user.save()

    messages.success(request, "Driver disabled successfully.")
    return redirect('drivers_list')

# ----------------------------------------------------------------------------- enable driver

# @user_passes_test(is_admin)
# @permission_classes([IsSuperUser])
@superuser_required
def enable_driver(request, driver_id):
    driver = get_object_or_404(Driver, id=driver_id)

    driver.user.is_active = True
    driver.user.save()

    messages.success(request, "Driver enabled successfully.")
    return redirect('drivers_list')

# ----------------------------------------------------------------------------- delete driver

# @user_passes_test(is_admin)
# @permission_classes([IsSuperUser])
@superuser_required
def delete_driver(request, driver_id):
    driver = get_object_or_404(Driver, id=driver_id)

    driver.user.delete()

    messages.success(request, "Driver deleted successfully.")
    return redirect('drivers_list')



# ----------------------------------------------------------------------------- View All Bookings

# @user_passes_test(is_admin)
# @permission_classes([IsSuperUser])
@superuser_required
def ride_list(request):
    rides = Ride.objects.all().order_by('-created_at')
    
    total_fare = Ride.objects.aggregate(total=Sum('fare'))['total']

    pending_count = Ride.objects.filter(status='pending').count()

    return render(request, 'ride_list.html', {
        'rides': rides,
        'total_fare' : total_fare,
        'pending_count' : pending_count
    })


# ----------------------------------------------------------------------------- cancel Bookings

# @user_passes_test(is_admin)
# @permission_classes([IsSuperUser])
@superuser_required
def cancel_ride(request, ride_id):
    ride = get_object_or_404(Ride, id=ride_id)

    ride.status = 'cancelled'
    ride.save()

    return redirect('ride_list')


# ----------------------------------------------------------------------------- edit Bookings

# @user_passes_test(is_admin)
# @permission_classes([IsSuperUser])
@superuser_required
def edit_ride(request, ride_id):
    ride = get_object_or_404(Ride, id=ride_id)

    if request.method == 'POST':
        ride.ride_type = request.POST.get('ride_type')
        ride.fare = request.POST.get('fare')
        ride.status = request.POST.get('status')

        ride.save()
        return redirect('rides_list')

    return render(request, 'edit_ride.html', {
        'ride': ride
    })


# ----------------------------------------------------------------------------- review

# @user_passes_test(is_admin)
# @permission_classes([IsSuperUser])
@superuser_required
def review_list(request):

    reviews = (
        Ride.objects
        .filter(rating__isnull=False)
        .select_related('user', 'driver')
        .order_by('-created_at')
    )

    context = {
        'reviews': reviews
    }

    return render(request, 'review_list.html', context)
