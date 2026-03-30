import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './shared/navbar/navbar';
import { Footer } from './shared/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar, Footer],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  darkMode = false;

  onToggleDarkMode(value: boolean) {
    this.darkMode = value;
    document.documentElement.classList.toggle('dark', this.darkMode);
  }
}
