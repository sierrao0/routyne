export interface MediaElement {
  id: string;
  url: string;
  type: 'image' | 'video' | 'gif';
  thumbnailUrl?: string;
  title?: string;
}

export interface Set {
  reps: number | string;
  weight?: number;
  restTime?: number; // in seconds
}

export interface Exercise {
  id: string;
  name: string;
  sets: Set[];
  instructions?: string[];
  media?: MediaElement[];
  notes?: string;
}

export interface Routine {
  id: string;
  title: string;
  description?: string;
  exercises: Exercise[];
  createdAt: Date;
  updatedAt: Date;
}
