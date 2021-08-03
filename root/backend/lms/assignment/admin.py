from django.contrib import admin
from .models import Assignment, Assignment_marks, Assignment_submission, Group_Assignment
from teacher.models import Teacher_Course
# Register your models here.
@admin.register(Assignment)
class Assignment(admin.ModelAdmin):
    list_display = ['title','assignment_id','min_marks','max_marks','post_date','due_date','visibility']
    search_fields = ['assignment_id','title']
@admin.register(Group_Assignment)
class Group_Assignment(admin.ModelAdmin):
    list_display = ['teacher','grp_course','assignment_id','course_unit','school','branch']
    list_filter = ['school','branch',]
    raw_id_fields = ['teacher','grp_course','assignment_id']
    search_fields = ['teacher','grp_course']

    def get_form(self, request, obj=None, **kwargs):
        
        self.exclude = ("school","branch","teacher")
        form = super(Group_Assignment, self).get_form(request, obj, **kwargs)
        return form

    def save_model(self, request, obj, form, change):
        teacher_course_obj = Teacher_Course.objects.get(group_course_id=obj.grp_course.group_course_id)
        obj.teacher=teacher_course_obj.teacher
        if not obj.school:
            obj.school = obj.teacher.school
        if not obj.branch:
            
            obj.branch = obj.teacher.branch
        
        obj.save()
    

@admin.register(Assignment_submission)
class Assignment_submission(admin.ModelAdmin):
    list_display = ['assignment_submission_id','assignment_id','prn','submit_time','school','branch']
    list_filter = ['school','branch',]
    raw_id_fields = ['prn','assignment_id']
    search_fields = ['prn',]
    def get_form(self, request, obj=None, **kwargs):
        
        self.exclude = ("school","branch", )
        form = super(Assignment_submission, self).get_form(request, obj, **kwargs)
        return form

    def save_model(self, request, obj, form, change):
        if not obj.school:
            obj.school = obj.prn.school
        if not obj.branch:
            
            obj.branch = obj.prn.branch
        obj.save()

@admin.register(Assignment_marks)
class Assignment_marks(admin.ModelAdmin):
    list_display = ['assignment_submission_id','marks','school','branch']
    list_filter = ['school','branch',]
    raw_id_fields = ['assignment_submission_id',]
    search_fields = ['assignment_submission_id',]
    def get_form(self, request, obj=None, **kwargs):
        
        self.exclude = ("school","branch", )
        form = super(Assignment_marks, self).get_form(request, obj, **kwargs)
        return form

    def save_model(self, request, obj, form, change):
        if not obj.school:
            obj.school = obj.assignment_submission_id.school
        if not obj.branch:
            
            obj.branch = obj.assignment_submission_id.branch
        obj.save()

