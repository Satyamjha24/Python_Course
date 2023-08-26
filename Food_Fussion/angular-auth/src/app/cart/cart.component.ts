import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  total: number = 0;
  invalidPromoCode: boolean = false;

  constructor(private cartService: CartService, private toast: NgToastService) {}

  async ngOnInit(): Promise<void> {
    try {
      this.cartItems = await this.cartService.getCartItems();
      this.total = this.calculateTotal(); 
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  }

  calculateTotal(): number {
    return this.cartItems.reduce((total, item) => total + (item.price*item.quantity), 0);
  }


  async removeItem(id: number): Promise<void> {
    try {
      // console.log('Before removal:', this.cartItems);

      // Call the service to remove the item
      await this.cartService.removeFromCart(id);

      // Update the local cart items array
      this.cartItems = this.cartItems.filter(
        (item) => item.id !== id
      );
      // console.log('After removal:', this.cartItems); 
      this.toast.warning({detail:"Delete",summary:'Item removed from the cart', duration:2000, position:'botomCenter'});
      // Recalculate totals
      this.total = this.calculateTotal();
    } catch (error) {
      console.error('Error removing item:', error);
      // Handle error, show user feedback, etc.
    }
  }

  increaseQuantity(item: any): void {
    const newQuantity = item.quantity + 1;

    // Call the service to increase quantity
    this.cartService
      .increaseQuantity(item.id, newQuantity)
      .then(() => {
        // Update the local quantity in the item object
        item.quantity = newQuantity;
        this.total = this.calculateTotal();
        // Recalculate totals or other data if needed
      })
      .catch((error) => {
        console.error('Error increasing quantity:', error);
        // Handle error, show user feedback, etc.
      });
  }

  decreaseQuantity(item: any): void {
    // console.log(item)
    const newQuantity = Number(item.quantity) - 1;

    // Call the service to increase quantity
    this.cartService
      .decreaseQuantity(item.id, newQuantity)
      .then(() => {
        // Update the local quantity in the item object
        item.quantity = newQuantity;
        this.total = this.calculateTotal();
        // Recalculate totals or other data if needed
      })
      .catch((error) => {
        console.error('Error increasing quantity:', error);
        // Handle error, show user feedback, etc.
      });
  }
}