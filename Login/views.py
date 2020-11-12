from django.shortcuts import render
from django.views.generic.list import ListView
from add_location.models import Location
from django.views.generic import TemplateView
from .forms import Form
from django.http import HttpResponse
import requests
from .models import Location

# Create your views here.
class LocationViewAll(ListView):
    template_name = "location_list.html"
    model = Location

class LocationViewDetail(TemplateView):
    template_name = "location_detail.html"
    def get_context_data(self, **kwargs):
        location = self.kwargs['location']
        context = super().get_context_data(**kwargs)
        context['location'] = Location.objects.get(pk = location)
        return context

class Addlocation(TemplateView):
    template_name = "add_location.html"

def formf(request):
    if request.method == "GET":
        form = Form(request.GET)
        if form.is_valid():
            location = form.cleaned_data["location"]
            url = "https://geodata.gov.hk/gs/api/v1.0.0/locationSearch?q="+str(location)
            r0 = requests.get(url)
            if (request.GET["action"]=="Search"):
                if (str(r0)=="<Response [200]>"):
                    print(r0.json())
                    return render(request, "display.html", {"display":str(r0.json())})
                else:
                    return render(request, "errorpage.html", {"error":str(r0)})
            else:
                if (str(r0)=="<Response [200]>"):
                    r = r0.json()
                    d = r[0]
                    nameZH = d["nameZH"]
                    nameEN = d["nameEN"]
                    x = d["x"]
                    y = d["y"]
                    addressZH = d["addressZH"]
                    addressEN = d["addressEN"]
                    newlocation = Location(nameZH=nameZH, nameEN=nameEN, x=x,y=y, addressZH=addressZH, addressEN=addressEN)
                    newlocation.save()
                    return render(request, "comfirm.html", {})
                else:
                    return render(request, "errorpage.html", {"error":str(r0)})
    form1 = Form()
    form2 = Form()
    return render(request, "add_location.html", {"form1":form1,"form2":form2})
