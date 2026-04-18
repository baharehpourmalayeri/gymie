import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CoachService } from './coach.service';
import { Coach } from '../models/coach.model';

describe('CoachService', () => {
  let service: CoachService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(CoachService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  // GET ALL COACHES
  it('should fetch all coaches', () => {
    const mockCoaches: Coach[] = [
      {
        id: 1,
        slug: 'coach-a',
        name: 'Coach A',
        title: 'Strength Coach',
        bio: 'Helps with strength training and fitness',
        image: 'coach-a.jpg',
      },
      {
        id: 2,
        slug: 'coach-b',
        name: 'Coach B',
        title: 'Yoga Coach',
        bio: 'Focuses on flexibility and mindfulness',
        image: 'coach-b.jpg',
      },
    ];

    service.getAll().subscribe((res) => {
      expect(res).toEqual(mockCoaches);
    });

    const req = httpMock.expectOne('http://127.0.0.1:8000/coaches/');

    expect(req.request.method).toBe('GET');

    req.flush(mockCoaches);
  });

  // GET COACH BY SLUG
  it('should fetch coach by slug', () => {
    const mockCoach: Coach = {
      id: 1,
      slug: 'coach-a',
      name: 'Coach A',
      title: 'Strength Coach',
      bio: 'Helps with strength training and fitness',
      image: 'coach-a.jpg',
    };

    service.getBySlug('coach-a').subscribe((res) => {
      expect(res).toEqual(mockCoach);
    });

    const req = httpMock.expectOne('http://127.0.0.1:8000/coaches/coach-a');

    expect(req.request.method).toBe('GET');

    req.flush(mockCoach);
  });
});
