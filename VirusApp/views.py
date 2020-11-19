from django.shortcuts import render, get_object_or_404, redirect
import urllib.request, json
from .forms import *
from .models import *
from django.contrib.auth.decorators import login_required
from django.db.models import Q
from django.contrib import messages
import logging

logger = logging.getLogger(__name__)

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
    visit_record = Visit_record.objects.filter(case_id=case_id)
    location_list = Location.objects.all()

    return render(request, "case_detail.html",
                  {"case": case, "virus": virus, "patient": patient, "visit_record": visit_record,
                   "location_list": location_list})


@login_required(login_url='login_page')
def virus_detail_view(request, virus_id):
    virus = get_object_or_404(Virus, pk=virus_id)
    return render(request, "virus_detail.html", {"virus": virus})


@login_required(login_url='login_page')
def search_case_form_view(request):
    if request.method == 'POST':
        form = Case_search_form(request.POST)
        if form.is_valid():
            case_id = form.cleaned_data.get('case_no')
            try:
                case_list = Case.objects.filter(id=case_id)
                return render(request, "case_search_result.html", {"case_list": case_list})
            except urllib.error.HTTPError:
                return render(request, 'case_search_result.html', {'case_list': None})

    form = Case_search_form()
    return render(request, 'search_case.html', {'form': form})


@login_required(login_url='login_page')
def search_patient_form_view(request):
    if request.method == 'POST':
        form = Patient_search_form(request.POST)
        if form.is_valid():
            id = form.cleaned_data.get('patient_no')
            name = form.cleaned_data.get('patient_name')
            HKID = form.cleaned_data.get('patient_id_num')
            try:
                patient_list = Patient.objects.filter(
                    Q(id=None) | Q(id=id) | Q(patient_name=None) | Q(patient_name=name) | Q(id_num=None) | Q(
                        id_num=HKID))
                return render(request, "patient_list.html", {"patient_list": patient_list})
            except(urllib.error.HTTPError):
                return render(request, "patient_list.html", {"patient_list": None})
    form = Patient_search_form()
    return render(request, 'search_patient.html', {'form': form})



@login_required(login_url='login_page')
def New_patient_form_view(request):
    if request.method == 'POST':
        patient_form = New_patient_form(request.POST)
        if patient_form.is_valid():
            patient = patient_form.save()
            return redirect('/patient/' + str(patient.id))

    else:
        patient_form = New_patient_form()
        return render(request, 'new_patient.html', {'patient_form': patient_form})


def New_case_form_view(request, patient_id):
    if request.method == 'POST':
        case_form = New_case_form(request.POST)
        if case_form.is_valid():
            case = case_form.save(commit=False)
            patient = get_object_or_404(Patient, pk=patient_id)
            case.patient = patient
            case.save()
            return redirect('/case_detail/' + str(case.id))
        else:
            search_patient_form_view(request)
    else:
        case_form = New_case_form
        return render(request, 'new_case.html', {'case_form': case_form})


def new_visit_form_view(request, case_id):
    if request.method == 'POST':
        visit_form = New_visit_record_form(request.POST)
        if visit_form.is_valid():
            visit_record = visit_form.save(commit=False)
            case = get_object_or_404(Case, pk=case_id)
            visit_record.case = case
            visit_record.save()
            messages.info(request, 'Visit record has been created!')
            return redirect('/case_detail/' + str(case_id))
    else:
        visit_form = New_visit_record_form()
        return render(request, 'new_visit.html', {'visit_form': visit_form})


@login_required(login_url='login_page')
def New_location_form_view(request, case_id):

    if request.method == 'POST':
        idx = request.POST.get("idx", "")
        logger.error(idx)
        if idx is not '':
            index = int(idx)
            location_dict = request.session['location_dict'][index]
            input_location_name = location_dict['location_name']
            input_address = location_dict['address']
            input_x_coord = location_dict['x_coord']
            input_y_coord = location_dict['y_coord']
            existing_record = Location.objects.filter(location_name=input_location_name, address=input_address)
            if not existing_record:
                Location.objects.create(location_name=input_location_name, address=input_address,
                                        x_coord=input_x_coord, y_coord=input_y_coord)
                messages.info(request, 'Success! Location has been created!')
                return redirect('/case_detail/'+str(case_id)+'/new_visit')
            else:
                messages.info(request, 'Error! Location already existed!')
                return redirect('/case_detail/'+str(case_id)+'/new_visit')
        else:
            messages.info(request, 'Error! Please select at least one location!')
            return redirect('/case_detail/' + str(case_id) + '/new_visit')
    else:
        messages.info(request, 'Error! Please do not access this page manually!')
        return redirect('/')

@login_required(login_url='login_page')
def search_location_form_view(request, case_id):
    if request.method == 'POST':
        form = Location_search_Form(request.POST)
        if form.is_valid():
            location_data = form.cleaned_data.get('location_name')
            location_data_edited = location_data.replace(' ', "%20")
            url = 'https://geodata.gov.hk/gs/api/v1.0.0/locationSearch?q='
            try:
                request1 = urllib.request.urlopen(url+location_data_edited)
                json_result = json.load(request1)
                for result in json_result:
                    result['location_name'] = result.pop('nameEN')
                    result['address'] = result.pop('addressEN')
                    result['x_coord'] = result.pop('x')
                    result['y_coord'] = result.pop('y')
                    result.pop('addressZH')
                    result.pop('nameZH')
                request.session['location_dict'] = json_result
                #logger.error(json_result)
                return render(request, 'new_location_test.html', {'json_result': json_result})
            except urllib.error.HTTPError:
                form = Location_search_Form()
                messages.info(request, 'No result!')
                return render(request, 'location.html', {'form': form})
    form = Location_search_Form()
    return render(request, 'location.html', {'form': form})