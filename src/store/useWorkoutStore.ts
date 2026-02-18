import { create } from 'zustand';
import { Routine, Exercise } from '@/types/workout';

interface WorkoutState {
  currentRoutine: Routine | null;
  setCurrentRoutine: (routine: Routine) => void;
  updateExercise: (exerciseId: string, updates: Partial<Exercise>) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export const useWorkoutStore = create<WorkoutState>((set) => ({
  currentRoutine: null,
  setCurrentRoutine: (routine) => set({ currentRoutine: routine }),
  updateExercise: (exerciseId, updates) => 
    set((state) => ({
      currentRoutine: state.currentRoutine 
        ? {
            ...state.currentRoutine,
            exercises: state.currentRoutine.exercises.map(ex => 
              ex.id === exerciseId ? { ...ex, ...updates } : ex
            )
          }
        : null
    })),
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
}));
