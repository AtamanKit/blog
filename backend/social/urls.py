from django.urls import path
# from .views import exchange_facebook_token, exchange_google_token, exchange_github_token
from .views import exchange_facebook_token, exchange_google_token


urlpatterns = [
    path('auth/facebook/', exchange_facebook_token),
    path('auth/google/', exchange_google_token),
    # path('auth/github/', exchange_github_token),
]
