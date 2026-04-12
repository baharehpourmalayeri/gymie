import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Coach, BookedCoachSession } from '../../../core/models/coach.model';
import { CoachService } from '../../../core/services/coach.service';
import { CoachScheduleService } from '../../../core/services/coach-schedule.service';
import { CoachCalendar } from '../coach-calendar/coach-calendar';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-coach-detail',
  standalone: true,
  imports: [CommonModule, CoachCalendar],
  templateUrl: './coach-detail.html',
})
export class CoachDetail {
  coach: Coach | undefined;
  showCalendar: boolean = false;
  bookingConfirmed: boolean = false;
  bookedSessions: BookedCoachSession[] = [];

  constructor(
    private route: ActivatedRoute,
    private coachService: CoachService,
    private coachScheduleService: CoachScheduleService,
    private cdr: ChangeDetectorRef,
  ) {}
  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.coachService.getBySlug(slug).subscribe((coach) => {
        this.coach = coach;
        this.coachScheduleService.getUserBookings(this.coach).subscribe((bookings) => {
          this.bookedSessions = bookings;
          this.cdr.detectChanges();
        });
        this.cdr.detectChanges();
      });
    }
  }

  onBookingConfirmed(bookedSession: BookedCoachSession) {
    this.bookedSessions.push(bookedSession);
    this.bookingConfirmed = true;
    this.showCalendar = false;
    this.cdr.detectChanges();
  }

  onBookingCanceled(bookingId: number) {
    this.bookedSessions = this.bookedSessions.filter((bs) => bs.id !== bookingId);
  }

  cancelConfirmedBooking(session: BookedCoachSession) {
    if (!session) return;

    const confirmedId = session.id;

    const ok = window.confirm('Are you sure you want to cancel this booking?');
    if (!ok) return;

    this.coachScheduleService.cancelSession(confirmedId).subscribe((r) => {
      this.bookingConfirmed = false;
      this.onBookingCanceled(confirmedId);
      this.cdr.detectChanges();
    });
  }
}
