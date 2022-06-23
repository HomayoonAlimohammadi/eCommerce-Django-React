from django.db.models.signals import pre_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model


User = get_user_model()


@receiver(pre_save, sender=User)
def sync_username(sender, instance, *args, **kwargs):
    if instance.email:
        instance.username = instance.email
    print("Synced user email and username")
