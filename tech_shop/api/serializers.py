from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Book
from .models import Review
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],  # Add email here
            password=validated_data['password']
        )
        return user

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['bookId', 'title', 'author', 'description', 'pages', 'rating', 'coverImg']  # Вкажіть необхідні поля



class ReviewSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    book_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = Review
        fields = ['id', 'book_id', 'user', 'review_text', 'rating', 'created_at']
        read_only_fields = ['user', 'created_at']

    def validate_book_id(self, value):
        try:
            Book.objects.get(bookId=value)
            return value
        except Book.DoesNotExist:
            raise serializers.ValidationError(f"Book with ID {value} does not exist")