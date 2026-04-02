import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Coach } from '../../../core/models/coach.model';
import { CoachService } from '../../../core/services/coach.service';
import { CoachScheduleService } from '../../../core/services/coach-schedule.service';
import { CoachCalendar } from '../coach-calendar/coach-calendar';

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
  bookedSessions: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private coachService: CoachService,
    private coachScheduleService: CoachScheduleService,
  ) {}
  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.coach = this.coachService.getBySlug(slug);
    }
    this.bookedSessions = this.coachScheduleService.getUserBookings(this.coach);
  }

  onBookingConfirmed(session: any) {
    this.bookingConfirmed = true;
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

    this.coachScheduleService.cancelSession(confirmedId);

    this.bookingConfirmed = false;

    this.onBookingCanceled(confirmedId);
  }
}
