from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import requests
import json
import os
from dotenv import load_dotenv


load_dotenv('.env.dev')

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

    if response.status_code != 200:
        return JsonResponse(response.json(), status=response.status_code)

    facebook_data = response.json()
    facebook_access_token = facebook_data.get('access_token')

    if not facebook_access_token:
        return JsonResponse({'error': 'Invalid Facebook access token'}, status=400)


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

    print("Payload:", convert_payload)
    print("Headers:", token_response.request.headers)
    print("Response text:", token_response.text)

    if token_response.status_code != 200:
        return JsonResponse(token_response.json(), status=token_response.status_code)

    return JsonResponse(token_response.json())

# @csrf_exempt
# def exchange_google_token(request):
#     """Handles Google OAuth token exchange."""
#     if request.method != "POST":
#         return JsonResponse({"error": "Invalid request"}, status=400)

#     data = json.loads(request.body)
#     google_token = data.get("access_token")

#     if not google_token:
#         return JsonResponse({"error": "Missing Google access token"}, status=400)

#     payload = {
#         "grant_type": "convert_token",
#         "client_id": os.getenv("OAUTH2_CLIENT_ID"),
#         "client_secret": os.getenv("OAUTH2_CLIENT_SECRET"),
#         "backend": "google-oauth2",
#         "token": google_token,
#     }

#     response = requests.post(
#         "http://localhost:8000/auth/convert-token/", data=payload)
#     return JsonResponse(response.json())


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
