'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RoutineUploader } from '@/components/workout/RoutineUploader';
import { ExerciseCard } from '@/components/workout/ExerciseCard';
import { useWorkoutStore } from '@/store/useWorkoutStore';
import { Button } from '@/components/ui/button';
import { Play, RotateCcw, Plus, Calendar, ChevronRight, Dumbbell, Clock, Info } from 'lucide-react';

export default function Home() {
  const { currentRoutine } = useWorkoutStore();
  const [activeSessionIdx, setActiveSessionIdx] = useState(0);

  const handleReset = () => {
    window.location.reload();
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-zinc-100 selection:bg-blue-500/30 font-sans">
      <div className="max-w-screen-md mx-auto min-h-screen flex flex-col">
        {/* Modern Mobile Header */}
        <header className="sticky top-0 z-50 p-6 flex items-center justify-between backdrop-blur-3xl bg-black/60 border-b border-white/5 shadow-2xl shadow-black/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-600/20">
              <Plus className="text-white w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-black tracking-tight leading-none text-white">ROUTYNE</h2>
              <p className="text-[10px] text-blue-500/80 font-black uppercase tracking-[0.2em] mt-1">Science 2026</p>
            </div>
          </div>
          
          <Button variant="ghost" size="icon" className="rounded-2xl hover:bg-zinc-800 text-zinc-400">
            <ChevronRight className="w-5 h-5" />
          </Button>
        </header>

        <div className="flex-grow p-6 pb-32">
          <AnimatePresence mode="wait">
            {!currentRoutine ? (
              <motion.div
                key="uploader"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="flex-grow h-full flex items-center justify-center py-20"
              >
                <RoutineUploader />
              </motion.div>
            ) : (
              <motion.div
                key="routine"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-10"
              >
                {/* Routine Hero Section */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <p className="text-blue-500 text-[10px] font-black uppercase tracking-[0.3em] pl-1">Plan Structure</p>
                    <h1 className="text-3xl font-black tracking-tight text-white leading-[1.1]">{currentRoutine.title}</h1>
                    <p className="text-zinc-500 text-sm font-medium">{currentRoutine.sessions.length} training sessions detected.</p>
                  </div>

                  {/* Horizontal Session Picker */}
                  <div className="flex gap-2 overflow-x-auto pb-4 -mx-1 px-1 no-scrollbar">
                    {currentRoutine.sessions.map((session, idx) => (
                      <button
                        key={session.id}
                        onClick={() => setActiveSessionIdx(idx)}
                        className={`shrink-0 flex flex-col items-center justify-center px-6 py-4 rounded-[2rem] border transition-all duration-300 ${
                          activeSessionIdx === idx
                            ? "bg-white border-white text-black shadow-xl shadow-white/5"
                            : "bg-zinc-900 border-zinc-800 text-zinc-500 hover:border-zinc-700"
                        }`}
                      >
                        <span className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-60">Day</span>
                        <span className="text-lg font-black tracking-tighter">{idx + 1}</span>
                      </button>
                    ))}
                  </div>

                  <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white rounded-3xl py-7 h-auto font-black text-lg shadow-2xl shadow-blue-600/30 transition-all active:scale-[0.98] flex items-center justify-center gap-3">
                    <Play className="w-5 h-5 fill-white" />
                    START SESSION {activeSessionIdx + 1}
                  </Button>
                </div>

                {/* Exercises for the Active Session */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-zinc-300 font-black text-sm uppercase tracking-widest flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-blue-500" />
                      {currentRoutine.sessions[activeSessionIdx].title}
                    </h3>
                    <Button
                      onClick={handleReset}
                      variant="ghost"
                      size="sm"
                      className="text-zinc-500 hover:text-white hover:bg-zinc-800/50 rounded-full h-8 px-3 gap-1.5 font-bold text-[10px] uppercase tracking-widest"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Clear All
                    </Button>
                  </div>

                  <div className="grid gap-4">
                    {currentRoutine.sessions[activeSessionIdx].exercises.map((exercise, index) => (
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

        {/* Global Bottom Tab Bar */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-48px)] max-w-sm">
          <nav className="bg-zinc-900/90 backdrop-blur-3xl border border-white/5 rounded-[40px] p-2 flex justify-between shadow-2xl shadow-black/80 ring-1 ring-white/10">
            <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-black shadow-xl transition-transform active:scale-90 cursor-pointer">
              <Plus className="w-6 h-6" />
            </div>
            <div className="w-14 h-14 rounded-full flex items-center justify-center text-zinc-500 hover:text-white transition-colors cursor-pointer">
              <Dumbbell className="w-6 h-6" />
            </div>
            <div className="w-14 h-14 rounded-full flex items-center justify-center text-zinc-500 hover:text-white transition-colors cursor-pointer">
              <Clock className="w-6 h-6" />
            </div>
            <div className="w-14 h-14 rounded-full flex items-center justify-center text-zinc-500 hover:text-white transition-colors cursor-pointer">
              <Calendar className="w-6 h-6" />
            </div>
          </nav>
        </div>
      </div>
    </main>
  );
}
