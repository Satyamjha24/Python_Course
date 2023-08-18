from django.urls import path
from . import views

urlpatterns = [
    # Other URL patterns
    path('weather/<str:city>/', views.weather_view, name='weather_view'),
    path('add_city_weather/', views.add_city_weather, name='add_city_weather'),
    path('weather/update/<str:city>/', views.update_weather, name='update_weather'),
    path('weather/delete/<str:city>/', views.delete_weather, name='delete_weather'),
    # Other URL patterns
]