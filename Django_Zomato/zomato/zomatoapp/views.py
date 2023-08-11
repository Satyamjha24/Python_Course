from django.shortcuts import render, redirect

# Create your views here.

from .menu import get_menu

orders={}

def display_menu(request):
    menu = get_menu()
    context = {'menu': menu, 'orders': orders}
    return render(request, 'menu.html', context)


def add_dish(request):
    if request.method == 'POST':
        menu = get_menu()
        dish_id = len(menu)+1
        dish_name = request.POST['dish_name']
        dish_price = float(request.POST['dish_price'])
        available = request.POST.get('available', False) == 'on'
        menu[dish_id] = {'name': dish_name, 'price': dish_price, 'available': available}
        return redirect('display_menu')
    return render(request , 'add_dish.html')

def remove_dish(request, dish_id):
    menu = get_menu()  
    if dish_id in menu:
        del menu[dish_id]  
    return redirect('display_menu')

def update_availability(request, dish_id):
    menu = get_menu()
    if dish_id in menu:
        menu[dish_id]['available'] = not menu[dish_id]['available']
    return redirect('display_menu')

def take_order(request):
    menu = get_menu()  # Get the current menu
    if request.method == 'POST':
        customer_name = request.POST['customer_name']
        dish_ids = request.POST.getlist('selected_dishes')
        new_order = {'customer_name': customer_name, 'dishes': []}
        for dish_id in dish_ids:
            if int(dish_id) in menu:
                new_order['dishes'].append(menu[int(dish_id)]['name'])
        # Assign a new order ID
        order_id = len(orders) + 1
        orders[order_id] = {'order': new_order, 'status': 'Orser_Received'}
        print(orders)
        print(dish_ids)
        print(new_order)
        return redirect('display_menu')
    return render(request, 'orders.html', {'menu': menu})

def update_status(request, order_id):
    if order_id in orders:
        current_status = orders[order_id]['status']
        
        if current_status == 'received':
            new_status = 'preparing'
        elif current_status == 'preparing':
            new_status = 'done'
        else:
            new_status = current_status  # Keep the status unchanged if it's already 'done'
        
        orders[order_id]['status'] = new_status  # Update the order status in the dictionary
    return redirect('display_menu')