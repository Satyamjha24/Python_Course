import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  paymentTotal: number = 0;
  cartItems: any[] = [];

  cardData = {
    cardHolder: '',
    cardNumber: '',
  };

  constructor(private cartService: CartService, private router: Router, private toast: NgToastService) {}

  async ngOnInit(): Promise<void> {
    try {
      this.cartItems = await this.cartService.getCartItems();
      this.paymentTotal = this.calculateTotal();
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  }

  calculateTotal(): number {
    return this.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  onSubmit() {
    if (!this.cardData.cardHolder || !this.cardData.cardNumber) {
      this.toast.error({detail:"ERROR",summary:'Please Fill all the details', duration:2000, position:'botomCenter'});
      return; // Exit the function if any field is empty
    }

    this.router.navigate(['/final']);
  }
}