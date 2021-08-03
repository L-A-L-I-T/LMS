from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('classroom/group',views.Student_Groups.as_view(),name="Student_Group"),
    path('classroom/group/<str:pk>/course',views.Student_Group_Course.as_view(),name="Student_Group_Course"),
    path('classroom/group/course/<str:pk>',views.Student_Course.as_view(),name="Student_Course"),
    path('classroom/course/<str:pk>/units',views.Student_Course_Unit_Api.as_view(),name="course_unit_detail")
   
]


