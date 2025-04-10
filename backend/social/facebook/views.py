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
def exchange_facebook_token(request):
    """Handles Facebook OAuth token exchange."""
    if request.method != "POST":
        return JsonResponse({'error': 'Invalid request'}, status=400)

    data = json.loads(request.body)
    code = data.get('code')
    # provider = data.get('provider')
    redirect_uri = f'{os.getenv('FRONTEND_URL')}/auth/'

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
    facebook_picture = profile_data.get(
        'picture', {}).get('data', {}).get('url')
    facebook_email = profile_data.get('email')
    facebook_name = profile_data.get('name')

    # Convert Facebook access token to Django token using drf_social_oauth2
    # convert_token_url = request.build_absolute_uri(
    #     '/auth/convert-token/')
    convert_token_url = "http://localhost:8000/api/auth/convert-token/"

    convert_payload = {
        'grant_type': 'convert_token',
        'client_id': os.getenv('OAUTH2_FACEBOOK_CLIENT_ID'),
        'client_secret': os.getenv('OAUTH2_FACEBOOK_CLIENT_SECRET'),
        'backend': 'facebook',
        'token': facebook_access_token,
    }

    token_response = requests.post(convert_token_url, data=convert_payload)
    token_data = token_response.json()

    if token_response.status_code != 200:
        return JsonResponse(token_data, status=token_response.status_code)

    # user = User.objects.filter(email=facebook_email).first()  # ✅ Get the first user safely
    # user = token_data.get('user')

    # if not user:
    #     return JsonResponse({'error': 'User not found after authentication'}, status=400)

    # # Save or update profile picture
    # profile, _ = UserProfile.objects.get_or_create(user=user)
    # if facebook_picture and profile.profile_picture != facebook_picture:
    #     profile.profile_picture = facebook_picture
    #     profile.save()

    # Inject Facebook profile data into the Django token response
    token_data = {
        "access_token": token_data.get('access_token'),
        "refresh_token": token_data.get('refresh_token'),
        "email": facebook_email,
        "name": facebook_name,
        "picture": facebook_picture,
    }

    return JsonResponse(token_data)
