from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
# from django.contrib.auth import get_user_model
# from blog.models import UserProfile
import requests
import json
import os
from dotenv import load_dotenv


load_dotenv('.env.dev')

# User = get_user_model()


@csrf_exempt
def exchange_google_token(request):
    """Handles Google OAuth token exchange."""

    if request.method != "POST":
        return JsonResponse({"error": "Invalid request"}, status=400)

    data = json.loads(request.body)
    code = data.get("code")
    # redirect_uri = data.get("redirect_uri")  # ✅ Get redirect URI from frontend

    redirect_uri = f'{os.getenv('FRONTEND_URL')}/auth/'

    if not code or not redirect_uri:
        return JsonResponse({"error": "Missing parameters"}, status=400)

    # Exchange the Google auth code for an access token
    google_token_url = "https://oauth2.googleapis.com/token"

    payload = {
        "client_id": os.getenv("SOCIAL_AUTH_GOOGLE_OAUTH2_KEY"),
        "client_secret": os.getenv("SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET"),
        "redirect_uri": redirect_uri,
        "grant_type": "authorization_code",
        "code": code,
    }

    response = requests.post(google_token_url, data=payload)
    google_data = response.json()

    if response.status_code != 200:
        return JsonResponse(google_data, status=response.status_code)

    google_access_token = google_data.get("access_token")

    if not google_access_token:
        return JsonResponse({"error": "Invalid Google access token"}, status=400)

    # Fetch user profile data from Google
    google_profile_url = "https://www.googleapis.com/oauth2/v2/userinfo"
    profile_headers = {"Authorization": f"Bearer {google_access_token}"}

    profile_response = requests.get(
        google_profile_url, headers=profile_headers)
    profile_data = profile_response.json()

    # Extract user details
    google_picture = profile_data.get("picture")
    google_email = profile_data.get("email")
    google_name = profile_data.get("name")

    # Convert Google access token to Django token using drf_social_oauth2
    # convert_token_url = request.build_absolute_uri("/api/auth/convert-token/")
    convert_token_url = "http://localhost:8000/api/auth/convert-token/"

    convert_payload = {
        "grant_type": "convert_token",
        "client_id": os.getenv("OAUTH2_GOOGLE_CLIENT_ID"),
        "client_secret": os.getenv("OAUTH2_GOOGLE_CLIENT_SECRET"),
        "backend": "google-oauth2",
        "token": google_access_token,
    }

    token_response = requests.post(convert_token_url, data=convert_payload)
    token_data = token_response.json()

    if token_response.status_code != 200:
        return JsonResponse(token_data, status=token_response.status_code)

    # Inject Google profile data into the Django token response
    token_data = {
        "access_token": token_data.get('access_token'),
        "email": google_email,
        "name": google_name,
        "picture": google_picture,
    }

    return JsonResponse(token_data)
