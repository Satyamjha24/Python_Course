import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

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

  constructor(
    private http: HttpClient,
    private router: Router,
    private toast: NgToastService
  ) {}

  onSubmit() {
    if (!this.loginData.username || !this.loginData.password) {
      this.toast.error({detail:"ERROR",summary:'Please Fill all the details', duration:2000, position:'botomCenter'});
      return; // Exit the function if any field is empty
    }
    // ... Other code

    this.http.get<any[]>('https://todo-zlbc.onrender.com/users', {
      params: {
        username: this.loginData.username,
        password: this.loginData.password
      }
    }).subscribe((response) => {
      if (response.length === 1) {
        // User authenticated, navigate to a protected page
        this.router.navigate(['/products']); // Change '/dashboard' to your desired protected route
        // alert(`Login successful ,  Welcome ${this.loginData.username}`); // Display success toast
        this.toast.success({detail:"SUCCESS",summary:'Login successful', duration:2000, position:'botomCenter'})
      } else {
        // Invalid credentials
        // alert('Invalid username or password'); // Display error toast
        this.toast.error({detail:"Login Failed",summary:'Invalid username or password', duration:2000, position:'botomCenter'});
      }
    });
  }
}
