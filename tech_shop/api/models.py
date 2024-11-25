# models.py
from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator
class Book(models.Model):
    bookId = models.IntegerField(primary_key=True)
    title = models.CharField(max_length=100)
    author = models.CharField(max_length=100)
    rating = models.FloatField()
    description = models.TextField()
    pages = models.IntegerField()
    coverImg = models.URLField()


    class Meta:
        db_table = 'books_info'


from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Review(models.Model):
    id = models.BigAutoField(primary_key=True)
    # Change the foreign key to reference bookId instead of id
    book = models.ForeignKey(
        Book,
        on_delete=models.CASCADE,
        to_field='bookId',  # Explicitly tell Django to use bookId
        db_column='book_id',
        # This should match your existing column name
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    review_text = models.TextField()
    rating = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)]
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        db_table = 'api_review'
