export interface Workout {
  id: number;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  isFavorite: boolean;
}

export interface WorkoutSession {
  id: number;
  workout: Workout;
  start: string;
  end: string;
  capacity: number;
  booked: number;
  isBooked: boolean;
}

export interface WorkoutBase {
  id: number;
  slug: string;
  title: string;
  description: string;
  image: string;
}

export interface BookedWorkoutSession {
  id: number;
  session_id: number;
  workout: WorkoutBase;
  start: string;
  end: string;
  capacity: number;
  booked: number;
}
