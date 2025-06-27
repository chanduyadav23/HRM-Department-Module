from rest_framework import viewsets, permissions
from .models import Department
from .serializers import DepartmentSerializer

class DepartmentViewSet(viewsets.ModelViewSet):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer

    def get_permissions(self):
        # 🚨 TEMPORARILY allow all actions for demo
        return [permissions.AllowAny()]
