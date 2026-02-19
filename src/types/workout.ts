export interface ParsedExercise {
  id: string;
  originalName: string;
  cleanName: string;
  sets: number;
  repsMin: number;
  repsMax: number;
  mediaUrl: string | null;
}

export interface WorkoutSession {
  id: string;
  title: string;
  exercises: ParsedExercise[];
}

export interface RoutineData {
  id: string;
  title: string;
  sessions: WorkoutSession[];
  createdAt: Date;
}

// Store state interface
export interface WorkoutState {
  currentRoutine: RoutineData | null;
  setCurrentRoutine: (routine: RoutineData) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}
