import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
})
export class Login {
  email: string = '';
  password: string = '';
  errorMessage = '';
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  login() {
    this.authService
      .login({
        email: this.email,
        password: this.password,
      })
      .subscribe({
        next: (res) => {
          console.log(res);
          this.authService.saveLoggedInUser(res);
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = err.error?.detail || 'Login failed';
        },
      });
  }
}
