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
import { BookedWorkoutSession, Workout } from '../../../core/models/workout.model';
import { WorkoutScheduleService } from '../../../core/services/workout-schedule.service';
import { ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-workout-calendar',
  standalone: true,
  imports: [FullCalendarModule],
  templateUrl: './workout-calendar.html',
})
export class WorkoutCalendar implements OnInit, OnChanges {
  @Input() workout!: Workout;
  @Input() bookedSessions!: BookedWorkoutSession[];
  @Output() bookingConfirmed = new EventEmitter<BookedWorkoutSession>();
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
    private workoutScheduleService: WorkoutScheduleService,
    private cdr: ChangeDetectorRef,
    private authService: AuthService,
  ) {}

  loadAvailableSessions() {
    this.workoutScheduleService.getSchedule(this.workout.slug).subscribe((allSessions) => {
      const events = allSessions.map((s) => {
        const sessionId = s.id;

        let title = '';
        let backgroundColor = '';

        const spotsLeft = s.capacity - s.booked;
        if (s.isBooked) {
          title = `Your Booking: ${this.workout.title}`;
          backgroundColor = 'blue';
        } else {
          title = `${this.workout.title} (${spotsLeft} spots left)`;
          backgroundColor = spotsLeft === 0 ? 'red' : 'green';
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
    const event = info.event;
    const session = event.extendedProps;
    const sessionId = event.id;
    const workoutId = session.workout.id;

    const alreadyBooked = session.isBooked;
    if (alreadyBooked) {
      const bookedSession: BookedWorkoutSession = this.bookedSessions.filter(
        (bs) => bs.session_id == sessionId,
      )[0];
      const cancel = window.confirm(`You booked ${this.workout.title}. Cancel it?`);
      if (cancel) {
        this.workoutScheduleService.cancelSession(bookedSession.id).subscribe((r) => {
          this.cdr.detectChanges();
          this.bookingCanceled.emit(bookedSession.id);
          alert('Booking canceled!');
        });
      }
      return;
    }

    if (session.booked >= session.capacity) {
      alert('No spots available for this session.');
      return;
    }

    const confirmBooking = window.confirm(`Do you want to book ${this.workout.title}?`);
    if (!confirmBooking) return;

    this.workoutScheduleService.bookSession(workoutId, sessionId).subscribe({
      next: (r: BookedWorkoutSession) => {
        this.cdr.detectChanges();
        this.bookingConfirmed.emit({ ...r });
        this.loadAvailableSessions();
        alert('Booked successfully!');
      },
    });
  }
}
