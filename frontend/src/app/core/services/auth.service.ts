import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { AuthResponse } from '../../core/models/user.model';
import { environment } from '../../environments/environment';

import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiBaseUrl}/users`;
  private baseUrl = environment.apiBaseUrl;
  private authStateSubject = new BehaviorSubject<AuthResponse | null>(this.readStoredAuth());
  authState$ = this.authStateSubject.asObservable();

  constructor(private http: HttpClient) {}

  clearAuthState() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authStateSubject.next(null);
  }

  saveLoggedInUser(res: AuthResponse) {
    localStorage.setItem('token', res.access_token);
    localStorage.setItem('user', JSON.stringify(res.user));

    this.authStateSubject.next(res);
  }

  handleLogin(res: AuthResponse) {
    this.saveLoggedInUser(res);
  }

  register(user: { name: string; email: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, user);
  }

  login(credentials: { email: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    this.clearAuthState();
  }

  getUser(userId: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${userId}`);
  }

  getLoggedInUser(): AuthResponse | null {
    return this.authStateSubject.value;
  }

  getAccessToken(): string | null {
    return localStorage.getItem('token');
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

  changePassword(current_password: string, new_password: string, confirm_new_password: string) {
    const authOptions = this.getAuthOptions();
    if (!authOptions.headers) {
      return throwError(() => new Error('Authentication required'));
    }

    const data = {
      current_password: current_password,
      new_password: new_password,
      confirm_new_password: confirm_new_password,
    };

    return this.http.post(`${this.baseUrl}/users/change-password`, data, authOptions);
  }

  private getAuthOptions(): { headers?: HttpHeaders } {
    const token = this.getAccessToken();
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
