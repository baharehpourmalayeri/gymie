import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavLinks } from './nav-links/nav-links';
import { ProfileMenu } from './profile-menu/profile-menu';
import { ToggleDarkMode } from './toggle/toggle';
import { AuthService } from '../../core/services/auth.service';
import { map, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, NavLinks, ProfileMenu, ToggleDarkMode, MatIconModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class Navbar {
  @Input() darkMode = false;
  @Output() darkModeChange = new EventEmitter<boolean>();

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  user$ = new Observable();

  ngOnInit(): void {
    this.user$ = this.authService.authState$.pipe(map((auth) => auth?.user ?? null));
  }

  links = [
    { path: '/', label: 'Home' },
    { path: '/workouts', label: 'Workouts' },
    { path: '/coaches', label: 'Movers' },
  ];

  userAccountLinks = [
    { label: 'My Account', path: '/user/account' },
    { label: 'Bookings', path: '/user/bookings' },
    { label: 'Favorites', path: '/user/favorites' },
    { label: 'Logout', action: 'logout' },
  ];

  onToggleDarkMode(value: boolean) {
    this.darkModeChange.emit(value);
  }

  logout() {
    const confirmed = window.confirm('Are you sure you want to logout?');

    if (!confirmed) return;

    this.authService.logout();
    this.router.navigate(['/login']);
  }

  mobileMenuOpen = false;

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  onItemClick(item: any) {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    if (item.action === 'logout') {
      this.logout();
      return;
    }

    if (item.path) {
      this.router.navigate([item.path]);
    }
  }
}
