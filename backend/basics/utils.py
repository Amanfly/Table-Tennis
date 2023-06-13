import datetime
import math

from django.conf import settings
from tournament.models import Match, Scores, Tournament
from auth.models import CustomUser
from django.core.mail import EmailMessage
import threading
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.db.models import Q


class EmailThread(threading.Thread):

    def __init__(self, email):
        self.email = email
        threading.Thread.__init__(self)

    def run(self):
        self.email.send()


class Util:
    @staticmethod
    def send_email(data):
        email = EmailMessage(
            subject=data['email_subject'], body=data['email_body'], to=[data['to_email']])
        EmailThread(email).start()

    @staticmethod
    def html_render(html_message, context, email, subject):
        html_message = render_to_string('auth/verify-email.html', context)
        plain_message = strip_tags(html_message)
        data = {'email_body': plain_message, 'to_email': email,
                'email_subject': subject
                }
        return data

    def request_absolute_url(url):
        return settings.BASE_IMAGE_URL + str(url)


class Draws:

    def player_details(player_id):
        obj = CustomUser.objects.get(id=player_id)
        return {
            'id': obj.id,
            'name': obj.name,
            'image': Util.request_absolute_url(obj.image)
        }

    def power_calculated(no_of_teams):
        p = int(math.log(no_of_teams, 2))
        power = int(pow(2, p))
        return power

    def winner(tournament_id, temp, match_id):
        last_match = Match.objects.filter(tournament_id=tournament_id).last()
        if match_id == last_match.id:
            tournament = Tournament.objects.get(id=tournament_id)
            tournament.winner1_id = temp
            tournament.save()
            return "Compeleted"

        var = Match.objects.get(Q(match_1=match_id) | Q(match_2=match_id))
        if var.match_1_id == int(match_id):
            var.player_1_id = temp
        else:
            var.player_2_id = temp
        var.save()

    def match_creation(tournament_id):

        tournament = Tournament.objects.get(id=tournament_id)
        start_date = tournament.start_date
        teams_ids = list(tournament.players.values_list('id', flat=True))
        no_of_teams = len(teams_ids)

        low_power = Draws.power_calculated(no_of_teams)
        power = low_power

        bye = 2 * low_power - no_of_teams
        left = no_of_teams - bye
        game, round, data = 1, 1, {}

        if left:
            low_power = left
        else:
            bye = 0
            power = power // 2

        byes_players = teams_ids[left:]

        if not Match.objects.filter(tournament_id=tournament_id).exists():
            j, t = 0, 1
            for i in range(low_power // 2):
                Match.objects.create(player_1_id=teams_ids[j], player_2_id=teams_ids[t], tournament_id=tournament_id,
                                     rounds=round, match_at=start_date)
                data["game" + str(game)] = [Draws.player_details(teams_ids[j]), Draws.player_details(teams_ids[t])]
                j += 2
                t += 2
                game += 1
            round += 1

            var = Match.objects.filter(tournament_id=tournament_id).first()
            var_game = var.id

            while power // 2 >= 1:
                start_date = start_date + datetime.timedelta(days=round)
                for i in range(power // 2):
                    if bye > 0:
                        player_2, match1, match2 = None, None, None
                        player_1 = byes_players.pop()
                        if bye % 2 == 0:
                            player_2 = byes_players.pop()
                            bye -= 2
                            data["game" + str(game)] = [Draws.player_details(player_1), Draws.player_details(player_2)]

                        else:
                            match2 = var_game
                            bye -= 1
                            data["game" +
                                 str(game)] = [Draws.player_details(player_1), var_game]
                            var_game += 1

                        Match.objects.create(tournament_id=tournament_id, player_1_id=player_1, player_2_id=player_2,
                                             match_1_id=match1, match_2_id=match2, rounds=round, match_at=start_date)
                    else:
                        Match.objects.create(tournament_id=tournament_id, match_1_id=var_game, match_2_id=var_game + 1,
                                             rounds=round, match_at=start_date)
                        data["game" + str(game)] = [var_game, var_game + 1]
                        var_game += 2
                    game += 1
                power = power // 2
                round += 1

            var.tournament.end_date = start_date
            var.save()
            data['no_of_rounds'] = Match.objects.filter(tournament_id=tournament_id)
        else:
            data = "Already Exists"
        return data

    def score(tournament_id, match_id, score1, score2, set_id, set_winner, winner):
        if not Scores.objects.filter(match_id=match_id, set_no=set_id).exists():
            Scores.objects.create(
                match_id=match_id, set_no=set_id, score1=score1, score2=score2)
        score_get = Scores.objects.get(match_id=match_id, set_no=set_id)
        score_get.score1 = score1
        score_get.score2 = score2
        if set_winner:
            score_get.winner_id = set_winner
        score_get.save()
        match = Match.objects.get(id=match_id)
        if winner:
            match.winner_id = winner
            temp = match.winner_id
            match.save()
            Draws.winner(tournament_id, temp, match_id)
