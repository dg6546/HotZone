from django.urls import path, include
from .views import *
from django.contrib.auth import views as auth_views

urlpatterns = [
    path("", loginPage, name="login_page"),

    path("change_password/", 
     PWC.as_view(template_name="change_password.html"), 
     name="change_password"),

    path("reset_password/",
     auth_views.PasswordResetView.as_view(),
     name="reset_password"),

    path("reset_password_sent/", 
        auth_views.PasswordResetDoneView.as_view(), 
        name="password_reset_done"),

    path("reset/<uidb64>/<token>/",
     auth_views.PasswordResetConfirmView.as_view(), 
     name="password_reset_confirm"),

    path("reset_password_complete/", 
        auth_views.PasswordResetCompleteView.as_view(template_name="password_reset_complete.html"), 
        name="password_reset_complete"),
]