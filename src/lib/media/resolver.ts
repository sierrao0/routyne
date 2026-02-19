import Fuse from 'fuse.js';
import exercisesData from '../data/exercises.json';

export interface ExerciseEntry {
  id: string;
  aliases: string[];
  media_id: string;
  description?: string;
}

const fuseOptions = {
  keys: ['aliases'],
  threshold: 0.3, // Lower is stricter, 0.3 handles typos and aliases well
  includeScore: true,
};

const fuse = new Fuse(exercisesData as ExerciseEntry[], fuseOptions);

/**
 * Resolves a raw exercise name from markdown into a local media path.
 * 
 * @param rawName The raw name found in the markdown (e.g., "flexiones", "pushups")
 * @returns The relative path to the local webm file or null if no match found.
 * 
 * Example: resolveExerciseMedia("flexiones") -> "/media/push_up_demo.webm"
 */
export function resolveExerciseMedia(rawName: string): string | null {
  if (!rawName.trim()) return null;

  const results = fuse.search(rawName);

  if (results.length > 0) {
    const bestMatch = results[0].item;
    return `/media/${bestMatch.media_id}.webm`;
  }

  return null;
}
