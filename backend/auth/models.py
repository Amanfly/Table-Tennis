from django.db import models
from django.contrib.auth.models import AbstractUser
from rest_framework_simplejwt.tokens import RefreshToken
import uuid
from .managers import UserManager


def user_directory_path(instance, filename):
    return 'user_images/user_{0}/{1}'.format(str(instance.id), filename)


class CustomUser(AbstractUser):
    Gender_Choice = (
        ('Male', 'Male'),
        ('Female', 'Female')
    )

    name = models.CharField(default='User', max_length=100)
    email = models.EmailField(max_length=150, unique=True, verbose_name="Email")
    age = models.IntegerField(null=True, verbose_name="Age")
    gender = models.CharField(max_length=6, choices=Gender_Choice, default="Male", verbose_name="Gender")

    image = models.ImageField(upload_to=user_directory_path, default='user_images/default.jpeg', verbose_name="Image")

    is_verified = models.BooleanField(default=False, verbose_name="Is Verified")
    is_active = models.BooleanField(default=True, verbose_name="Is Active")
    is_staff = models.BooleanField(default=False, verbose_name="Is Staff")
    is_admin = models.BooleanField(default=False, verbose_name="Is Tournament Admin")
    is_player = models.BooleanField(default=False, verbose_name="Is Player")

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    token = models.UUIDField(max_length=100, default=uuid.uuid4, unique=True)

    username = None
    first_name = None
    last_name = None

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = UserManager()

    class Meta:
        db_table = "auth_user"
        verbose_name = "User"
        verbose_name_plural = "User"

    def __str__(self):
        return self.name

    # Using Token Obtain Pair View
    def tokens(self):
        refresh = RefreshToken.for_user(self)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token)
        }
