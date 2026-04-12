import { Component, OnInit } from '@angular/core';
import { CoachScheduleService } from '../../../core/services/coach-schedule.service';
import { BookedCoachSession, CoachSession } from '../../../core/models/coach.model';
import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './user-bookings.html',
})
export class UserBookings implements OnInit {
  bookings: BookedCoachSession[] = [];
  loading = true;

  constructor(
    private coachScheduleService: CoachScheduleService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.coachScheduleService.getUserBookings().subscribe((data) => {
      this.bookings = data;
      this.loading = false;
      this.cdr.detectChanges();
    });
  }

  getStatusColor(status: string) {
    switch (status) {
      case 'upcoming':
        return 'text-green-800';
      case 'canceled':
        return 'text-red-800';
      default:
        return '';
    }
  }
}
