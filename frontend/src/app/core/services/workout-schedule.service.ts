import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Workout } from '../models/workout.model';
import { WorkoutSession } from '../models/workout.model';

@Injectable({ providedIn: 'root' })
export class WorkoutScheduleService {
  private availableSessions: WorkoutSession[] = [
    {
      id: 'Yoga-1',
      workoutId: '1',
      start: '2026-04-02T10:00:00',
      end: '2026-04-02T11:00:00',
      capacity: 10,
      booked: 5,
    },
    {
      id: 'Yoga-2',
      workoutId: '1',
      start: '2026-04-03T10:00:00',
      end: '2026-04-03T11:00:00',
      capacity: 10,
      booked: 2,
    },
    {
      id: 'HIIT-1',
      workoutId: '2',
      start: '2026-04-03T12:00:00',
      end: '2026-04-03T13:00:00',
      capacity: 8,
      booked: 8,
    },
    {
      id: 'Pilates-1',
      workoutId: '3',
      start: '2026-04-04T09:00:00',
      end: '2026-04-04T10:00:00',
      capacity: 10,
      booked: 3,
    },
    {
      id: 'Crossfit-1',
      workoutId: '5',
      start: '2026-04-04T09:00:00',
      end: '2026-04-04T10:00:00',
      capacity: 5,
      booked: 4,
    },
  ];
  private bookedSessions: WorkoutSession[] = [];

  private availableSessions$ = new BehaviorSubject<WorkoutSession[]>([...this.availableSessions]);
  schedule$ = this.availableSessions$.asObservable();

  getSchedule(workout?: Workout | null): WorkoutSession[] {
    if (workout) {
      return this.availableSessions.filter((s) => s.workoutId === workout.id);
    }
    return [...this.availableSessions];
  }

  isSessionAvailable(sessionId: string): boolean {
    const session = this.availableSessions.find((s) => s.id === sessionId);
    return session ? session.booked < session.capacity : false;
  }

  bookSession(sessionId: string): boolean {
    const session = this.availableSessions.find((s) => s.id === sessionId);
    if (!session) return false;
    if (session.booked >= session.capacity) return false;
    session.booked += 1;
    this.availableSessions$.next([...this.availableSessions]);

    this.bookedSessions.push(session);
    return true;
  }

  cancelSession(sessionId: string): boolean {
    const session = this.availableSessions.find((s) => s.id === sessionId);
    if (!session) return false;
    if (session.booked <= 0) return false;
    session.booked -= 1;
    this.availableSessions$.next([...this.availableSessions]);
    this.bookedSessions = this.bookedSessions.filter((s) => s.id !== sessionId);
    return true;
  }

  getSessionById(sessionId: string): WorkoutSession | undefined {
    return this.availableSessions.find((s) => s.id === sessionId);
  }

  getUserBookings(workout?: Workout): WorkoutSession[] {
    if (workout) {
      return this.bookedSessions.filter((s) => s.workoutId === workout.id);
    }
    return this.bookedSessions;
  }
}
