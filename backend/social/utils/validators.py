from oauth2_provider.oauth2_validators import OAuth2Validator
from datetime import timedelta
from django.utils import timezone
from oauth2_provider.models import RefreshToken


class ExpiringRefreshTokenValidator(OAuth2Validator):
    def validate_refresh_token(self, refresh_token, client, request, *args, **kwargs):
        is_valid = super().validate_refresh_token(
            refresh_token, client, request, *args, **kwargs)

        if not is_valid:
            return False

        try:
            token_obj = RefreshToken.objects.get(token=refresh_token)
            expiration_time = token_obj.created + \
                timedelta(seconds=20)  # use your setting
            if timezone.now() > expiration_time:
                return False
        except RefreshToken.DoesNotExist:
            return False

        return True
