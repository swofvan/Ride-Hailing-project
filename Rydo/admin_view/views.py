from django.shortcuts import render
from django.contrib.auth.decorators import user_passes_test
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.core.paginator import Paginator

from auth_app.models import User, Driver

# def is_superuser(user):
#     return user.is_superuser


# @user_passes_test(is_superuser))
def users_list(request):

    driver_ids = Driver.objects.values_list('user_id', flat=True)
    users = User.objects.exclude(id__in=driver_ids)

    paginator = Paginator(users, 5)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    context = {
        "page_obj": page_obj,
    }

    return render(request, "users_list.html", context)
