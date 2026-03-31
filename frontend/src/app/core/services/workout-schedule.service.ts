import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Workout } from '../../pages/workouts/workout-list/workout-list';

export interface WorkoutSession {
  workoutTitle: string;
  start: string;
  end: string;
  capacity: number;
  booked: number;
}

@Injectable({ providedIn: 'root' })
export class WorkoutScheduleService {
  private availableSessions: WorkoutSession[] = [
    {
      workoutTitle: 'Yoga',
      start: '2026-04-02T10:00:00',
      end: '2026-04-02T11:00:00',
      capacity: 10,
      booked: 5,
    },
    {
      workoutTitle: 'Yoga',
      start: '2026-04-03T10:00:00',
      end: '2026-04-03T11:00:00',
      capacity: 10,
      booked: 2,
    },
    {
      workoutTitle: 'HIIT',
      start: '2026-04-03T12:00:00',
      end: '2026-04-03T13:00:00',
      capacity: 8,
      booked: 8,
    },
    {
      workoutTitle: 'Pilates',
      start: '2026-04-04T09:00:00',
      end: '2026-04-04T10:00:00',
      capacity: 10,
      booked: 3,
    },
  ];

  private availableSessions$ = new BehaviorSubject<WorkoutSession[]>([...this.availableSessions]);
  schedule$ = this.availableSessions$.asObservable();

  getSchedule(workout?: Workout | null): WorkoutSession[] {
    if (workout) {
      return this.availableSessions.filter((s) => s.workoutTitle === workout.title);
    }
    return [...this.availableSessions];
  }

  isSessionAvailable(sessionId: string): boolean {
    const session = this.availableSessions.find((s) => `${s.workoutTitle}-${s.start}` === sessionId);
    return session ? session.booked < session.capacity : false;
  }

  bookSession(sessionId: string): boolean {
    const session = this.availableSessions.find((s) => `${s.workoutTitle}-${s.start}` === sessionId);
    if (!session) return false;
    if (session.booked >= session.capacity) return false;
    session.booked += 1;
    this.availableSessions$.next([...this.availableSessions]);
    return true;
  }

  cancelSession(sessionId: string): boolean {
    const session = this.availableSessions.find((s) => `${s.workoutTitle}-${s.start}` === sessionId);
    if (!session) return false;
    if (session.booked <= 0) return false;
    session.booked -= 1;
    this.availableSessions$.next([...this.availableSessions]);
    return true;
  }

  getSessionById(sessionId: string) {
    return this.availableSessions.find((s) => `${s.workoutTitle}-${s.start}` === sessionId);
  }
}
