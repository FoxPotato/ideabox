# Serializers define the API representation.
from rest_framework.serializers import ModelSerializer

from main.models import IdeaModel


class IdeaSerializer(ModelSerializer):
    class Meta:
        model = IdeaModel
        exclude = ('signature', )
