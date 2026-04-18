export interface Coach {
  id: number;
  slug: string;
  name: string;
  title: string;
  bio: string;
  image: string;
}

export interface CoachSession {
  id: number;
  coach: Coach;
  start: string;
  end: string;
  isBooked: boolean;
}

export interface BookedCoachSession {
  id: number;
  session_id: number;
  coach: Coach;
  start: string;
  end: string;
}
