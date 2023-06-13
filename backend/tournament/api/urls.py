
from django.urls import path
from rest_framework import views

from .views import AdminFilterView, GivingBye,NotificationListView, PlayerDrawsView, PlayerListView, PlayerView, ScoreView, TouranmentView,TournamentCloneView, TournamentDrawsView, TournamentGetView, TournamentPlayerRegisterView,PlayerRequestView,NotificationView,TournamentPlayer

urlpatterns=[
    path('tournament/',TouranmentView.as_view(),name='tournament-creation'),
    path('tournament/<int:pk>/',TournamentGetView.as_view(),name='tournament-update'),
    
    path('player-register/',TournamentPlayerRegisterView.as_view(),name='tournament-player'),

    path('tournament-player/',TournamentPlayer.as_view(),name='tournament-player'),
    path('tournament-player/<int:pk>/',PlayerView.as_view(),name='player-view'),
    path('tournament/player-search/<int:pk>/',PlayerListView.as_view(),name ='player-search'),

    path('tournament-request/',PlayerRequestView.as_view(),name='tournament-request'),
    path('tournament-notification/<int:pk>/',NotificationView.as_view(),name='tournament-notification'),
    path('notification/',NotificationListView.as_view(),name='tournament-notification-list'),
    
    path('tournament-clone/',TournamentCloneView.as_view(),name='tournament-clone'),
    
    path('tournament/draws/',TournamentDrawsView.as_view(),name='tournament-draw'),
    path('tournament_match/<int:round>/<int:tournament_id>',TournamentDrawsView.as_view(),name='tournament-match'),
    path('tournament/draws/<int:pk>',PlayerDrawsView.as_view(),name='tournament-draw-player'),
    
    path('scoring/',ScoreView.as_view(),name='scoring'),
    path('give-bye/',GivingBye.as_view(),name='give-bye'),

    path('tournament/reports/',AdminFilterView.as_view(template_name="admin/tournament/base.html"),name='custom_view'),
]