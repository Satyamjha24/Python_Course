from django.http import HttpResponse

def welcome(request):
    return HttpResponse("Welcome to the Hello User project!")

def greet(request, username):
    return HttpResponse(f"Hello, {username}!")

def farewell(request, username):
    return HttpResponse(f"Goodbye, {username}!")