# models.py
from django.db import models

class Book(models.Model):
    bookId = models.CharField(max_length=20, primary_key=True)
    title = models.CharField(max_length=100)
    author = models.CharField(max_length=100)
    rating = models.FloatField()
    description = models.TextField()
    pages = models.IntegerField()
    coverImg = models.URLField()


    class Meta:
        db_table = 'books_info'


