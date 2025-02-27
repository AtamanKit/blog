from django.urls import path
from .views import exchange_facebook_token


urlpatterns = [
    path('auth/facebook/', exchange_facebook_token),
]
