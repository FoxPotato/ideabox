# Serializers define the API representation.
from rest_framework.serializers import ModelSerializer

from main.models import IdeaModel, AppointmentModel


class IdeaSerializer(ModelSerializer):
    class Meta:
        model = IdeaModel
        fields = '__all__'


class AppointmentSerializer(ModelSerializer):
    class Meta:
        model = AppointmentModel
        fields = '__all__'

