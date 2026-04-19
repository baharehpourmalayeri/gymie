import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Workout, WorkoutSession, BookedWorkoutSession } from '../models/workout.model';
import { Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class WorkoutScheduleService {
  private workoutSessionApiUrl = `${environment.apiBaseUrl}/workouts`;
  private workoutBookSessionApiUrl = `${environment.apiBaseUrl}/bookings`;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {}

  private bookedSessions: WorkoutSession[] = [];

  getSchedule(slug: string): Observable<WorkoutSession[]> {
    return this.http.get<WorkoutSession[]>(
      `${this.workoutSessionApiUrl}/${slug}/sessions`,
      this.getAuthOptions(),
    );
  }

  bookSession(workoutId: number, workoutSessionId: number): Observable<BookedWorkoutSession> {
    const authOptions = this.getAuthOptions();
    if (!authOptions.headers) {
      return throwError(() => new Error('Authentication required'));
    }
    return this.http.post<BookedWorkoutSession>(
      `${this.workoutBookSessionApiUrl}/workout`,
      {
        workout_id: workoutId,
        workout_session_id: workoutSessionId,
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
      `${this.workoutBookSessionApiUrl}/workout/${bookingId}`,
      authOptions,
    );
  }

  getUserBookings(workout?: Workout): Observable<BookedWorkoutSession[]> {
    const authOptions = this.getAuthOptions();
    if (!authOptions.headers) {
      return throwError(() => new Error('Authentication required'));
    }
    return this.http.get<BookedWorkoutSession[]>(
      `${this.workoutBookSessionApiUrl}/workouts/${workout ? workout.slug : ''}`,
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
