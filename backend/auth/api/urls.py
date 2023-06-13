from django.urls import path
from rest_framework_simplejwt.views import (
    TokenRefreshView, TokenObtainPairView, TokenVerifyView
)

from .views import RegisterView, VerifyEmail, LoginAPIView, PasswordAPI, RequestPasswordResetEmail, UpdateProfileAPIView

urlpatterns = [
    path('register/', RegisterView.as_view(), name="register"),
    path('login/', LoginAPIView.as_view(), name="login"),
    path('email-verify/<token>/', VerifyEmail.as_view(), name="email-verify"),
    path('token/', TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path('token/verify', TokenVerifyView.as_view(), name="token_verify"),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('forgot-password/', RequestPasswordResetEmail.as_view(), name="request-reset-email"),
    path('reset-password/<token>/', PasswordAPI.as_view(), name='password-reset-confirm'),
    path('profile/', UpdateProfileAPIView.as_view(), name='profile-update'),

]
