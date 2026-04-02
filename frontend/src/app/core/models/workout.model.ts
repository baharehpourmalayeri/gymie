export interface Workout {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  isFavorite: boolean;
}

export interface WorkoutSession {
  id: string;
  workoutId: string;
  start: string;
  end: string;
  capacity: number;
  booked: number;
}
