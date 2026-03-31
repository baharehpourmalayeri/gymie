import { Component } from '@angular/core';
import { Calendar } from '../../../shared/calendar/calendar';

@Component({
  selector: 'app-workout-calendar',
  standalone: true,
  imports: [Calendar],
  templateUrl: './workout-calendar.html',
})
export class WorkoutCalendar {}
