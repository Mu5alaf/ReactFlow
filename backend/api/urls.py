from django.urls import path
from .views import WebScraper,Summary

urlpatterns = [
    path('scrape/', WebScraper.as_view(), name='scrape'),
    path('summary/', Summary.as_view(), name='summary'),
]
