# Generated by Django 4.0.3 on 2022-03-22 11:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('comp0011_tool', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='type',
            name='name',
            field=models.CharField(max_length=40, unique=True),
        ),
    ]