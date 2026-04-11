import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.html',
})
export class Register {
  name = '';
  email = '';
  password = '';
  confirmPassword = '';

  successMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  register() {
    if (this.password !== this.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    this.authService
      .register({
        name: this.name,
        email: this.email,
        password: this.password,
      })
      .subscribe({
        next: (res) => {
          console.log(res);
          this.authService.saveLoggedInUser(res);
          this.successMessage = 'User registered successfully';
          this.name = '';
          this.email = '';
          this.password = '';
          this.confirmPassword = '';
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error(err);
          alert(err.error?.detail || 'Registration failed');
        },
      });
  }

  get isFormValid(): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return (
      this.name.trim().length >= 2 &&
      emailPattern.test(this.email) &&
      this.password.trim() !== '' &&
      this.confirmPassword.trim() !== '' &&
      this.password === this.confirmPassword
    );
  }
}
