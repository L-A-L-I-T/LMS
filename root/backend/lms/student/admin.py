from django.contrib import admin
from .models import Student_Group,Student_Course,Student_Current_Info, Student_Profile, Student_Project, Student_Quiz, Student_Result, Student_experience,Student_Quiz_Answers
# Register your models here.


@admin.register(Student_Course)
class Student_Course(admin.ModelAdmin):
    raw_id_fields = ['student','course','school','branch']
    list_display = ['student','course','school','branch']
    list_filter = ['school','branch','course']
    search_fields = ['course']
    def get_form(self, request, obj=None, **kwargs):
        
        self.exclude = ("school","branch", )
        form = super(Student_Course, self).get_form(request, obj, **kwargs)
        return form

    def save_model(self, request, obj, form, change):
        if not obj.school:
            obj.school = obj.student.school
        if not obj.branch:
            
            obj.branch = obj.student.branch
        obj.save()


# admin.register(Student_Info)
@admin.register(Student_Group)
class Student_Group(admin.ModelAdmin):
    raw_id_fields = ['student','group']
    list_display = ['student_group_id','student','group','school','branch']
    list_filter = ['group','school','branch']
    search_fields = ['group']
    def get_form(self, request, obj=None, **kwargs):
        
        self.exclude = ("school","branch", )
        form = super(Student_Group, self).get_form(request, obj, **kwargs)
        return form

    def save_model(self, request, obj, form, change):
        if not obj.school:
            obj.school = obj.student.school
        if not obj.branch:
            obj.branch = obj.student.branch
        obj.save()


@admin.register(Student_Current_Info)
class Student_Current_Info(admin.ModelAdmin):
    raw_id_fields = ['student_group','semester']
    list_display = ['student_group','semester','roll_no','school','branch']
    list_filter = ['school','branch','semester',]
    search_fields = ['semester','student_group']
    def get_form(self, request, obj=None, **kwargs):
        
        self.exclude = ("school","branch", )
        form = super(Student_Current_Info, self).get_form(request, obj, **kwargs)
        return form

    def save_model(self, request, obj, form, change):
        if not obj.school:
            obj.school = obj.student.school
        if not obj.branch:
            
            obj.branch = obj.student.branch
        obj.save()
    
@admin.register(Student_Profile)
class Student_Profile(admin.ModelAdmin):
    raw_id_fields = ['student_id']
    list_display = ['username','dob','cgpa','school','branch']
    list_filter = ['school','branch']
    search_fields = ['username',]
    def get_form(self, request, obj=None, **kwargs):
        
        self.exclude = ("school","branch", )
        form = super(Student_Profile, self).get_form(request, obj, **kwargs)
        return form

    def save_model(self, request, obj, form, change):
        if not obj.school:
            obj.school = obj.student_id.school
        if not obj.branch:
            
            obj.branch = obj.student_id.branch
        obj.save()
@admin.register(Student_experience)
class Student_experience(admin.ModelAdmin):
    list_display = ['student','title','school','branch']
    list_filter = ['school','branch']
    raw_id_fields = ['student',]
    search_fields = ['title','student']
    def get_form(self, request, obj=None, **kwargs):
        
        self.exclude = ("school","branch", )
        form = super(Student_experience, self).get_form(request, obj, **kwargs)
        return form

    def save_model(self, request, obj, form, change):
        if not obj.school:
            obj.school = obj.student.school
        if not obj.branch:
            
            obj.branch = obj.student.branch
        obj.save()

# admin.site.register(Student_Documents)
# admin.site.register(Student_Quiz_Answers)
@admin.register(Student_Quiz)
class Student_Quiz(admin.ModelAdmin):
    list_display = ['student','quiz','marks','submitted_time','school','branch']
    list_filter = ['school','branch','quiz']
    raw_id_fields = ['student','quiz']
    search_fields = ['quiz','attempt_count']
    def get_form(self, request, obj=None, **kwargs):
        
        self.exclude = ("school","branch", )
        form = super(Student_Quiz, self).get_form(request, obj, **kwargs)
        return form

    def save_model(self, request, obj, form, change):
        if not obj.school:
            obj.school = obj.student.school
        if not obj.branch:
            
            obj.branch = obj.student.branch
        obj.save()

# admin.site.register(Student_Selected_Quiz)
@admin.register(Student_Quiz_Answers)
class Student_Quiz_Answers(admin.ModelAdmin):
    list_display = ['student','question','answer','school','branch']
    list_filter = ['school','branch']
    raw_id_fields = ['student','question']
    search_fields = ['title','student','question']
    def get_form(self, request, obj=None, **kwargs):
        
        self.exclude = ("school","branch", )
        form = super(Student_Quiz_Answers, self).get_form(request, obj, **kwargs)
        return form

    def save_model(self, request, obj, form, change):
        if not obj.school:
            obj.school = obj.student.school
        if not obj.branch:
            
            obj.branch = obj.student.branch
        obj.save()


@admin.register(Student_Result)
class Student_Result(admin.ModelAdmin):
    list_display = ['student_group','semester','cgpa','sgpa','school','branch']
    list_filter = ['school','branch','semester',]
    raw_id_fields = ['student_group','semester']
    search_fields = ['semester','cgpa','sgpa']
    def get_form(self, request, obj=None, **kwargs):
        
        self.exclude = ("school","branch", )
        form = super(Student_Result, self).get_form(request, obj, **kwargs)
        return form

    def save_model(self, request, obj, form, change):
        if not obj.school:
            obj.school = obj.student.school
        if not obj.branch:
            
            obj.branch = obj.student.branch
        obj.save()

@admin.register(Student_Project)
class student_project(admin.ModelAdmin):
    list_display = ['student','project_id','name','school','branch']
    list_filter = ['school','branch',]
    raw_id_fields = ['student',]
    search_fields = ['name',]
    def get_form(self, request, obj=None, **kwargs):
        
        self.exclude = ("school","branch", )
        form = super(student_project, self).get_form(request, obj, **kwargs)
        return form

    def save_model(self, request, obj, form, change):
        if not obj.school:
            obj.school = obj.student.school
        if not obj.branch:
            
            obj.branch = obj.student.branch
        obj.save()



