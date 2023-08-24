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
    // ... Other code
    if (!this.loginData.username || !this.loginData.password) {
      this.toast.error({detail:"ERROR",summary:'Please Fill all the details', duration:2000, position:'botomCenter'});
      return; 
    }

    this.http.get<any[]>('https://todo-typescript-ddgu.onrender.com/users', {
      params: {
        username: this.loginData.username,
        password: this.loginData.password
      }
    }).subscribe((response) => {
      if (response.length === 1) {
        this.router.navigate(['/']); 
        this.toast.success({detail:"SUCCESS",summary:'Login Successful',duration:5000, position:'botomCenter'});

      } else {
        // Invalid credentials
        // alert('Invalid username or password'); // Display error toast
        this.toast.error({detail:"Login Failed",summary:'Invalid username or password',duration:5000, position:'botomCenter'});
      }
    });
  }
}