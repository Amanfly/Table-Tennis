from django.contrib.auth import get_user_model
from auth.models import CustomUser
from django.db import models

# Create your models here.
User = CustomUser

class BaseManager(models.Manager):

    def get_table_name(self):
        return self.model.get_table_name()


class BaseModel(models.Model):
    objects = BaseManager()

    @classmethod
    def get_table_name(cls):
        if hasattr(cls._meta, 'db_table'):
            return cls._meta.db_table

        return cls.objects.get_table_name()

    @classmethod
    def get_field_names(cls, exclude=()):
        return [f.name for f in cls._meta.get_fields() if f.name not in exclude]

    class Meta:
        abstract = True


class BaseModelTimestamps(BaseModel):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class BaseModelCompleteUserTimestamps(BaseModel):
    created_by = models.ForeignKey(to=User, on_delete=models.DO_NOTHING, null=True, blank=True,
                                   related_name='%(class)s_created_by')
    updated_by = models.ForeignKey(to=User, on_delete=models.DO_NOTHING, null=True, blank=True,
                                   related_name='%(class)s_updated_by')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class BaseModelPartialUserTimestamps(BaseModel):
    created_by = models.ForeignKey(to=User, on_delete=models.DO_NOTHING, null=True, blank=True,
                                   related_name='%(class)s_created_by')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        abstract = True