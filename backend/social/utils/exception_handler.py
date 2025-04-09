from rest_framework.views import exception_handler
from oauthlib.oauth2.rfc6749.errors import OAuth2Error
from rest_framework.response import Response
from rest_framework import status

def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)

    # Handle expired or invalid tokens from OAuth2
    if isinstance(exc, OAuth2Error):
        return Response(
            {"detail": "Access token is invalid or has expired."},
            status=status.HTTP_401_UNAUTHORIZED
        )

    return response
