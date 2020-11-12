from django import forms

class Form(forms.Form):
    location = forms.CharField()