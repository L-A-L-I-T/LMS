from rest_framework import serializers
from .models import Student_Course, Student_Current_Info, Student_Group
from User.models import Course,user_group

class Student_Group_Serializer(serializers.ModelSerializer):
    class Meta:
        model = user_group
        fields = "__all__"

class Student_Course_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = "__all__"

class Student_Course_Detail_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = "__all__"
        
class Student_Current_Info_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Student_Current_Info
        fields = ['student_group','semester','roll_no']
