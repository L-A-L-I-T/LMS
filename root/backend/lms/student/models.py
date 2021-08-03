
from django.db import models
from User.models import User,Branch,user_group,Semester,Course,School
from quiz.models import Quiz,Quiz_Data
import uuid
# class Student_Info(models.Model):
#     prn = models.CharField(primary_key=True, max_length=100)
#     name = models.CharField(max_length=200)
#     user = models.ForeignKey(User,on_delete=models.CASCADE,verbose_name='user_fk')
#     school = models.ForeignKey(School,on_delete=models.CASCADE,verbose_name='school_fk')
#     branch = models.ForeignKey(Branch,on_delete=models.CASCADE,verbose_name='branch_fk')
    
#     class Meta:
#         db_table = 'STUDENT_INFO'
#         verbose_name = 'student_info'
#         verbose_name_plural = 'student_infos'

class Student_Group(models.Model):
    student_group_id = models.UUIDField(primary_key=True,default=uuid.uuid4,editable=False)
    student = models.ForeignKey(User,on_delete=models.CASCADE,verbose_name='User_fk')
    group = models.ForeignKey(user_group,on_delete=models.CASCADE,verbose_name='group_fk')
    school = models.ForeignKey(School,on_delete=models.CASCADE,verbose_name='school_fk', blank=True, null=True)
    branch = models.ForeignKey(Branch,on_delete=models.CASCADE,verbose_name='branch_fk',blank=True, null=True)
    
    class Meta:
        db_table = 'STUDENT_GROUP'
        verbose_name = 'student_group'
        verbose_name_plural = 'student_groups'

    def __str__(self):
        return f"{self.student.user_id}"

class Student_Course(models.Model):
    student = models.ForeignKey(User,on_delete=models.CASCADE,verbose_name='User_fk')
    course = models.ForeignKey(Course,on_delete=models.CASCADE,verbose_name='course_fk')
    school = models.ForeignKey(School,on_delete=models.CASCADE,verbose_name='school_fk',blank=True,null=True)
    branch = models.ForeignKey(Branch,on_delete=models.CASCADE,verbose_name='branch_fk',blank=True,null=True)
    
    class Meta:
        db_table = 'STUDENT_COURSE'
        verbose_name = 'student_course_relation'
        verbose_name_plural = 'student_course_relations'

    def __str__(self):
        return f"{self.student.user_id}"

class Student_Current_Info(models.Model):

    student_group = models.ForeignKey(Student_Group,on_delete=models.CASCADE,verbose_name='student_group_fk')
    semester = models.ForeignKey(Semester,on_delete=models.CASCADE,verbose_name='semester_fk')
    roll_no = models.IntegerField(default=None,blank=True,null=True)
    school = models.ForeignKey(School,on_delete=models.CASCADE,verbose_name='school_fk',blank=True,null=True)
    branch = models.ForeignKey(Branch,on_delete=models.CASCADE,verbose_name='branch_fk',blank=True,null=True)
    
    class Meta:
        db_table = 'STUDENT_CURRENT_INFO'
        verbose_name = 'student_current_info'
        verbose_name_plural = 'student_current_infos'

    def __str__(self):
        return f"{self.roll_no}"

class Student_Profile(models.Model):
    student_id = models.ForeignKey(User,on_delete=models.CASCADE,verbose_name="student_fk")
    username = models.CharField(unique=True,max_length=50)
    dob = models.DateField(default=None,blank=True,null=True)
    cgpa = models.FloatField(default=None,blank=True,null=True)
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
        db_table = 'STUDENT_PROFILE'
        verbose_name = 'student_profile'
        verbose_name_plural = 'student_profiles'

class Student_experience(models.Model):
    student=models.ForeignKey(User,on_delete=models.CASCADE,verbose_name='student_fk')
    title= models.TextField(default=None,blank=True,null=True)
    desc = models.TextField(default=None,blank=True,null=True)
    school = models.ForeignKey(School,on_delete=models.CASCADE,verbose_name='school_fk',blank=True,null=True)
    branch = models.ForeignKey(Branch,on_delete=models.CASCADE,verbose_name='branch_fk',blank=True,null=True)
    
    class Meta:
        db_table = 'STUDENT_EXPERIENCE'
        verbose_name = 'student_experience'
        verbose_name_plural = 'student_experiences'

class Student_Project(models.Model):
    student = models.ForeignKey(Student_Profile,on_delete=models.CASCADE,verbose_name='student_profile_fk')
    project_id = models.UUIDField(primary_key=True,default=uuid.uuid4,editable=False)
    name = models.CharField(max_length=100,blank=True,null=True)
    desc = models.TextField(default=None,blank=True,null=True)
    link = models.URLField(max_length=300,blank=True,null=True)
    school = models.ForeignKey(School,on_delete=models.CASCADE,verbose_name='school_fk',blank=True,null=True)
    branch = models.ForeignKey(Branch,on_delete=models.CASCADE,verbose_name='branch_fk',blank=True,null=True)
    
    class Meta:
        db_table = 'STUDENT_PROJECT'
        verbose_name = 'student_project'
        verbose_name_plural = 'student_projects'

# class Student_Documents(models.Model):
#     student_doc_id = models.BigAutoField(primary_key=True)
#     student = models.ForeignKey(Student_Info,on_delete=models.CASCADE,verbose_name='student_info_fk')
#     aadhar = models.FileField(upload_to='/media/')
#     caste_cretificate = models.FileField(upload_to='/media/')
#     income_certificate = models.FileField(upload_to='/media/')
#     domicile_certificate = models.FileField(upload_to='/media/')
#     school = models.ForeignKey(School,on_delete=models.CASCADE,verbose_name='school_fk')
#     branch = models.ForeignKey(Branch,on_delete=models.CASCADE,verbose_name='branch_fk')
    
#     class Meta:
#         db_table = 'STUDENT_DOCUMENT'
#         verbose_name = 'student_document'
#         verbose_name_plural = 'student_documents'

class Student_Quiz(models.Model):
    student = models.ForeignKey(User,on_delete=models.CASCADE,verbose_name='User_fk')
    quiz = models.ForeignKey(Quiz,on_delete=models.CASCADE,verbose_name='quiz_fk')
    submitted_time = models.DateTimeField(auto_now=True)
    marks = models.FloatField(default=0,blank=True,null=True)
    attempt_count = models.IntegerField(default=0,blank=True,null=True)
    school = models.ForeignKey(School,on_delete=models.CASCADE,verbose_name='school_fk',blank=True,null=True)
    branch = models.ForeignKey(Branch,on_delete=models.CASCADE,verbose_name='branch_fk',blank=True,null=True)
    
    class Meta:
        db_table = 'STUDENET_QUIZ'
        verbose_name = 'student_quiz'
        verbose_name_plural = 'student_quizes'

class Student_Quiz_Answers(models.Model):
    student = models.ForeignKey(User,on_delete=models.CASCADE,verbose_name='User_fk')
    question = models.ForeignKey(Quiz_Data,on_delete=models.CASCADE,verbose_name='quiz_data_fk')
    answer = models.TextField(default=None,blank=True,null=True)
    school = models.ForeignKey(School,on_delete=models.CASCADE,verbose_name='school_fk',blank=True,null=True)
    branch = models.ForeignKey(Branch,on_delete=models.CASCADE,verbose_name='branch_fk',blank=True,null=True)
    
    class Meta:
        db_table = 'STUDENET_QUIZ_ANSWER'
        verbose_name = 'student_quiz_answers'
        verbose_name_plural = 'student_quiz_answers'

# class Student_Selected_Quiz(models.Model):
#     student = models.ForeignKey(User,on_delete=models.CASCADE,verbose_name='User_fk')
#     quiz = models.ForeignKey(Quiz_For_Selected_Students,on_delete=models.CASCADE,verbose_name='quiz_fk')
#     submitted_time = models.DateTimeField(auto_now=True)
#     marks = models.FloatField()
#     is_attempted = models.BooleanField(default=False)
#     school = models.ForeignKey(School,on_delete=models.CASCADE,verbose_name='school_fk')
#     branch = models.ForeignKey(Branch,on_delete=models.CASCADE,verbose_name='branch_fk')
    
#     class Meta:
#         db_table = 'STUDENT_SELECTED_QUIZ'
#         verbose_name = 'student_selected_quiz'
#         verbose_name_plural = 'student_selected_quizes'

# class Student_Selected_Quiz_Answers(models.Model):
#     student = models.ForeignKey(Student_Info,on_delete=models.CASCADE,verbose_name='student_info_fk')
#     question = models.ForeignKey(Quiz_Questions_For_Selected,on_delete=models.CASCADE,verbose_name='quiz_question_fk')
#     school = models.ForeignKey(School,on_delete=models.CASCADE,verbose_name='school_fk')
#     branch = models.ForeignKey(Branch,on_delete=models.CASCADE,verbose_name='branch_fk')
#     # answer


class Student_Result(models.Model):
    student_group = models.ForeignKey(Student_Group,on_delete=models.CASCADE,verbose_name='student_group_fk')
    semester = models.ForeignKey(Semester,on_delete=models.CASCADE,verbose_name='semester_fk')
    sgpa = models.FloatField(default=None,blank=True,null=True)
    cgpa = models.FloatField(default=None,blank=True,null=True)
    school = models.ForeignKey(School,on_delete=models.CASCADE,verbose_name='school_fk',blank=True,null=True)
    branch = models.ForeignKey(Branch,on_delete=models.CASCADE,verbose_name='branch_fk',blank=True,null=True)
    
    class Meta:
        db_table = 'STUDENT_RESULT'
        verbose_name = 'student_result'
        verbose_name_plural = 'student_results'

