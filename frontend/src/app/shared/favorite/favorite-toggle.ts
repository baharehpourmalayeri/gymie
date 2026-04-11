import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { WorkoutService } from '../../core/services/workout.service';
import { Workout } from '../../core/models/workout.model';

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
  @Input() workout!: Workout;

  constructor(private workoutService: WorkoutService) {}

  get isFavorite() {
    return this.workout.isFavorite;
  }

  toggle(event?: MouseEvent) {
    event?.stopPropagation();

    const currentIsFavorite = this.workout.isFavorite;
    const nextIsFavorite = !currentIsFavorite;

    this.workout.isFavorite = nextIsFavorite;

    const request$ = nextIsFavorite
      ? this.workoutService.favoriteWorkout(this.workout.slug)
      : this.workoutService.unfavoriteWorkout(this.workout.slug);

    request$.subscribe({
      next: () => {},
      error: (error) => {
        console.error(error);
        this.workout.isFavorite = currentIsFavorite;
      },
    });
  }
}
