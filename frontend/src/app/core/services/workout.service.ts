import { Injectable } from '@angular/core';
import { Workout } from '../models/workout.model';

@Injectable({ providedIn: 'root' })
export class WorkoutService {
  private workouts: Workout[] = [
    {
      id: '1',
      slug: 'yoga',
      title: 'Yoga',
      description: 'Relax and improve flexibility',
      longDescription:
        'At Moveo, our experienced yoga instructors guide you through sessions designed to enhance flexibility, balance, and mindfulness. Each class focuses on proper alignment and breathing techniques, helping you reduce stress, improve posture, and increase overall body awareness. Whether you are a beginner or experienced, Moveo’s yoga classes offer a supportive environment to recharge both mind and body.',
      image: '/home/1.jpg',
      isFavorite: false,
    },
    {
      id: '2',
      slug: 'hiit',
      title: 'HIIT',
      description: 'High intensity fat burning',
      longDescription:
        'Moveo’s HIIT classes are led by expert trainers who push you to achieve your maximum potential in a safe and structured way. With a mix of short, intense bursts of cardio, strength, and bodyweight exercises, these sessions rapidly burn fat, increase endurance, and boost your metabolism. The high-energy atmosphere keeps you motivated and challenged in every class.',
      image: '/home/1.jpg',
      isFavorite: false,
    },
    {
      id: '3',
      slug: 'pilates',
      title: 'Pilates',
      description: 'Core strength and balance',
      longDescription:
        'At Moveo, our certified Pilates instructors help you strengthen your core, improve posture, and enhance overall body stability. Classes focus on controlled movements and proper breathing, which support injury prevention and better body awareness. Moveo’s Pilates sessions are tailored to all levels, helping you build a strong foundation for everyday movements and fitness progress.',
      image: '/home/1.jpg',
      isFavorite: false,
    },
    {
      id: '4',
      slug: 'boxing',
      title: 'Boxing',
      description: 'Strength and endurance',
      longDescription:
        'Moveo’s boxing classes combine cardio, strength, and agility under the guidance of experienced trainers. You will learn proper techniques, improve coordination, and build upper body strength while burning calories and relieving stress. Each class is energetic, fun, and designed to challenge you in a supportive environment, suitable for all skill levels.',
      image: '/home/1.jpg',
      isFavorite: false,
    },
    {
      id: '5',
      slug: 'crossfit',
      title: 'Crossfit',
      description: 'Full body workout',
      longDescription:
        'Crossfit at Moveo Gym offers a high-intensity functional training experience led by skilled coaches. You will work on strength, stamina, and mobility using a variety of exercises including weightlifting, cardio, and bodyweight movements. Classes are structured to push your limits safely while fostering a motivating team environment, helping you reach both fitness and personal goals.',
      image: '/home/1.jpg',
      isFavorite: false,
    },
    {
      id: '6',
      slug: 'zumba',
      title: 'Zumba',
      description: 'Fun dance workout',
      longDescription:
        'Moveo’s Zumba sessions are lively dance classes set to energetic music, led by passionate instructors. They are designed to improve cardiovascular health, coordination, and endurance, all while having fun and staying motivated. The friendly and social environment at Moveo makes every class enjoyable, perfect for anyone looking to combine fitness with dance.',
      image: '/home/1.jpg',
      isFavorite: false,
    },
    {
      id: '7',
      slug: 'running',
      title: 'Running',
      description: 'Cardio for stamina',
      longDescription:
        'At Moveo, our running sessions are tailored to improve cardiovascular endurance, strengthen legs, and boost stamina. Led by experienced trainers, each session includes warm-ups, pacing strategies, and guidance to enhance performance safely. Whether you are training for an event or improving general fitness, Moveo running classes provide motivation and structured support.',
      image: '/home/1.jpg',
      isFavorite: false,
    },
    {
      id: '8',
      slug: 'cycling',
      title: 'Cycling',
      description: 'Endurance and leg strength',
      longDescription:
        'Moveo’s indoor cycling classes are energetic sessions guided by expert instructors. With varying intensity levels, intervals, and motivating music, you’ll improve endurance, strengthen leg muscles, and burn calories efficiently. Each class is designed to challenge you while maintaining a supportive and fun environment, suitable for beginners and advanced cyclists alike.',
      image: '/home/1.jpg',
      isFavorite: false,
    },
    {
      id: '9',
      slug: 'stretching',
      title: 'Stretching',
      description: 'Flexibility and recovery',
      longDescription:
        'Stretching at Moveo is guided by experienced trainers who focus on improving flexibility, releasing muscle tension, and aiding recovery after workouts. Classes include a variety of techniques for all muscle groups and are tailored to your level. Moveo’s stretching sessions help prevent injuries, improve mobility, and promote relaxation in a calm and supportive environment.',
      image: '/home/1.jpg',
      isFavorite: false,
    },
  ];

  getAll(): Workout[] {
    return this.workouts;
  }

  getBySlug(slug: string): Workout | undefined {
    return this.workouts.find((w) => w.slug === slug);
  }

  getTop(n: number): Workout[] {
    return this.workouts.slice(0, n);
  }
}
