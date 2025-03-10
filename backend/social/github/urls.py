from django.urls import path
from .views import exchange_github_token

urlpatterns = [
    path('auth/github/', exchange_github_token),
]
