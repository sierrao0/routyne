'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Exercise } from '@/types/workout';
import { Skeleton } from '@/components/ui/skeleton';
import { Dumbbell, Clock, Info } from 'lucide-react';
import Image from 'next/image';

interface ExerciseCardProps {
  exercise: Exercise;
  index: number;
}

export function ExerciseCard({ exercise, index }: ExerciseCardProps) {
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const media = exercise.media?.[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-zinc-900/80 border border-zinc-800/50 rounded-3xl overflow-hidden backdrop-blur-sm"
    >
      <div className="relative aspect-video bg-zinc-800/20">
        {!imageLoaded && (
          <Skeleton className="absolute inset-0 w-full h-full rounded-none" />
        )}
        {media && (
          <img
            src={media.url}
            alt={exercise.name}
            className={`w-full h-full object-cover transition-opacity duration-500 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
        )}
        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
          <span className="text-[10px] font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
            <Dumbbell className="w-3 h-3 text-blue-400" />
            Exercise {index + 1}
          </span>
        </div>
      </div>

      <div className="p-5 space-y-4">
        <div>
          <h3 className="text-xl font-bold text-white leading-tight">{exercise.name}</h3>
          <p className="text-zinc-500 text-sm font-medium mt-1">
            {exercise.sets.length} Sets • Target {exercise.sets[0]?.reps} Reps
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {exercise.sets.map((set, i) => (
            <div
              key={i}
              className="flex items-center justify-center w-10 h-10 rounded-xl bg-zinc-800/50 border border-zinc-700/30 text-xs font-bold text-zinc-300"
            >
              {set.reps}
            </div>
          ))}
        </div>

        {exercise.sets[0]?.restTime && (
          <div className="flex items-center gap-2 text-zinc-400 text-xs font-medium bg-zinc-800/30 w-fit px-3 py-1.5 rounded-lg border border-zinc-700/20">
            <Clock className="w-3.5 h-3.5" />
            <span>Rest {exercise.sets[0].restTime}s</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
