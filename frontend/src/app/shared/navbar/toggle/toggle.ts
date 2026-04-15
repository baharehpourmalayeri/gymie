import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-toggle-dark-mode',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './toggle.html',
})
export class ToggleDarkMode {
  @Input() darkMode = false;
  @Output() darkModeChange = new EventEmitter<boolean>();

  toggle() {
    this.darkModeChange.emit(!this.darkMode);
  }
}
