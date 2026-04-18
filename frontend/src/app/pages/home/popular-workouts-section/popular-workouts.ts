import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkoutList } from '../../workouts/workout-list/workout-list';
import { RouterLink } from '@angular/router';
import { Workout } from '../../../core/models/workout.model';

@Component({
  selector: 'app-popular-workouts',
  standalone: true,
  imports: [CommonModule, RouterLink, WorkoutList],
  templateUrl: './popular-workouts.html',
})
export class PopularWorkouts {
  @Input() workouts: Workout[] = [];
}
