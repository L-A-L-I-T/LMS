from django.db import models
from django.db.models.enums import Choices
from User.models import Group_Course
from django.utils import timezone
from User.models import User,School,Branch,Course_Unit
import uuid
# Create your models here.


class Assignment(models.Model):
    HIDDEN = 'Hidden'
    VISIBLE = 'Visible'
    SUBMITABLE = 'Submitable'
    Choices = [(HIDDEN,'Hidden'),(VISIBLE,'Visible'),(SUBMITABLE,'Submitable')]
    assignment_id = models.UUIDField(primary_key=True,default=uuid.uuid4,editable=False)
    #Files will be submitted in backend seperate folder
    title = models.CharField(max_length=1000,default=None,blank=True,null=True)
    description = models.TextField(default=None,blank=True,null=True)
    min_marks = models.IntegerField(default=None,blank=True,null=True)
    max_marks = models.IntegerField(default=None,blank=True,null=True)
    post_date= models.DateTimeField(default=timezone.now)
    due_date= models.DateTimeField(default=None,blank=True,null=True)
    visibility = models.CharField(choices=Choices,default=HIDDEN,max_length=100,null=True,blank=True)

    class Meta:
        db_table = 'ASSIGNMENT'
        verbose_name = 'assignment'
        verbose_name_plural = 'assignments'

    def __str__(self):
        return f"{self.title}"

class Group_Assignment(models.Model):
    teacher = models.ForeignKey(User,on_delete=models.CASCADE,verbose_name="teacher_fk",blank=True,null=True)
    grp_course = models.ForeignKey(Group_Course,on_delete=models.CASCADE,verbose_name='group_course_fk')
    course_unit = models.ForeignKey(Course_Unit,on_delete=models.CASCADE,verbose_name='course_unit_fk',null=True,blank=True)
    assignment_id = models.ForeignKey(Assignment,on_delete=models.CASCADE, verbose_name='assignment_fk')
    school = models.ForeignKey(School,on_delete=models.CASCADE,verbose_name='school_fk',blank=True,null=True)
    branch = models.ForeignKey(Branch,on_delete=models.CASCADE,verbose_name='branch_fk',blank=True,null=True)
    
    
    class Meta:
        db_table = 'GROUP_ASSIGNMENT'
        verbose_name = 'group_assignment'
        verbose_name_plural = 'group_assignments'

class Assignment_submission(models.Model):
    assignment_submission_id = models.UUIDField(primary_key=True,default=uuid.uuid4,editable=False)
    assignment_id = models.ForeignKey(Assignment,on_delete=models.CASCADE,verbose_name='assignment_fk')
    prn = models.ForeignKey(User,on_delete=models.CASCADE,verbose_name='prn_fk')
    submit_time = models.DateTimeField(auto_now = True)
    school = models.ForeignKey(School,on_delete=models.CASCADE,verbose_name='school_fk',blank=True,null=True)
    branch = models.ForeignKey(Branch,on_delete=models.CASCADE,verbose_name='branch_fk',blank=True,null=True)
    
    # file= models.FileField(upload_to='media')

    class Meta:
        db_table = 'ASSIGNMENT_SUBMISSION'
        verbose_name = 'assignment_submission'
        verbose_name_plural = 'assignment_submissions'
        

    def __str__(self):
        return f"{self.prn}"

class Assignment_marks(models.Model):
    assignment_submission_id = models.ForeignKey(Assignment_submission,on_delete=models.CASCADE,verbose_name='assignment_submission_fk')
    marks= models.IntegerField(default=0,blank=True,null=True)
    review = models.TextField(default=None,blank=True,null=True)
    school = models.ForeignKey(School,on_delete=models.CASCADE,verbose_name='school_fk',blank=True,null=True)
    branch = models.ForeignKey(Branch,on_delete=models.CASCADE,verbose_name='branch_fk',blank=True,null=True)
    
    

    class Meta:
        db_table = 'ASSIGNMENT_MARKS'
        verbose_name = 'assignment_marks'
        verbose_name_plural = 'assignment_marks'

