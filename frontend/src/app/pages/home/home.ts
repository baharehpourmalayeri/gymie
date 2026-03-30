import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Workout } from '../workouts/workout-list/workout-list';
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

  rewardCards = [
    { title: 'Easy Booking', description: 'Reserve your spot in just a few clicks.' },
    { title: 'Popular Sessions', description: 'Join Yoga, HIIT, Pilates and more.' },
    { title: 'Earn Points', description: 'Stay active and get rewarded.' },
  ];

  constructor(private workoutService: WorkoutService) {}

  ngOnInit() {
    this.topWorkouts = this.workoutService.getTop(3);
  }
}
