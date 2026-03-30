import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FavoriteService } from '../../core/services/favorite.service';

@Component({
  selector: 'app-favorite-toggle',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <button
      type="button"
      (click)="toggle($event)"
      class="transition-transform duration-150 hover:scale-110"
      aria-label="Toggle favorite"
    >
      <mat-icon
        class="transition-all duration-200 cursor-pointer inline-block transform"
        [style.color]="isFavorite ? '#ef4444' : '#6b7280'"
      >
        {{ isFavorite ? 'favorite' : 'favorite_border' }}
      </mat-icon>
    </button>
  `,
})
export class FavoriteToggle {
  @Output() favoriteChange = new EventEmitter<boolean>();
  @Input() id!: string;

  constructor(private favoriteService: FavoriteService) {}

  get isFavorite() {
    return this.id ? this.favoriteService.isFavorite(this.id) : false;
  }

  toggle(event?: MouseEvent) {
    event?.stopPropagation();
    this.favoriteService.toggle(this.id);
    this.favoriteChange.emit(this.isFavorite);
  }
}
