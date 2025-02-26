from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import requests
import json
import os
from dotenv import load_dotenv


load_dotenv('.env.dev')

############################ FACEBOOK AUTHENTICATION ############################
############################ FACEBOOK AUTHENTICATION ############################
############################ FACEBOOK AUTHENTICATION ############################


@csrf_exempt
def exchange_facebook_token(request):
    """Handles Facebook OAuth token exchange."""
    if request.method != "POST":
        return JsonResponse({'error': 'Invalid request'}, status=400)

    data = json.loads(request.body)
    code = data.get('code')
    redirect_uri = data.get('redirect_uri')

    if not code:
        return JsonResponse({'error': 'Missing Facebook access token'}, status=400)

    # Exchange the Facebook code for an access token
    facebook_token_url = "https://graph.facebook.com/v10.0/oauth/access_token"

    payload = {
        'client_id': os.getenv('SOCIAL_AUTH_FACEBOOK_KEY'),
        'client_secret': os.getenv('SOCIAL_AUTH_FACEBOOK_SECRET'),
        'redirect_uri': redirect_uri,
        'code': code,
    }

    response = requests.get(facebook_token_url, params=payload)
    facebook_data = response.json()

    if response.status_code != 200:
        return JsonResponse(facebook_data, status=response.status_code)

    facebook_access_token = facebook_data.get('access_token')

    if not facebook_access_token:
        return JsonResponse({'error': 'Invalid Facebook access token'}, status=400)

    profile_url = "https://graph.facebook.com/v10.0/me"
    profile_params = {
        "fields": "id,name,email, picture.type(large)",
        "access_token": facebook_access_token,
    }

    profile_response = requests.get(profile_url, params=profile_params)
    profile_data = profile_response.json()

    # Extract user details
    facebook_picture = profile_data.get('picture', {}).get('data', {}).get('url')
    facebook_email = profile_data.get('email')
    facebook_name = profile_data.get('name')

    # Convert Facebook access token to Django token using drf_social_oauth2
    convert_token_url = request.build_absolute_uri(
        '/auth/convert-token/')

    convert_payload = {
        'grant_type': 'convert_token',
        'client_id': os.getenv('OAUTH2_CLIENT_ID'),
        'client_secret': os.getenv('OAUTH2_CLIENT_SECRET'),
        'backend': 'facebook',
        'token': facebook_access_token,
    }

    token_response = requests.post(convert_token_url, data=convert_payload)
    token_data = token_response.json()

    if token_response.status_code != 200:
        return JsonResponse(token_data, status=token_response.status_code)

    # Inject Facebook profile data into the Django token response
    token_data['user']['email'] = facebook_email
    token_data['user']['name'] = facebook_name
    token_data['user']['picture'] = facebook_picture

    return JsonResponse(token_data)

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import requests
import json
import os
from dotenv import load_dotenv

load_dotenv('.env.dev')  # ✅ Load environment variables

############################ GOOGLE AUTHENTICATION ############################
############################ GOOGLE AUTHENTICATION ############################
############################ GOOGLE AUTHENTICATION ############################

@csrf_exempt
def exchange_google_token(request):
    """Handles Google OAuth token exchange."""
    if request.method != "POST":
        return JsonResponse({"error": "Invalid request"}, status=400)

    data = json.loads(request.body)
    code = data.get("code")
    redirect_uri = data.get("redirect_uri")  # ✅ Get redirect URI from frontend

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

    profile_response = requests.get(google_profile_url, headers=profile_headers)
    profile_data = profile_response.json()

    # Extract user details
    google_picture = profile_data.get("picture")
    google_email = profile_data.get("email")
    google_name = profile_data.get("name")

    # Convert Google access token to Django token using drf_social_oauth2
    convert_token_url = request.build_absolute_uri("/auth/convert-token/")

    convert_payload = {
        "grant_type": "convert_token",
        "client_id": os.getenv("OAUTH2_CLIENT_ID"),
        "client_secret": os.getenv("OAUTH2_CLIENT_SECRET"),
        "backend": "google-oauth2",
        "token": google_access_token,
    }

    token_response = requests.post(convert_token_url, data=convert_payload)
    token_data = token_response.json()

    if token_response.status_code != 200:
        return JsonResponse(token_data, status=token_response.status_code)

    # Inject Google profile data into the Django token response
    token_data["user"] = {
        "email": google_email,
        "name": google_name,
        "picture": google_picture,
    }

    return JsonResponse(token_data)


# @csrf_exempt
# def exchange_github_token(request):
#     """Handles GitHub OAuth token exchange."""
#     if request.method != "POST":
#         return JsonResponse({"error": "Invalid request"}, status=400)

#     data = json.loads(request.body)
#     github_token = data.get("access_token")

#     if not github_token:
#         return JsonResponse({"error": "Missing GitHub access token"}, status=400)

#     payload = {
#         "grant_type": "convert_token",
#         "client_id": os.getenv("OAUTH2_CLIENT_ID"),
#         "client_secret": os.getenv("OAUTH2_CLIENT_SECRET"),
#         "backend": "github",
#         "token": github_token,
#     }

#     response = requests.post(
#         "http://localhost:8000/auth/convert-token/", data=payload)
#     return JsonResponse(response.json())
