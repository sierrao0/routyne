import { create } from 'zustand';
import { RoutineData, WorkoutState } from '@/types/workout';

export const useWorkoutStore = create<WorkoutState>((set) => ({
  currentRoutine: null,
  setCurrentRoutine: (routine) => set({ currentRoutine: routine }),
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
}));
