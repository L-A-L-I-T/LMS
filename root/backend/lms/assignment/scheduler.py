from apscheduler.schedulers.background import BackgroundScheduler
import datetime
from .models import Assignment


def update_assignment_status(assignment_id):
    assignment_obj= Assignment.objects.get(assignment_id=assignment_id)
    assignment_obj.visibility='Submitable'
    assignment_obj.save()
    print(assignment_obj.visibility)
    return assignment_obj

def assignment_visibility_scheduler(submitable_date,assignment_id):
    scheduler=BackgroundScheduler()
    scheduler.add_job(update_assignment_status, 'date', run_date=submitable_date,args = [assignment_id])
    scheduler.start()
    print(scheduler.get_jobs())
    print("check",submitable_date,assignment_id)



