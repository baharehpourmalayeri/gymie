import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Coach, CoachSession, BookedCoachSession } from '../models/coach.model';
import { Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class CoachScheduleService {
  private coachSessionApiUrl = 'http://127.0.0.1:8000/coaches';
  private coachBookSessionApiUrl = 'http://127.0.0.1:8000/bookings';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {}

  private bookedSessions: CoachSession[] = [];

  userId = 'user123';

  getSchedule(slug: string): Observable<CoachSession[]> {
    return this.http.get<CoachSession[]>(
      `${this.coachSessionApiUrl}/${slug}/sessions`,
      this.getAuthOptions(),
    );
  }

  bookSession(coachId: number, coachSessionId: number): Observable<BookedCoachSession> {
    const authOptions = this.getAuthOptions();
    if (!authOptions.headers) {
      return throwError(() => new Error('Authentication required'));
    }
    return this.http.post<BookedCoachSession>(
      `${this.coachBookSessionApiUrl}/coach`,
      {
        coach_id: coachId,
        coach_session_id: coachSessionId,
      },
      authOptions,
    );
  }

  cancelSession(bookingId: number): Observable<boolean> {
    console.log(bookingId);
    const authOptions = this.getAuthOptions();
    if (!authOptions.headers) {
      return throwError(() => new Error('Authentication required'));
    }
    return this.http.delete<boolean>(
      `${this.coachBookSessionApiUrl}/coach/${bookingId}`,
      authOptions,
    );
  }

  getUserBookings(coach?: Coach): Observable<BookedCoachSession[]> {
    const authOptions = this.getAuthOptions();
    if (!authOptions.headers) {
      return throwError(() => new Error('Authentication required'));
    }
    return this.http.get<BookedCoachSession[]>(
      `${this.coachBookSessionApiUrl}/coaches/${coach ? coach.slug : ''}`,
      authOptions,
    );
  }

  private getAuthOptions(): { headers?: HttpHeaders } {
    const token = this.authService.getAccessToken();
    if (!token) {
      return {};
    }

    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
  }
}
