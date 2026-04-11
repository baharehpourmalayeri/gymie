import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthResponse } from '../../core/models/user.model';

import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/users';

  constructor(private http: HttpClient) {}

  saveLoggedInUser(res: AuthResponse) {
    localStorage.setItem('token', res.access_token);

    localStorage.setItem('userId', res.user.id.toString());

    localStorage.setItem('user', JSON.stringify(res.user));
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
  }

  getUser(userId: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${userId}`);
  }

  getLoggedInUser(): AuthResponse | null {
    let token = localStorage.getItem('token');
    let user = localStorage.getItem('user');
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
