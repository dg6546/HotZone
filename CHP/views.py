from django.shortcuts import render, redirect 
from django.http import HttpResponse
from django.urls import path, include
from django.contrib.auth import authenticate, login, logout


# Create your views here.

def logoutUser(request):
	logout(request)
	context = {}
	return redirect("login_page")