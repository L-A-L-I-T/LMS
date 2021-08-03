from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from User.models import Group_Course,Course_Unit
from User.serializers import Course_Unit_Serializer
from .serializers import Student_Course_Detail_Serializer, Student_Group_Serializer, Student_Course_Serializer
from rest_framework.views import APIView
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin
from .models import Student_Group, Student_Course
from User.models import Course, user_group
# from User.views import token_authentication
from django.db import connection
import json
from rest_framework_simplejwt.authentication import JWTAuthentication

# Create your views here.


class Student_Groups(APIView):
    def post(self, request, pk=None, format=None):
            
            prn = (json.loads(request.body))['prn']
            print(prn)
            print("hello")
            querylist = Student_Group.objects.filter(student=prn).values()
            group_fk = []
            for j in querylist:
                group_fk.append(j['group_id'])
            queryset = user_group.objects.filter(group_id__in=group_fk)
            serializer = Student_Group_Serializer(queryset, many=True)
            return Response(serializer.data)
        # else:
        #     return Response({"msg": "Invalid Token"})


class Student_Group_Course(APIView):
    def get(self, request, pk=None, format=None):
        querylist = Group_Course.objects.filter(group_id=pk).values()
        course_fk = []
        for j in querylist:
            course_fk.append(j['course_id'])
        queryset = Course.objects.filter(course_id__in=course_fk)
        serializer = Student_Course_Serializer(queryset, many=True)
        return Response(serializer.data)


class Student_Course(GenericAPIView, RetrieveModelMixin):
    queryset = Course.objects.all()
    serializer_class = Student_Course_Detail_Serializer

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)



class Student_Course_Unit_Api(APIView):
    def get(self, request, pk=None, format=None):
        queryset = Course_Unit.objects.filter(course_id=pk).values()
        serializer = Course_Unit_Serializer(queryset, many=True)
        return Response(serializer.data)