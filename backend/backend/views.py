from django.http import HttpResponse

def home(request):
    return HttpResponse("✅ HRM API is running! Visit /api/departments/")
