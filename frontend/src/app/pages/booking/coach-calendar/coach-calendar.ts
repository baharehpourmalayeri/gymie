import { Component } from '@angular/core';
import { Calendar } from '../../../shared/calendar/calendar';

@Component({
  selector: 'app-coach-calendar',
  standalone: true,
  imports: [Calendar],
  templateUrl: './coach-calendar.html',
})
export class CoachCalendar {}
