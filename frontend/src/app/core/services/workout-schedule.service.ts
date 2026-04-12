import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Workout } from '../models/workout.model';
import { WorkoutSession } from '../models/workout.model';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class WorkoutScheduleService {
  private workoutSessionApiUrl = 'http://127.0.0.1:8000/workouts';

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

  isSessionAvailable(sessionId: string): boolean {
    return true;
  }

  bookSession(sessionId: string): boolean {
    return true;
  }

  cancelSession(sessionId: string): boolean {
    return true;
  }

  getSessionById(sessionId: string): WorkoutSession | undefined {
    return undefined;
  }

  getUserBookings(workout?: Workout): WorkoutSession[] {
    if (workout) {
      return this.bookedSessions.filter((s) => s.workout.id === workout.id);
    }
    return this.bookedSessions;
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
