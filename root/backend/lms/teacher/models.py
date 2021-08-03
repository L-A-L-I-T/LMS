from django.db import models
from User.models import User,School,Group_Course,Branch
import uuid
# Create your models here.

# # class Teacher_Info(models.Model):
# #     teacher_id = models.BigAutoField(primary_key=True)
# #     teacher_name = models.CharField(max_length=100)
# #     school = models.ForeignKey(School,on_delete=models.CASCADE,verbose_name='school_fk')
# #     branch = models.ForeignKey(Branch,on_delete=models.CASCADE,verbose_name='branch_fk')
# #     user = models.ForeignKey(User,on_delete=models.CASCADE,verbose_name='user_fk')

# #     class Meta:
# #         db_table = 'TEACHER_INFO'
# #         verbose_name = 'teacher_info'
# #         verbose_name_plural = 'teacher_infos'


class Teacher_Profile(models.Model):
    teacher_id = models.ForeignKey(User,on_delete=models.CASCADE,verbose_name="teacher_fk")
    username = models.CharField(unique=True,max_length=50,default=None,blank=True,null=True)
    dob = models.DateField(default=None,blank=True,null=True)
    bio = models.TextField(default=None,blank=True,null=True)
    # avatar = models.ImageField()
    interests = models.TextField(default=None,blank=True,null=True)
    # resume = models.FileField()
    skills = models.TextField(default=None,blank=True,null=True)
    participations = models.TextField(default=None,blank=True,null=True)
    social_media_links = models.TextField(default=None,blank=True,null=True)
    interests = models.TextField(default=None,blank=True,null=True)
    school = models.ForeignKey(School,on_delete=models.CASCADE,verbose_name='school_fk',blank=True,null=True)
    branch = models.ForeignKey(Branch,on_delete=models.CASCADE,verbose_name='branch_fk',blank=True,null=True)
    
    class Meta:
        db_table = 'TEACHER_PROFILE'
        verbose_name = 'teacher_profile'
        verbose_name_plural = 'teacher_profiles'

class Teacher_experience(models.Model):
    teacher=models.ForeignKey(User,on_delete=models.CASCADE,verbose_name='student_fk')
    title= models.TextField(default=None,blank=True,null=True)
    desc = models.TextField(default=None,blank=True,null=True)
    school = models.ForeignKey(School,on_delete=models.CASCADE,verbose_name='school_fk',blank=True,null=True)
    branch = models.ForeignKey(Branch,on_delete=models.CASCADE,verbose_name='branch_fk',blank=True,null=True)
    
    class Meta:
        db_table = 'TEACHER_EXPERIENCE'
        verbose_name = 'teacher_experience'
        verbose_name_plural = 'teacher_experiences'

class Teacher_Course(models.Model):
    teacher_course_id = models.UUIDField(primary_key=True,default=uuid.uuid4,editable=False)
    teacher = models.ForeignKey(User,on_delete=models.CASCADE,verbose_name='user_fk')
    group_course = models.ForeignKey(Group_Course,on_delete=models.CASCADE,verbose_name='group_course_fk')
    school = models.ForeignKey(School,on_delete=models.CASCADE,verbose_name='school_fk',blank=True,null=True)
    branch = models.ForeignKey(Branch,on_delete=models.CASCADE,verbose_name='branch_fk',blank=True,null=True)
    
    class Meta:
        db_table = 'TEACHER_COURSE'
        verbose_name = 'teacher_course'
        verbose_name_plural = 'teacher_courses'

    def __str__(self):
        return f"{self.teacher_course_id}"
        