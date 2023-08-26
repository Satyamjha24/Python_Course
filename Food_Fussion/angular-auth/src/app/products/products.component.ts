import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import axios from 'axios';

interface CartItem {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
  price: number;
  quantity: number; // Quantity property added
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  products: any[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    axios
      .get('https://todo-typescript-ddgu.onrender.com/dishes')
      .then((response) => {
        this.products = response.data;
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }

  addToCart(product: any) {
    // console.log("Clicked", product)
    const productWithQuantity: CartItem = {
      ...product,
      quantity: 1, 
    };
    this.cartService.addToCart(productWithQuantity);
  }
}
