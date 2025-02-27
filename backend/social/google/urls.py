from django.urls import path
from .views import exchange_google_token


urlpatterns = [
    path('auth/google/', exchange_google_token),
]
