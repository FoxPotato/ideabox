from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect

# Create your views here.
from django.views import View
from rest_framework import mixins
from rest_framework.viewsets import GenericViewSet

from main.models import IdeaModel, AppointmentModel
from main.serializers import IdeaSerializer, AppointmentSerializer


class Index(View):

    def get(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return redirect('/admin/login/?next=/')
        return render(request, 'index.html')


class IdeaViewSet(mixins.CreateModelMixin,
                  mixins.RetrieveModelMixin,
                  mixins.ListModelMixin,
                  GenericViewSet):
    queryset = IdeaModel.objects.all()
    serializer_class = IdeaSerializer


class AppointmentViewSet(mixins.CreateModelMixin,
                  mixins.RetrieveModelMixin,
                  mixins.ListModelMixin,
                  GenericViewSet):
    queryset = AppointmentModel.objects.all()
    serializer_class = AppointmentSerializer