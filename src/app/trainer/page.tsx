"use client";

import Link from "next/link";
import { BookOpen, Play, Pause, RotateCcw, FastForward, Rewind, Settings, Type, AlignLeft, ArrowLeft, Rows } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { createClient } from "@/utils/supabase/client";

export default function TrainerPage() {
    const supabase = createClient();
    const [isPlaying, setIsPlaying] = useState(false);
    const [wpm, setWpm] = useState(300);
    const [mode, setMode] = useState<"word" | "sentence" | "paragraph">("word");
    const [progress, setProgress] = useState(0);
    const [sessionSaved, setSessionSaved] = useState(false);

    const defaultContent = "The quick brown fox jumps over the lazy dog. Reading faster requires suppressing your inner voice. This is called subvocalization. When you read this text, try not to say the words in your head. Instead, let your eyes scan the shapes of the words and your brain will automatically process the meaning. This technique takes practice but will significantly increase your reading speed and comprehension over time.";

    const [content, setContent] = useState(defaultContent);
    const words = content.split(" ");

    // Mount effect to load generated text
    useEffect(() => {
        const stored = localStorage.getItem("swiftread_generated_text");
        if (stored) {
            setContent(stored);
        }
    }, []);

    const [currentIndex, setCurrentIndex] = useState(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (isPlaying) {
            const delayMs = 60000 / wpm;
            timerRef.current = setInterval(() => {
                setCurrentIndex((prev) => {
                    if (prev >= words.length - 1) {
                        setIsPlaying(false);

                        // Save session to database once per full read
                        if (!sessionSaved) {
                            setSessionSaved(true);
                            const duration = Math.round((words.length / wpm) * 60);

                            supabase.auth.getUser().then(({ data }) => {
                                if (data?.user) {
                                    supabase.from("reading_sessions").insert({
                                        user_id: data.user.id,
                                        words_read: words.length,
                                        starting_wpm: wpm,
                                        ending_wpm: wpm,
                                        duration_seconds: duration
                                    }).then(() => console.log("Session saved securely to database"));
                                }
                            });
                        }

                        return prev;
                    }
                    setProgress(((prev + 1) / words.length) * 100);
                    return prev + 1;
                });
            }, delayMs);
        } else {
            if (timerRef.current) clearInterval(timerRef.current);
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isPlaying, wpm, words.length, sessionSaved, supabase]);

    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const activeWordRef = useRef<HTMLSpanElement>(null);

    // Auto-scroll to active word
    useEffect(() => {
        if (activeWordRef.current && scrollContainerRef.current) {
            activeWordRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }
    }, [currentIndex, mode]);

    const handleRestart = () => {
        setIsPlaying(false);
        setCurrentIndex(0);
        setProgress(0);
        setSessionSaved(false);
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans font-display">
            {/* Top Bar Minimal */}
            <nav className="fixed top-0 w-full bg-slate-950/80 backdrop-blur-md border-b border-slate-800 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link href="/dashboard" className="text-slate-400 hover:text-white transition">
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <span className="font-semibold text-slate-300">Session: Reading Trainer</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-sm font-bold bg-slate-800 px-3 py-1.5 rounded-lg text-emerald-400">
                            {wpm} WPM
                        </div>
                        <button className="text-slate-400 hover:text-white transition">
                            <Settings className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Main Trainer Area */}
            <main className="flex flex-col items-center justify-center min-h-screen pt-24 pb-32 px-4 max-w-5xl mx-auto">

                {/* Progress Bar */}
                <div className="w-full mb-12">
                    <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                        <span>Progress</span>
                        <span>{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 transition-all duration-300 ease-linear"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>

                {/* Text Display */}
                <div
                    ref={scrollContainerRef}
                    className="flex-1 w-full max-h-[60vh] overflow-y-auto px-4 scrollbar-hide flex flex-col items-center relative"
                >
                    {mode === "word" && (
                        <div className="min-h-[300px] flex items-center justify-center w-full">
                            <div className="text-6xl md:text-8xl font-black tracking-tight text-white flex items-center justify-center relative w-full">
                                {/* Focus Guides */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-8 w-px h-8 bg-blue-600"></div>
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-8 w-px h-8 bg-blue-600"></div>

                                <span className="relative z-10 transition-all">
                                    {words[currentIndex]}
                                </span>
                            </div>
                        </div>
                    )}

                    {mode === "sentence" && (
                        <div className="text-2xl md:text-4xl font-medium leading-[1.6] text-slate-500 max-w-4xl text-center py-20">
                            {words.map((word, idx) => (
                                <span
                                    key={idx}
                                    ref={idx === currentIndex ? activeWordRef : null}
                                    className={`inline-block mx-1.5 my-1.5 transition-all duration-200 ${idx === currentIndex ? "text-white font-black scale-110 bg-blue-600 px-2 rounded-lg shadow-xl shadow-blue-600/20" :
                                        idx < currentIndex ? "text-slate-700" : "text-slate-400"
                                        }`}
                                >
                                    {word}
                                </span>
                            ))}
                        </div>
                    )}

                    {mode === "paragraph" && (
                        <div className="text-xl md:text-2xl font-normal leading-relaxed text-slate-400 max-w-3xl text-left py-10">
                            {words.map((word, idx) => (
                                <span
                                    key={idx}
                                    ref={idx === currentIndex ? activeWordRef : null}
                                    className={`inline-block mx-1 my-0.5 transition-colors ${idx === currentIndex ? "text-blue-500 font-bold underline decoration-2 underline-offset-4" :
                                        idx < currentIndex ? "text-slate-700" : ""
                                        }`}
                                >
                                    {word}
                                </span>
                            ))}
                        </div>
                    )}
                </div>


            </main>

            {/* Control Panel (Bottom Fixed) */}
            <div className="fixed bottom-0 w-full bg-slate-900 border-t border-slate-800 p-6 z-50">
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

                    {/* Mode Selector */}
                    <div className="flex items-center gap-2 bg-slate-800 p-1 rounded-xl">
                        <button
                            onClick={() => setMode("word")}
                            className={`p-2 rounded-lg transition ${mode === "word" ? "bg-slate-700 text-white shadow" : "text-slate-400 hover:text-white"}`}
                            title="Word Flash Mode"
                        >
                            <Type className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => setMode("sentence")}
                            className={`p-2 rounded-lg transition ${mode === "sentence" ? "bg-slate-700 text-white shadow" : "text-slate-400 hover:text-white"}`}
                            title="Sentence Mode"
                        >
                            <AlignLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => setMode("paragraph")}
                            className={`p-2 rounded-lg transition ${mode === "paragraph" ? "bg-slate-700 text-white shadow" : "text-slate-400 hover:text-white"}`}
                            title="Paragraph Mode"
                        >
                            <Rows className="w-5 h-5" />
                        </button>
                    </div>


                    {/* Playback Controls */}
                    <div className="flex items-center gap-6">
                        <button onClick={handleRestart} className="text-slate-400 hover:text-white transition">
                            <RotateCcw className="w-6 h-6" />
                        </button>
                        <button
                            onClick={() => {
                                setCurrentIndex(prev => Math.max(0, prev - 5));
                                setProgress((Math.max(0, currentIndex - 5) / words.length) * 100);
                            }}
                            className="text-slate-400 hover:text-white transition"
                        >
                            <Rewind className="w-6 h-6" />
                        </button>

                        <button
                            onClick={() => setIsPlaying(!isPlaying)}
                            className="w-16 h-16 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shadow-lg shadow-blue-600/20 transition-transform active:scale-95"
                        >
                            {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
                        </button>

                        <button
                            onClick={() => {
                                setCurrentIndex(prev => Math.min(words.length - 1, prev + 5));
                                setProgress((Math.min(words.length - 1, currentIndex + 5) / words.length) * 100);
                            }}
                            className="text-slate-400 hover:text-white transition"
                        >
                            <FastForward className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Speed Control */}
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <span className="text-sm font-bold text-slate-400">WPM:</span>
                        <div className="flex items-center gap-3">
                            <input
                                type="range"
                                min="100"
                                max="1000"
                                step="10"
                                value={wpm}
                                onChange={(e) => setWpm(parseInt(e.target.value))}
                                className="w-32 md:w-48 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                            />
                            <input
                                type="number"
                                min="100"
                                max="1000"
                                value={wpm}
                                onChange={(e) => {
                                    const val = parseInt(e.target.value);
                                    if (!isNaN(val)) setWpm(Math.min(1000, Math.max(100, val)));
                                }}
                                className="w-20 px-2 py-1 bg-slate-800 border border-slate-700 rounded-lg text-sm font-bold text-emerald-400 focus:outline-none focus:border-blue-500 transition-colors"
                            />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
