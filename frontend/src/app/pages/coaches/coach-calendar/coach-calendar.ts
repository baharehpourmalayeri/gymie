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
import { Coach, CoachSession } from '../../../core/models/coach.model';
import { CoachScheduleService } from '../../../core/services/coach-schedule.service';

@Component({
  selector: 'app-coach-calendar',
  standalone: true,
  imports: [FullCalendarModule],
  templateUrl: './coach-calendar.html',
})
export class CoachCalendar implements OnInit, OnChanges {
  @Input() coach!: Coach;
  @Input() bookedSessions!: CoachSession[];
  @Output() bookingConfirmed = new EventEmitter<CoachSession>();
  @Output() bookingCanceled = new EventEmitter<string>();

  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    plugins: [timeGridPlugin],
    slotMinTime: '08:00:00',
    slotMaxTime: '18:00:00',
    allDaySlot: false,
    events: [],
    height: '100%',
  };

  constructor(private coachScheduleService: CoachScheduleService) {}

  ngOnInit() {
    this.loadAvailableSessions();

    this.calendarOptions.eventClick = (info) => this.handleEventClick(info);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['bookedSessions']) {
      this.loadAvailableSessions();
    }
  }
  loadAvailableSessions() {
    let allSessions: CoachSession[] = this.coachScheduleService.getSchedule(this.coach);

    const events = allSessions.map((s) => {
      const sessionId = s.id;
      const isBooked = this.bookedSessions.find((bs) => bs.id === sessionId);

      let title = '';
      let backgroundColor = '';

      if (isBooked) {
        title = `Your Booking: ${this.coach.name}`;
        backgroundColor = 'blue';
      } else {
        title = this.coach.name;
        backgroundColor = s.bookedUser ? 'red' : 'green';
      }

      return {
        id: sessionId,
        title,
        start: s.start,
        end: s.end,
        backgroundColor,
        extendedProps: { ...s },
      };
    });

    this.calendarOptions.events = events;
  }

  handleEventClick(info: any) {
    const event = info.event;
    const sessionId = event.id;

    let session: CoachSession | undefined;

    session = this.coachScheduleService.getSessionById(sessionId);

    if (!session) return;

    const alreadyBooked = this.bookedSessions.find((bs) => bs.id === sessionId);
    if (alreadyBooked) {
      const cancel = window.confirm(`You booked ${this.coach.name}. Cancel it?`);
      if (cancel) {
        this.coachScheduleService.cancelSession(sessionId);
        this.bookingCanceled.emit(sessionId);
        alert('Booking canceled!');
      }
      return;
    }

    if (session.bookedUser) {
      alert('This coach session is already booked.');
      return;
    }

    const confirmBooking = window.confirm(`Do you want to book ${this.coach.name}?`);
    if (!confirmBooking) return;

    this.coachScheduleService.bookSession(sessionId);

    this.bookingConfirmed.emit({ ...session, id: sessionId });
    this.loadAvailableSessions();
    alert('Booked successfully!');
  }
}
