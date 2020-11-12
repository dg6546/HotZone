from django.db import models

# Create your models here.
class Location(models.Model):
    nameZH = models.CharField(max_length=200,default="NO NAMEZH")
    nameEN = models.CharField(max_length=200,default="NO NAMEEN")
    addressZH = models.CharField(max_length=200,default="NO ADDRESSZH")
    addressEN = models.CharField(max_length=200,default="NO ADDRESSEN")
    x = models.IntegerField(default=0)
    y = models.IntegerField(default=0)
    def __str__(self):
        return self.nameEN