import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; 
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent {
  user = {
    username: '',
    email: '',
    password: ''
  };

  constructor(private http: HttpClient, private router: Router, private toast: NgToastService) {}

  onSubmit() {
    if (!this.user.username || !this.user.email || !this.user.password) {
      this.toast.error({detail:"ERROR",summary:'Please Fill all the details', duration:2000, position:'botomCenter'});
      return; // Exit the function if any field is empty
    }
    // Send POST request to JSON Server
    this.http.post('https://todo-typescript-ddgu.onrender.com/users', this.user)
      .subscribe(response => {
        console.log('Form data sent successfully:', response);
        // You can also navigate or display a success message here
        this.toast.success({detail:"SUCCESS",summary:'Registration successful', duration:2000, position:'botomCenter'})
        this.router.navigate(['/login']);
      });
  }
}

