import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user = {
    username: '',
    email: '',
    password: ''
  };

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    // Send POST request to JSON Server
    this.http.post('http://localhost:3000/users', this.user)
      .subscribe(response => {
        console.log('Form data sent successfully:', response);
        // You can also navigate or display a success message here
        this.router.navigate(['/login']);
      });
  }
}
