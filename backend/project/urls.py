"""
URL configuration for project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, re_path, include
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('api/admin/', admin.site.urls),
    path('api/social/facebook/', include('social.facebook.urls')),
    path('api/social/google/', include('social.google.urls')),
    path('api/social/github/', include('social.github.urls')),
    path('api/blog/', include('blog.urls')),

    # drf_social_oauth2 URLs
    re_path(r'^api/auth/', include('drf_social_oauth2.urls', namespace='drf')),
    path("api/o/", include("oauth2_provider.urls", namespace="oauth2_provider")),

    # django_ckeditor_5 URLs
    path("ckeditor5/", include('django_ckeditor_5.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
