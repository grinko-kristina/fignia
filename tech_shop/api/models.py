# models.py
from django.db import models

class Book(models.Model):
    bookid = models.CharField(max_length=20, primary_key=True)
    title = models.CharField(max_length=100)
    author = models.CharField(max_length=100)
    rating = models.FloatField()
    description = models.TextField()
    pages = models.IntegerField()
    coverimg = models.URLField()