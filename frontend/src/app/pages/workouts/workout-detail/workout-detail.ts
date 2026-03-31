import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { WorkoutService } from '../../../core/services/workout.service';
import { Workout } from '../workout-list/workout-list';
import { FavoriteToggle } from '../../../shared/favorite/favorite-toggle';
import { Calendar } from '../../../shared/calendar/calendar';
import {
  WorkoutScheduleService,
  WorkoutSession,
} from '../../../core/services/workout-schedule.service';

@Component({
  selector: 'app-workout-detail',
  standalone: true,
  imports: [CommonModule, FavoriteToggle, Calendar],
  templateUrl: './workout-detail.html',
})
export class WorkoutDetail {
  workout: Workout | undefined;
  showCalendar: boolean = false;
  isCalendarOpen: boolean = false;
  bookingConfirmed: boolean = false;
  bookedSessions: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private workoutService: WorkoutService,
    private workoutScheduleService: WorkoutScheduleService,
  ) {}
  ngOnInit() {
    const title = this.route.snapshot.paramMap.get('title');
    if (title) {
      this.workout = this.workoutService.getByTitle(title);
    }
  }

  onFavoriteChange(isFav: boolean) {
    if (this.workout) {
      this.workout.isFavorite = isFav;
    }
  }

  openCalendar(workout: Workout) {
    if (this.isCalendarOpen && this.showCalendar) {
      this.isCalendarOpen = false;
      this.showCalendar = false;
    } else {
      this.isCalendarOpen = true;
      this.bookingConfirmed = false;
      this.showCalendar = true;
    }
  }

  onBookingConfirmed(session: any) {
    this.bookingConfirmed = true;
    this.isCalendarOpen = false;
    this.showCalendar = false;

    const exists = this.bookedSessions.find((bs) => bs.id === session.id);
    if (!exists) this.bookedSessions.push(session);
  }

  onBookingCanceled(sessionId: string) {
    this.bookedSessions = this.bookedSessions.filter((bs) => bs.id !== sessionId);
  }

  cancelConfirmedBooking(session: any) {
    if (!session) return;

    const confirmedId = session.id;

    const ok = window.confirm('Are you sure you want to cancel this booking?');
    if (!ok) return;

    this.bookedSessions = this.bookedSessions.filter((bs) => bs.id !== confirmedId);

    this.workoutScheduleService.cancelSession(confirmedId);

    this.bookingConfirmed = false;

    this.onBookingCanceled(confirmedId);
  }
}
