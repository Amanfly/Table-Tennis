
from django.conf import settings
from django.views.generic.base import TemplateView
from rest_framework import permissions
from auth.models import CustomUser
from auth.api.serializers import ProfileSerializer
from tournament.forms import TournamentForm
from tournament.models import Tournament,TournamentRequests,Match
from basics.api.views import BaseAPIView
from .serializers import CreateDrawSerializer, MatchSerializer, NotificationListSerializer, NotificationSerializer, PlayerAddSerializer,TournamentPlayerSerializer,TournamentSerializer,TournamentAddSerializer
from rest_framework import generics, serializers, status, views
from rest_framework.permissions import IsAuthenticated
from basics.permissions import TournamentAdmin
from basics.utils import Draws, Util
from django.db.models import Q


class TouranmentView(BaseAPIView):
    serializer_class = TournamentSerializer
    permission_classes=[TournamentAdmin]
    
    def post(self, request):
        try:
            serializer = TournamentAddSerializer(data=request.data,partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save(created_by=request.user)
            return self.success_response(data=serializer.data, message='Tournament Successfull Created', status_code=status.HTTP_200_OK)
        except Exception as e:
            return self.failure_response(exception_message=str(e),status_code=status.HTTP_200_OK)
    

    def get(self, request):                      
        user=request.user
        tournament=Tournament.objects.filter(type=Tournament.PUBLIC_CHOICE) 
        if user.id:
            if user.is_admin:
                tournament=Tournament.objects.filter(Q(players__id=user.id) |Q(type=Tournament.PUBLIC_CHOICE) | Q(created_by=user.id))
            else:
                tournament=Tournament.objects.filter(Q(players=user.id) |Q(type=Tournament.PUBLIC_CHOICE))
        tournament=tournament.distinct().order_by('start_date')
        page = self.paginate_queryset(tournament)
        if page is not None:
            serializer = self.serializer_class(page, many=True,context={"request":request})
            return self.get_paginated_response(serializer.data)
        serializer = self.serializer_class(tournament, many=True)
        return self.success_response(data=serializer.data,status_code=status.HTTP_200_OK)


    

class TournamentGetView(BaseAPIView):

    def get(self,request,pk):
        try:
            obj=Tournament.objects.get(id=pk)
            serializer=TournamentSerializer(obj,context={'request':request})
            return self.success_response(serializer.data,message='',status_code=status.HTTP_200_OK)
        except Tournament.DoesNotExist:
            return self.failure_response(exception_message="Tournament Does not Exit",status_code=status.HTTP_200_OK)
        except Exception as e:
            return self.failure_response(exception_message=str(e),status_code=status.HTTP_200_OK)
    

    def delete(self, request,pk):
        try:
            obj=Tournament.objects.get(id=pk)
            if request.user==obj.created_by_id:
                obj.delete()
                obj.save()
                return self.success_response(message='tournament deleted',status_code=status.HTTP_200_OK,)
            return self.failure_response(exception_message="Does not have permission",status_code=status.HTTP_200_OK)
        except Tournament.DoesNotExist as e:
            return self.failure_response(exception_message="Does not Exist",status_code=status.HTTP_200_OK)
        except Exception as e:
            return self.failure_response(exception_message=str(e),status_code=status.HTTP_200_OK)
    
    def post(self, request,pk):
        try:
            obj=Tournament.objects.get(id=pk)
            if request.user.id==obj.created_by_id:
                serializer = TournamentAddSerializer(obj,data=request.data,partial=True,context={'request':request})
                serializer.is_valid(raise_exception=True)
                serializer.save()
                return self.success_response(data='',message='Tournament Successfully Updated',status_code=status.HTTP_200_OK)
            return self.failure_response(exception_message="Does not have permission",status_code=status.HTTP_200_OK)  
        except Tournament.DoesNotExist as e:
            return self.failure_response(exception_message="Does not Exist",status_code=status.HTTP_200_OK)
        except Exception as e:
            return self.failure_response(exception_message=str(e),status_code=status.HTTP_200_OK)


class TournamentPlayerRegisterView(BaseAPIView):
    serializer_class=PlayerAddSerializer
    permission_classes=[TournamentAdmin]
    def post(self,request):
        try:
            serializer = self.serializer_class(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            user_data=serializer.data
            user=CustomUser.objects.get(email=user_data['email'])
            absurl = settings.FORGOTPASSWORD_URL+str(user.token)+'/'
            user.is_player=True
            user.is_verified=True
            user.save()
            context={
                "absurl":absurl,
            }
            data=Util.html_render('auth/reset-password.html',context,user.email,"Reset Your Password")
            Util.send_email(data)
            return self.success_response(data='Tournament Player Successfully Added. Activation email sent to player email address.',status_code=status.HTTP_201_CREATED)
        except Exception as e:
            return self.failure_response(exception_message=str(e),status_code=status.HTTP_200_OK)
   

# Player View GeT
class PlayerView(BaseAPIView):
    serializer_class=TournamentPlayerSerializer
    permission_classes=[IsAuthenticated]
    
    def get(self,request,pk):
        try:
            obj=CustomUser.objects.get(id=pk)
            serializer=self.serializer_class(obj,context={"request":request})
            return self.success_response(serializer.data,status_code=status.HTTP_200_OK)
        except CustomUser.DoesNotExist as e:
            return self.failure_response(exception_message="Player Does not Exit",status_code=status.HTTP_200_OK)
        except Exception as e:
            return self.failure_response(exception_message=str(e),status_code=status.HTTP_200_OK)




# Player Search
class PlayerListView(BaseAPIView):
    serializer_class=CreateDrawSerializer
    permission_classes=[IsAuthenticated]

    def get(self, request,pk):
        try:
            search_term=request.data['search_term']
            obj=Tournament.objects.get(id=pk)
            if search_term:
                player=obj.players.filter(Q(name__contains=search_term)|Q(email__contains=search_term))
            else:
                player=obj.players.all()
                
            page = self.paginate_queryset(player)
            if page is not None:
                serializer = self.serializer_class(page, many=True,context={"request":request,'pk':pk})
                return self.get_paginated_response(serializer.data)
            serializer = self.serializer_class(obj, many=True)
            return self.success_response(data=serializer.data,status_code=status.HTTP_200_OK)
        except Exception as e:
            return self.failure_response(exception_message=str(e),status_code=status.HTTP_200_OK)



class PlayerRequestView(BaseAPIView):
    permission_classes=[IsAuthenticated]
    def post(self,request):
        try:
            id=request.data['tournament']
            tournament=Tournament.objects.get(id=id)
            TournamentRequests.objects.create(user=request.user,tournament=tournament,created_by=request.user)
            context="You have successfully requested for {0} Tournament. Please wait for confirmation.".format(tournament)
            return self.success_response(data='',message=context)
        except Exception as e:
            return self.failure_response(exception_message=str(e),status_code=status.HTTP_200_OK)
    

class NotificationView(BaseAPIView):
    serializer_class=NotificationSerializer
    permission_classes=[TournamentAdmin]
    
    def put(self,request,pk):
        try:
            request_no=TournamentRequests.objects.get(id=pk)
            serializer=self.serializer_class(request_no,data=request.data,partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            context="Sorry ...."
            if request.data['status']=="1":
                obj=Tournament.objects.get(id=request_no.tournament_id)
                obj.players.add(request_no.user)
                context="Player added to {0} Tournament".format(obj.tournament_name)      
            return self.success_response(data='',message=context)
        
        except Exception as e:
            return self.failure_response(exception_message=str(e),status_code=status.HTTP_200_OK)


    def get(self,request,pk):
        obj=TournamentRequests.objects.get(id=pk)
        serializer=NotificationListSerializer(obj)
        return self.success_response(serializer.data,status_code=status.HTTP_200_OK)
 
    


class NotificationListView(BaseAPIView): 
    serializer_class=NotificationListSerializer
    permission_classes=[IsAuthenticated]

    def get(self,request):
        user=request.user

        if user.is_admin and user.is_player:
            obj=TournamentRequests.objects.filter(Q(status=TournamentRequests.PENDING_STATUS,tournament__created_by=user.id)|Q(created_by=user.id)).order_by('-id')
        elif user.is_admin:
            obj=TournamentRequests.objects.filter(status=TournamentRequests.PENDING_STATUS,tournament__created_by=user.id).order_by('-id')
        else:
            obj=TournamentRequests.objects.filter(status=TournamentRequests.PENDING_STATUS,created_by=user.id).order_by('-id')

        page = self.paginate_queryset(obj)
        
        if page is not None:
            serializer = self.serializer_class(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.serializer_class(obj, many=True)
        return self.success_response(data=serializer.data)


class TournamentCloneView(BaseAPIView):

    queryset=Tournament.objects.all()
    permission_classes=[TournamentAdmin]
    def post(self,request):
        try:
            id=request.data['tournament_id']
            obj=self.queryset.get(id=id)
            obj1=Tournament.objects.create(tournament_name=obj.tournament_name,type=obj.type,registration_end_date=obj.registration_end_date,start_date=obj.start_date,max_score=obj.max_score,created_by=request.user)
            q=list(obj.players.values_list('id',flat=True))
            obj1.players.add(*q)
            obj1.save()
            return self.success_response(data='',message='tournament clone successfully',status_code=status.HTTP_200_OK,)
        except Exception as e:
            return self.failure_response(exception_message=str(e),status_code=status.HTTP_200_OK)


class TournamentPlayer(BaseAPIView):
    permission_classes=[TournamentAdmin]

    def post(self,request):
        try:             
            id=request.data['tournament_id']
            player_id=request.data['player_id']
            obj=Tournament.objects.get(id=id)
            obj.players.add(int(player_id))
            obj.save()
            return self.success_response(data='',message=f"Player added succesfully in {obj.tournament_name}")
        except Exception as e:
            return self.failure_response(str(e),status_code=status.HTTP_200_OK)

    def delete(self,request):
        try:                       # player Delete
            tournament_id=request.data['tournament_id']
            player_id=request.data['player_id']
            obj=Tournament.objects.get(id=tournament_id)
            obj.players.remove(player_id)
            obj.save()
            return self.success_response(data='',message=f"Player delete succesfully in {obj.tournament_name}")
        except Exception as e:
            return self.failure_response(str(e),status_code=status.HTTP_200_OK)
    
    def get(self,request):
        try:                                        # Player GET 
            obj=CustomUser.objects.filter(is_player=True,is_verified=True)
            page = self.paginate_queryset(obj)
            if page is not None:
                serializer = ProfileSerializer(page, many=True,context={"request":request})
                return self.get_paginated_response(serializer.data)
            serializer = ProfileSerializer(obj, many=True,context={"request":request})
            return self.success_response(data=serializer.data,status_code=status.HTTP_200_OK)
        
        except Exception as e:
            return self.failure_response(e,status_code=status.HTTP_200_OK)


class TournamentDrawsView(BaseAPIView):
    permission_classes=[IsAuthenticated]
    def post(self,request):                                       
        tournament_id=request.data['tournament_id']
        data=Draws.match_creation(tournament_id)
        
        return self.success_response(data,status_code=status.HTTP_200_OK)
    
    def get(self,request,round,tournament_id): 
        try:     
            data=Match.objects.filter(rounds=round,tournament_id=tournament_id)
            serializer=MatchSerializer(data,many=True)
            return self.success_response(serializer.data,status_code=status.HTTP_200_OK)
        except Exception as e:
            return self.failure_response(str(e),status_code=status.HTTP_200_OK)


class GivingBye(BaseAPIView):
    permission_classes=[TournamentAdmin]

    def post(self,request):
        try:                                      
            tournament_id=request.data['tournament_id']
            match_id=request.data['match_id']
            id=request.data['player_id']
            match=Match.objects.get(tournament_id=tournament_id,id=match_id)
            if match.tournament.created_by==request.user:
                match.winner_id=id
                match.save()
                context={f"Player {match.winner} Won the Match"}
            if Match.objects.filter(Q(match_1=match_id)| Q(match_2=match_id)).exists():
                next_match=Match.objects.get(Q(match_1=match_id)| Q(match_2=match_id))
                if next_match.match_1==int(match_id):
                    next_match.player_1_id=id
                else:
                    next_match.player_2_id=id
                next_match.save()
                return self.success_response(data='',message=context,status_code=status.HTTP_200_OK)
            return self.failure_response(exception_message='Does not have permission',status_code=status.HTTP_200_OK)
        except Exception as e:
            return self.failure_response(exception_message=str(e),status_code=status.HTTP_200_OK)


class ScoreView(BaseAPIView):
    
    def post(self,request):
        try:                                          #Score
            tournament_id=request.data['tournament_id']
            match_id=request.data['match_id']
            set_id=request.data['set_no']
            score1=request.data['score1']
            score2=request.data['score2']
            set_winner=request.data['set_winner']
            winner=request.data['winner']
            data=Draws.score(tournament_id,match_id,score1,score2,set_id,set_winner,winner)
            return self.success_response(data,status_code=status.HTTP_200_OK)
        except Exception as e:
            return self.failure_response(str(e),status_code=status.HTTP_200_OK)


class PlayerDrawsView(BaseAPIView):
    serializer_class=CreateDrawSerializer
    permission_classes=[TournamentAdmin]
    def get(self, request,pk):
        try:
            player=CustomUser.objects.filter(is_player=True,is_verified=True)
            page = self.paginate_queryset(player)
            if page is not None:
                serializer = self.serializer_class(page, many=True,context={"request":request,'pk':pk})
                return self.get_paginated_response(serializer.data)
            serializer = self.serializer_class(player, many=True,context={"request":request,'pk':pk})
            return self.success_response(data=serializer.data,status_code=status.HTTP_200_OK)
        except Exception as e:
            return self.failure_response(exception_message=str(e),status_code=status.HTTP_200_OK)


class AdminFilterView(TemplateView):

    template_name='admin/tournament/base.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['form'] = TournamentForm()
        return context
