'use client';

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, Check, Loader2, Sparkles } from 'lucide-react';
import { parseWorkoutMarkdown } from '@/lib/markdown/parser';
import { useWorkoutStore } from '@/store/useWorkoutStore';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function RoutineUploader() {
  const [text, setText] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const { setCurrentRoutine, isLoading, setIsLoading } = useWorkoutStore();

  const handleParse = useCallback(async (content: string) => {
    if (!content.trim()) return;
    
    setIsLoading(true);
    try {
      const routine = await parseWorkoutMarkdown(content);
      setCurrentRoutine(routine);
    } catch (error) {
      console.error('Failed to parse routine:', error);
    } finally {
      setIsLoading(false);
    }
  }, [setCurrentRoutine, setIsLoading]);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && (file.name.endsWith('.md') || file.type === 'text/markdown')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        setText(content);
        handleParse(content);
      };
      reader.readAsText(file);
    }
  }, [handleParse]);

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-2"
      >
        <h1 className="text-4xl font-black tracking-tight text-white flex items-center justify-center gap-2">
          ROUTYNE <Sparkles className="text-yellow-400 fill-yellow-400" />
        </h1>
        <p className="text-zinc-400 font-medium">Drop your markdown workout routine below</p>
      </motion.div>

      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
        className={cn(
          "relative group transition-all duration-300 ease-in-out",
          "rounded-3xl border-2 border-dashed p-8",
          isDragging 
            ? "border-blue-500 bg-blue-500/10 scale-[1.02]" 
            : "border-zinc-800 bg-zinc-900/50 hover:border-zinc-700"
        )}
      >
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-12 space-y-4"
            >
              <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
              <p className="text-zinc-400 font-medium animate-pulse">Analyzing your routine...</p>
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="# Push Day&#10;## Bench Press&#10;- 3x12&#10;- Rest: 90s"
                className="w-full h-48 bg-transparent border-none focus:ring-0 text-zinc-100 placeholder:text-zinc-600 resize-none font-mono text-sm"
              />
              
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-zinc-800/50">
                <div className="flex items-center gap-2 text-zinc-500 text-xs">
                  <Upload className="w-4 h-4" />
                  <span>Supports .md files</span>
                </div>
                
                <Button
                  onClick={() => handleParse(text)}
                  disabled={!text.trim() || isLoading}
                  className="w-full sm:w-auto rounded-full bg-white text-black hover:bg-zinc-200 font-bold px-8 py-6 h-auto text-base transition-transform active:scale-95"
                >
                  Parse Routine
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {isDragging && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="flex flex-col items-center space-y-2">
              <FileText className="w-16 h-16 text-blue-500" />
              <span className="text-blue-500 font-bold">Release to upload</span>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800/50 flex flex-col items-center gap-2 text-center">
          <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center">
            <Check className="w-5 h-5 text-green-500" />
          </div>
          <span className="text-xs font-semibold text-zinc-300">Auto-parse Sets</span>
        </div>
        <div className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800/50 flex flex-col items-center gap-2 text-center">
          <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-blue-400" />
          </div>
          <span className="text-xs font-semibold text-zinc-300">Media Generation</span>
        </div>
      </div>
    </div>
  );
}
