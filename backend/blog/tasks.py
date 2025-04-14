from celery import shared_task
from oauth2_provider.models import AccessToken, RefreshToken
from django.utils.timezone import now

@shared_task
def delete_expired_tokens():
    AccessToken.objects.filter(expires__lt=now()).delete()
    RefreshToken.objects.filter(access_token__isnull=True).delete()
