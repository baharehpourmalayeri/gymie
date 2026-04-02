import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Coach, CoachSession } from '../models/coach.model';

@Injectable({ providedIn: 'root' })
export class CoachScheduleService {
  private availableSessions: CoachSession[] = [
    {
      id: 'Alice-1',
      coachId: '1',
      start: '2026-04-02T10:00:00',
      end: '2026-04-02T11:00:00',
      bookedUser: undefined,
    },
    {
      id: 'Oscar-1',
      coachId: '2',
      start: '2026-04-03T10:00:00',
      end: '2026-04-03T11:00:00',
      bookedUser: undefined,
    },
    {
      id: 'Linnea-1',
      coachId: '3',
      start: '2026-04-03T12:00:00',
      end: '2026-04-03T13:00:00',
      bookedUser: undefined,
    },
  ];
  private bookedSessions: CoachSession[] = [];

  userId = 'user123';

  private availableSessions$ = new BehaviorSubject<CoachSession[]>([...this.availableSessions]);
  schedule$ = this.availableSessions$.asObservable();

  getSchedule(coach?: Coach | null): CoachSession[] {
    if (coach) {
      return this.availableSessions.filter((s) => s.coachId === coach.id);
    }
    return [...this.availableSessions];
  }

  isSessionAvailable(sessionId: string): boolean {
    const session = this.availableSessions.find((s) => s.id === sessionId);
    return session ? !session.bookedUser : false;
  }

  bookSession(sessionId: string): boolean {
    const session = this.availableSessions.find((s) => s.id === sessionId);
    if (!session) return false;
    if (session.bookedUser) return false;

    session.bookedUser = this.userId;
    this.availableSessions$.next([...this.availableSessions]);
    this.bookedSessions.push(session);
    return true;
  }

  cancelSession(sessionId: string): boolean {
    const session = this.availableSessions.find((s) => s.id === sessionId);
    if (!session) return false;
    if (session.bookedUser !== this.userId) return false;

    session.bookedUser = undefined;
    this.availableSessions$.next([...this.availableSessions]);
    this.bookedSessions = this.bookedSessions.filter((s) => s.id !== sessionId);
    return true;
  }

  getSessionById(sessionId: string): CoachSession | undefined {
    return this.availableSessions.find((s) => s.id === sessionId);
  }

  getUserBookings(coach?: Coach): CoachSession[] {
    if (coach) {
      return this.bookedSessions.filter((s) => s.coachId === coach.id);
    }
    return this.bookedSessions;
  }
}
