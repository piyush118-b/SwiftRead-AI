"use client";

import Link from "next/link";
import { BookOpen, Activity, Flame, Trophy, Play, Settings, User, LogOut, BookMarked, Brain, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function DashboardPage() {
    const supabase = createClient();
    const [profile, setProfile] = useState<any>(null);
    const [sessions, setSessions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                // Fetch Profile
                const { data: profileData } = await supabase
                    .from('user_profiles')
                    .select('*')
                    .eq('id', user.id)
                    .single();
                setProfile(profileData);

                // Fetch Sessions
                const { data: sessionsData } = await supabase
                    .from('reading_sessions')
                    .select('*')
                    .eq('user_id', user.id)
                    .order('created_at', { ascending: false });
                setSessions(sessionsData || []);
            }
            setLoading(false);
        }
        fetchData();
    }, []);

    // Helper functions for stats
    const calculateStreak = (sessionList: any[]) => {
        if (!sessionList || sessionList.length === 0) return 0;

        const dates = sessionList.map(s => new Date(s.created_at).toDateString());
        const uniqueDates = Array.from(new Set(dates));

        let streak = 0;
        let currentDate = new Date();

        // If the latest session isn't from today or yesterday, streak is 0
        const latestSessionDate = new Date(uniqueDates[0]);
        const diffInDays = Math.floor((new Date().getTime() - latestSessionDate.getTime()) / (1000 * 3600 * 24));

        if (diffInDays > 1) return 0;

        for (let i = 0; i < uniqueDates.length; i++) {
            const dateToCheck = new Date();
            dateToCheck.setDate(dateToCheck.getDate() - i);

            // Allow checking for today or yesterday to start/continue streak
            if (uniqueDates.includes(dateToCheck.toDateString())) {
                streak++;
            } else if (i === 0) {
                // If today is missing, check if yesterday exists
                continue;
            } else {
                break;
            }
        }
        return streak;
    };

    const totalWords = sessions.reduce((acc, s) => acc + (s.words_read || 0), 0);
    const streak = calculateStreak(sessions);
    const avgComprehension = sessions.length > 0
        ? Math.round(sessions.reduce((acc, s) => acc + (s.comprehension_score || 0), 0) / sessions.length)
        : 0;

    const milestones = [5000, 10000, 15000, 25000, 50000, 100000, 250000];
    const nextMilestone = milestones.find(m => m > totalWords) || milestones[milestones.length - 1];

    const stats = [
        { label: "Current WPM", value: profile?.base_wpm || "0", icon: Activity, trend: "Target" },
        { label: "Words Read", value: totalWords.toLocaleString(), icon: BookOpen, trend: "Lifetime" },
        { label: "Daily Streak", value: `${streak} ${streak === 1 ? 'Day' : 'Days'}`, icon: Flame, trend: streak > 0 ? "Active" : "Start today!" },
        { label: "Comprehension", value: `${avgComprehension}%`, icon: Brain, trend: "Average" }
    ];


    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
        );
    }

    const displayName = profile?.display_name || "User";
    const initials = displayName
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200">

            {/* Navigation */}
            <nav className="fixed top-0 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600/10 text-blue-600">
                            <BookOpen className="w-5 h-5" />
                        </div>
                        <Link href="/dashboard" className="text-xl font-bold leading-tight tracking-tight">SwiftRead AI</Link>
                    </div>

                    <div className="hidden md:flex items-center gap-6">
                        <Link href="/dashboard" className="text-blue-600 font-semibold border-b-2 border-blue-600 py-5">Dashboard</Link>
                        <Link href="/library" className="text-slate-500 hover:text-slate-900 dark:hover:text-white font-medium transition-colors">Library</Link>
                        <Link href="/analytics" className="text-slate-500 hover:text-slate-900 dark:hover:text-white font-medium transition-colors">Analytics</Link>
                        <Link href="/challenges" className="text-slate-500 hover:text-slate-900 dark:hover:text-white font-medium transition-colors flex items-center gap-1">
                            Challenges <span className="bg-blue-100 text-blue-600 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">New</span>
                        </Link>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link href="/settings" className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                            <Settings className="w-5 h-5" />
                        </Link>
                        <Link href="/account" className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-400 text-white flex items-center justify-center font-bold text-sm shadow-md border-2 border-white dark:border-slate-800 hover:scale-105 transition-transform cursor-pointer">
                            {initials}
                        </Link>
                    </div>
                </div>
            </nav>


            {/* Main Content */}
            <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">

                <div className="mb-8">
                    <h1 className="text-3xl font-black tracking-tight mb-2">Welcome back, {displayName}! 👋</h1>
                    <p className="text-slate-500 dark:text-slate-400">
                        {streak > 0
                            ? `You're on a ${streak}-day streak! Keep it going.`
                            : "Start your first reading session today to begin a streak!"}
                        Your next milestone is {nextMilestone.toLocaleString()} words.
                    </p>
                </div>


                {/* Stats Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col gap-4">
                            <div className="flex justify-between items-start">
                                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                                    <stat.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                </div>
                                <span className="text-xs font-bold text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded">{stat.trend}</span>
                            </div>
                            <div>
                                <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-1">{stat.value}</h3>
                                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{stat.label}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Training Panel */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
                            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                                        <Play className="w-5 h-5 ml-1" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-bold">Start Daily Session</h2>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">10 mins • recommended for you</p>
                                    </div>
                                </div>
                                <Link href="/trainer" className="px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-lg hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors">
                                    Start Training
                                </Link>
                            </div>
                            <div className="p-6 bg-slate-50 dark:bg-slate-800/50">
                                <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4">Up Next</h3>

                                <div className="space-y-4">
                                    {[
                                        { title: "The Future of Quantum Computing", topic: "Technology", length: "5 mins", diff: "Intermediate" },
                                        { title: "Stoicism for Modern Life", topic: "Philosophy", length: "8 mins", diff: "Advanced" }
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700 transition cursor-pointer">
                                            <div className="flex gap-4">
                                                <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                                    <BookMarked className="w-6 h-6 text-slate-400" />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-slate-900 dark:text-white">{item.title}</h4>
                                                    <div className="flex gap-3 text-xs font-semibold text-slate-500 mt-1">
                                                        <span className="text-blue-600">{item.topic}</span>
                                                        <span>•</span>
                                                        <span>{item.length}</span>
                                                        <span>•</span>
                                                        <span>{item.diff}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <button className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-blue-600 hover:text-white transition-colors">
                                                <Play className="w-4 h-4 ml-0.5" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* AI Text Generator Quick Action */}
                        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-8 text-white shadow-lg shadow-blue-500/20 relative overflow-hidden">
                            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                                <div>
                                    <h2 className="text-2xl font-black mb-2 flex items-center gap-2">
                                        <Brain className="w-6 h-6" /> Generate Custom Text
                                    </h2>
                                    <p className="text-blue-100 max-w-md">Need specific practice? Let AI generate an article tailored to your exact topic and difficulty level.</p>
                                </div>
                                <Link href="/generator" className="whitespace-nowrap px-6 py-3 bg-white text-blue-600 font-bold rounded-xl shadow-md hover:bg-blue-50 transition w-full md:w-auto text-center">
                                    Generate Now
                                </Link>
                            </div>
                            <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
                        </div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="space-y-8">
                        {/* Gamification Panel */}
                        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm p-6">
                            <div className="flex items-center gap-2 mb-6">
                                <Trophy className="w-5 h-5 text-yellow-500" />
                                <h3 className="font-bold text-slate-900 dark:text-white text-lg">Achievements</h3>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm font-semibold">
                                        <span className="flex flex-col">
                                            <span className="text-slate-900 dark:text-white">Speed Demon</span>
                                            <span className="text-xs font-normal text-slate-500">Reach 400 WPM</span>
                                        </span>
                                        <span className="text-blue-600">{profile?.base_wpm || 0}/400</span>
                                    </div>
                                    <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-yellow-500 rounded-full transition-all duration-1000"
                                            style={{ width: `${Math.min(100, ((profile?.base_wpm || 0) / 400) * 100)}%` }}
                                        ></div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm font-semibold">
                                        <span className="flex flex-col">
                                            <span className="text-slate-900 dark:text-white">Bookworm</span>
                                            <span className="text-xs font-normal text-slate-500">Read 50k words</span>
                                        </span>
                                        <span className="text-blue-600">{(totalWords / 1000).toFixed(1)}k/50k</span>
                                    </div>
                                    <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-blue-600 rounded-full transition-all duration-1000"
                                            style={{ width: `${Math.min(100, (totalWords / 50000) * 100)}%` }}
                                        ></div>
                                    </div>
                                </div>

                            </div>
                            <button className="w-full mt-6 py-2.5 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition">
                                View All Awards
                            </button>
                        </div>

                        {/* Quick Settings */}
                        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm p-6">
                            <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-6 flex items-center gap-2">
                                <Settings className="w-5 h-5 text-slate-400" /> Reading Preferences
                            </h3>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">Default Mode</span>
                                    <span className="text-sm font-bold bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded text-slate-900 dark:text-white capitalize">
                                        {profile?.preferred_mode?.replace('_', ' ') || 'Word Flash'}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">Base Speed</span>
                                    <span className="text-sm font-bold bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded text-slate-900 dark:text-white">
                                        {profile?.base_wpm || 0} WPM
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">Adaptive Diff.</span>
                                    <div className={`w-10 h-6 rounded-full relative transition-colors ${profile?.adaptive_difficulty ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'}`}>
                                        <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${profile?.adaptive_difficulty ? 'right-1' : 'left-1'}`}></div>
                                    </div>
                                </div>
                            </div>

                            <Link href="/settings" className="block text-center mt-6 text-sm font-bold text-blue-600 hover:underline">
                                Edit Settings
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
