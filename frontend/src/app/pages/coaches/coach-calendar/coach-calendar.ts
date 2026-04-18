import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import { FullCalendarModule } from '@fullcalendar/angular';
import { Coach, CoachSession, BookedCoachSession } from '../../../core/models/coach.model';
import { CoachScheduleService } from '../../../core/services/coach-schedule.service';
import { ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
@Component({
  selector: 'app-coach-calendar',
  standalone: true,
  imports: [FullCalendarModule],
  templateUrl: './coach-calendar.html',
})
export class CoachCalendar implements OnInit, OnChanges {
  @Input() coach!: Coach;
  @Input() bookedSessions!: BookedCoachSession[];
  @Output() bookingConfirmed = new EventEmitter<BookedCoachSession>();
  @Output() bookingCanceled = new EventEmitter<number>();

  calendarOptions: CalendarOptions = this.getCalendarOptions();

  ngOnInit() {
    this.loadAvailableSessions();

    this.calendarOptions.eventClick = (info) => this.handleEventClick(info);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['bookedSessions']) {
      this.loadAvailableSessions();
    }
  }

  getCalendarOptions(): CalendarOptions {
    return {
      initialView: 'timeGridDay',
      plugins: [timeGridPlugin],

      slotMinTime: '10:00:00',
      slotMaxTime: '17:00:00',
      allDaySlot: false,

      events: [],

      height: 'auto',
    };
  }

  constructor(
    private coachScheduleService: CoachScheduleService,
    private cdr: ChangeDetectorRef,
    private authService: AuthService,
  ) {}

  loadAvailableSessions() {
    this.coachScheduleService.getSchedule(this.coach.slug).subscribe((allSessions) => {
      const events = allSessions.map((s) => {
        const sessionId = s.id;

        let title = '';
        let backgroundColor = '';

        if (s.isBooked) {
          title = `Your Booking: ${this.coach.name}`;
          backgroundColor = 'blue';
        } else {
          title = this.coach.name;
          backgroundColor = s.isBooked ? 'red' : 'green';
        }

        return {
          id: String(sessionId),
          title,
          start: s.start,
          end: s.end,
          session: s,
          backgroundColor,
          extendedProps: { ...s },
        };
      });

      this.calendarOptions.events = events;
      this.cdr.detectChanges();
    });
  }

  handleEventClick(info: any) {
    if (!this.authService.isLoggedIn()) {
      alert('Authentication is required!');
      return;
    }
    console.log(info.event.extendedProps);
    const event = info.event;
    const session = event.extendedProps;
    const sessionId = session.id;
    const coachId = session.coach.id;

    const alreadyBooked = session.isBooked;
    if (alreadyBooked) {
      const bookedSession: BookedCoachSession = this.bookedSessions.filter(
        (bs) => bs.session_id == sessionId,
      )[0];
      const cancel = window.confirm(`You booked ${this.coach.name}. Cancel it?`);
      if (cancel) {
        this.coachScheduleService.cancelSession(bookedSession.id).subscribe((r) => {
          this.cdr.detectChanges();
          this.bookingCanceled.emit(bookedSession.id);
          alert('Booking canceled!');
        });
      }
      return;
    }

    if (session.isBooked) {
      alert('This coach session is already booked.');
      return;
    }

    const confirmBooking = window.confirm(`Do you want to book ${this.coach.name}?`);
    if (!confirmBooking) return;

    this.coachScheduleService.bookSession(coachId, sessionId).subscribe((r: BookedCoachSession) => {
      this.cdr.detectChanges();
      this.bookingConfirmed.emit({ ...r });
      this.loadAvailableSessions();
      alert('Booked successfully!');
    });
  }
}
