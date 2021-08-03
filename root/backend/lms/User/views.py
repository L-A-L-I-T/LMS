from rest_framework_simplejwt.authentication import JWTAuthentication
from .serializers import MyTokenObtainPairSerializer,Course_Unit_Serializer
from .models import Course_Unit, User, user_group
from student.serializers import Student_Group_Serializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import RetrieveModelMixin
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.views import APIView
from rest_framework.response import Response




class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class Group_Detail(GenericAPIView,RetrieveModelMixin):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = user_group.objects.all()
    serializer_class = Student_Group_Serializer
    def get(self,request,*args,**kwargs):
        return self.retrieve(request,*args,**kwargs)