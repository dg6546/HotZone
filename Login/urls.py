from django.urls import path, include
from .views import *
#from VirusApp import urls
urlpatterns = [
    path("", loginPage, name="login_page")
    
]