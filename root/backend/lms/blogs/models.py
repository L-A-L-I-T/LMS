# from django.db import models
# from django.db.models.deletion import CASCADE
# from django.utils import timezone
# from User.models import User

# # Create your models here

# class Blog(models.Model):
#     blog_id= models.BigAutoField(primary_key=True)
#     email= models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="email_fk")
#     file= models.FileField(upload_to='media')
#     blog_title = models.CharField(max_length=100)
#     blog_description = models.TextField()
#     links = models.TextField()
#     post_date = models.DateTimeField(default=timezone.now)
#     event_date = models.DateTimeField()

#     class Meta:
#         db_table = 'BLOG'
#         verbose_name = 'blog'
#         verbose_name_plural = 'blogs'

