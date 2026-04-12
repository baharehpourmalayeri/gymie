import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { WorkoutService } from '../../../core/services/workout.service';
import { Workout } from '../../../core/models/workout.model';
import { FavoriteToggle } from '../../../shared/favorite/favorite-toggle';
import { WorkoutScheduleService } from '../../../core/services/workout-schedule.service';
import { WorkoutCalendar } from '../workout-calendar/workout-calendar';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-workout-detail',
  standalone: true,
  imports: [CommonModule, FavoriteToggle, WorkoutCalendar],
  templateUrl: './workout-detail.html',
})
export class WorkoutDetail {
  workout: Workout | undefined;
  bookedSessions: any[] = [];

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
        this.cdr.detectChanges();
      });
    }
    this.bookedSessions = this.workoutScheduleService.getUserBookings(this.workout);
  }

  onBookingConfirmed(session: any) {
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

    this.onBookingCanceled(confirmedId);
  }
}
