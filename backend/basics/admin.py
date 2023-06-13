from functools import update_wrapper

from django import forms
from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.admin.widgets import FilteredSelectMultiple    
from django.contrib.auth.models import Group, Permission


User = get_user_model()


class BaseModelAdmin(admin.ModelAdmin):
    pass


class BaseModelCompleteUserTimestampsAdmin(admin.ModelAdmin):
    readonly_fields = ('created_at', 'updated_at', 'created_by', 'updated_by')

    def save_model(self, request, obj, form, change):
        # pre save stuff
        if obj._state.adding is True:
            obj.created_by = request.user
            obj.updated_by = request.user
        else:
            obj.updated_by = request.user
        obj.save()


class BaseInlineAdmin(admin.StackedInline):
    pass


class BaseTabularInlineAdmin(admin.TabularInline):
    pass


def wrap_admin_view(view, cacheable=False):
    """
    Use this to wrap view functions used in admin dashboard
    Note: Only the views that require a admin login
    """
    from django.contrib import admin

    def wrapper(*args, **kwargs):
        return admin.site.admin_view(view, cacheable)(*args, **kwargs)

    wrapper.admin_site = admin.site
    return update_wrapper(wrapper, view)


class GroupAdminForm(forms.ModelForm):
    class Meta:
        model = Group
        exclude = []

    users = forms.ModelMultipleChoiceField(
         queryset=User.objects.all(), 
         required=False,
         widget=FilteredSelectMultiple('users', False)
    )

    def __init__(self, *args, **kwargs):
        super(GroupAdminForm, self).__init__(*args, **kwargs)
        if self.instance.pk:
            self.fields['users'].initial = self.instance.user_set.all()

    def save_m2m(self):
        self.instance.user_set.set(self.cleaned_data['users'])

    def save(self, *args, **kwargs):
        instance = super(GroupAdminForm, self).save()
        self.save_m2m()
        return instance

admin.site.unregister(Group)

# Create a new Group admin.
class GroupAdmin(admin.ModelAdmin):
    # Use our custom form.
    form = GroupAdminForm
    # Filter permissions horizontal as well.
    filter_horizontal = ['permissions']
    
admin.site.register(Group, GroupAdmin)

@admin.register(Permission)
class PermissionAdmin(admin.ModelAdmin):
    def get_queryset(self, request):
        qs = super().get_queryset(request)
        return qs.select_related('content_type')