export interface Coach {
  id: string;
  slug: string;
  name: string;
  title: string;
  bio: string;
  image: string;
}

export interface CoachSession {
  id: string;
  coachId: string;
  start: string;
  end: string;
  bookedUser?: string;
}
