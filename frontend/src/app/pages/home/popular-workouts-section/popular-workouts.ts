import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkoutList, Workout } from '../../workouts/workout-list/workout-list';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-popular-workouts',
  standalone: true,
  imports: [CommonModule, RouterLink, WorkoutList],
  templateUrl: './popular-workouts.html',
})
export class PopularWorkouts {
  @Input() workouts: Workout[] = [];
  @Input() darkMode = false;
}
