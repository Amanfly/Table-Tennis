from rest_framework import permissions

class TournamentAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.is_authenticated and request.user.is_admin:
            return True
        if request.method in permissions.SAFE_METHODS:
            return True
            
    def has_object_permission(self, request, view, obj):
        if request.user.is_superuser:
            return True

        if request.user.is_staff:
            return True
        if request.user.is_admin:
            return True        
        return False


