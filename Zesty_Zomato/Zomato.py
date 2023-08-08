# Zesty Zomato!

import json

inventoryFile = "snack_inventory.json"
recordFile = "sales_record.json"


def getFileData(file_name):
    try:
        with open(file_name, 'r') as file:
            data = json.load(file)
            return data
    except (FileNotFoundError, json.JSONDecodeError):
        return []
    
def saveData(data, file_name):
    with open(file_name, 'w') as file:
        json.dump(data, file)

snackInventory = getFileData(inventoryFile)
salesRecords = getFileData(recordFile)

def addSnack(snackID, snackName, snackPrice, availability = "False", quantity = 0):
    newSnack = {
        "snackID" : snackID,
        "snackName": snackName,
        "snackPrice": snackPrice,
        "availability": availability,
        "quantity": int(quantity)
    }

    snackInventory.append(newSnack)
    saveData(snackInventory,inventoryFile)
    print(f"Snack '{snackName}' with ID '{snackID}' added to the inventory.")


def removeSnack(snackID):

    for snack in snackInventory:
        if snack["snackID"] == snackID:
            snackInventory.remove(snack)
            saveData(snackInventory,inventoryFile)
            print(f"Snack with ID {snackID} removed from the inventory")
            return

    
    print(f"Snack with ID {snackID} not found in the snack inventory") 


def updateAvailability(snackID):

    for snack in snackInventory:
        if snack["snackID"] == snackID:
            availability = input("Is Snack Available now? (True/False): ").capitalize()
            snack["availability"] = True if availability == 'True' else False
            saveData(snackInventory,inventoryFile)
            print(f"Snack with ID '{snackID}' availability updated.")
            return

    
    print(f"Snack with ID {snackID} not found in the snack inventory")


def displayInventory():
    print("------------------------------------------------------------------------------")
    print("                                Snack Menu                             ")
    for snack in snackInventory:
        print("------------------------------------------------------------------------------")
        # print()
        print(f"  ID: {snack['snackID']}. | Name: {snack['snackName']} | Price: {snack['snackPrice']} | availability: {snack['availability']} | Quantity: {snack['quantity']}")
        # print()
    print("------------------------------------------------------------------------------")

def recordSale(snackID):
    customerName = input("Enter customer name: ")

    for snack in snackInventory:
        if snack["snackID"] == snackID:
            if not snack["availability"]:
                print("Snack is not available.")
            elif snack["quantity"] >=1 and snack["availability"]:
                if snack["quantity"] == 1:
                    snack["quantity"] = 0
                    snack["availability"] = False
                else:
                    snack["quantity"]= snack["quantity"]-1
                  
                saveData(snackInventory,inventoryFile)
                sale = {"snackID": snackID, "snackName": snack["snackName"] ,"customerName" : customerName}
                salesRecords.append(sale)
                saveData(salesRecords,recordFile)
                print(f"snack order has been placed Successfully!")
                return

    print("Snack ID not found.")



def displaySaleRecord():
        print("--------------------------------------------------------")
        print("                      Sales Record                ")
        for sale in salesRecords:
            print("--------------------------------------------------------")
            print(f"Snack ID: {sale['snackID']}. | Customer Name : {sale['customerName']} |  Name: {sale['snackName']}")
        print("--------------------------------------------------------")


# Main loop for user interaction
print("Welcome to Zomato Chronicles: The Great Food Fiasco!")
while True:
    print("\n1. Add a snack\n2. Remove a snack\n3. Update availability\n4. Take Order\n5. Show Menu\n6. Show Sales Record\n7. Exit")
    choice = input("Enter your choice (1-7): ")

    if choice == "1":
            snackID = input("Enter Snack ID: ")
            snackName = input("Enter Snack Name: ")
            snackPrice = float(input("Enter Snack Price: "))
            availability = input("Is Snack Available? (True/False): ").capitalize()
            quantity = input("Enter Quantity : ")
            addSnack(snackID, snackName, snackPrice, availability, quantity)

    elif choice == "2":
        snackID = input("Enter snack ID to remove: ")
        removeSnack(snackID)

    elif choice == "3":
        snackID = input("Enter Snack ID to update availability: ")
        updateAvailability(snackID)

    elif choice == "4":
        snackID = input("Enter snack ID for sale: ")
        recordSale(snackID)

    elif choice=='5':
      displayInventory()

    elif choice=='6':
      displaySaleRecord()

    elif choice == "7":
        print("Thank you for visiting Zesty Zomato!")
        break

    else:
        print("Invalid choice. Please choose a valid option.")




