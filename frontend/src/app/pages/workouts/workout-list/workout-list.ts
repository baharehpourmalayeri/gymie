import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteToggle } from '../../../shared/favorite/favorite-toggle';
import { Router } from '@angular/router';

export interface Workout {
  title: string;
  description: string;
  longDescription: string;
  image: string;
  isFavorite: boolean;
}

@Component({
  selector: 'app-workout-list',
  standalone: true,
  imports: [CommonModule, FavoriteToggle],
  templateUrl: './workout-list.html',
})
export class WorkoutList {
  @Input() workouts: Workout[] = [];

  constructor(private router: Router) {}

  goToWorkout(workout: Workout) {
    this.router.navigate(['/workout', workout.title]);
  }
}
