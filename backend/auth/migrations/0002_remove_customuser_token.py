# Generated by Django 3.2.9 on 2022-02-08 08:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('custom_auth', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='customuser',
            name='token',
        ),
    ]
