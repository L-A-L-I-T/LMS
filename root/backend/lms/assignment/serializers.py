from rest_framework import serializers
from .models import Assignment,Assignment_marks,Assignment_submission,Group_Assignment
from User.models import Course,user_group
import os
from lms.settings import BASE_DIR
class Assignment_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Assignment
        fields = "__all__"

class Assignment_Detail_Serializer(serializers.ModelSerializer):

    file_path = serializers.SerializerMethodField()
    
    class Meta:
        model = Assignment
        fields = ["assignment_id","title","description","min_marks","max_marks","post_date","due_date","visibility","file_path"]

    def get_file_path(self,obj):
            folder_path =str(BASE_DIR)+'/assignments/'+str(obj.assignment_id)
            assignments = os.listdir(folder_path)
            submission_file_path=[]
            for j in assignments:
                submission_file_path.append(folder_path+"/"+j)
            return submission_file_path



class Assignment_Submission_Serializer(serializers.ModelSerializer):

    file_path = serializers.SerializerMethodField()
    name = serializers.SerializerMethodField()
    class Meta:
        model = Assignment_submission
        fields = ['assignment_submission_id','assignment_id','prn','name','submit_time','file_path',]
    
    def get_file_path(self,obj):
            folder_path =str(BASE_DIR)+'/studentdata/'+str(obj.prn.user_id)+'/assignments/'+str(obj.assignment_id.assignment_id)
            assignments = os.listdir(folder_path)
            submission_file_path=[]
            for j in assignments:
                submission_file_path.append(folder_path+"/"+j)
            return submission_file_path
    
    def get_name(self,queryset):

            return str(queryset.prn.f_name+" "+queryset.prn.l_name)


