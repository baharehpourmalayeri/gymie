import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteToggle } from '../../../shared/favorite/favorite-toggle';
import { Router } from '@angular/router';
import { Workout } from '../../../core/models/workout.model';

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
    this.router.navigate(['/workout', workout.slug]);
  }
}
