from django.shortcuts import render

# Create your views here.
from django.views import View


class Index(View):
    def dispatch(self, request, *args, **kwargs):
        return render(request, 'index.html')
