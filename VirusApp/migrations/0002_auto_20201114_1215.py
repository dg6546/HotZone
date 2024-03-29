# Generated by Django 3.1.3 on 2020-11-14 04:15

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('VirusApp', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='case',
            old_name='category',
            new_name='case_category',
        ),
        migrations.RenameField(
            model_name='location',
            old_name='name',
            new_name='location_name',
        ),
        migrations.RenameField(
            model_name='patient',
            old_name='name',
            new_name='patient_name',
        ),
        migrations.RenameField(
            model_name='virus',
            old_name='name',
            new_name='virus_name',
        ),
        migrations.RenameField(
            model_name='visit_record',
            old_name='category',
            new_name='visit_category',
        ),
        migrations.AlterField(
            model_name='case',
            name='patient',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='VirusApp.patient'),
        ),
        migrations.AlterField(
            model_name='case',
            name='virus',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='VirusApp.virus'),
        ),
    ]
