import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-user-account',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './user-account.html',
})
export class UserAccount implements OnInit {
  profileForm: FormGroup;
  profileImageUrl: string | null = null;
  selectedFile: File | null = null;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
  ) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      currentPassword: [''],
      newPassword: [''],
      confirmNewPassword: [''],
    });
  }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile() {
    const loggedInUser = this.authService.getLoggedInUser();
    const user = {
      name: loggedInUser?.user.name,
      email: loggedInUser?.user.email,
    };
    this.profileForm.patchValue({
      name: user.name,
      email: user.email,
    });
  }

  handleChangePassword() {
    console.log('change password');
    const currentPassword = this.profileForm.get('currentPassword')?.value ?? '';
    const newPassword = this.profileForm.get('newPassword')?.value ?? '';
    const confirmNewPassword = this.profileForm.get('confirmNewPassword')?.value ?? '';

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      this.errorMessage = 'All password fields are required';
      return;
    }

    this.errorMessage = '';

    this.authService.changePassword(currentPassword, newPassword, confirmNewPassword).subscribe({
      next: (res) => {
        this.profileForm.patchValue({
          currentPassword: '',
          newPassword: '',
          confirmNewPassword: '',
        });

        alert('Password is updated successfully!');
      },
      error: (err) => {
        console.log('ERROR FULL:', err);
        console.log('ERROR BODY:', err.error);
        this.errorMessage = err.error?.detail || err.error?.message || 'Password change failed';
        this.cdr.detectChanges();
      },
    });
  }
}
