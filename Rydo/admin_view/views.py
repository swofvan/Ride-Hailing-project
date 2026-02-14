from django.shortcuts import render
from django.contrib.auth.decorators import user_passes_test
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.core.paginator import Paginator

from auth_app.models import User, Driver

from django.db.models import Q

from django.shortcuts import get_object_or_404, redirect
from django.contrib import messages

# def is_superuser(user):
#     return user.is_superuser


# ----------------------------------------------------------------------------- users list

# @user_passes_test(is_superuser))
def users_list(request):

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

def disable_user(request, user_id):
    user = get_object_or_404(User, id=user_id)

    user.is_active = False
    user.save()

    messages.success(request, "User disabled successfully.")
    return redirect('users_list')

# ----------------------------------------------------------------------------- enable user

def enable_user(request, user_id):
    user = get_object_or_404(User, id=user_id)

    user.is_active = True
    user.save()

    messages.success(request, "User enabled successfully.")
    return redirect('users_list')

# ----------------------------------------------------------------------------- delete user

def delete_user(request, user_id):
    user = get_object_or_404(User, id=user_id)

    user.delete()

    messages.success(request, "User deleted successfully.")
    return redirect('users_list')


# ------------------------------------------------------------------------------ Drivers list

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

def approve_driver(request, driver_id):
    driver = get_object_or_404(Driver, id=driver_id)
    
    driver.status = 'accepted'
    driver.user.is_active = True

    driver.user.save()
    driver.save()

    messages.success(request, "Driver approved successfully.")
    return redirect('drivers_list')


# ----------------------------------------------------------------------------- Reject driver

def reject_driver(request, driver_id):
    driver = get_object_or_404(Driver, id=driver_id)
    
    driver.status = 'rejected'
    driver.user.is_active = False
    
    driver.user.save()
    driver.save()

    messages.success(request, "Driver rejected successfully.")
    return redirect('drivers_list')


# ----------------------------------------------------------------------------- disable driver

def disable_driver(request, driver_id):
    driver = get_object_or_404(Driver, id=driver_id)

    driver.user.is_active = False
    driver.user.save()

    messages.success(request, "Driver disabled successfully.")
    return redirect('drivers_list')

# ----------------------------------------------------------------------------- enable driver

def enable_driver(request, driver_id):
    driver = get_object_or_404(Driver, id=driver_id)

    driver.user.is_active = True
    driver.user.save()

    messages.success(request, "Driver enabled successfully.")
    return redirect('drivers_list')

# ----------------------------------------------------------------------------- delete driver

def delete_driver(request, driver_id):
    driver = get_object_or_404(Driver, id=driver_id)

    driver.user.delete()

    messages.success(request, "Driver deleted successfully.")
    return redirect('drivers_list')
