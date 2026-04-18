import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CoachScheduleService } from './coach-schedule.service';
import { AuthService } from './auth.service';
import { BookedCoachSession, Coach, CoachSession } from '../models/coach.model';

describe('CoachScheduleService', () => {
  let service: CoachScheduleService;
  let httpMock: HttpTestingController;
  let authService: AuthService;

  const mockToken = 'mock-token';
  const mockCoachBase: Coach = {
    id: 1,
    slug: 'coach-a',
    name: 'Coach A',
    title: 'Strength Coach',
    bio: 'Helps with strength training and fitness',
    image: 'coach-a.jpg',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CoachScheduleService, AuthService],
    });

    service = TestBed.inject(CoachScheduleService);
    httpMock = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(AuthService);

    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  // GET SCHEDULE
  it('should fetch coach schedule', () => {
    localStorage.setItem('token', mockToken);

    const mockResponse: CoachSession[] = [
      {
        id: 1,
        coach: mockCoachBase,
        start: '2026-01-01T10:00:00',
        end: '2026-01-01T11:00:00',
        isBooked: false,
      },
    ];

    service.getSchedule('coach-slug').subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://127.0.0.1:8000/coaches/coach-slug/sessions');

    expect(req.request.method).toBe('GET');

    req.flush(mockResponse);
  });

  // BOOK SESSION SUCCESS
  it('should book a coach session', () => {
    localStorage.setItem('token', mockToken);

    const mockBooking: BookedCoachSession = {
      id: 1,
      session_id: 2,
      coach: mockCoachBase,
      start: '2026-01-01T10:00:00',
      end: '2026-01-01T11:00:00',
    };

    service.bookSession(1, 2).subscribe((res) => {
      expect(res).toEqual(mockBooking);
    });

    const req = httpMock.expectOne('http://127.0.0.1:8000/bookings/coach');

    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      coach_id: 1,
      coach_session_id: 2,
    });

    req.flush(mockBooking);
  });

  // BOOK SESSION WITHOUT TOKEN
  it('should throw error if no token when booking session', () => {
    service.bookSession(1, 2).subscribe({
      next: () => fail('should not succeed'),
      error: (err) => {
        expect(err.message).toBe('Authentication required');
      },
    });

    httpMock.expectNone('http://127.0.0.1:8000/bookings/coach');
  });

  // CANCEL SESSION
  it('should cancel a coach session', () => {
    localStorage.setItem('token', mockToken);

    service.cancelSession(10).subscribe((res) => {
      expect(res).toBeTruthy();
    });

    const req = httpMock.expectOne('http://127.0.0.1:8000/bookings/coach/10');

    expect(req.request.method).toBe('DELETE');

    req.flush(true);
  });

  // GET USER BOOKINGS
  it('should fetch user bookings', () => {
    localStorage.setItem('token', mockToken);

    const mockBookings = [{ id: 1 }] as any;

    service.getUserBookings().subscribe((res) => {
      expect(res).toEqual(mockBookings);
    });

    const req = httpMock.expectOne('http://127.0.0.1:8000/bookings/coaches/');

    expect(req.request.method).toBe('GET');

    req.flush(mockBookings);
  });
});
