from django.db.models.query_utils import Q
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from rest_framework import serializers
from auth.models import CustomUser
from auth.api.serializers import ProfileSerializer
from basics.utils import Util
from tournament.models import Match, Tournament,TournamentRequests
from django.conf import settings
import datetime



class TournamentAddSerializer(serializers.ModelSerializer):
    status=serializers.SerializerMethodField()
    class Meta:
        model=Tournament
        fields=('id','tournament_name','image','type','start_date','registration_end_date','max_score','status')
    
    def create(self,validated_data):
        return Tournament.objects.create(**validated_data)

    def update(self,instance,validated_data):
        request = self.context.get('request')
        instance.tournament_name=validated_data.get('tournament_name',instance.tournament_name)
        instance.image=validated_data.get('image',instance.image)
        instance.type=validated_data.get('type',instance.type)
        instance.start_date=validated_data.get('start_date',instance.start_date)
        instance.registration_end_date=validated_data.get('registration_end_date',instance.registration_end_date)
        instance.max_score=validated_data.get('max_score',instance.max_score)
        instance.updated_by=request.user
        instance.save()
        return instance

    
    def get_status(self,obj):
        today_date=datetime.date.today()
        if obj.winner1:
            obj.status=Tournament.PREVIOUS_CHOICE
        elif obj.start_date <= today_date:
            obj.status=Tournament.ON_GOING_CHOICE
        else:
            obj.status=Tournament.UPCOMING_CHOICE
        obj.save()
        return obj.status

class TournamentSerializer(serializers.ModelSerializer):
    status=serializers.SerializerMethodField()
    is_editable=serializers.SerializerMethodField()
    is_delete=serializers.SerializerMethodField()
    image=serializers.SerializerMethodField()
    no_of_rounds=serializers.SerializerMethodField()

    class Meta:
        model=Tournament
        fields=('id','tournament_name','image','type','start_date','registration_end_date','max_score','status','is_editable','is_delete','no_of_rounds')
    
    def get_status(self,obj):
        today_date=datetime.date.today()
        if obj.winner1:
            obj.status=Tournament.PREVIOUS_CHOICE
        if obj.start_date <= today_date:
            obj.status=Tournament.ON_GOING_CHOICE
        else:
            obj.status=Tournament.UPCOMING_CHOICE
        obj.save()
        return obj.status
    
    def get_is_editable(self,obj):
        request = self.context.get('request')
        if request.user==obj.created_by:
            return True
        return False
    
    def get_is_delete(self,obj):
        request = self.context.get('request')
        number_of_players=obj.players.count()
        if number_of_players==0 and request.user==obj.created_by:
            return True
        return False
    
    def get_image(self,obj):
        return Util.request_absolute_url(obj.image)
    
    def get_no_of_rounds(self,obj):
        return Match.objects.filter(tournament=obj).count()

  
class PlayerAddSerializer(serializers.ModelSerializer):

    class Meta:
        model=CustomUser
        fields=('name','image','email','gender','age')
    
    def create(self,validated_data):
        return CustomUser.objects.create(**validated_data)
    

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model=TournamentRequests
        fields=('user_id','tournament_id','status','updated_by')
        
    def update(self,instance,validate_data):
        instance.status=validate_data['status']
        instance.updated_by_id=instance.id
        instance.save()
        return instance

class TournamentListSerializer(serializers.ModelSerializer):
    image=serializers.SerializerMethodField()
    class Meta:
        model=Tournament
        fields=['id','tournament_name','image']
    
    def get_image(self,obj):
        return Util.request_absolute_url(obj.image)

class TournamentPlayerSerializer(serializers.ModelSerializer):
    tournament=serializers.SerializerMethodField()
    match_stats=serializers.SerializerMethodField()
    is_editable=serializers.SerializerMethodField()
    image=serializers.SerializerMethodField()

    class Meta:
        model=CustomUser
        fields=('name','image','email','gender','age','tournament','match_stats','is_editable')
    
    def get_tournament(self,obj):
        request = self.context.get('request')
        if Tournament.objects.filter(players__id=obj.id).exists():
            serializer=TournamentListSerializer(Tournament.objects.filter(players__id=obj.id),many=True,context={'request':request})
            return serializer.data
        return ""
    
    def get_match_stats(self,obj):
        match_played,match_won=0,0
        match=Match.objects.filter(Q(player_1=obj)|Q(player_2=obj),Q(winner__isnull=False))
        if match.exists():
            match_played=match.count()
            match_won=match.filter(winner=obj).count()
            return {'match_played':match_played,'match_won':match_won}
        return {'match_played':match_played,'match_won':match_won}
    
    def get_is_editable(self,obj):
        request = self.context.get('request')
        if request.user==obj:
            return True
        return False
    
    def get_image(self,obj):
        return Util.request_absolute_url(obj.image)

class MatchSerializer(serializers.ModelSerializer):
    player1=serializers.SerializerMethodField()
    player2=serializers.SerializerMethodField()
    class Meta:
        model=Match
        fields= ('id','tournament','match_at','player1','player2')
    def get_player1(self,obj):
        if obj.player_1:
            serializer=ProfileSerializer(obj.player_1)
            return serializer.data
        return f"Winner of {obj.match_1}"

    def get_player2(self,obj):
        if obj.player_2:
            serializer=ProfileSerializer(obj.player_2)
            return serializer.data
        return f"Winner of {obj.match_2}"
    

class NotificationListSerializer(serializers.ModelSerializer):
    description=serializers.SerializerMethodField()
    class Meta:
        model=TournamentRequests
        fields=['id','description']
    
    def get_description(self,obj):
        context={"obj":obj}
        if obj.status==TournamentRequests.PENDING_STATUS:
            message=render_to_string('notification/Pending.html',context)
        elif obj.status==TournamentRequests.STATUS_ACCEPTED:
            message=render_to_string('notification/Accept.html',context)
        else:
            message=render_to_string('notification/Decline.html',context)
        message=strip_tags(message)
        return message


class CreateDrawSerializer(serializers.ModelSerializer):
    is_added = serializers.SerializerMethodField()
    image=serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = ('id', 'name', 'image', 'is_added')

    def get_is_added(self, obj):
        pk = self.context.get('pk')
        if Tournament.objects.filter(id=pk,players=obj).exists():
            return True
        return False
    
    def get_image(self,obj):
        return Util.request_absolute_url(obj.image)
    
    