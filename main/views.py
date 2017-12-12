from django.shortcuts import render

# Create your views here.
from django.views import View
from rest_framework import mixins
from rest_framework.viewsets import GenericViewSet

from main.models import IdeaModel
from main.serializers import IdeaSerializer


class Index(View):
    def get(self, request, *args, **kwargs):
        return render(request, 'test.html')


class IdeaViewSet(mixins.CreateModelMixin,
                  mixins.RetrieveModelMixin,
                  mixins.ListModelMixin,
                  GenericViewSet):
    queryset = IdeaModel.objects.all()
    serializer_class = IdeaSerializer
