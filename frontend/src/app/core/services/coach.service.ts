import { Injectable } from '@angular/core';
import { Coach } from '../models/coach.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CoachService {
  private apiUrl = `${environment.apiBaseUrl}/coaches`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Coach[]> {
    return this.http.get<Coach[]>(`${this.apiUrl}/`);
  }

  getBySlug(slug: string): Observable<Coach> {
    return this.http.get<Coach>(`${this.apiUrl}/${slug}`);
  }
}
