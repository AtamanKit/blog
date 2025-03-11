from django.contrib.auth.models import User
from blog.models import UserProfile  # Import custom profile model


def save_profile_picture(backend, user, response, *args, **kwargs):
    """
    Ensures the user has a profile and saves the profile picture.
    """

    try:
        # ✅ Ensure UserProfile exists before modifying it
        profile, created = UserProfile.objects.get_or_create(user=user)

        # Extract profile image from third-party provider
        if backend.name == "google-oauth2":
            picture_url = response.get("picture")
        elif backend.name == "facebook":
            picture_url = response.get(
                "picture", {}).get("data", {}).get("url")
        elif backend.name == "github":
            picture_url = response.get("avatar_url")
        else:
            picture_url = None

        # ✅ Only update if a picture exists
        if picture_url:
            profile.profile_picture = picture_url
            profile.save()
            print(
                f"✅ Profile updated: {user.username} - {profile.profile_picture}")

    except Exception as e:
        import traceback
        print("Error in save_profile_picture:", traceback.format_exc())

