from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db.models.deletion import CASCADE
from auth.models import CustomUser
from basics.models import BaseModelCompleteUserTimestamps, BaseModelTimestamps
from django.conf import settings


def tournament_logo_path(instance, filename):
    return 'logo/{0}/{1}'.format(instance.tournament_name.replace(' ', ''), filename)


VEIW_ONLY_CREATED_TOURNAMENT = 'view_only_created_tournament'
VEIW_ONLY_REQUEST_TO = 'view_only_requested_to'
VIEW_ONLY_MATCH = 'view_only_match'


class Tournament(BaseModelCompleteUserTimestamps):
    PUBLIC_CHOICE = 'public'
    PRIVATE_CHOICE = 'private'
    ON_GOING_CHOICE = 'on_going'
    PREVIOUS_CHOICE = 'previous'
    UPCOMING_CHOICE = 'upcoming'

    STATUS_CHOICES = (
        (ON_GOING_CHOICE, 'On Going'),
        (PREVIOUS_CHOICE, 'Previous'),
        (UPCOMING_CHOICE, 'Upcoming')
    )

    TYPE_CHOICES = (
        (PUBLIC_CHOICE, 'Public'),
        (PRIVATE_CHOICE, 'Private')
    )
    tournament_name = models.CharField(max_length=50, verbose_name="Tournament Name")
    image = models.ImageField(upload_to=tournament_logo_path, default='logo/default.jpeg', verbose_name="Image")
    type = models.CharField(max_length=8, choices=TYPE_CHOICES, verbose_name="Tournament Type")
    start_date = models.DateField(null=True, verbose_name="Start Date")
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, verbose_name='STATUS', default=UPCOMING_CHOICE)
    registration_end_date = models.DateField(null=True, verbose_name="Registration End Date")
    max_score = models.IntegerField(validators=[MinValueValidator(8), MaxValueValidator(30)], default=8,
                                    verbose_name="Max Score")

    players = models.ManyToManyField(CustomUser, through='TournamentUserMapping')

    end_date = models.DateField(null=True, verbose_name="End Date")
    winner1 = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="Winner1", null=True, blank=True)

    class Meta:
        db_table = "tournament_tournament"
        verbose_name = "Tournament"
        verbose_name_plural = "Tournament"
        permissions = (
            (VEIW_ONLY_CREATED_TOURNAMENT, 'Can View Only Created Tournament'),
        )

    def __str__(self):
        return self.tournament_name


class TournamentRequests(BaseModelCompleteUserTimestamps):
    PENDING_STATUS = -1
    STATUS_ACCEPTED = 1
    STATUS_DECLINE = 0
    STATUS_CHOICES = (
        (STATUS_ACCEPTED, 'Accept'),
        (STATUS_DECLINE, 'Decline')
    )

    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    tournament = models.ForeignKey(Tournament, on_delete=models.CASCADE)
    status = models.IntegerField(choices=STATUS_CHOICES, default=PENDING_STATUS)

    objects = models.Manager()

    class Meta:
        db_table = 'tournament_tournament_requests'
        verbose_name = 'Tournament Request'
        permissions = (
            (VEIW_ONLY_REQUEST_TO, 'Can View Only Requested To'),
        )

    def __str__(self):
        return self.user.name


class TournamentUserMapping(BaseModelTimestamps):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, verbose_name="Players")
    tour = models.ForeignKey(Tournament, on_delete=models.CASCADE)

    class Meta:
        db_table = 'tournament_tournament_user_mapping'

    def __str__(self):
        return self.user.name


class Match(models.Model):
    player_1 = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="player_A", verbose_name="Player 1",
                                 blank=True, null=True)
    player_2 = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="player_B", verbose_name="Player 2",
                                 blank=True, null=True)
    tournament = models.ForeignKey(Tournament, on_delete=models.CASCADE, related_name="tournamemt",
                                   verbose_name="Tournament")

    rounds = models.IntegerField(default=0, verbose_name="Rounds")

    match_at = models.DateTimeField(null=True)
    winner = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="winner", blank=True, null=True)

    match_1 = models.ForeignKey("Match", null=True, blank=True, on_delete=models.CASCADE, related_name="Match_1")
    match_2 = models.ForeignKey("Match", null=True, blank=True, on_delete=models.CASCADE, related_name="Match_2")

    class Meta:
        db_table = 'match_data'
        verbose_name = 'Matche'
        permissions = (
            (VIEW_ONLY_MATCH, 'Can View Only Match'),
        )

    def __str__(self):
        return self.tournament.tournament_name + ' Game' + str(self.id)


class Scores(models.Model):
    match = models.ForeignKey(Match, on_delete=models.CASCADE, related_name="Match", verbose_name="Match")
    set_no = models.IntegerField(default=0)
    score1 = models.IntegerField(default=0)
    score2 = models.IntegerField(default=0)
    winner = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="SetWinner", null=True, blank=True)

    class Meta:
        verbose_name = "Score"
        verbose_name_plural = "Score"
