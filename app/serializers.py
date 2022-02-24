from rest_framework import serializers

from .models import Music


class MusicSerializer(serializers.ModelSerializer):
    artists = serializers.StringRelatedField(many=True)

    class Meta:
        model = Music
        fields = "__all__"
