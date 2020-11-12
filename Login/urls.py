from django.contrib import admin
from django.urls import path, include
from add_location import views

urlpatterns = [
path('id/<int:location>',
views.LocationViewDetail.as_view(),
name='location-name'),

path("",
views.LocationViewAll.as_view(),
name='location'), 

path("add/",
#views.Addlocation.as_view(),
views.formf),
#name='add-location'),

#path("add/searchbar",
#views.searchbar,
#name='add-location'),
]