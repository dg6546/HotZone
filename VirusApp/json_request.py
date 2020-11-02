import urllib, json
from .forms import *
from .models import *
from django.test.client import RequestFactory
from django.shortcuts import redirect

def json_location_request(request):
    
    
    return render(request, 'location.html', {'form': form, 'response':response_result})