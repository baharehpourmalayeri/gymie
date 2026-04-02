import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WorkoutList } from './workout-list/workout-list';
import { WorkoutService } from '../../core/services/workout.service';
import { MatIconModule } from '@angular/material/icon';
import { Workout } from '../../core/models/workout.model';

@Component({
  selector: 'app-workouts-page',
  standalone: true,
  imports: [CommonModule, FormsModule, WorkoutList, MatIconModule],
  templateUrl: './workouts.html',
})
export class WorkoutsPage {
  searchTerm = '';
  workouts: Workout[] = [];

  constructor(private workoutService: WorkoutService) {}

  ngOnInit() {
    this.workouts = this.workoutService.getAll();
  }

  filteredWorkouts(): Workout[] {
    if (!this.searchTerm) return this.workouts;
    return this.workouts.filter((w) =>
      w.title.toLowerCase().includes(this.searchTerm.toLowerCase()),
    );
  }
}
