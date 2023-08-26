import { Injectable } from '@angular/core';
import axios from 'axios';
import { NgToastService } from 'ng-angular-popup';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private toast: NgToastService) {}

  private apiUrl = 'https://todo-typescript-ddgu.onrender.com/cart';

  addToCart(productWithQuantity: any) {
    axios
      .post(this.apiUrl, productWithQuantity)
      .then((response) => {
        console.log('Cart updated successfully:', response.data);
        this.toast.success({
          detail: 'Cart updated successfully:',
          summary: `${response.data.strCategory} is added in the cart`,
          duration: 2000,
          position: 'botomCenter',
        });
        // Clear the local cart after successful checkout
      })
      .catch((error) => {
        this.toast.error({
          detail: 'Error updating cart',
          summary: error,
          duration: 2000,
          position: 'botomCenter',
        });
      });
  }

  async getCartItems():Promise<any[]> {
    try {
      const response = await axios.get<any[]>(this.apiUrl);
      return response.data;
    } catch (error) {
      throw new Error('Error fetching cart items');
    }
  }

  async removeFromCart(itemId: number): Promise<void> {
    const url = `${this.apiUrl}/${itemId}`;
    try {
      await axios.delete(url);
    } catch (error) {
      throw new Error('Failed to remove item from cart.');
    }
  }

  async increaseQuantity(id: number, newQuantity: number): Promise<void> {
    const url = `${this.apiUrl}/${id}`;
    const payload = { quantity: newQuantity };
    try {
      await axios.patch(url, payload);
      // Handle success response or status
    } catch (error) {
      throw new Error('Failed to update quantity.');
    }
  }
  async decreaseQuantity(id: number, newQuantity: number): Promise<void> {
    const url = `${this.apiUrl}/${id}`;
    const payload = { quantity: newQuantity };
    try {
      await axios.patch(url, payload);
      // Handle success response or status
    } catch (error) {
      throw new Error('Failed to update quantity.');
    }
  }

  checkout() {
    // Send a request to the server to update the cart
  }
}
