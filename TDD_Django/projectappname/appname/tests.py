from django.test import TestCase, Client
from django.urls import reverse
import json
from .data import weather_data


class WeatherViewTest(TestCase):
    
    def test_valid_city(self):
        response = self.client.get(reverse('weather_view', kwargs={'city': 'San Francisco'}))
        self.assertEqual(response.status_code, 200)  # We expect a successful response

    def test_add_city_weather_success(self):
        client = Client()
        url = reverse('add_city_weather')
        data = {
            'city': 'Test City',
            'temperature': 25,
            'weather': 'Sunny'
        }
        response = client.post(url, json.dumps(data), content_type='application/json')
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(weather_data['Test City']['temperature'], 25)
        self.assertEqual(weather_data['Test City']['weather'], 'Sunny')    

    def test_add_city_weather_missing_fields(self):
        client = Client()
        url = reverse('add_city_weather')
        data = {
            'city': 'Test City',
            'temperature': 25
            # Missing 'weather' field
        }
        response = client.post(url, json.dumps(data), content_type='application/json')
        
        self.assertEqual(response.status_code, 404)
        self.assertEqual(response.json(), {'error': 'weather not found'})    

    def test_update_weather_success(self):
        client = Client()
        url = reverse('update_weather', kwargs={'city': 'Test City'})
        data = {
            'temperature': 30,
            'weather': 'Clear'
        }
        response = client.put(url, json.dumps(data), content_type='application/json')
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(weather_data['Test City']['temperature'], 30)
        self.assertEqual(weather_data['Test City']['weather'], 'Clear')

    def test_update_weather_invalid_city(self):
        client = Client()
        url = reverse('update_weather', kwargs={'city': 'Invalid City'})
        data = {
            'temperature': 30,
            'weather': 'Clear'
        }
        response = client.put(url, json.dumps(data), content_type='application/json')
        
        self.assertEqual(response.status_code, 404)
        self.assertEqual(response.json(), {'error': 'City not found'})

    
    def test_delete_weather_success(self):
        client = Client()
        city = 'Mumbai'
        weather_data[city] = {
            'temperature': 30,
            'weather': 'Sunny'
        }
        url = reverse('delete_weather', args=[city])
        response = client.delete(url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {'message': f'Weather data for {city} deleted successfully'})

    def test_delete_weather_not_found(self):
        client = Client()
        city = 'NonExistentCity'
        url = reverse('delete_weather', args=[city])
        response = client.delete(url)
        self.assertEqual(response.status_code, 404)
        self.assertEqual(response.json(), {'error': f'Weather data for {city} not found'})    