from django.contrib import admin
from .models import *


# Register your models here.

admin.site.register(Location)
admin.site.register(Virus)
admin.site.register(Patient)
admin.site.register(Case)
admin.site.register(Visit_record)