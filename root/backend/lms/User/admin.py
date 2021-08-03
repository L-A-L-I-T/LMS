from django import forms
from django.contrib import admin
from django.contrib.auth import models
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import Group
from .models import Course_Unit, User,Branch,Branch_Semester,School,user_group,Group_Course,Semester,Course
from django.contrib.auth.forms import ReadOnlyPasswordHashField
from import_export.admin import ImportExportModelAdmin
# Register your models here

admin.site.unregister(Group)

class UserCreationForm(forms.ModelForm):
    """A form for creating new users. Includes all the required
    fields, plus a repeated password."""
    password1 = forms.CharField(label='Password', widget=forms.PasswordInput)
    password2 = forms.CharField(label='Password confirmation', widget=forms.PasswordInput)

    class Meta:
        model = User
        fields = ('user_id','email','f_name','l_name','role','branch','is_active','staff','admin')

    def clean_password2(self):
        # Check that the two password entries match
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")
        if password1 and password2 and password1 != password2:
            raise forms.ValidationError("Passwords don't match")
        return password2

    def save(self, commit=True):
        # Save the provided password in hashed format
        user = super().save(commit=False)
        user.set_password(self.cleaned_data["password1"])
        if commit:
            user.save()
        return user


class UserChangeForm(forms.ModelForm):
    """A form for updating users. Includes all the fields on
    the user, but replaces the password field with admin's
    password hash display field.
    """
    password = ReadOnlyPasswordHashField()

    class Meta:
        model = User
        fields = ('user_id','email','f_name','l_name','role','branch','is_active','staff','admin')

    def clean_password(self):
        # Regardless of what the user provides, return the initial value.
        # This is done here, rather than on the field, because the
        # field does not have access to the initial value
        return self.initial["password"]



@admin.register(User)
class User_Admin(ImportExportModelAdmin,UserAdmin):
    
    filter_horizontal=()
    raw_id_fields=['branch','school']
    list_display = ('user_id','email','f_name','l_name','role','is_active','staff','admin','branch','school')
    list_filter = ('role','branch','school')
    search_fields = ('role','branch','school')
    ordering = ('admin','staff','role')
    add_fieldsets = (
        (None,{
            'fields':('user_id','email','f_name','l_name','branch','password1','password2')
        }),
        ('Permissions',{
            'fields' : ('is_active','staff','admin','role')
        })
    )
    fieldsets = (
        (None,{
            'classes':('wide',),
            'fields':('user_id','email','f_name','l_name','branch','password')
        }),
        ('Permissions',{
            'fields': ('is_active','staff','admin','role')
        })
    )
    def get_form(self, request, obj=None, **kwargs):
        
        self.exclude = ("school")
        form = super(User_Admin, self).get_form(request, obj, **kwargs)
        return form

    def save_model(self, request, obj, form, change):
        if obj.branch:
            if not obj.school:
                obj.school = obj.branch.school
        
        obj.save()


@admin.register(School)
class School(admin.ModelAdmin):
    list_display = ('school_id','school_name')
    list_editable = ('school_name',)
    ordering = ('school_id',)

@admin.register(Branch)
class Branch(admin.ModelAdmin):
    raw_id_fields = ['school']
    list_display = ('school','branch_id','branch_name',)
    list_editable = ('branch_name',)
    ordering = ('branch_id',)

@admin.register(Semester)
class Semester(admin.ModelAdmin):

    list_display = ('semester_id','semester_name',)
    list_editable = ('semester_name',)
    ordering = ('semester_id',)

@admin.register(Branch_Semester)
class Branch_Semester(admin.ModelAdmin):
    # raw_id_fields = ['school','branch','semester']
    list_display = ['semester','school','branch']
    ordering = ('branch_sem_id',)
    def get_form(self, request, obj=None, **kwargs):
        
        self.exclude = ("school",)
        form = super(Branch_Semester, self).get_form(request, obj, **kwargs)
        return form

    def save_model(self, request, obj, form, change):
        if not obj.school:
            obj.school = obj.branch.school
        
        obj.save()

@admin.register(user_group)
class user_group(admin.ModelAdmin):
    raw_id_fields = ['school','branch','semester']
    list_display = ('group_id','group_name','no_of_students','school','branch','semester')
    list_editable = ('group_name','no_of_students')
    ordering = ('semester_id',)
    def get_form(self, request, obj=None, **kwargs):
        
        self.exclude = ("school",)
        form = super(user_group, self).get_form(request, obj, **kwargs)
        return form

    def save_model(self, request, obj, form, change):
        if not obj.school:
            obj.school = obj.branch.school
        
        obj.save()

@admin.register(Course)
class Course(admin.ModelAdmin):
    raw_id_fields = ('school','branch','semester')
    list_display = ('course_id','course_name','course_desc')
    list_editable = ('course_name',)
    ordering = ('course_id',)
    def get_form(self, request, obj=None, **kwargs):
        
        self.exclude = ("school",)
        form = super(Course, self).get_form(request, obj, **kwargs)
        return form

    def save_model(self, request, obj, form, change):
        if not obj.school:
            obj.school = obj.branch.school
        
        obj.save()

@admin.register(Group_Course)
class Group_Course(admin.ModelAdmin):
    raw_id_fields = ('group','course',)
    ordering = ('group_course_id',)
    list_display =('group_course_id','group','course','school','branch')
    def get_form(self, request, obj=None, **kwargs):
        
        self.exclude = ("school","branch", )
        form = super(Group_Course, self).get_form(request, obj, **kwargs)
        return form

    def save_model(self, request, obj, form, change):
        if not obj.school:
            obj.school = obj.course.school
        if not obj.branch:
            
            obj.branch = obj.course.branch
        obj.save()


@admin.register(Course_Unit)
class Course_Unit(admin.ModelAdmin):
    raw_id_fields = ('course_id',)
    ordering = ('course_id',)
    list_display =['course_unit_id','course_id','name','desc','school','branch']
    search_fields = ['course_unit_id','name']
    def get_form(self, request, obj=None, **kwargs):
        
        self.exclude = ("school","branch", )
        form = super(Course_Unit, self).get_form(request, obj, **kwargs)
        return form

    def save_model(self, request, obj, form, change):
        if not obj.school:
            obj.school = obj.course_id.school
        if not obj.branch:
            
            obj.branch = obj.course_id.branch
        obj.save()


