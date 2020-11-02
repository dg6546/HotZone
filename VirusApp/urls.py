from django.urls import path, include
from .views import *

urlpatterns = [
    path('', index_view, name='index'),
    path('patient/<int:patient_id>/', patient_view, name='patient_page'),
    path('case_detail/<int:case_id>/', case_detail_view, name='case_detail_page'),
    path('virus_detail/<int:virus_id>/', virus_detail_view, name='virus_detail_page'),
    path('location/', search_location_form_view, name='search_location'),
    #path('test/', test_view, name='test'),
    #path('location/new', New_location_form_view, name='new_location')
    path('location/new', New_location_form_view, name='new_location')
    
]