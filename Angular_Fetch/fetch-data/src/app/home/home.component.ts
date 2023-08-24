import { Component, OnInit } from '@angular/core';
import axios from 'axios';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  products: any[] = [];
  ngOnInit(): void {
    axios
      .get('https://www.themealdb.com/api/json/v1/1/categories.php')
      .then((response) => {
        this.products = response.data.categories;
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }
}
