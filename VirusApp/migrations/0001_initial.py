# Generated by Django 3.1.2 on 2020-11-02 11:46

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Case',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_confirmed', models.DateField()),
                ('category', models.CharField(choices=[('Local', 'Local'), ('Import', 'Import')], default=('Local', 'Local'), max_length=30)),
            ],
        ),
        migrations.CreateModel(
            name='Location',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('address', models.CharField(blank=True, max_length=100, null=True)),
                ('x_coord', models.IntegerField()),
                ('y_coord', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Patient',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False, unique=True)),
                ('name', models.CharField(max_length=50)),
                ('id_num', models.CharField(max_length=15, unique=True)),
                ('dob', models.DateField()),
            ],
        ),
        migrations.CreateModel(
            name='Virus',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
                ('disease', models.CharField(max_length=30)),
                ('infectious_days', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Visit_record',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_from', models.DateField()),
                ('date_to', models.DateField()),
                ('category', models.CharField(choices=[('Residence', 'Residence'), ('Workplace', 'Workplace'), ('visit', 'visit')], default=('Residence', 'Residence'), max_length=30)),
                ('case', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='VirusApp.case')),
                ('location', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='VirusApp.location')),
            ],
        ),
        migrations.AddField(
            model_name='case',
            name='patient',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='VirusApp.patient'),
        ),
        migrations.AddField(
            model_name='case',
            name='virus',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='VirusApp.virus'),
        ),
    ]
