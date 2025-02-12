from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import requests
import json
import os


@csrf_exempt
def exchange_facebook_token(request):
    """Handles Facebook OAuth token exchange."""
    if request.method != "POST":
        return JsonResponse({"error": "Invalid request"}, status=400)

    data = json.loads(request.body)
    fb_token = data.get("access_token")

    if not fb_token:
        return JsonResponse({"error": "Missing Facebook access token"}, status=400)

    payload = {
        "grant_type": "convert_token",
        "client_id": os.getenv("OAUTH2_CLIENT_ID"),
        "client_secret": os.getenv("OAUTH2_CLIENT_SECRET"),
        "backend": "facebook",
        "token": fb_token,
    }

    response = requests.post(
        "http://localhost:8000/auth/convert-token/", data=payload)
    return JsonResponse(response.json())


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
