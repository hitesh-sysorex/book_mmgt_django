from django.db import models


class Music(models.Model):
    name = models.CharField(max_length=255)
    thumbnail = models.ImageField(
        upload_to='thumbnails/', null=True, blank=True)
    file = models.FileField(upload_to='music/')
    artists = models.ManyToManyField('Artist')

    def __str__(self):
        return self.name


class Artist(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name
