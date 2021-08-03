# from django.db import models
# from django.db.models.fields import FloatField
# from student.models import Student_Info
# # Create your models here.
# class Payment(models.Model):
#     payment_id = models.BigAutoField(primary_key=True)
#     student = models.ForeignKey(Student_Info,on_delete=models.CASCADE,verbose_name='student_info_fk')
#     tution_fees = models.FloatField()
#     university_fees = models.FloatField()
#     development_fees = models.FloatField()
#     total_fees = models.FloatField()
#     pending = models.FloatField()

#     class Meta:
#         db_table = 'PAYMENT'
#         verbose_name = 'payment'
#         verbose_name_plural = 'payments'

# class Payment_History(models.Model):
#     payment_history_id = models.BigAutoField(primary_key=True)
#     payment = models.ForeignKey(Payment,on_delete=models.CASCADE,verbose_name='payment_fk')
#     total_payable = models.FloatField()
#     paid_till_now = models.FloatField()
#     pending = models.FloatField()
#     payment_date = models.DateTimeField()

#     class Meta:
#         db_table = 'PAYMENT_HISTORY'
#         verbose_name = 'payment_history'
#         verbose_name_plural = 'payment_histories'