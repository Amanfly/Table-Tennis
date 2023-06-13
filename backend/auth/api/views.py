from rest_framework import generics, serializers, status, views, permissions
from basics.api.views import BaseAPIView
from .serializers import ProfileSerializer, RegisterSerializer, SetNewPasswordSerializer, LoginSerializer, \
    UpdateProfileSerializer
from rest_framework.response import Response
from auth.models import CustomUser
from django.conf import settings
from basics.utils import Util


class RegisterView(BaseAPIView):
    serializer_class = RegisterSerializer
    PLAYER = 'player'
    ADMIN = 'admin'

    def post(self, request):
        try:
            roles = request.data['roles']
            is_player, is_admin = False, False
            if self.PLAYER in roles:
                is_player = True
            if self.ADMIN in roles:
                is_admin = True
            serializer = self.serializer_class(data=request.data)
            serializer.is_valid()
            serializer.save(is_admin=is_admin, is_player=is_player)
            user_data = serializer.data
            user = CustomUser.objects.get(email=user_data['email'])
            absurl = settings.EMAILVERIFY_URL + str(user.token) + '/'
            context = {
                "absurl": absurl,
                "first_name": user.name
            }
            data = Util.html_render('auth/verify-email.html', context, user.email, "Verify Your Email")
            Util.send_email(data)
            return self.success_response(data='',
                                         message="User Successfully Registered. Activation email sent to your email address.",
                                         status_code=status.HTTP_200_OK, response_class=Response)
        except Exception as e:
            return self.failure_response(str(e), status_code=status.HTTP_200_OK)


class VerifyEmail(BaseAPIView):

    def get(self, request, token):
        try:
            user = CustomUser.objects.get(token=token)
            if not user.is_verified:
                user.is_verified = True
                user.save()
            return self.success_response(data='', message="Email Verified Successfully Registered.",
                                         status_code=status.HTTP_200_OK)
        except Exception as e:
            return self.failure_response(exception_message="Does not Exist", status_code=status.HTTP_200_OK)


class LoginAPIView(BaseAPIView):
    serializer_class = LoginSerializer

    def post(self, request):
        try:
            serializer = self.serializer_class(data=request.data)
            serializer.is_valid()
            email, token = serializer.data['email'], serializer.data['tokens']
            obj = CustomUser.objects.get(email=email)
            context = {
                "name": obj.name,
                "email": email,
                "user_roles": {"is_admin": obj.is_admin, "is_player": obj.is_player},
                "token": token
            }
            return self.success_response(data=context, status_code=status.HTTP_200_OK, response_class=Response)
        except Exception as e:
            return self.failure_response(str(e), status_code=status.HTTP_200_OK)


class RequestPasswordResetEmail(BaseAPIView):
    def post(self, request):
        try:
            email = request.data.get('email', '')
            user = CustomUser.objects.get(email=email)
            token = user.token
            absurl = settings.FORGOTPASSWORD_URL + str(token)
            context = {
                "absurl": absurl,
                "first_name": user.name
            }
            data = Util.html_render('auth/reset-password.html', context, user.email, "Reset Your Password")
            Util.send_email(data)
            return self.success_response(data="", message='Reset link sent to your email address',
                                         status_code=status.HTTP_200_OK, response_class=Response)
        except CustomUser.DoesNotExist as e:
            return self.failure_response('Invalid email', status_code=status.HTTP_200_OK)
        except Exception as e:
            return self.failure_response(str(e), status_code=status.HTTP_200_OK)


class PasswordAPI(BaseAPIView):
    serializer_class = SetNewPasswordSerializer

    def post(self, request, token):
        try:
            obj = CustomUser.objects.get(token=token)
            serializer = self.serializer_class(obj, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return self.success_response(data="", message='Password updated successfully',
                                         status_code=status.HTTP_200_OK)
        except Exception as e:
            return self.failure_response(exception_message=str(e), status_code=status.HTTP_200_OK)


class UpdateProfileAPIView(BaseAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UpdateProfileSerializer

    def post(self, request):
        try:
            obj = CustomUser.objects.get(id=request.user.id)
            serializer = self.serializer_class(obj, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return self.success_response(data='Updated successfully.', status_code=status.HTTP_200_OK)
        except Exception as e:
            return self.failure_response(exception_message=str(e), status_code=status.HTTP_200_OK)

    def get(self, request):
        try:
            obj = CustomUser.objects.get(id=request.user.id)
            serializer = ProfileSerializer(obj, context={"request": request})
            return self.success_response(data=serializer.data, status_code=status.HTTP_200_OK)
        except Exception as e:
            return self.failure_response(exception_message=str(e), status_code=status.HTTP_200_OK)
