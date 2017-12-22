# Generated by Django 2.0 on 2017-12-20 09:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='AppointmentModel',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('student_number', models.CharField(max_length=256)),
                ('message', models.TextField()),
                ('date', models.DateField()),
                ('time', models.TimeField()),
            ],
        ),
        migrations.RemoveField(
            model_name='ideamodel',
            name='signature',
        ),
    ]