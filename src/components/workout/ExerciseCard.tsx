'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ParsedExercise } from '@/types/workout';
import { Skeleton } from '@/components/ui/skeleton';
import { Dumbbell, Clock } from 'lucide-react';

interface ExerciseCardProps {
  exercise: ParsedExercise;
  index: number;
}

export function ExerciseCard({ exercise, index }: ExerciseCardProps) {
  const [imageLoaded, setImageLoaded] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-zinc-900/50 border border-zinc-800/40 rounded-2xl overflow-hidden backdrop-blur-sm group"
    >
      <div className="flex flex-col sm:flex-row h-full">
        {/* Media Section */}
        <div className="relative w-full sm:w-32 aspect-video sm:aspect-square bg-zinc-800/20 shrink-0">
          {!imageLoaded && <Skeleton className="absolute inset-0 w-full h-full rounded-none" />}
          {exercise.mediaUrl ? (
            <video
              src={exercise.mediaUrl}
              autoPlay
              muted
              loop
              playsInline
              className={`w-full h-full object-cover transition-opacity duration-700 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoadedData={() => setImageLoaded(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-zinc-700">
              <Dumbbell className="w-8 h-8 opacity-20" />
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-4 flex flex-col justify-center gap-2 flex-grow min-w-0">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-base font-bold text-white leading-tight truncate">
              {exercise.cleanName}
            </h3>
            <span className="text-[10px] font-black bg-blue-600/20 text-blue-400 px-2 py-0.5 rounded-full uppercase tracking-tighter shrink-0">
              {exercise.sets}x{exercise.repsMin}{exercise.repsMin !== exercise.repsMax ? `-${exercise.repsMax}` : ''}
            </span>
          </div>
          
          <div className="flex items-center gap-4 text-[11px] text-zinc-500 font-bold uppercase tracking-widest">
            <div className="flex items-center gap-1.5">
              <Dumbbell className="w-3.5 h-3.5 text-zinc-600" />
              <span>{exercise.sets} sets</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-zinc-600" />
              <span>{exercise.repsMin}-{exercise.repsMax} reps</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
