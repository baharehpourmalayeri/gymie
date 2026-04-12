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
import { Workout, WorkoutSession } from '../../../core/models/workout.model';
import { WorkoutScheduleService } from '../../../core/services/workout-schedule.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-workout-calendar',
  standalone: true,
  imports: [FullCalendarModule],
  templateUrl: './workout-calendar.html',
})
export class WorkoutCalendar implements OnInit, OnChanges {
  @Input() workout!: Workout;
  @Input() bookedSessions!: WorkoutSession[];
  @Output() bookingConfirmed = new EventEmitter<WorkoutSession>();
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

  constructor(
    private workoutScheduleService: WorkoutScheduleService,
    private cdr: ChangeDetectorRef,
  ) {}

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
    this.workoutScheduleService.getSchedule(this.workout.slug).subscribe((allSessions) => {
      const events = allSessions.map((s) => {
        const sessionId = s.id;
        const isBooked = this.bookedSessions.find((bs) => bs.id === sessionId);

        let title = '';
        let backgroundColor = '';

        const spotsLeft = s.capacity - s.booked;
        if (isBooked) {
          title = `Your Booking: ${this.workout.title}`;
          backgroundColor = 'blue';
        } else {
          title = `${this.workout.title} (${spotsLeft} spots left)`;
          backgroundColor = spotsLeft === 0 ? 'red' : 'green';
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
      this.cdr.detectChanges();
    });
  }

  handleEventClick(info: any) {
    const event = info.event;
    const sessionId = event.id;

    let session: WorkoutSession | undefined = this.workoutScheduleService.getSessionById(sessionId);

    if (!session) return;

    const alreadyBooked = this.bookedSessions.find((bs) => bs.id === sessionId);
    if (alreadyBooked) {
      const cancel = window.confirm(`You booked ${this.workout.title}. Cancel it?`);
      if (cancel) {
        this.workoutScheduleService.cancelSession(sessionId);
        this.bookingCanceled.emit(sessionId);
        alert('Booking canceled!');
      }
      return;
    }

    if (session.booked >= session.capacity) {
      alert('No spots available for this session.');
      return;
    }

    const confirmBooking = window.confirm(`Do you want to book ${this.workout.title}?`);
    if (!confirmBooking) return;

    this.workoutScheduleService.bookSession(sessionId);

    this.bookingConfirmed.emit({ ...session, id: sessionId });
    this.loadAvailableSessions();
    alert('Booked successfully!');
  }
}
