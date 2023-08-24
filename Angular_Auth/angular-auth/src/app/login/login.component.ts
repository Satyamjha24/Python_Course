import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData = {
    username: '',
    password: ''
  };

  onSubmit() {
    // You can implement your login logic here
    // For example, send a POST request to the server to authenticate the user
    console.log('Login data:', this.loginData);
    // Redirect to another page after successful login
  }
}
