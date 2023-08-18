from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse
import json
from .data import weather_data



def weather_view(request, city):
    if city in weather_data:
        return JsonResponse(weather_data[city])  # Return weather data as JSON
    else:
        return JsonResponse({'error': 'City not found'}, status=404)

def add_city_weather(request):
    data = json.loads(request.body)
    required_fields = ['city', 'temperature', 'weather']
    for field in required_fields:
        if field not in data:
            return JsonResponse({'error': f'{field} not found'}, status=404)
    
    city = data['city']
    weather_data[city] = {
        'temperature': data['temperature'],
        'weather': data['weather']
    }
    response_data = {'message': 'Weather data added successfully'}
    return JsonResponse(response_data, status=200)

def update_weather(request, city):
    if city in weather_data:
        data = json.loads(request.body)
        if 'temperature' in data and 'weather' in data:
            weather_data[city]['temperature'] = data['temperature']
            weather_data[city]['weather'] = data['weather']
            response_data = {'message': 'Weather data updated successfully'}
            return JsonResponse(response_data, status=200)
        else:
            return JsonResponse({'error': 'temperature and weather fields are required'}, status=400)
    else:
        return JsonResponse({'error': 'City not found'}, status=404)
    

def delete_weather(request, city):
    if city in weather_data:
        del weather_data[city]
        response_data = {'message': f'Weather data for {city} deleted successfully'}
        return JsonResponse(response_data, status=200)
    else:
        return JsonResponse({'error': f'Weather data for {city} not found'}, status=404)
