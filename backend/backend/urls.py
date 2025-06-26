# backend/backend/urls.py

from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from departments.views import DepartmentViewSet

router = DefaultRouter()
router.register(r'departments', DepartmentViewSet)  # ✅ No error now

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]
