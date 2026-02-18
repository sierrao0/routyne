import { remark } from 'remark';
import { Exercise, Routine, Set, MediaElement } from '@/types/workout';
import { v4 as uuidv4 } from 'uuid';

/**
 * Mocks an external media API call (e.g., ExerciseDB or Giphy)
 */
async function fetchExerciseMedia(exerciseName: string): Promise<MediaElement[]> {
  // Simulate network latency
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return [
    {
      id: uuidv4(),
      type: 'gif',
      url: `https://via.placeholder.com/400x300.gif?text=${encodeURIComponent(exerciseName)}+Demo`,
      thumbnailUrl: `https://via.placeholder.com/200x150.png?text=${encodeURIComponent(exerciseName)}`,
      title: exerciseName
    }
  ];
}

/**
 * Parses markdown workout routines into structured data.
 * Expected format:
 * # Routine Title
 * 
 * ## Exercise Name
 * - 3 sets x 12 reps
 * - Rest: 60s
 */
export async function parseWorkoutMarkdown(markdown: string): Promise<Routine> {
  const processor = remark();
  const tree = processor.parse(markdown);
  
  let title = "My Workout";
  const exercises: Exercise[] = [];
  let currentExercise: Partial<Exercise> | null = null;

  // Simple traversal of the MDAST (Markdown Abstract Syntax Tree)
  // For a production app, we would use unist-util-visit
  for (const node of (tree.children as any[])) {
    if (node.type === 'heading') {
      const text = node.children[0]?.value || '';
      
      if (node.depth === 1) {
        title = text;
      } else if (node.depth === 2) {
        // Save previous exercise if it exists
        if (currentExercise && currentExercise.name) {
          exercises.push(currentExercise as Exercise);
        }
        
        currentExercise = {
          id: uuidv4(),
          name: text,
          sets: [],
          media: []
        };
      }
    } else if (node.type === 'list' && currentExercise) {
      // Parse list items as sets or instructions
      for (const item of node.children) {
        const text = item.children[0]?.children[0]?.value || '';
        
        // Basic set parsing: "3 sets x 12 reps" or "3x12"
        const setMatch = text.match(/(\d+)\s*(sets?|x)\s*(\d+)/i);
        if (setMatch) {
          const numSets = parseInt(setMatch[1]);
          const reps = setMatch[3];
          
          for (let i = 0; i < numSets; i++) {
            currentExercise.sets?.push({ reps });
          }
        } else if (text.toLowerCase().includes('rest')) {
          const restMatch = text.match(/(\d+)/);
          if (restMatch && currentExercise.sets?.length) {
            currentExercise.sets[currentExercise.sets.length - 1].restTime = parseInt(restMatch[1]);
          }
        }
      }
    }
  }

  // Push the last exercise
  if (currentExercise && currentExercise.name) {
    exercises.push(currentExercise as Exercise);
  }

  // Fetch media for all exercises
  const exercisesWithMedia = await Promise.all(
    exercises.map(async (ex) => ({
      ...ex,
      media: await fetchExerciseMedia(ex.name)
    }))
  );

  return {
    id: uuidv4(),
    title,
    exercises: exercisesWithMedia,
    createdAt: new Date(),
    updatedAt: new Date()
  };
}
