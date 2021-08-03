# Generated by Django 3.2.4 on 2021-07-24 00:31

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('User', '0005_auto_20210719_1831'),
        ('assignment', '0007_alter_assignment_visibility'),
    ]

    operations = [
        migrations.AlterField(
            model_name='group_assignment',
            name='course_unit',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='User.course_unit', verbose_name='course_unit_fk'),
        ),
    ]
