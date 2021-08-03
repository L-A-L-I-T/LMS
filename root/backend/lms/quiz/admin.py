from .models import Group_Quiz, Quiz, Quiz_Data
from django.contrib import admin

# Register your models here.
@admin.register(Quiz)
class Quiz(admin.ModelAdmin):
    list_display = ['quiz_id','total_marks','start_date','due_date','duration']
    search_fields = ['quiz_id','duration','start_date','due_date']
@admin.register(Quiz_Data)
class Quiz_Data(admin.ModelAdmin):
    list_display = ['question_id','quiz','question',]
    raw_id_fields = ['quiz',]
    search_fields = ['question_id',]

@admin.register(Group_Quiz)
class Group_Quiz(admin.ModelAdmin):
    list_display = ['teacher','grp_course','course_unit','quiz_id','school','branch']
    list_filter = ['school','branch',]
    raw_id_fields = ['teacher','grp_course','quiz_id']
    search_fields = ['teacher','grp_course']
    def get_form(self, request, obj=None, **kwargs):
        
        self.exclude = ("school","branch", )
        form = super(Group_Quiz, self).get_form(request, obj, **kwargs)
        return form

    def save_model(self, request, obj, form, change):
        if not obj.school:
            obj.school = obj.teacher.school
        if not obj.branch:
            
            obj.branch = obj.teacher.branch
        obj.save()
    



