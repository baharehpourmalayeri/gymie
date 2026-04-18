import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WorkoutService } from './workout.service';
import { AuthService } from './auth.service';
import { Workout } from '../models/workout.model';

describe('WorkoutService', () => {
  let service: WorkoutService;
  let httpMock: HttpTestingController;

  const mockToken = 'mock-token';

  const mockWorkout: Workout = {
    id: 1,
    slug: 'full-body',
    title: 'Full Body Workout',
    description: 'Short description',
    longDescription: 'Long description here',
    image: 'workout.jpg',
    isFavorite: false,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WorkoutService, AuthService],
    });

    service = TestBed.inject(WorkoutService);
    httpMock = TestBed.inject(HttpTestingController);

    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  // GET ALL WORKOUTS
  it('should fetch all workouts', () => {
    localStorage.setItem('token', mockToken);

    const mockWorkouts: Workout[] = [mockWorkout];

    service.getAll().subscribe((res) => {
      expect(res).toEqual(mockWorkouts);
    });

    const req = httpMock.expectOne('http://127.0.0.1:8000/workouts/');

    expect(req.request.method).toBe('GET');

    req.flush(mockWorkouts);
  });

  // GET BY SLUG
  it('should fetch workout by slug', () => {
    localStorage.setItem('token', mockToken);

    service.getBySlug('full-body').subscribe((res) => {
      expect(res).toEqual(mockWorkout);
    });

    const req = httpMock.expectOne('http://127.0.0.1:8000/workouts/full-body');

    expect(req.request.method).toBe('GET');

    req.flush(mockWorkout);
  });

  // GET TOP WORKOUTS
  it('should fetch top workouts', () => {
    localStorage.setItem('token', mockToken);

    service.getTop(3).subscribe((res) => {
      expect(res).toEqual([mockWorkout]);
    });

    const req = httpMock.expectOne('http://127.0.0.1:8000/workouts/?limit=3');

    expect(req.request.method).toBe('GET');

    req.flush([mockWorkout]);
  });

  // FILTER WORKOUTS
  it('should fetch filtered workouts', () => {
    localStorage.setItem('token', mockToken);

    service.getFilteredWorkouts('strength').subscribe((res) => {
      expect(res).toEqual([mockWorkout]);
    });

    const req = httpMock.expectOne('http://127.0.0.1:8000/workouts/?filter=strength');

    expect(req.request.method).toBe('GET');

    req.flush([mockWorkout]);
  });

  // GET FAVORITES (SUCCESS)
  it('should fetch favorite workouts', () => {
    localStorage.setItem('token', mockToken);

    service.getFavorites().subscribe((res) => {
      expect(res).toEqual([mockWorkout]);
    });

    const req = httpMock.expectOne('http://127.0.0.1:8000/favorites/me');

    expect(req.request.method).toBe('GET');

    req.flush([mockWorkout]);
  });

  // FAVORITE WORKOUT
  it('should favorite a workout', () => {
    localStorage.setItem('token', mockToken);

    service.favoriteWorkout('full-body').subscribe((res) => {
      expect(res).toBeTruthy();
    });

    const req = httpMock.expectOne('http://127.0.0.1:8000/favorites/full-body');

    expect(req.request.method).toBe('POST');

    req.flush({});
  });

  // UNFAVORITE WORKOUT
  it('should unfavorite a workout', () => {
    localStorage.setItem('token', mockToken);

    service.unfavoriteWorkout('full-body').subscribe((res) => {
      expect(res).toBeTruthy();
    });

    const req = httpMock.expectOne('http://127.0.0.1:8000/favorites/full-body');

    expect(req.request.method).toBe('DELETE');

    req.flush({});
  });

  // NO TOKEN ERROR CASE
  it('should throw error when no token for favorites', () => {
    service.getFavorites().subscribe({
      next: () => fail('should not succeed'),
      error: (err) => {
        expect(err.message).toBe('Authentication required');
      },
    });

    httpMock.expectNone('http://127.0.0.1:8000/favorites/me');
  });
});
