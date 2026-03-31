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
import { Workout } from '../../pages/workouts/workout-list/workout-list';
import {
  WorkoutScheduleService,
  WorkoutSession,
} from '../../core/services/workout-schedule.service';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [FullCalendarModule],
  templateUrl: './calendar.html',
})
export class Calendar implements OnInit, OnChanges {
  @Input() mode: 'workouts' | 'coaches' = 'workouts';
  @Input() workout: Workout | null = null;
  @Input() bookedSessions: any[] = [];
  @Output() bookingConfirmed = new EventEmitter<any>();
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

  constructor(private workoutScheduleService: WorkoutScheduleService) {}

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
    const allSessions = this.workoutScheduleService.getSchedule(this.workout);

    const events = allSessions.map((s) => {
      const sessionId = `${s.workoutTitle}-${s.start}`;
      const spotsLeft = s.capacity - s.booked;
      const isBooked = this.bookedSessions.find((bs) => bs.id === sessionId);

      if (isBooked) {
        return {
          id: sessionId,
          title: `Your Booking: ${s.workoutTitle}`,
          start: s.start,
          end: s.end,
          backgroundColor: 'blue',
          extendedProps: { ...s },
        };
      }

      return {
        id: sessionId,
        title: `${s.workoutTitle} (${spotsLeft} spots left)`,
        start: s.start,
        end: s.end,
        backgroundColor: spotsLeft === 0 ? 'red' : 'green',
        extendedProps: { ...s },
      };
    });

    this.calendarOptions.events = events;
  }

  handleEventClick(info: any) {
    const event = info.event;
    const sessionId = event.id;
    const session: WorkoutSession = this.workoutScheduleService.getSessionById(sessionId)!;

    if (!session) return;

    const alreadyBooked = this.bookedSessions.find((bs) => bs.id === sessionId);

    if (alreadyBooked) {
      const cancel = window.confirm(`You booked ${session.workoutTitle}. Cancel it?`);

      if (cancel) {
        this.workoutScheduleService.cancelSession(sessionId);
        this.bookingCanceled.emit(sessionId);
        alert('Booking canceled!');
      }
      return;
    }

    const isFull = session.booked >= session.capacity;

    if (isFull) {
      alert('No spots available for this session.');
      return;
    }

    const confirmBooking = window.confirm(`Do you want to book ${session.workoutTitle}?`);

    if (!confirmBooking) return;

    this.workoutScheduleService.bookSession(sessionId);

    this.bookingConfirmed.emit({ ...session, id: sessionId });

    alert('Booked successfully!');
  }
}
