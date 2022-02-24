from django.shortcuts import render
from rest_framework import response, status, decorators

from .models import Music
from .serializers import MusicSerializer


@decorators.api_view(['GET'])
def json_view(request):
    musics = Music.objects.all()
    serializer = MusicSerializer(musics, many=True)
    return response.Response(serializer.data, status=status.HTTP_200_OK)


def home(request):
    return render(request, 'app/index.html')
