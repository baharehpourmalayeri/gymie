import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Workout } from '../../core/models/workout.model';
import { WorkoutService } from '../../core/services/workout.service';
import { PopularWorkouts } from './popular-workouts-section/popular-workouts';
import { About } from './about-us-section/about';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PopularWorkouts, About],
  templateUrl: './home.html',
})
export class Home {
  topWorkouts: Workout[] = [];
  scrollY = 0;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrollY = window.scrollY;
  }

  constructor(private workoutService: WorkoutService) {}

  ngOnInit() {
    this.topWorkouts = this.workoutService.getTop(3);
  }
}
