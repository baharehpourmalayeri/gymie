import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { AuthResponse } from '../../core/models/user.model';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  const mockAuthResponse: AuthResponse = {
    access_token: 'mock-token',
    token_type: 'Bearer',
    user: {
      id: 1,
      name: 'Bahareh',
      email: 'bahareh@test.com',
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);

    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save logged in user to localStorage', () => {
    service.saveLoggedInUser(mockAuthResponse);

    expect(localStorage.getItem('token')).toBe('mock-token');
    expect(JSON.parse(localStorage.getItem('user')!)).toEqual(mockAuthResponse.user);
  });

  it('should return true when user is logged in', () => {
    localStorage.setItem('token', 'mock-token');

    expect(service.isLoggedIn()).toBeTruthy();
  });

  it('should return false when user is not logged in', () => {
    expect(service.isLoggedIn()).toBeFalsy();
  });

  it('should clear auth state on logout', () => {
    localStorage.setItem('token', 'mock-token');
    localStorage.setItem('user', JSON.stringify(mockAuthResponse.user));

    service.logout();

    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('user')).toBeNull();
  });

  it('should return access token', () => {
    localStorage.setItem('token', 'mock-token');

    expect(service.getAccessToken()).toBe('mock-token');
  });

  it('should send login request', () => {
    const credentials = {
      email: 'bahareh@test.com',
      password: '123456',
    };

    service.login(credentials).subscribe((res) => {
      expect(res).toEqual(mockAuthResponse);
    });

    const req = httpMock.expectOne('http://127.0.0.1:8000/users/login');

    expect(req.request.method).toBe('POST');

    req.flush(mockAuthResponse);
  });

  it('should send register request', () => {
    const user = {
      name: 'Bahareh',
      email: 'bahareh@test.com',
      password: '123456',
    };

    service.register(user).subscribe((res) => {
      expect(res).toEqual(mockAuthResponse);
    });

    const req = httpMock.expectOne('http://127.0.0.1:8000/users/register');

    expect(req.request.method).toBe('POST');

    req.flush(mockAuthResponse);
  });
});
