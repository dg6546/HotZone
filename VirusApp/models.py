from django.db import models

# Create your models here.

class Location(models.Model):
    location_name = models.CharField(max_length=100)
    address = models.CharField(max_length=100, null=True, blank=True)
    x_coord = models.IntegerField()
    y_coord = models.IntegerField()

    def __str__(self):
        return self.location_name

class Virus(models.Model):
    virus_name = models.CharField(max_length=30)
    disease = models.CharField(max_length=30)
    infectious_days = models.IntegerField()

    def __str__(self):
        return self.disease
    

class Patient(models.Model):
    id = models.AutoField(primary_key=True, unique=True)
    patient_name = models.CharField(max_length=50)
    id_num = models.CharField(max_length=15, unique=True)
    dob = models.DateField()

    def __str__(self):
        return self.patient_name


class Case(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, null=True, blank=True)
    date_confirmed = models.DateField()
    virus = models.ForeignKey(Virus, on_delete=models.CASCADE, null=True, blank=True)
    CAT_CHOICE = [
        ('Local', 'Local'),
        ('Import', 'Import'),
    ]
    case_category = models.CharField(max_length=30, choices=CAT_CHOICE, default=CAT_CHOICE[0])  

    def __str__(self):
        return str(self.id)

class Visit_record(models.Model):
    case = models.ForeignKey(Case, on_delete=models.CASCADE)
    location = models.ForeignKey(Location, on_delete=models.CASCADE)
    date_from = models.DateField()
    date_to = models.DateField()
    CAT_CHOICE = [
        ('Residence', 'Residence'),
        ('Workplace', 'Workplace'),
        ('visit', 'visit'),
    ]
    visit_category = models.CharField(max_length=30, choices=CAT_CHOICE, default=CAT_CHOICE[0])

    def __str__(self):
        return str(self.id)