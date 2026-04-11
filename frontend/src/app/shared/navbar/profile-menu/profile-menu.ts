import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-profile-menu',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './profile-menu.html',
})
export class ProfileMenu {
  @Input() dropdownItems: { label: string; path: string }[] = [];
  @Input() darkMode = false;
  @Output() logout = new EventEmitter<void>();
  @Input() user: any = null;

  profileDropdownOpen = false;
  @ViewChild('profileDropdownRef') profileDropdownRef!: ElementRef;

  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.profileDropdownOpen = !this.profileDropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  closeDropdown(event: Event) {
    if (this.profileDropdownRef && !this.profileDropdownRef.nativeElement.contains(event.target)) {
      this.profileDropdownOpen = false;
    }
  }
}
