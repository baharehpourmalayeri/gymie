import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
})
export class Login {
  email: string = '';
  password: string = '';

  login() {
    console.log('Logging in with', this.email, this.password);
    alert(`Logged in with: ${this.email}`);
  }
}
