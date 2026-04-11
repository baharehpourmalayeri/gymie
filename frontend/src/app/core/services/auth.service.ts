import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthResponse } from '../../core/models/user.model';

import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/users';
  private authStateSubject = new BehaviorSubject<AuthResponse | null>(this.readStoredAuth());
  authState$ = this.authStateSubject.asObservable();

  constructor(private http: HttpClient) {}

  saveLoggedInUser(res: AuthResponse) {
    localStorage.setItem('token', res.access_token);
    localStorage.setItem('user', JSON.stringify(res.user));

    this.authStateSubject.next(res);
  }

  register(user: { name: string; email: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, user);
  }

  login(credentials: { email: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authStateSubject.next(null);
  }

  getUser(userId: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${userId}`);
  }

  getLoggedInUser(): AuthResponse | null {
    return this.authStateSubject.value;
  }

  private readStoredAuth(): AuthResponse | null {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (!token || !user) {
      return null;
    }
    return {
      access_token: token,
      token_type: 'Bearer',
      user: JSON.parse(user),
    };
  }
}
