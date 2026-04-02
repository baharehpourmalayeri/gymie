import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
})
export class Register {
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  register() {
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    console.log('Registering user:', this.name, this.email);
    alert(`Registered user: ${this.name} (${this.email})`);
  }
}
