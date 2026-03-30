import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Coach {
  name: string;
  title: string;
  bio: string;
  image: string;
}

@Component({
  selector: 'app-coaches',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './coaches.html',
})
export class Coaches {
  // Array of top coaches
  coaches: Coach[] = [
    {
      name: 'Alice Johansson',
      title: 'Yoga & Pilates Specialist',
      bio: 'Alice makes yoga fun and energizing, guiding you to boost flexibility, strengthen your core, and find calm, all with a smile and personalized flows that keep every session exciting.',
      image: '/coach/3.png',
    },
    {
      name: 'Oscar Lund',
      title: 'Crossfit & Strength Coach',
      bio: 'Oscar creates functional strength training sessions that push your limits while emphasizing proper form, injury prevention, and steady progression. Each workout is tailored to help you grow stronger, safer, and more confident.',
      image: '/coach/1.jpg',
    },
    {
      name: 'Linnea Sjöberg',
      title: 'Boxing',
      bio: 'Linnea combines expert boxing techniques with strength and agility training, helping clients build endurance, power, and confidence in every session. She tailors each workout to challenge you safely while keeping it fun and motivating.',
      image: '/coach/2.jpg',
    },
  ];
}
