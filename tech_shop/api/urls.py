from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BookFilter

router = DefaultRouter()
router.register(r'books', BookFilter, basename='book')

urlpatterns = [
    path('', include(router.urls)),  # No circular reference here
]