from django.db import models
import uuid
from django.contrib.auth.models import (
    AbstractBaseUser,BaseUserManager
)

# from django.contrib.auth.models import PermissionsMixin

class School(models.Model):
    school_id = models.UUIDField(primary_key=True,default=uuid.uuid4,editable=False)
    school_name = models.CharField(unique=True,max_length=250)

    class Meta:
        db_table = 'SCHOOL'
        verbose_name = 'School'
        verbose_name_plural = 'Schools'

    def __str__(self):
        return f"{self.school_name}"

class Branch(models.Model):
    school = models.ForeignKey(School,on_delete=models.CASCADE,verbose_name='school_fk')
    branch_id = models.UUIDField(primary_key=True,default=uuid.uuid4,editable=False)
    branch_name = models.CharField(unique=True,max_length=250)

    class Meta:
        db_table = 'BRANCH'
        verbose_name = 'Branch'
        verbose_name_plural = 'Branches'

    def __str__(self):
        return f"{self.branch_name}"
class UserManager(BaseUserManager):

    def create_user(self,email,password,f_name,l_name,user_id,role,is_active=False,branch=None,school=None):
        
        if not email:
            raise ValueError("Users must have an email address")
        if not password:
            raise ValueError("Users must have a password")
        if not f_name:
            raise ValueError("Users must have a first name")
        if not l_name:
            raise ValueError("Users must have a last name")
        if not user_id:
            raise ValueError("Users must have a unique user ID")
        user_obj = self.model(
            email = self.normalize_email(email))

        user_obj.set_password(password) #change your password
        user_obj.f_name = f_name
        user_obj.l_name = l_name
        user_obj.is_active = is_active
        user_obj.user_id = user_id
        user_obj.staff = False
        user_obj.admin=False
        user_obj.role = role
        user_obj.branch=branch
        user_obj.school=school
        user_obj.save(using=self._db)
        return user_obj

    def create_superuser(self,email,password,f_name,l_name,user_id,role=None,branch=None,school=None):
    
        if not email:
            raise ValueError("Users must have an email address")
        if not password:
            raise ValueError("Users must have a password")
        if not f_name:
            raise ValueError("Users must have a first name")
        if not l_name:
            raise ValueError("Users must have a last name")
        if not user_id:
            raise ValueError("Users must have a unique user ID")
        user_obj = self.model(
            email = self.normalize_email(email)
        )
        user_obj.set_password(password) #change your password
        user_obj.f_name = f_name
        user_obj.l_name = l_name
        user_obj.role = role
        user_obj.user_id = user_id
        user_obj.is_active = True
        user_obj.staff = True
        user_obj.admin = True
        user_obj.branch = branch
        user_obj.school=school
        user_obj.save(using=self._db)
        return user_obj


class User(AbstractBaseUser):
    user_id = models.CharField(primary_key=True,max_length=100, verbose_name='user_id')  
    f_name = models.CharField(max_length=250,verbose_name='First Name')
    l_name = models.CharField(max_length=250,verbose_name='Last Name')
    email = models.EmailField(unique=True, verbose_name="email")
    staff = models.BooleanField(default=False,verbose_name='Staff Member')
    is_active = models.BooleanField(default=False,verbose_name='Active User') # for login
    admin = models.BooleanField(default = False,verbose_name='Admin')  #Superuser
    role = models.IntegerField(verbose_name='Role of user',blank=True,null=True,help_text='Teacher_role : 1 and Student_role : 0')
    branch = models.ForeignKey(Branch, blank=True,null=True, on_delete=models.CASCADE)
    school = models.ForeignKey(School,blank=True,null=True, on_delete=models.CASCADE )
    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['f_name','l_name','user_id']

    class Meta:
        db_table = 'USER'
        verbose_name = 'User'
        verbose_name_plural = 'Users'
    
    def get_full_name(self):
        # The user is identified by their email address
        return f"{self.f_name}+' '+{self.l_name}"

    def get_short_name(self):
        # The user is identified by their email address
        return self.email

    def __str__(self):
        return f"{self.email}"

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        return self.staff

    @property
    def is_admin(self):
        "Is the user a admin member?"
        return self.admin

# class Admin_info(models.Model):
#     user = models.OneToOneField(User,on_delete=models.CASCADE,verbose_name='Admin_User')
#     admin_id = models.UUIDField(primary_key=True,default=uuid.uuid4,editable=False)
#     admin_name = models.CharField(max_length=300)

#     class Meta:
#         db_table = 'ADMIN'
#         verbose_name = 'Admin'
#         verbose_name_plural = 'Admins'

    
class Semester(models.Model):
    semester_id = models.UUIDField(primary_key=True,default=uuid.uuid4,editable=False)
    semester_name = models.CharField(unique=True,max_length=250)
    

    class Meta:
        db_table = 'SEMESTER'
        verbose_name = 'Semester'
        verbose_name_plural = 'Semesters'
    
    def __str__(self):
        return f"{self.semester_name}"

class Branch_Semester(models.Model):
    branch_sem_id = models.UUIDField(primary_key=True,default=uuid.uuid4,editable=False)
    semester = models.ForeignKey(Semester,on_delete=models.CASCADE,verbose_name='semester_fk')
    school = models.ForeignKey(School,on_delete=models.CASCADE,verbose_name='school_fk',blank=True,null=True)
    branch = models.ForeignKey(Branch,on_delete=models.CASCADE,verbose_name='branch_fk',blank=True,null=True)
    
    class Meta:
        db_table = 'BRANCH_SEMESTER'
        verbose_name = 'branch_sem'
        verbose_name_plural = 'branch_sems'

    def __str__(self):
        return f"{self.branch_sem_id}"

class user_group(models.Model):
    group_id = models.UUIDField(primary_key=True,default=uuid.uuid4,editable=False)
    group_name = models.CharField(max_length=200)
    no_of_students = models.IntegerField(default=None,blank=True,null=True)
    semester = models.ForeignKey(Semester,on_delete=models.CASCADE,verbose_name='semester_fk')
    school = models.ForeignKey(School,on_delete=models.CASCADE,verbose_name='school_fk',blank=True,null=True)
    branch = models.ForeignKey(Branch,on_delete=models.CASCADE,verbose_name='branch_fk',blank=True,null=True)
    
    class Meta:
        db_table = 'GROUP'
        verbose_name = 'group'
        verbose_name_plural = 'groups'

    def __str__(self):
        return f"{self.group_name}"

class Course(models.Model):
    course_id = models.UUIDField(primary_key=True,default=uuid.uuid4,editable=False)
    course_name = models.CharField(unique=True,max_length=200)
    course_desc = models.TextField(blank=True)
    semester = models.ForeignKey(Semester,on_delete=models.CASCADE,verbose_name='semester_fk')
    school = models.ForeignKey(School,on_delete=models.CASCADE,verbose_name='school_fk',blank=True,null=True)
    branch = models.ForeignKey(Branch,on_delete=models.CASCADE,verbose_name='branch_fk',blank=True,null=True)
    
    class Meta:
        db_table = 'COURSE'
        verbose_name = 'course'
        verbose_name_plural = 'courses'

    def __str__(self):
        return f"{self.course_name}"

class Group_Course(models.Model):
    group_course_id = models.UUIDField(primary_key=True,default=uuid.uuid4,editable=False)
    group = models.ForeignKey(user_group,on_delete=models.CASCADE,verbose_name='group_fk')
    course = models.ForeignKey(Course,on_delete=models.CASCADE,verbose_name='course_fk')
    school = models.ForeignKey(School,on_delete=models.CASCADE,verbose_name='school_fk',blank=True,null=True)
    branch = models.ForeignKey(Branch,on_delete=models.CASCADE,verbose_name='branch_fk',blank=True,null=True)
    
    class Meta:
        db_table = 'GROUP_COURSE'
        verbose_name = 'group_course'
        verbose_name_plural = 'group_courses'

    def __str__(self):
        return f"{self.group} {self.course}"


class Course_Unit(models.Model):
    course_unit_id = models.UUIDField(primary_key=True,default=uuid.uuid4,editable=False)
    course_id = models.ForeignKey(Course,on_delete=models.CASCADE,verbose_name='course_fk',blank=True,null=True)
    name = models.CharField(max_length=500,null=True,blank=True,verbose_name="Unit Name")
    desc = models.TextField(null=True,blank=True,verbose_name="Unit Description")
    school = models.ForeignKey(School,on_delete=models.CASCADE,verbose_name='school_fk',blank=True,null=True)
    branch = models.ForeignKey(Branch,on_delete=models.CASCADE,verbose_name='branch_fk',blank=True,null=True)
    
    class Meta:
        db_table = 'COURSE_UNIT'
        verbose_name = 'course unit'
        verbose_name_plural = 'course units'

    def __str__(self):
        return f"{self.name}"

