from User.models import Course_Unit
import uuid
from django.contrib.admin import options
from django.db import models
from django.db.models.deletion import CASCADE
from User.models import Group_Course
from django.db import models
from User.models import User,School,Branch

class Quiz(models.Model):
    quiz_id = models.UUIDField(primary_key=True,default=uuid.uuid4,editable=False)
    name = models.CharField(max_length=450,default=None,blank=True,null=True)
    desc = models.TextField(default=None,blank=True,null=True)
    total_marks = models.FloatField(default=None,blank=True,null=True)
    total_questions = models.IntegerField(default=None,blank=True,null=True)
    start_date = models.DateTimeField(default=None,blank=True,null=True)
    due_date = models.DateTimeField(default=None,blank=True,null=True)
    duration = models.DurationField(default=None,blank=True,null=True)
    max_attempts = models.IntegerField(default=1,blank=True,null=True)
    
    class Meta:
        db_table = 'QUIZ'
        verbose_name = 'quiz'
        verbose_name_plural = 'quizzes'

    def __str__(self):
        return f"{self.quiz_name}"

class Group_Quiz(models.Model):
    teacher = models.ForeignKey(User,on_delete=models.CASCADE,verbose_name="teacher_fk")
    grp_course = models.ForeignKey(Group_Course,on_delete=models.CASCADE,verbose_name='group_course_fk')
    course_unit = models.ForeignKey(Course_Unit,on_delete=models.CASCADE,verbose_name='course_unit_fk',default=None,null=True,blank=True)
    quiz_id = models.ForeignKey(Quiz,on_delete=models.CASCADE, verbose_name='quiz_fk')
    school = models.ForeignKey(School,on_delete=models.CASCADE,verbose_name='school_fk',blank=True,null=True)
    branch = models.ForeignKey(Branch,on_delete=models.CASCADE,verbose_name='branch_fk',blank=True,null=True)
    class Meta:
        db_table = 'QUIZ_GROUP'
        verbose_name = 'quiz_group'
        verbose_name_plural = 'quiz_groups'

        
# class Quiz_For_Selected_Students(models.Model):
#     quiz_id = models.BigAutoField(primary_key=True)
#     total_marks = models.FloatField()
#     total_questions = models.IntegerField()
#     prn = models.PositiveBigIntegerField(unique=True)
#     start_date = models.DateTimeField()
#     due_date = models.DateTimeField()
#     duration = models.TimeField()

#     class Meta:
#         db_table = 'QUIZ_FOR_SELECTED'
#         verbose_name = 'quiz_for_selected'
#         verbose_name_plural = 'quizes_for_selected'

class Quiz_Data(models.Model):
    question_id = models.UUIDField(primary_key=True,default=uuid.uuid4,editable=False)
    quiz = models.ForeignKey(Quiz,on_delete=models.CASCADE,verbose_name='quiz_fk')
    question = models.TextField(default=None,blank=True,null=True)
    question_img = models.ImageField(default=None,blank=True,null=True)
    options = models.CharField(max_length=1000,null=True,blank=True)   #Array in PostgreSQL will be implemented
    answer = models.TextField(default=None,blank=True,null=True)
    
    class Meta:
        db_table = 'QUIZ_Data'
        verbose_name = 'quiz_data'
        verbose_name_plural = 'quiz_data'

    def __str__(self):
        return f"{self.question}"

# class Quiz_Questions_For_Selected(models.Model):
#     question_id = models.BigAutoField(primary_key=True)
#     quiz = models.ForeignKey(Quiz_For_Selected_Students,on_delete=models.CASCADE,verbose_name='quiz_for_selected_fk')
#     question = models.TextField()
#     options = models.CharField(max_length=1000)   #Array in PostgreSQL will be implemented
#     answer = models.CharField(max_length=450) 

#     class Meta:
#         db_table = 'QUIZ_QUESTIONS_FOR_SELECTED'
#         verbose_name = 'quiz_question_for_selected'
#         verbose_name_plural = 'quiz_questions_for_selected'
