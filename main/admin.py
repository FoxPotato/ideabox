from django.contrib import admin

# Register your models here.
from main.models import AppointmentModel, IdeaModel

admin.site.register((
    AppointmentModel,
    IdeaModel
))
