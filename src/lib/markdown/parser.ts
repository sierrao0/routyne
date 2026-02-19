import { v4 as uuidv4 } from 'uuid';
import { RoutineData, WorkoutSession, ParsedExercise } from '@/types/workout';
import { resolveExerciseMedia } from '@/lib/media/resolver';

/**
 * Parses a complex multi-session markdown workout routine into structured data.
 */
export function parseRoutine(markdown: string): RoutineData {
  const lines = markdown.split('\n');
  const sessions: WorkoutSession[] = [];
  let currentSession: WorkoutSession | null = null;
  let overallTitle = "My Workout";

  // Regex to match overall title (H1): # Title...
  const overallTitleRegex = /^#\s+(.+)$/;
  
  // Regex to match session title (H2): ## Día 1: PUSH...
  const sessionRegex = /^##\s+(.+)$/;

  // Robust Regex for exercises: * **Name**: Sets x Reps...
  // Handles: "3 x 8-10", "3x8", "3 x 10-12 reps", "3x15reps"
  const exerciseRegex = /^\*\s*\*\*(.*?)\*\*:\s*(\d+)\s*[xX]\s*(\d+)(?:-(\d+))?\s*(?:reps?\.?)?/;

  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine) continue;

    // 1. Capture overall title if not set
    const overallMatch = trimmedLine.match(overallTitleRegex);
    if (overallMatch && sessions.length === 0) {
      overallTitle = overallMatch[1].trim();
      continue;
    }

    // 2. Capture sessions
    const sessionMatch = trimmedLine.match(sessionRegex);
    if (sessionMatch) {
      if (currentSession) sessions.push(currentSession);
      currentSession = {
        id: uuidv4(),
        title: sessionMatch[1].trim(),
        exercises: [],
      };
      continue;
    }

    // 3. Capture exercises within a session
    if (currentSession) {
      const exerciseMatch = trimmedLine.match(exerciseRegex);
      if (exerciseMatch) {
        const cleanName = exerciseMatch[1].trim();
        const sets = parseInt(exerciseMatch[2], 10);
        const repsMin = parseInt(exerciseMatch[3], 10);
        const repsMax = exerciseMatch[4] ? parseInt(exerciseMatch[4], 10) : repsMin;

        currentSession.exercises.push({
          id: uuidv4(),
          originalName: `**${cleanName}**`,
          cleanName,
          sets,
          repsMin,
          repsMax,
          mediaUrl: resolveExerciseMedia(cleanName),
        });
      }
    }
  }

  if (currentSession) sessions.push(currentSession);

  return {
    id: uuidv4(),
    title: overallTitle,
    sessions,
    createdAt: new Date(),
  };
}
