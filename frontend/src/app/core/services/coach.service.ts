import { Injectable } from '@angular/core';
import { Coach } from '../models/coach.model';

@Injectable({ providedIn: 'root' })
export class CoachService {
  coaches: Coach[] = [
    {
      id: '1',
      slug: 'alice-johansson',
      name: 'Alice Johansson',
      title: 'Yoga & Pilates Specialist',
      bio: 'Alice makes yoga fun and energizing, guiding you to boost flexibility, strengthen your core, and find calm, all with a smile and personalized flows that keep every session exciting.',
      image: '/coach/3.png',
    },
    {
      id: '2',
      slug: 'oscar-lund',
      name: 'Oscar Lund',
      title: 'Crossfit & Strength Coach',
      bio: 'Oscar creates functional strength training sessions that push your limits while emphasizing proper form, injury prevention, and steady progression. Each workout is tailored to help you grow stronger, safer, and more confident.',
      image: '/coach/1.jpg',
    },
    {
      id: '3',
      slug: 'linnea-sjoberg',
      name: 'Linnea Sjöberg',
      title: 'Boxing',
      bio: 'Linnea combines expert boxing techniques with strength and agility training, helping clients build endurance, power, and confidence in every session. She tailors each workout to challenge you safely while keeping it fun and motivating.',
      image: '/coach/2.jpg',
    },
  ];

  getAll(): Coach[] {
    return this.coaches;
  }

  getBySlug(slug: string): Coach | undefined {
    return this.coaches.find((c) => c.slug === slug);
  }
}
