from django import forms
from django.forms import ModelForm
from .models import *

class Location_search_Form(forms.Form):
    location_name = forms.CharField(label='location', max_length=100)

# class New_location_form(forms.Form):
#     name = forms.CharField(label = 'name', max_length=100)
#     address = forms.CharField(label = 'address',max_length=100, required= False)
#     x_coord = forms.IntegerField(label = 'x')
#     y_coord = forms.IntegerField(label = 'y')

class New_location_form(ModelForm):
    class Meta:
        model = Location
        fields = ['name', 'address', 'x_coord', 'y_coord' ]
