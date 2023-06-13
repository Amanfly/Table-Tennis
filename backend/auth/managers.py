from django.contrib.auth.models import BaseUserManager

class UserManager(BaseUserManager):

    def create_user(self,email, password=None,**kwargs):
        if email is None:
            raise TypeError('Users should have a Email')
        user = self.model(email=self.normalize_email(email),**kwargs)
        if user.is_admin:
           user.is_staff=True
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self,email, password=None,**kwargs):
        if password is None:
            raise TypeError('Password should not be none')

        user = self.create_user(email, password,**kwargs)
        user.is_superuser = True
        user.is_verfied=True
        user.is_active=True
        user.is_staff = True
        user.save()
        return user
