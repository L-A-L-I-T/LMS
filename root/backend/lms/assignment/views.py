from copy import Error
import datetime
import os
from .scheduler import assignment_visibility_scheduler
from django.db.models import Q
from django.http.response import JsonResponse
from rest_framework.response import Response
from rest_framework.views import APIView
from User.models import Group_Course,User
from rest_framework.generics import GenericAPIView
from rest_framework.decorators import api_view
from .models import Assignment_submission, Group_Assignment,Assignment
from .serializers import Assignment_Serializer, Assignment_Submission_Serializer
from django.core.files.storage import FileSystemStorage
from django.views.decorators.csrf import csrf_exempt
from lms.settings import BASE_DIR
import os
class Student_Assignment_Names(APIView):
    def get(self, request, group_pk=None, course_pk=None, format=None):
        grp_course_obj=Group_Course.objects.get(group_id=group_pk,course_id=course_pk)
        querylist = Group_Assignment.objects.filter(grp_course_id=grp_course_obj.group_course_id).values()
        assignment_fk = []
        for j in querylist:
            assignment_fk.append(j['assignment_id_id'])
        queryset = Assignment.objects.filter(Q(visibility = 'Visible') | Q(visibility = 'Submitable'),assignment_id__in=assignment_fk)
        serializer_class = Assignment_Serializer(queryset, many=True)

        return Response(serializer_class.data)


class Assignment_Details(APIView):
    def get(self, request, pk=None, format=None):
        queryset=Assignment.objects.get(assignment_id=pk)
        serializer_class = Assignment_Serializer(queryset)

        return Response(serializer_class.data)

class Teacher_Assignment_Names(APIView):
    def get(self, request, pk=None, format=None):
        
        querylist = Group_Assignment.objects.filter(grp_course_id=pk).values()
        assignment_fk = []
        for j in querylist:
            assignment_fk.append(j['assignment_id_id'])
        queryset = Assignment.objects.filter(assignment_id__in=assignment_fk)
        serializer_class = Assignment_Serializer(queryset, many=True)
        return Response(serializer_class.data)

@csrf_exempt
def Create_Assignment(request):
    try:
        if request.method == 'POST':
            data = request.POST
            files = list(request.FILES.getlist('f1'))
            print(files)
            assignment_object = Assignment(title = data['title'],description = data['description'],min_marks = data['min_marks'],max_marks = data['max_marks'],post_date = data['post_date'],due_date = data['due_date'],visibility=request.POST.get('visibility',None))
            assignment_object.save()
            if data['visibility'] != 'Submitable':
                assignment_visibility_scheduler(data['post_date'],assignment_object.assignment_id)  
            grp_obj = Group_Course.objects.get(group_course_id = data['grp_course_id'])
            Group_Assignment(grp_course = grp_obj,assignment_id = assignment_object).save()
            assignment_folder = str(os.path.join(BASE_DIR,"assignments",str(assignment_object.assignment_id)))
            if not os.path.isdir(assignment_folder):
                os.makedirs(assignment_folder,mode=0o666)
            fs = FileSystemStorage(location=assignment_folder)
            for i in files:
                fs.save(i.name,i) 
            return JsonResponse({"msg":"Assignment Created Successfully ! "})
        else:
            return JsonResponse({"msg":"Wrong request sent !"})
    except Exception as e:
        print(e)
        return JsonResponse({"Error":str(e)})
        



@api_view(["POST",])
def submit_assignment(request):

    try:
        if request.method == 'POST':
            assignment_id = request.POST['assignment_id']
            due_date = Assignment.objects.get(assignment_id=assignment_id).due_date
            if due_date.replace(tzinfo = None) < datetime.datetime.now():
                print(due_date,datetime.datetime.now())
                return Response({"msg":"Overdue"})
            else:
                serializer_class = Assignment_Submission_Serializer(data=request.POST)
                if serializer_class.is_valid():
                    files = request.FILES.getlist('f1')
                    assignment_folder = str(os.path.join(BASE_DIR,"studentdata",request.POST['prn'],"assignments",request.POST['assignment_id']))
                    if not os.path.isdir(assignment_folder):
                        os.makedirs(assignment_folder,mode=0o666)
                    fs = FileSystemStorage(location=assignment_folder)
                    for i in files:
                        fs.save(i.name,i)      
                    serializer_class.save()
                    return Response({"msg":"File submitted successfully !"})
                else:
                    return Response({"msg":"Invalid data sent !"})
        else:
            return Response({"msg":"Wrong request sent !"})
    except Exception as e:
        return Response({"Error":str(e)})

class Teacher_Assignment_Names(APIView):
    def get(self, request, pk=None, format=None):
        
        querylist = Group_Assignment.objects.filter(grp_course_id=pk).values()
        assignment_fk = []
        for j in querylist:
            assignment_fk.append(j['assignment_id_id'])
        queryset = Assignment.objects.filter(assignment_id__in=assignment_fk)
        serializer_class = Assignment_Serializer(queryset, many=True)
        # dir=str(os.path.join(BASE_DIR,"0120190202"))
        # os.makedirs(dir)
        # dir=str(os.path.join(dir,"Assignments"))
        # os.makedirs(dir)
        return Response(serializer_class.data)

class assignment_submitted_students(APIView):
    def get(request,self, pk=None):
        queryset = Assignment_submission.objects.filter(assignment_id=pk)
        serializer_class = Assignment_Submission_Serializer(queryset, many=True)
        return Response(serializer_class.data)
        


