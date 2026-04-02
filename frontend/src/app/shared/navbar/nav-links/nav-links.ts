import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Link {
  path: string;
  label: string;
}

@Component({
  selector: 'app-nav-links',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nav-links.html',
})
export class NavLinks {
  @Input() links: Link[] = [];
}
