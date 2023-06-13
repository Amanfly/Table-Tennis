from django.contrib import admin
from django.utils.html import format_html
from basics.utils import Util
from .models import Match, Scores, Tournament, TournamentRequests,VEIW_ONLY_CREATED_TOURNAMENT,VIEW_ONLY_MATCH,VEIW_ONLY_REQUEST_TO
from import_export import resources
from import_export.admin import ImportExportModelAdmin
from django.contrib.auth.models import Permission



class Matchform(admin.TabularInline):
    model = Match
    fields = ('player_1', 'player_2', 'match_at')
    
    def get_formset(self, request, obj=None, **kwargs):
        formset = super(Matchform, self).get_formset(request, obj, **kwargs)
        form = formset.form
        widget = form.base_fields['player_1'].widget
        widget.can_add_related = False
        widget.can_change_related = False
        widget.can_delete_related=False
        widget1 = form.base_fields['player_2'].widget
        widget1.can_add_related = False
        widget1.can_change_related = False
        widget1.can_delete_related=False
        return formset

class Playerform(admin.TabularInline):
    model = Tournament.players.through
    verbose_name_plural = 'Players'
    
    def get_formset(self, request, obj=None, **kwargs):
        formset = super(Playerform, self).get_formset(request, obj, **kwargs)
        form = formset.form
        widget = form.base_fields['user'].widget
        widget.can_add_related = False
        widget.can_change_related = False
        widget.can_delete_related=False
        return formset


@admin.register(Tournament)
class TournamentAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    
    fil=Tournament.objects.filter(created_by__isnull=False)

    def custom_titled_filter(title):
        class Wrapper(admin.FieldListFilter):
            def __new__(cls, *args, **kwargs):
                instance = admin.FieldListFilter.create(*args, **kwargs)
                instance.title = title
                return instance
        return Wrapper
    

    def type_color(self, obj):
        if obj.type == 'private':
            return format_html('<span class="badge badge-light">Private</span>')
        if obj.type == 'public':
            return format_html('<span class="badge badge-dark">Public</span>')
    
    def tournament_logo(self,obj):
        return format_html(f'<img src={Util.request_absolute_url(obj.image)} width=200px,height=200px/>')  # style 
    

    empty_value_display = '-'
    inlines = (Playerform, Matchform)
    list_display = ('tournament_name', 'type_color', 'start_date','status','registration_end_date','winner','end_date')
    list_filter = ('start_date','tournament_name', 'type', 'registration_end_date', ('players__name',
                   custom_titled_filter('Players')), ('winner1__name', custom_titled_filter('Winners')))
    fields = ('tournament_logo','image', 'tournament_name', 'type', 'start_date','end_date','registration_end_date', 'winner1', 'created_by', 'updated_by')
    readonly_fields = ('tournament_logo','end_date','created_by' ,'updated_by')
    search_fields = ('tournament_name', 'players__name')
    ordering = ('tournament_name',)
    
    def winner(self, obj):
        if obj.winner1:
            return obj.winner1
        return None    
    
    def formfield_for_dbfield(self, *args, **kwargs):
        formfield = super().formfield_for_dbfield(*args, **kwargs)
        formfield.widget.can_delete_related = False
        formfield.widget.can_change_related = False
        formfield.widget.can_add_related = False  
        return formfield
    
    def get_queryset(self, request):
        qs = super(TournamentAdmin, self).get_queryset(request)
        user=request.user
        if user.is_superuser:
            return qs
        user_permission=Permission.objects.filter(group__user=user,codename=VEIW_ONLY_CREATED_TOURNAMENT)
        if user_permission.exists():
            return qs.filter(created_by=request.user)
        return qs


   

@admin.register(Match)
class MatchAdmin(admin.ModelAdmin):
    list_display = ('player_1', 'player_2', 'tournament','rounds', 'won', 'set_played')
    list_filter = ('player_1', 'player_2', 'tournament', 'rounds',)
    fields = ('player_1', 'player_2', 'tournament', 'rounds', 'winner')
    search_fields = ('tournament', 'player_1', 'player_2', 'winner')
    ordering = ('tournament',)

    def won(self, obj):
        if obj.winner:
            return format_html(f'<span class="badge badge-success">{obj.winner}</span>')

    def set_played(self, obj):
        count = Scores.objects.filter(winner=obj.winner).count()
        return count

    def get_queryset(self, request):
        user=request.user
        if user.is_superuser:
            return Match.objects.all()
        user_permission=Permission.objects.filter(group__user=user,codename=VIEW_ONLY_MATCH)
        if user_permission.exists():
            return Match.objects.filter(tournament__created_by=user)

        return Match.objects.none()



@admin.register(TournamentRequests)  
class TournamentRequestAdmin(admin.ModelAdmin):
    list_display = ('user', 'status', 'tournament', 'updated_by')
    list_filter = ('user', 'status', 'tournament', 'updated_by')

    def get_queryset(self, request):
        user=request.user
        if user.is_superuser:
            return TournamentRequests.objects.all()
        user_permission=Permission.objects.filter(group__user=user,codename=VEIW_ONLY_REQUEST_TO)
        if user_permission.exists():
            return TournamentRequests.objects.filter(tournament__created_by=user)

        return TournamentRequests.objects.none()
