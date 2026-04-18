import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WorkoutScheduleService } from './workout-schedule.service';
import { AuthService } from './auth.service';
import { BookedWorkoutSession, WorkoutBase } from '../models/workout.model';

describe('WorkoutScheduleService', () => {
  let service: WorkoutScheduleService;
  let httpMock: HttpTestingController;

  const mockToken = 'mock-token';

  const mockWorkoutBase: WorkoutBase = {
    id: 1,
    slug: 'workout-a',
    title: 'Full Body Workout',
    description: 'Full body strength and conditioning workout',
    image: 'workout.jpg',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WorkoutScheduleService, AuthService],
    });

    service = TestBed.inject(WorkoutScheduleService);
    httpMock = TestBed.inject(HttpTestingController);

    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  // GET USER BOOKINGS
  it('should fetch user bookings', () => {
    localStorage.setItem('token', mockToken);

    const mockBookings: BookedWorkoutSession[] = [
      {
        id: 1,
        session_id: 10,
        workout: mockWorkoutBase,
        start: '2026-01-01T10:00:00',
        end: '2026-01-01T11:00:00',
        capacity: 10,
        booked: 3,
      },
    ];

    service.getUserBookings().subscribe((res) => {
      expect(res).toEqual(mockBookings);
    });

    const req = httpMock.expectOne('http://127.0.0.1:8000/bookings/workouts/');

    expect(req.request.method).toBe('GET');

    req.flush(mockBookings);
  });

  // BOOK SESSION SUCCESS
  it('should book a workout session', () => {
    localStorage.setItem('token', mockToken);

    const mockBooking: BookedWorkoutSession = {
      id: 1,
      session_id: 10,
      workout: mockWorkoutBase,
      start: '2026-01-01T10:00:00',
      end: '2026-01-01T11:00:00',
      capacity: 10,
      booked: 1,
    };

    service.bookSession(1, 10).subscribe((res) => {
      expect(res).toEqual(mockBooking);
    });

    const req = httpMock.expectOne('http://127.0.0.1:8000/bookings/workout');

    expect(req.request.method).toBe('POST');

    expect(req.request.body).toEqual({
      workout_id: 1,
      workout_session_id: 10,
    });

    req.flush(mockBooking);
  });

  // CANCEL SESSION
  it('should cancel a workout session', () => {
    localStorage.setItem('token', mockToken);

    service.cancelSession(5).subscribe((res) => {
      expect(res).toBeTruthy();
    });

    const req = httpMock.expectOne('http://127.0.0.1:8000/bookings/workout/5');

    expect(req.request.method).toBe('DELETE');

    req.flush(true);
  });

  // NO TOKEN ERROR CASE
  it('should throw error if no token exists', () => {
    service.bookSession(1, 10).subscribe({
      next: () => fail('should not succeed'),
      error: (err) => {
        expect(err.message).toBe('Authentication required');
      },
    });

    httpMock.expectNone('http://127.0.0.1:8000/bookings/workout');
  });
});
