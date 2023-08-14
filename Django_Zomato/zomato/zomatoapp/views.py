from django.shortcuts import render, redirect

from .models import MenuItem, Order

# Create your views here.

# orders={}

def display_menu(request):
    menu_items = MenuItem.objects.all()
    orders = Order.objects.all()
    context = {'menu_items': menu_items, 'orders': orders}
    return render(request, 'menu.html', context)


def add_dish(request):
    if request.method == 'POST':
        dish_name = request.POST.get('dish_name')
        price = float(request.POST.get('price'))
        availability = bool(request.POST.get('available'))
        new_dish = MenuItem(dish_name=dish_name, price=price, availability=availability)
        new_dish.save()
        print(price)
        return redirect('display_menu')
    return render(request , 'add_dish.html')

def remove_dish(request, dish_id):
    dish = MenuItem.objects.get(id=dish_id)
    dish.delete() 
    return redirect('display_menu')

def update(request, dish_id):
    if request.method == 'POST':
        dish = MenuItem.objects.get(id=dish_id)
        dish.dish_name = request.POST.get('dish_name')
        dish.price = float(request.POST.get('price'))
        dish.availability = bool(request.POST.get('availability'))
        dish.save()
        return redirect('display_menu')

    dish = MenuItem.objects.get(id=dish_id)
    return render(request, 'update.html', {'dish': dish})

def take_order(request):
    if request.method == 'POST':
        customer_name = request.POST.get('customer_name')
        selected_dish_ids = request.POST.getlist('selected_dishes')
        
        if customer_name and selected_dish_ids:
            order = Order(customer_name=customer_name, dish_ids=selected_dish_ids, status='received')
            order.save()
        return redirect('display_menu')
    menu_items = MenuItem.objects.all()
    return render(request, 'orders.html', {'menu_items': menu_items})

def update_status(request, order_id):
    if request.method == 'POST':
        new_status = request.POST.get('new_status')
        try:
            order = Order.objects.get(id=order_id)
            order.status = new_status
            order.save()
            return redirect('display_menu')
        except Order.DoesNotExist:
            pass
    return render(request, 'update_order.html', {'order_id': order_id})