# from root.backend.lms.quiz.models import Quiz_Questions
# from django.db import models
# from django.utils import timezone
# from User.models import User

# # Create your models here.

# class Forum_Category(models.Model):
#     category_id = models.BigAutoField(primary_key=True)
#     category_name= models.CharField(max_length=100)

#     class Meta:
#         db_table = 'FORUM_CATEGORY'
#         verbose_name = 'forum_category'
#         verbose_name_plural = 'forum_categorys'

# class Forum_Question(models.model):
#     question_id = models.BigAutoField(primary_key=True)
#     category_id = models.ForeignKey(Forum_Category, on_delete=models.CASCADE, verbose_name="category_fk")
#     email = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="email_fk")
#     file = models.FileField(upload_to='media')
#     title= models.CharField(max_length=100)
#     description = models.TextField()
#     upvote_count = models.IntegerField()
#     post_date = models.DateTimeField(default=timezone.now)
#     is_opened = models.BooleanField(default=True)
#     answer_count = models.IntegerField()

#     class Meta:
#         db_table = 'FORUM_QUESTION'
#         verbose_name = 'forum_question'
#         verbose_name_plural = 'forum_questions'

# class Forum_Answer(models.Model):
#     answer_id = models.BigAutoField(primary_key=True)
#     question_id = models.ForeignKey(Quiz_Questions, on_delete=models.CASCADE, verbose_name="question_fk")
#     email = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="email_fk")
#     file = models.FileField(upload_to='media')
#     title= models.CharField(max_length=100)
#     description = models.TextField()
#     upvote_count = models.IntegerField()
#     post_date = models.DateTimeField(default=timezone.now)
#     class Meta:
#         db_table = 'FORUM_ANSWER'
#         verbose_name = 'forum_answer'
#         verbose_name_plural = 'forum_answers'
