import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavLinks } from './nav-links/nav-links';
import { ProfileMenu } from './profile-menu/profile-menu';
import { ToggleDarkMode } from './toggle/toggle';
import { AuthService } from '../../core/services/auth.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, NavLinks, ProfileMenu, ToggleDarkMode],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class Navbar {
  @Input() darkMode = false;
  @Output() darkModeChange = new EventEmitter<boolean>();

  constructor(private authService: AuthService) {}

  user$ = new Observable();

  ngOnInit(): void {
    this.user$ = this.authService.authState$.pipe(map((auth) => auth?.user ?? null));
  }

  links = [
    { path: '/', label: 'Home' },
    { path: '/workouts', label: 'Workouts' },
    { path: '/coaches', label: 'Movers' },
  ];

  dropdownItems = [
    { label: 'My Account', path: '/user/account' },
    { label: 'Bookings', path: '/user/bookings' },
    { label: 'Favorites', path: '/user/favorites' },
    { label: 'Logout', path: '/logout' },
  ];

  onToggleDarkMode(value: boolean) {
    this.darkModeChange.emit(value);
  }

  logout() {
    console.log('Logging out...');
  }
}
