from django.shortcuts import render, get_object_or_404, redirect
import urllib.request, json
from .forms import *
from .json_request import *
from .models import *
from django.contrib.auth.decorators import login_required
#from formtools.wizard.views import WizardView

# Create your views here.
@login_required(login_url='login_page')
def index_view(request):
    case_list = Case.objects.order_by('date_confirmed')
    
    return render(request, "case.html", {"case_list": case_list})

@login_required(login_url='login_page')
def patient_view(request, patient_id):
    patient = get_object_or_404(Patient, pk=patient_id)
    case_list = Case.objects.filter(patient=patient)
    return render(request, "patient.html", {"patient": patient, 'case_list': case_list})

@login_required(login_url='login_page')
def case_detail_view(request, case_id):
    case = get_object_or_404(Case, pk=case_id)
    virus = case.virus
    patient = case.patient
    visit_record = Visit_record.objects.filter(case_id = case_id)
    location_list = Location.objects.all()

    return render(request, "case_detail.html", {"case":case, "virus": virus, "patient": patient, "visit_record": visit_record, "location_list": location_list})

@login_required(login_url='login_page')
def virus_detail_view(request, virus_id):
    virus = get_object_or_404(Virus, pk=virus_id)
    return render(request, "virus_detail.html", {"virus": virus})

@login_required(login_url='login_page')
def search_location_form_view(request):
    if request.method == 'POST':
        form = Location_search_Form(request.POST)
        if form.is_valid():
            location_data = form.cleaned_data.get('location_name')
            location_data_edited = location_data.replace(' ', "%20")
            url = 'https://geodata.gov.hk/gs/api/v1.0.0/locationSearch?q='
            try:
                request1 = urllib.request.urlopen(url+location_data_edited)
                json_result = json.load(request1)
                first_result = json_result[0]
                request.session['location_name'] = first_result.get("nameEN")
                request.session['address'] = first_result.get("addressEN")
                request.session['x_coord'] = first_result.get('x')
                request.session['y_coord'] = first_result.get('y')
                form = New_location_form(initial={
                'location_name': request.session['location_name'], 
                'address': request.session['address'], 
                'x_coord': request.session['x_coord'], 
                'y_coord': request.session['y_coord']})
                return render(request, 'new_location.html', {'form': form, 'status': 'please confirm before creating a new location data'})
            except(urllib.error.HTTPError):
                form = New_location_form()
                return render(request, 'result.html', {'form': form, 'status': 'No result found!'})
    form = Location_search_Form()
    return render(request, 'location.html', {'form': form})






@login_required(login_url='login_page')
def New_location_form_view(request):
    if request.method == 'POST':
        form = New_location_form(request.POST)
        if form.is_valid():
            form.save()
            form = New_location_form()
            #emptying passthrough data
            request.session['location_name'] = ''
            request.session['address'] = ''
            request.session['x_coord'] = ''
            request.session['y_coord'] = ''
            return render(request, 'result.html', {'status': 'success'})

    form = New_location_form(initial={
                'name': request.session['location_name'], 
                'address': request.session['address'], 
                'x_coord': request.session['x_coord'], 
                'y_coord': request.session['y_coord']})
    return render(request, 'new_location.html', {'form': form, 'status': 'please confirm before creating a new location data'})

@login_required(login_url='login_page')
def New_case_form_view(request):
    if request.method == 'POST':
        visit_form = New_visit_record_form(request.POST)
        virus_form = New_virus_form(request.POST)
        patient_form = New_patient_form(request.POST)
        case_form = New_case_form(request.POST)
        location_form = New_location_form(request.POST)
        if visit_form.is_valid() and virus_form.is_valid() and patient_form.is_valid() and case_form.is_valid() and location_form.is_valid():
            virus = virus_form.save()
            patient = patient_form.save()
            location = location_form.save()
            visit_record = visit_form.save(commit=False)
            case = case_form.save(commit=False)
            case.patient = patient
            case.virus = virus
            case.save()
            visit_record.case = case
            visit_record.location = location
            visit_record.save()
            return redirect('case_detail/'+ str(case.id))
    else:
        visit_form = New_visit_record_form()
        virus_form = New_virus_form()
        patient_form = New_patient_form()
        case_form = New_case_form()
        location_form = New_location_form()
        return render(request, 'new_case.html', {'visit_form': visit_form,
        'virus_form': virus_form, 'patient_form': patient_form, 'case_form': case_form,
        'location_form':location_form })


@login_required(login_url='login_page')
def New_patient_form_view(request):
    if request.method == 'POST':
        patient_form = New_patient_form(request.POST)
        if patient_form.is_valid():
            patient = patient_form.save()
            return redirect('/patient/'+ str(patient.id))

    else:
        patient_form = New_patient_form()
        return render(request, 'new_patient.html', {'patient_form': patient_form})