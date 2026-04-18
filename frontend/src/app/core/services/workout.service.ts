import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Workout } from '../models/workout.model';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class WorkoutService {
  private workoutsApiUrl = 'http://127.0.0.1:8000/workouts';
  private favoritesApiUrl = 'http://127.0.0.1:8000/favorites';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {}

  getAll(): Observable<Workout[]> {
    return this.http.get<Workout[]>(`${this.workoutsApiUrl}/`, this.getAuthOptions());
  }

  getBySlug(slug: string): Observable<Workout> {
    return this.http.get<Workout>(`${this.workoutsApiUrl}/${slug}`, this.getAuthOptions());
  }

  getTop(n: number): Observable<Workout[]> {
    return this.http.get<Workout[]>(`${this.workoutsApiUrl}/?limit=${n}`, this.getAuthOptions());
  }

  getFilteredWorkouts(filter: string): Observable<Workout[]> {
    return this.http.get<Workout[]>(
      `${this.workoutsApiUrl}/?filter=${filter}`,
      this.getAuthOptions(),
    );
  }

  getFavorites(): Observable<Workout[]> {
    const authOptions = this.getAuthOptions();
    if (!authOptions.headers) {
      return throwError(() => new Error('Authentication required'));
    }
    return this.http.get<Workout[]>(`${this.favoritesApiUrl}/me`, authOptions);
  }

  favoriteWorkout(slug: string): Observable<unknown> {
    const authOptions = this.getAuthOptions();
    if (!authOptions.headers) {
      return throwError(() => new Error('Authentication required'));
    }
    return this.http.post(`${this.favoritesApiUrl}/${slug}`, {}, authOptions);
  }

  unfavoriteWorkout(slug: string): Observable<unknown> {
    const authOptions = this.getAuthOptions();
    if (!authOptions.headers) {
      return throwError(() => new Error('Authentication required'));
    }
    return this.http.delete(`${this.favoritesApiUrl}/${slug}`, authOptions);
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
