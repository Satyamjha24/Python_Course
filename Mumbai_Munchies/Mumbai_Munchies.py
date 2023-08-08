# Initialize snack inventory and sales records
snack_inventory = []
sales_records = []

# Function to add a snack to the inventory
def add_snack(id, name, price, availability):
    try:
        if not isinstance(price, (int, float)) or price <= 0:
            raise ValueError("Price must be a positive number.")
        
        snack_info = {
            "id": id,
            "name": name,
            "price": price,
            "availability": availability
        }
        snack_inventory.append(snack_info)
    except ValueError as e:
        print("Error:", e)

# Function to remove a snack from the inventory
def remove_snack(snack_id):
    try:
        for snack in snack_inventory:
            if snack["id"] == snack_id:
                snack_inventory.remove(snack)
                break
        else:
            raise ValueError("Snack ID not found.")
    except ValueError as e:
        print("Error:", e)

# Function to update snack availability
def update_availability(snack_id, new_availability):
    try:
        for snack in snack_inventory:
            if snack["id"] == snack_id:
                snack["availability"] = new_availability
                break
        else:
            raise ValueError("Snack ID not found.")
    except ValueError as e:
        print("Error:", e)

# Function to record a sale and update inventory
def record_sale(snack_id):
    try:
        for snack in snack_inventory:
            if snack["id"] == snack_id:
                if not snack["availability"]:
                    raise ValueError("Snack is not available.")
                snack["availability"] = False
                sales_records.append(snack)
                break
        else:
            raise ValueError("Snack ID not found.")
    except ValueError as e:
        print("Error:", e)


# Main loop for user interaction
while True:
    print("\n1. Add a snack\n2. Remove a snack\n3. Update availability\n4. Record sale\n5. Show Menu\n6. Exit")
    choice = input("Enter your choice (1-6): ")

    if choice == "1":
        id = input("Enter snack ID: ")
        name = input("Enter snack name: ")
        price = float(input("Enter snack price: "))
        availability = input("Is the snack available? (True/False): ").capitalize()
        add_snack(id, name, price, availability == "True")
        print("Item has been added Successfully")

    elif choice == "2":
        snack_id = input("Enter snack ID to remove: ")
        remove_snack(snack_id)
        print("Item has been removed")

    elif choice == "3":
        snack_id = input("Enter snack ID to update availability: ")
        new_availability = input("Enter new availability (True/False): ").capitalize()
        update_availability(snack_id, new_availability == "True")
        print("Item has been updated Successfuly")

    elif choice == "4":
        snack_id = input("Enter snack ID for sale: ")
        record_sale(snack_id)
        print("Item has been sold Successfuly")

    elif choice=='5':
      for i in snack_inventory:
        print(i.name,i.price)

    elif choice == "6":
        print("Thank you for visiting Mumbai Munchies!")
        break

    else:
        print("Invalid choice. Please choose a valid option.")



