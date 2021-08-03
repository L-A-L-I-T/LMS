"""lms URL Configuration"""

from django.contrib import admin
from django.urls import path,include

# from rest_framework.routers import DefaultRouter
# router = DefaultRouter()

# router.register('userapi',views.Login_Check,basename='user')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/',include('User.urls')),
    path('api/student/',include('student.urls')),
    path('api/teacher/',include('teacher.urls')),
    path('api/',include('assignment.urls'))
    # path('auth/', include('rest_framework.urls')),
    
]

