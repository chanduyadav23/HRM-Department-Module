# backend/departments/views.py

from rest_framework import viewsets
from .models import Department
from .serializers import DepartmentSerializer

class DepartmentViewSet(viewsets.ModelViewSet):
    queryset = Department.objects.filter(status=True)  # ✅ Required for router
    serializer_class = DepartmentSerializer

    def perform_destroy(self, instance):
        instance.status = False  # Soft delete
        instance.save()
