from rest_framework import status, viewsets
from rest_framework.authentication import SessionAuthentication
from rest_framework.generics import GenericAPIView, ListAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.pagination import PageNumberPagination
from collections import OrderedDict


class APIViewResponseMixin:
    STATUS_SUCCESS = 'SUCCESS'
    STATUS_FAILURE = 'FAILURE'

    @classmethod
    def success_response(cls, data, message='', status_code=status.HTTP_200_OK, response_class=Response):
        return response_class(dict(
            data=data,
            message=message,
        ), status=status_code)

    @classmethod
    def failure_response(
            cls,
            exception_message,
            status_code=status.HTTP_200_OK,  # we would consider it a success if errors are known
            response_class=Response
    ):
        return response_class(dict(
            status=cls.STATUS_FAILURE,
            exception_message=exception_message,

        ), status=status_code)


class BaseAPIView(GenericAPIView, APIViewResponseMixin):
    pass


class BaseModelViewSet(viewsets.ModelViewSet, APIViewResponseMixin):
    pass


class ListAPIView(ListAPIView, APIViewResponseMixin):

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return self.success_response(data=serializer.data)


class RetrieveAPIView(RetrieveAPIView, APIViewResponseMixin):
    """
    Concrete view for retrieving a model instance.
    """
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return self.success_response(data=serializer.data)


class AuthenticationAPIView(BaseAPIView):
    authentication_classes = [JWTAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]


class BasePageNumberPagination(PageNumberPagination):

    def get_paginated_response(self, data, extra_keys):
        return Response(OrderedDict([
            ('status', 'SUCCESS'),
            ('count', self.page.paginator.count),
            ('next', self.get_next_link()),
            ('previous', self.get_previous_link()),
            ('results', data),
            ('extra_keys', extra_keys),
        ]))