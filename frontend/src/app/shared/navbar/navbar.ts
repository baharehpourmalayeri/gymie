import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavLinks } from './nav-links/nav-links';
import { ProfileMenu } from './profile-menu/profile-menu';
import { ToggleDarkMode } from './toggle/toggle';

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

  links = [
    { path: '/', label: 'Home' },
    { path: '/workouts', label: 'Workouts' },
    { path: '/coaches', label: 'Movers' },
  ];

  dropdownItems = [
    { label: 'My Account', path: '/profile' },
    { label: 'Bookings', path: '/profile/bookings' },
    { label: 'Favorites', path: '/profile/favorites' },
  ];

  onToggleDarkMode(value: boolean) {
    this.darkModeChange.emit(value);
  }

  logout() {
    console.log('Logging out...');
  }
}
