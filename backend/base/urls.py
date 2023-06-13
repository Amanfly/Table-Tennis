from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

admin.site.site_header=settings.ADMIN_SITE_HEADER
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/',include('auth.api.urls')),
    path('api/v1/',include('tournament.api.urls')),  
]

if settings.DEBUG:
    import debug_toolbar
    urlpatterns += [
        path('__debug__/', include(debug_toolbar.urls)),
    ]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)