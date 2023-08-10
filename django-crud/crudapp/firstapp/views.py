from django.shortcuts import render


data_dictionary={"name": "Ram", "age": 20, "city": "Delhi"}
# Create your views here.
def create_view(request):
    if request.method == 'POST':
        # Handle form submission and update the Python dictionary
        key = request.POST.get('key')
        value = request.POST.get('value')
        data_dictionary[key] = value  # Assuming data_dictionary is your Python dictionary
    return render(request, 'create_template.html')

def read_view(request):
    return render(request, 'read_template.html', {'data': data_dictionary})

def update_view(request):
    if request.method == 'POST':
        key = request.POST.get('key')
        value = request.POST.get('value')
        if key in data_dictionary:
            data_dictionary[key] = value  # Update the dictionary with the new value
    return render(request, 'update_template.html')


def delete_view(request):
    if request.method == 'POST':
        key = request.POST.get('key')
        if key in data_dictionary:
            del data_dictionary[key]  # Remove the key from the dictionary
    return render(request, 'delete_template.html')