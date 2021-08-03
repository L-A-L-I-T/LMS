from User.models import User
from django.db.models import Q
from rest_framework import authentication
from rest_framework import exceptions

class CustomAuthenticationBackend:
    def authenticate(self, request, email_or_id, password):
        try:
             user = User.objects.get(Q(email=email_or_id) | Q(user_id=email_or_id))
             pwd_valid = user.check_password(password)
             if pwd_valid:          
                return user
        except User.DoesNotExist:
            return None

    # def get_user(self, user_id):
    #     try:
    #         return User.objects.get(pk=user_id)
    #     except User.DoesNotExist:
    #         return None

# class CustomAuthenticate(authentication.BaseAuthentication):
#     def authenticate(self,request):
#         user_id = request.GET.get('user_id')
#         password = request.GET.get('password')
#         print(user_id,password)
#         if user_id is None or password is None:
#             return None
#         try:
#             user = User.objects.get(Q(email=user_id) | Q(user_id=user_id))
#             print("Working")
#             pwd_valid = user.check_password(password)
#             if pwd_valid:          
#                 return user
#         except User.DoesNotExist:
#             return None