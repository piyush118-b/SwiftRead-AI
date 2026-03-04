"use client";

import Link from "next/link";
import { BookOpen, TrendingUp, Clock, Activity, Target, Brain, ArrowLeft } from "lucide-react";

export default function AnalyticsPage() {
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
                    <div className="flex items-center gap-4">
                        <Link href="/dashboard" className="text-sm font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
                            Back to Dashboard
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">

                <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-black tracking-tight mb-2">Reading Analytics</h1>
                        <p className="text-slate-500 dark:text-slate-400">Track your progress and identify areas for improvement.</p>
                    </div>
                    <div className="flex gap-2 bg-slate-200 dark:bg-slate-800 p-1 rounded-xl">
                        {['Weekly', 'Monthly', 'All Time'].map((tab) => (
                            <button key={tab} className={`px-4 py-2 rounded-lg text-sm font-bold transition ${tab === 'Monthly' ? 'bg-white dark:bg-slate-900 shadow-sm text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}>
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Top KPIs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {[
                        { label: "Avg Reading Speed", value: "342 WPM", icon: Activity, trend: "+12 WPM", color: "blue" },
                        { label: "Total Reading Time", value: "14h 23m", icon: Clock, trend: "+2h 10m", color: "purple" },
                        { label: "Comprehension Score", value: "86%", icon: Brain, trend: "+4%", color: "green" },
                        { label: "Words Read", value: "48,200", icon: Target, trend: "+12,400", color: "orange" }
                    ].map((kpi, idx) => (
                        <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col items-center text-center">
                            <div className={`w-12 h-12 rounded-2xl bg-${kpi.color}-50 dark:bg-${kpi.color}-900/20 text-${kpi.color}-600 dark:text-${kpi.color}-400 flex items-center justify-center mb-4`}>
                                <kpi.icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-2">{kpi.value}</h3>
                            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">{kpi.label}</p>
                            <span className="text-xs font-bold text-green-600 bg-green-50 dark:bg-green-900/20 px-2.5 py-1 rounded-full">{kpi.trend}</span>
                        </div>
                    ))}
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">

                    {/* WPM Growth Chart */}
                    <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="font-bold text-lg flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-blue-600" /> WPM Growth
                            </h3>
                            <span className="text-sm font-semibold text-slate-400">Past 30 Days</span>
                        </div>

                        {/* Mock Chart UI */}
                        <div className="h-64 flex items-end justify-between gap-2 border-b border-l border-slate-200 dark:border-slate-800 pb-2 pl-2 relative">
                            {/* Y Axis Labels */}
                            <div className="absolute -left-10 h-full flex flex-col justify-between text-xs text-slate-400 font-mono py-2">
                                <span>400</span><span>350</span><span>300</span><span>250</span><span>200</span>
                            </div>

                            {[280, 290, 285, 305, 310, 300, 320, 335, 340, 342].map((val, idx) => {
                                const heightPercent = ((val - 200) / 200) * 100;
                                return (
                                    <div key={idx} className="w-full relative group flex flex-col items-center">
                                        <div
                                            className="w-full bg-blue-600 hover:bg-cyan-400 transition-colors rounded-t-sm"
                                            style={{ height: `${heightPercent}%` }}
                                        ></div>
                                        {/* Tooltip */}
                                        <div className="opacity-0 group-hover:opacity-100 absolute -top-10 bg-slate-800 text-white text-xs font-bold px-2 py-1 rounded transition pointer-events-none">
                                            {val} WPM
                                        </div>
                                        {/* X Axis Label */}
                                        <span className="text-[10px] text-slate-400 mt-2 font-mono">Day {idx * 3 + 1}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Comprehension vs Speed Scatter (Mock) */}
                    <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden">
                        <div className="flex justify-between items-center mb-8 relative z-10">
                            <h3 className="font-bold text-lg flex items-center gap-2">
                                <Brain className="w-5 h-5 text-purple-600" /> Comprehension vs. Speed
                            </h3>
                        </div>

                        <div className="h-64 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 p-4 relative">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <p className="text-slate-400 text-sm font-medium">Chart Visualization Requires external library (e.g., Recharts)</p>
                            </div>
                            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs font-bold text-slate-400">Words Per Minute</div>
                            <div className="absolute top-1/2 -left-8 -translate-y-1/2 -rotate-90 text-xs font-bold text-slate-400">Score %</div>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
}
