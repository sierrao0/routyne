'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RoutineUploader } from '@/components/workout/RoutineUploader';
import { ExerciseCard } from '@/components/workout/ExerciseCard';
import { useWorkoutStore } from '@/store/useWorkoutStore';
import { Button } from '@/components/ui/button';
import { Play, RotateCcw, Plus, ChevronRight } from 'lucide-react';

export default function Home() {
  const { currentRoutine, setCurrentRoutine } = useWorkoutStore();

  const handleReset = () => {
    // Reset by setting to null or a new empty routine
    window.location.reload();
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-zinc-100 selection:bg-blue-500/30">
      <div className="max-w-screen-md mx-auto min-h-screen flex flex-col">
        {/* Mobile Header */}
        <header className="sticky top-0 z-50 p-6 flex items-center justify-between backdrop-blur-xl bg-black/60 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-600/20">
              <Plus className="text-white w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-black tracking-tight leading-none">ROUTYNE</h2>
              <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-0.5">Mobile First</p>
            </div>
          </div>
          
          <Button variant="ghost" size="icon" className="rounded-2xl hover:bg-zinc-800 text-zinc-400">
            <ChevronRight className="w-5 h-5" />
          </Button>
        </header>

        <div className="flex-grow p-6">
          <AnimatePresence mode="wait">
            {!currentRoutine ? (
              <motion.div
                key="uploader"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="flex-grow flex items-center"
              >
                <RoutineUploader />
              </motion.div>
            ) : (
              <motion.div
                key="routine"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-8"
              >
                {/* Routine Overview */}
                <div className="space-y-6">
                  <div className="flex items-end justify-between">
                    <div className="space-y-1">
                      <p className="text-blue-500 text-xs font-bold uppercase tracking-widest">Selected Routine</p>
                      <h1 className="text-4xl font-black tracking-tight text-white">{currentRoutine.title}</h1>
                    </div>
                    <Button
                      onClick={handleReset}
                      variant="ghost"
                      size="sm"
                      className="text-zinc-500 hover:text-white hover:bg-zinc-800/50 rounded-full h-8 px-3 gap-1.5 font-bold text-xs"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Reset
                    </Button>
                  </div>

                  <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white rounded-3xl py-8 h-auto font-black text-xl shadow-2xl shadow-blue-600/30 transition-all active:scale-[0.98] flex items-center justify-center gap-3">
                    <Play className="w-6 h-6 fill-white" />
                    START WORKOUT
                  </Button>
                </div>

                {/* Exercises List */}
                <div className="space-y-4">
                  <h3 className="text-zinc-400 font-bold text-sm uppercase tracking-widest flex items-center gap-2">
                    Exercises <span className="bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded-full text-[10px]">{currentRoutine.exercises.length}</span>
                  </h3>
                  <div className="grid gap-6 pb-24">
                    {currentRoutine.exercises.map((exercise, index) => (
                      <ExerciseCard 
                        key={exercise.id} 
                        exercise={exercise} 
                        index={index} 
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Floating Mobile Tab Bar (Visual Only) */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-48px)] max-w-sm">
          <nav className="bg-zinc-900/80 backdrop-blur-2xl border border-white/10 rounded-[32px] p-2 flex justify-between shadow-2xl shadow-black/50">
            <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-black">
              <Plus className="w-6 h-6" />
            </div>
            <div className="w-14 h-14 rounded-full flex items-center justify-center text-zinc-500">
              <Dumbbell className="w-6 h-6" />
            </div>
            <div className="w-14 h-14 rounded-full flex items-center justify-center text-zinc-500">
              <Clock className="w-6 h-6" />
            </div>
            <div className="w-14 h-14 rounded-full flex items-center justify-center text-zinc-500">
              <Info className="w-6 h-6" />
            </div>
          </nav>
        </div>
      </div>
    </main>
  );
}
