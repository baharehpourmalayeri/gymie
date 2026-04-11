import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Workout } from '../../../core/models/workout.model';
import { WorkoutService } from '../../../core/services/workout.service';
import { FavoriteToggle } from '../../../shared/favorite/favorite-toggle';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-user-favorites',
  standalone: true,
  imports: [CommonModule, FavoriteToggle],
  templateUrl: './user-favorites.html',
})
export class UserFavorites implements OnInit {
  workouts: Workout[] = [];
  loading = true;

  constructor(
    private workoutService: WorkoutService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.workoutService.getFavorites().subscribe({
      next: (workouts) => {
        this.workouts = workouts;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error(error);
        this.loading = false;
      },
    });
  }
}
