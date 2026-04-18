import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { WorkoutService } from '../../../core/services/workout.service';
import { BookedWorkoutSession, Workout } from '../../../core/models/workout.model';
import { FavoriteToggle } from '../../../shared/favorite/favorite-toggle';
import { WorkoutScheduleService } from '../../../core/services/workout-schedule.service';
import { WorkoutCalendar } from '../workout-calendar/workout-calendar';
import { ChangeDetectorRef } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-workout-detail',
  standalone: true,
  imports: [CommonModule, FavoriteToggle, WorkoutCalendar, MatIconModule, RouterLink],
  templateUrl: './workout-detail.html',
})
export class WorkoutDetail {
  workout: Workout | undefined;
  showCalendar: boolean = false;
  bookingConfirmed: boolean = false;
  bookedSessions: BookedWorkoutSession[] = [];

  constructor(
    private route: ActivatedRoute,
    private workoutService: WorkoutService,
    private workoutScheduleService: WorkoutScheduleService,
    private cdr: ChangeDetectorRef,
  ) {}
  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.workoutService.getBySlug(slug).subscribe((workout) => {
        this.workout = workout;
        this.workoutScheduleService.getUserBookings(this.workout).subscribe((bookings) => {
          this.bookedSessions = bookings;
          this.cdr.detectChanges();
        });
        this.cdr.detectChanges();
      });
    }
  }

  onBookingConfirmed(bookedSession: BookedWorkoutSession) {
    this.bookedSessions.push(bookedSession);
    this.bookingConfirmed = true;
    this.showCalendar = false;
    this.cdr.detectChanges();
  }

  onBookingCanceled(bookingId: number) {
    this.bookedSessions = this.bookedSessions.filter((bs) => bs.id !== bookingId);
  }

  cancelConfirmedBooking(session: BookedWorkoutSession) {
    if (!session) return;

    const confirmedId = session.id;

    const ok = window.confirm('Are you sure you want to cancel this booking?');
    if (!ok) return;

    this.workoutScheduleService.cancelSession(confirmedId).subscribe((r) => {
      this.bookingConfirmed = false;
      this.onBookingCanceled(confirmedId);
      this.cdr.detectChanges();
    });
  }
}
