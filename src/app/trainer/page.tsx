"use client";

import Link from "next/link";
import { BookOpen, Play, Pause, RotateCcw, FastForward, Rewind, Settings, Type, AlignLeft, ArrowLeft, Rows, Clock } from "lucide-react";
import { useState, useEffect, useRef, useMemo, Fragment } from "react";
import { createClient } from "@/utils/supabase/client";

export default function TrainerPage() {
    const supabase = createClient();
    const [isPlaying, setIsPlaying] = useState(false);
    const [wpm, setWpm] = useState(300);
    const [mode, setMode] = useState<"word" | "sentence" | "paragraph">("word");
    const [progress, setProgress] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [sessionSaved, setSessionSaved] = useState(false);

    const defaultContent = "Shadow Reading Practice\n\nWelcome to your shadow reading training. The logic behind this method is based on active repetition. By continuously hearing and mimicking these phrases, you will perfect your pronunciation, improve your intonation, and expand your vocabulary.\n\nMahatma Gandhi\n\nMohandas Karamchand Gandhi was one of the most remarkable leaders of the 20th century. Born in Porbandar, India, he developed the philosophy of nonviolent resistance. This philosophy not only led India to independence but also inspired civil rights movements across the globe.\n\nAs you read this text, try to echo the words out loud. Follow the active highlight, letting your voice trail slightly behind the leading edge. This active participation will dramatically improve your English fluency and speaking confidence.";

    const [content, setContent] = useState(defaultContent);

    // Parse the content into words while preserving paragraph and heading structure
    const parsedData = useMemo(() => {
        const tokens: { text: string; newlinesBefore: number; isHeading: boolean }[] = [];
        if (!content) return tokens;

        const lines = content.split('\n');
        let newlinesAccumulated = 0;

        lines.forEach((line) => {
            const trimmedLine = line.trim();
            if (!trimmedLine) {
                newlinesAccumulated++;
                return;
            }

            const lineWords = trimmedLine.split(/\s+/).filter(w => w.length > 0);

            // Auto-detect headings: short lines, no trailing punctuation (except ? or !), separated by space
            const isHeading = lineWords.length > 0 && lineWords.length <= 12 && !/[.,;]$/.test(lineWords[lineWords.length - 1]) && (newlinesAccumulated >= 1 || tokens.length === 0);

            lineWords.forEach((word, idx) => {
                tokens.push({
                    text: word,
                    newlinesBefore: idx === 0 ? newlinesAccumulated : 0,
                    isHeading: isHeading,
                });
            });

            newlinesAccumulated = 1;
        });

        return tokens;
    }, [content]);

    // Keep words as a string array for the core reading engine logic
    const words = useMemo(() => parsedData.map(p => p.text), [parsedData]);


    // Mount effect to load generated text
    useEffect(() => {
        const stored = localStorage.getItem("swiftread_generated_text");
        if (stored) {
            setContent(stored);
        }
    }, []);

    // Timer clock effect
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying) {
            interval = setInterval(() => {
                setSeconds(prev => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isPlaying]);

    const formatTime = (totalSeconds: number) => {
        const mins = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    // Dynamic Speed Calculation Logic
    const calculateDelay = (idx: number, baseWpm: number) => {
        const item = parsedData[idx];
        const baseDelay = 60000 / baseWpm;
        if (!item) return baseDelay;

        const word = item.text;

        // Get the real letter count (ignoring punctuation) to determine reading effort
        const cleanLength = word.replace(/[^a-zA-Z0-9]/g, '').length;

        // Smoother, less aggressive length factor for better rhythm
        // Short words max out at 0.85x speed, longer words at 1.3x speed
        const lengthFactor = Math.max(0.85, Math.min(1.3, 0.85 + (cleanLength * 0.03)));

        // Punctuation Factor: Add pauses for natural flow
        let puncFactor = 1.0;
        if (/[.?!;]$/.test(word)) puncFactor = 1.5;  // End of thought
        else if (/[,:]$/.test(word)) puncFactor = 1.25; // Brief pause

        // Structural Factor: Simulating human eye movements and breathing
        let structuralFactor = 1.0;
        const nextItem = parsedData[idx + 1];
        if (nextItem && nextItem.newlinesBefore > 0) {
            // Massive pause at the end of a paragraph (simulating the physical time it takes for human eyes to track back to the left margin and take a breath)
            structuralFactor = 1.0 + (nextItem.newlinesBefore * 0.85); // 1 newline = 1.85x, 2 newlines = 2.7x delay
        }

        if (item.isHeading) {
            structuralFactor *= 1.25; // Headings are read naturally slower for maximum context absorption
        }

        return baseDelay * lengthFactor * puncFactor * structuralFactor;
    };

    const [currentIndex, setCurrentIndex] = useState(0);
    const [displayWpm, setDisplayWpm] = useState(wpm.toString());

    // Use refs for the animation loop to prevent React re-render lag from dropping frames
    const stateRef = useRef({
        index: 0,
        lastTime: 0,
        targetDelay: 0
    });

    // Synchronize the ref if the user skips forward/backward with arrows
    useEffect(() => {
        stateRef.current.index = currentIndex;
    }, [currentIndex]);

    // Timer logic using high-precision requestAnimationFrame
    useEffect(() => {
        let animationFrameId: number;

        const loop = (time: DOMHighResTimeStamp) => {
            if (!isPlaying) return;

            if (stateRef.current.lastTime === 0 || stateRef.current.targetDelay === 0) {
                stateRef.current.lastTime = time;
                stateRef.current.targetDelay = calculateDelay(stateRef.current.index, wpm);
            }

            const elapsed = time - stateRef.current.lastTime;

            if (elapsed >= stateRef.current.targetDelay) {
                const nextIdx = stateRef.current.index + 1;

                if (nextIdx >= words.length) {
                    setIsPlaying(false);
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
                                }).then(() => console.log("Session saved"));
                            }
                        });
                    }
                    return;
                }

                // Prevent time slippage by carrying over the remainder milliseconds
                stateRef.current.lastTime = time - (elapsed - stateRef.current.targetDelay);
                stateRef.current.index = nextIdx;
                stateRef.current.targetDelay = calculateDelay(nextIdx, wpm);

                setCurrentIndex(nextIdx);
                setProgress(((nextIdx + 1) / words.length) * 100);
            }

            animationFrameId = requestAnimationFrame(loop);
        };

        if (isPlaying) {
            stateRef.current.lastTime = 0; // Reset time immediately on play
            animationFrameId = requestAnimationFrame(loop);
        }

        return () => cancelAnimationFrame(animationFrameId);
    }, [isPlaying, wpm, words, sessionSaved]);



    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const activeWordRef = useRef<HTMLSpanElement>(null);

    // Auto-scroll logic optimized for high speed
    useEffect(() => {
        if (activeWordRef.current && scrollContainerRef.current && mode !== "word") {
            const container = scrollContainerRef.current;
            const element = activeWordRef.current;

            const containerRect = container.getBoundingClientRect();
            const elementRect = element.getBoundingClientRect();

            // Only scroll if outside the middle 40% of the viewport to reduce jitter
            const overflowTop = elementRect.top < containerRect.top + containerRect.height * 0.3;
            const overflowBottom = elementRect.bottom > containerRect.bottom - containerRect.height * 0.3;

            if (overflowTop || overflowBottom) {
                element.scrollIntoView({
                    behavior: wpm > 400 ? "auto" : "smooth",
                    block: "center",
                });
            }
        }
    }, [currentIndex, mode, wpm]);


    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === "Space") {
                e.preventDefault();
                setIsPlaying(prev => !prev);
            } else if (e.code === "ArrowLeft") {
                e.preventDefault();
                setCurrentIndex(prev => Math.max(0, prev - 5));
                setProgress((Math.max(0, currentIndex - 5) / words.length) * 100);
            } else if (e.code === "ArrowRight") {
                e.preventDefault();
                setCurrentIndex(prev => Math.min(words.length - 1, prev + 5));
                setProgress((Math.min(words.length - 1, currentIndex + 5) / words.length) * 100);
            } else if (e.code === "ArrowUp") {
                e.preventDefault();
                setWpm(prev => {
                    const next = Math.min(1000, prev + 10);
                    setDisplayWpm(next.toString());
                    return next;
                });
            } else if (e.code === "ArrowDown") {
                e.preventDefault();
                setWpm(prev => {
                    const next = Math.max(50, prev - 10);
                    setDisplayWpm(next.toString());
                    return next;
                });
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [currentIndex, words.length]);


    const handleRestart = () => {
        setIsPlaying(false);
        setCurrentIndex(0);
        setProgress(0);
        setSeconds(0);
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
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 rounded-lg border border-slate-700">
                            <Clock className="w-4 h-4 text-blue-400" />
                            <span className="text-sm font-mono font-bold text-slate-200">{formatTime(seconds)}</span>
                        </div>
                        <div className="text-sm font-bold bg-slate-800 px-3 py-1.5 rounded-lg text-emerald-400 border border-slate-700">
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
                        <div className="text-2xl md:text-3xl font-semibold leading-[1.8] text-slate-500 max-w-4xl text-center py-20">
                            {parsedData.map((w, idx) => (
                                <Fragment key={idx}>
                                    {w.newlinesBefore > 1 && <><br /><br /></>}
                                    {w.newlinesBefore === 1 && idx > 0 && <br />}
                                    <span
                                        ref={idx === currentIndex ? activeWordRef : null}
                                        className={`inline-block mx-2 my-1 transition-all duration-150 rounded-md ${idx === currentIndex ? "text-white bg-blue-600 scale-125 shadow-2xl shadow-blue-600/40 z-10 relative" :
                                            idx < currentIndex ? "text-slate-700/50" : "text-slate-500"
                                            } ${w.isHeading && idx >= currentIndex ? "text-slate-300 font-bold" : ""}`}
                                        style={{ padding: '0 4px' }}
                                    >
                                        {w.text}
                                    </span>
                                </Fragment>
                            ))}
                        </div>
                    )}

                    {mode === "paragraph" && (
                        <div className="text-lg md:text-xl font-normal leading-loose text-slate-400 max-w-3xl w-full text-left py-10">
                            {parsedData.map((w, idx) => {
                                // Determine the visual shadow trail intensity
                                const isCurrent = idx === currentIndex;
                                const isShadow1 = idx === currentIndex - 1;
                                const isShadow2 = idx === currentIndex - 2;
                                const isPast = idx < currentIndex - 2;

                                let highlightClass = "";
                                if (isCurrent) highlightClass = "text-white bg-blue-600 font-bold scale-[1.12] shadow-lg shadow-blue-500/30 z-20 relative px-1 -mx-[3px]";
                                else if (isShadow1) highlightClass = "text-blue-100 bg-blue-600/70 font-semibold scale-[1.05] z-10 relative px-0.5 -mx-[1px]";
                                else if (isShadow2) highlightClass = "text-blue-200 bg-blue-600/30 z-0 relative";
                                else if (isPast) highlightClass = "text-slate-600";

                                return (
                                    <Fragment key={idx}>
                                        {w.newlinesBefore > 1 && <><br /><br /></>}
                                        {w.newlinesBefore === 1 && idx > 0 && <br />}
                                        <span
                                            ref={isCurrent ? activeWordRef : null}
                                            className={`inline-block mx-1 transition-all duration-300 rounded ${highlightClass} ${w.isHeading ? "font-black text-2xl md:text-3xl text-slate-200 tracking-tight" : ""}`}
                                        >
                                            {w.text}
                                        </span>
                                    </Fragment>
                                );
                            })}
                        </div>
                    )}

                </div>


            </main>

            {/* Control Panel (Bottom Fixed) */}
            <div className="fixed bottom-0 w-full bg-slate-900 border-t border-slate-800 p-6 z-50">
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

                    {/* Mode Selector */}
                    <div className="flex items-center gap-2 bg-slate-800 p-1 rounded-xl">
                        {[
                            { id: 'word', icon: Type, label: 'Word Flash' },
                            { id: 'sentence', icon: AlignLeft, label: 'Sentence Mode' },
                            { id: 'paragraph', icon: Rows, label: 'Paragraph Mode' }
                        ].map((m) => (
                            <div key={m.id} className="group relative flex justify-center">
                                <button
                                    onClick={() => setMode(m.id as any)}
                                    className={`p-2 rounded-lg transition ${mode === m.id ? "bg-slate-700 text-white shadow" : "text-slate-400 hover:text-white"}`}
                                >
                                    <m.icon className="w-5 h-5" />
                                </button>
                                <div className="absolute bottom-full mb-2 px-2 py-1 bg-slate-800 text-white text-[10px] font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-slate-700 shadow-xl z-[60]">
                                    {m.label}
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800"></div>
                                </div>
                            </div>
                        ))}
                    </div>


                    {/* Playback Controls */}
                    <div className="flex items-center gap-6">
                        <div className="group relative flex justify-center">
                            <button
                                onClick={handleRestart}
                                className="text-slate-400 hover:text-white transition"
                            >
                                <RotateCcw className="w-6 h-6" />
                            </button>
                            <div className="absolute bottom-full mb-3 px-2 py-1 bg-slate-800 text-white text-[10px] font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-slate-700 shadow-xl z-[60]">
                                Restart
                                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800"></div>
                            </div>
                        </div>

                        <div className="group relative flex justify-center">
                            <button
                                onClick={() => {
                                    setCurrentIndex(prev => Math.max(0, prev - 5));
                                    setProgress((Math.max(0, currentIndex - 5) / words.length) * 100);
                                }}
                                className="text-slate-400 hover:text-white transition"
                            >
                                <Rewind className="w-6 h-6" />
                            </button>
                            <div className="absolute bottom-full mb-3 px-2 py-1 bg-slate-800 text-white text-[10px] font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-slate-700 shadow-xl z-[60]">
                                Rewind 5 Words (←)
                                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800"></div>
                            </div>
                        </div>

                        <div className="group relative flex justify-center">
                            <button
                                onClick={() => setIsPlaying(!isPlaying)}
                                className="w-16 h-16 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shadow-lg shadow-blue-600/20 transition-transform active:scale-95"
                            >
                                {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
                            </button>
                            <div className="absolute bottom-full mb-4 px-2 py-1 bg-blue-600 text-white text-[10px] font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl z-[60]">
                                {isPlaying ? "Pause (Space)" : "Play (Space)"}
                                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-blue-600"></div>
                            </div>
                        </div>

                        <div className="group relative flex justify-center">
                            <button
                                onClick={() => {
                                    setCurrentIndex(prev => Math.min(words.length - 1, prev + 5));
                                    setProgress((Math.min(words.length - 1, currentIndex + 5) / words.length) * 100);
                                }}
                                className="text-slate-400 hover:text-white transition"
                            >
                                <FastForward className="w-6 h-6" />
                            </button>
                            <div className="absolute bottom-full mb-3 px-2 py-1 bg-slate-800 text-white text-[10px] font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-slate-700 shadow-xl z-[60]">
                                Forward 5 Words (→)
                                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800"></div>
                            </div>
                        </div>
                    </div>



                    {/* Speed Control */}
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <span className="text-sm font-bold text-slate-400">WPM:</span>
                        <div className="flex items-center gap-3">
                            <input
                                type="range"
                                min="50"
                                max="1000"
                                step="10"
                                value={wpm}
                                onChange={(e) => {
                                    const val = parseInt(e.target.value);
                                    setWpm(val);
                                    setDisplayWpm(val.toString());
                                }}
                                className="w-32 md:w-48 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                            />
                            <input
                                type="number"
                                min="50"
                                max="1000"
                                value={displayWpm}
                                onChange={(e) => setDisplayWpm(e.target.value)}
                                onBlur={() => {
                                    const val = parseInt(displayWpm);
                                    if (!isNaN(val)) {
                                        const clamped = Math.min(1000, Math.max(50, val));
                                        setWpm(clamped);
                                        setDisplayWpm(clamped.toString());
                                    }
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
