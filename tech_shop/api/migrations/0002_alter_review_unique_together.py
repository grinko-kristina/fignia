# Generated by Django 5.1.3 on 2024-11-25 10:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0001_initial"),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name="review",
            unique_together=set(),
        ),
    ]
