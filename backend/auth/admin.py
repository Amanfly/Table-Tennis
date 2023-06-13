from django.contrib import admin
from django.contrib.auth import get_user_model
from django.utils.html import format_html
from django.urls import reverse
from django.utils.http import urlencode
from basics.utils import Util
from tournament.models import Tournament

User = get_user_model()

data = {}


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    data['result'] = Tournament.objects.all()
    data['players'], data['winner1'], data['created_by'], data['tournament'] = [], [], [], []
    for i in data['result']:
        data['tournament'].append(i.tournament_name)
        data['players'].append(list(i.players.all()))
        data['winner1'].append(i.winner1)
        data['created_by'].append(i.created_by)

    def __init__(self, model, admin_site):
        super().__init__(model, admin_site)

    readonly_fields = ('profile_image',)
    list_display = (
    'email', 'is_staff', 'is_active', 'is_player', 'is_admin', 'is_verified', 'tournament_played', 'tournament_won',
    'tournament_admin')
    list_filter = ('email', 'is_staff', 'is_active', 'is_player', 'is_admin', 'is_verified')
    fieldsets = (
        (None, {'fields': ('profile_image', 'image', 'name', 'email',)}),
        ('Permissions', {'fields': ('is_staff', 'is_active', 'is_player', 'is_admin', 'is_verified',)}),
    )
    search_fields = ('email', 'name')
    ordering = ('email',)

    def profile_image(self, obj):
        return format_html(f'<img src={Util.request_absolute_url(obj.image)} width=200px,height=200px/>')  # style

    def tournament_played(self, obj):
        no_of_played = 0
        for i in data['players']:
            if obj in i:
                no_of_played += 1
        if not no_of_played:
            return None
        url = reverse('admin:tournament_tournament_changelist') + '?' + urlencode({"players__name": f"{obj.name}"})
        return format_html('<a href={}>{}</a>', url, no_of_played)

    def tournament_won(self, obj):
        count = 1
        tournament_won = []
        for i in data['winner1']:
            if i == obj:
                tournament_won.append(data['tournament'][count - 1])
            count += 1
        # tournament_won=Tournament.objects.filter(winner1=obj).values_list('tournament_name',flat=True)
        if not tournament_won:
            return None
        url = reverse('admin:tournament_tournament_changelist') + '?' + urlencode({"winner1__name": f"{obj.name}"})
        return format_html('<a href={}>{} Won</a>', url, *list(tournament_won))

    def tournament_admin(self, obj):
        count = 1
        tournament = []
        for i in data['created_by']:
            if i == obj:
                tournament.append(data['tournament'][count - 1])
            count += 1
        # tournament=Tournament.objects.filter(created_by=obj).values_list('tournament_name',flat=True)
        # tournament_list=list(tournament)
        if tournament:
            return tournament[:2]
        return None
