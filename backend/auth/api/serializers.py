from django.conf import settings
from django.contrib import auth
from rest_framework import serializers
from auth.models import CustomUser
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.serializers import TokenObtainSerializer
from basics.utils import Util




class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=60, write_only=True)
    confirm_password = serializers.CharField(max_length=60, write_only=True)
    email = serializers.EmailField()

    class Meta:
        model = CustomUser
        fields = ('email', 'password', 'confirm_password', 'is_admin', 'is_player', 'name')

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')
        user = CustomUser.objects.filter(email=email).exists()
        if user:
            raise AuthenticationFailed('User Already Exists')
        len_password = len(password)
        if len_password < 8:
            raise AuthenticationFailed('Password must be greater than 7')
        return attrs

    def create(self, validated_data):
        confirm_password = validated_data.pop('confirm_password')
        return CustomUser.objects.create_user(**validated_data)


class LoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=255, min_length=3)
    password = serializers.CharField(max_length=68, min_length=6, write_only=True)
    tokens = serializers.SerializerMethodField()

    def get_tokens(self, obj):
        user = CustomUser.objects.get(email=obj['email'])
        return {
            'refresh': user.tokens()['refresh'],
            'access': user.tokens()['access']
        }

    class Meta:
        model = CustomUser
        fields = ('email', 'password', 'tokens')

    def validate(self, attrs):
        email = attrs.get('email', '')
        password = attrs.get('password', '')
        user = CustomUser.objects.filter(email=email).exists()
        if not user:
            raise AuthenticationFailed('User does not exit')
        user = auth.authenticate(email=email, password=password)
        if not user:
            raise AuthenticationFailed('Invalid credentials, try again')
        if not user.is_active:
            raise AuthenticationFailed('Account disabled, contact admin')

        if not user.is_verified:
            absurl = settings.EMAILVERIFY_URL + str(user.token)
            context = {
                "absurl": absurl,
                "first_name": user.name,
            }
            data = Util.html_render('auth/verify-email.html', context, user.email, "Verify Your Email")
            Util.send_email(data)
            raise AuthenticationFailed('Email is not verified And We have sent the link')

        return {
            'email': user.email,
            'tokens': user.tokens
        }


class SetNewPasswordSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(max_length=60, write_only=True)

    class Meta:
        model = CustomUser
        fields = ('password', 'confirm_password')

    def update(self, instance, validated_data):
        print(1)
        instance.set_password(validated_data['password'])
        instance.save()
        return instance


class UpdateProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'name', 'image', 'email', 'gender', 'age')

    def update(self, instance, validated_data):
        instance.image = validated_data.get('image', instance.image)
        instance.name = validated_data.get('name', instance.name)
        instance.gender = validated_data.get('gender', instance.gender)
        instance.age = validated_data.get('age', instance.age)
        instance.save()
        return instance
class ProfileSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = ('id', 'name', 'image', 'email', 'gender', 'age')

    def get_image(self, obj):
        return Util.request_absolute_url(obj.image)

