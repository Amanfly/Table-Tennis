from django.core.management.base import BaseCommand
from tournament.models import Tournament
from datetime import timedelta,datetime



class Command(BaseCommand):
    help="Display Current On Going Tournament"

    def add_arguments(self, parser) -> None:
        return super().add_arguments(parser)


    def handle(self,*args,**kwargs):
        today_tournament=Tournament.objects.filter(status=Tournament.ON_GOING_CHOICE).count()
        