from django import forms
from django.forms import ModelForm
from .models import *

class Location_search_Form(forms.Form):
    location_name = forms.CharField(label='Location', max_length=100)

class Case_search_form(forms.Form):
    case_no = forms.IntegerField(label='Number')

class Patient_search_form(forms.Form):
    patient_no = forms.IntegerField(label='Number',required=False)
    patient_name = forms.CharField(label='Name', max_length=50,required=False)
    patient_id_num = forms.CharField(label='HKID', max_length=15,required=False)

class New_location_form(ModelForm):
    class Meta:
        model = Location
        fields = ['location_name', 'address', 'x_coord', 'y_coord' ]

class New_case_form(ModelForm):
    class Meta:
        model = Case
        exclude = ('patient', 'virus')

class New_patient_form(ModelForm):
    class Meta:
        model = Patient
        fields = ['id_num', 'patient_name', 'dob']

class New_virus_form(ModelForm):
    class Meta:
        model = Virus
        fields = ['virus_name', 'disease', 'infectious_days']

class New_visit_record_form(ModelForm):
    class Meta:
        model = Visit_record
        exclude = ('case', 'location')

