from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import requests
import json
import os
from dotenv import load_dotenv

load_dotenv('.env.dev')


@csrf_exempt
def exchange_github_token(request):
    """Handles GitHub OAuth token exchange."""
    if request.method != "POST":
        return JsonResponse({"error": "Invalid request"}, status=400)

    data = json.loads(request.body)
    code = data.get("code")
    redirect_uri = f'{os.getenv("FRONTEND_URL")}/auth/'

    if not code:
        return JsonResponse({"error": "Missing GitHub access code"}, status=400)

    # Exchange the GitHub auth code for an access token
    github_token_url = "https://github.com/login/oauth/access_token"

    payload = {
        "client_id": os.getenv("SOCIAL_AUTH_GITHUB_KEY"),
        "client_secret": os.getenv("SOCIAL_AUTH_GITHUB_SECRET"),
        "redirect_uri": redirect_uri,
        "code": code,
    }

    headers = {"Accept": "application/json"}
    response = requests.post(github_token_url, data=payload, headers=headers)
    github_data = response.json()

    if response.status_code != 200:
        return JsonResponse(github_data, status=response.status_code)

    github_access_token = github_data.get("access_token")

    if not github_access_token:
        return JsonResponse({"error": "Invalid GitHub access token"}, status=400)

    # Fetch user profile data from GitHub
    github_profile_url = "https://api.github.com/user"
    profile_headers = {"Authorization": f"Bearer {github_access_token}"}

    profile_response = requests.get(
        github_profile_url, headers=profile_headers)
    profile_data = profile_response.json()

    # Extract user details
    github_picture = profile_data.get("avatar_url")
    # GitHub email may be None if private
    github_email = profile_data.get("email")
    github_name = profile_data.get("name")

    if not github_email:
        # Fetch primary email (GitHub sometimes hides emails in profile data)
        github_emails_url = "https://api.github.com/user/emails"
        email_response = requests.get(
            github_emails_url, headers=profile_headers)
        email_data = email_response.json()

        # Get the primary email
        github_email = next(
            (email["email"]
             for email in email_data if email.get("primary", False)), None
        )

    # Convert GitHub access token to Django token using drf_social_oauth2
    convert_token_url = request.build_absolute_uri("/auth/convert-token/")

    convert_payload = {
        "grant_type": "convert_token",
        "client_id": os.getenv("OAUTH2_GITHUB_CLIENT_ID"),
        "client_secret": os.getenv("OAUTH2_GITHUB_CLIENT_SECRET"),
        "backend": "github",
        "token": github_access_token,
    }

    token_response = requests.post(convert_token_url, data=convert_payload)
    token_data = token_response.json()

    if token_response.status_code != 200:
        return JsonResponse(token_data, status=token_response.status_code)

    # Inject GitHub profile data into the Django token response
    token_data = {
        "access_token": token_data.get("access_token"),
        "email": github_email,
        "name": github_name,
        "picture": github_picture,
    }

    return JsonResponse(token_data)
