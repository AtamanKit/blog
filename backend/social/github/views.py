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

    if profile_response.status_code != 200:
        return JsonResponse(profile_data, status=profile_response.status_code)

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
        # github_email = next(
        #     (email["email"]
        #      for email in email_data if email.get("primary", False)), None
        # )

        # Ensure email_data is a valid JSON list before iterating
        if isinstance(email_data, str):
            try:
                email_data = json.loads(email_data)  # ✅ Convert string to list
            except json.JSONDecodeError:
                return JsonResponse({'error': 'Invalid email data format from GitHub'}, status=400)

        # Now process the list safely
        github_email = next(
            (email["email"]
             for email in email_data if isinstance(email, dict) and email.get("primary", False)), None
        )

        if not github_email:
            return JsonResponse({'error': 'No primary email found in GitHub response'}, status=400)

    # Convert GitHub access token to Django token using drf_social_oauth2
    # convert_token_url = request.build_absolute_uri("/auth/convert-token/")
    convert_token_url = "http://localhost:8000/api/auth/convert-token/"

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

    # user = User.objects.filter(email=github_email).first()  # ✅ Get the first user safely
    # user = token_data.get('user')

    # if not user:
    #     return JsonResponse({'error': 'User not found after authentication'}, status=400)

    # # ✅ Ensure user profile exists and update picture
    # profile, _ = UserProfile.objects.get_or_create(user=user)
    # if github_picture and profile.profile_picture != github_picture:
    #     profile.profile_picture = github_picture
    #     profile.save()

    # Inject GitHub profile data into the Django token response
    token_data = {
        "access_token": token_data.get("access_token"),
        "refresh_token": token_data.get("refresh_token"),
        "email": github_email,
        "name": github_name,
        "picture": github_picture,
    }

    return JsonResponse(token_data)
