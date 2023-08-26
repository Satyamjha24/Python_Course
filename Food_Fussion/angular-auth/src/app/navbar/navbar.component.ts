import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isMobileMenuHidden = true;

  toggleMobileMenu() {
    this.isMobileMenuHidden = !this.isMobileMenuHidden;
  }
}
