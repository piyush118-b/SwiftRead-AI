"use client";

import Link from "next/link";
import { BookOpen, ArrowLeft, ArrowRight, Gauge, Activity, Loader2 } from "lucide-react";
import { useState } from "react";

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function OnboardingSpeedPage() {
    const router = useRouter();
    const supabase = createClient();
    const [wpm, setWpm] = useState(250);
    const [loading, setLoading] = useState(false);

    const handleFinish = async () => {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
            const { error } = await supabase
                .from("user_profiles")
                .update({
                    base_wpm: wpm,
                    onboarding_completed: true
                })
                .eq("id", user.id);

            if (!error) {
                router.push("/dashboard");
            } else {
                alert("Error finishing onboarding: " + error.message);
            }
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200 flex flex-col">
            <header className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 py-4 lg:px-10 sticky top-0 z-50">
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600/10 text-blue-600">
                        <BookOpen className="w-5 h-5" />
                    </div>
                    <h2 className="text-xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white">SwiftRead AI</h2>
                </div>
            </header>

            <main className="flex flex-1 justify-center py-12 px-4 md:px-10">
                <div className="flex flex-col max-w-4xl w-full flex-1">

                    <div className="flex flex-col gap-4 p-6 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 mb-8">
                        <div className="flex gap-6 justify-between items-center">
                            <p className="text-slate-900 dark:text-slate-100 text-base font-semibold">Onboarding Progress</p>
                            <p className="text-blue-600 text-sm font-bold">Step 6 of 6</p>
                        </div>
                        <div className="h-2.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                            <div className="h-full rounded-full bg-blue-600 transition-all duration-500" style={{ width: "100%" }}></div>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">Final Step: Starting Speed</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 mb-12">
                        <h1 className="text-slate-900 dark:text-slate-100 text-4xl font-black leading-tight tracking-tight max-w-2xl">
                            Set your target reading speed
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 text-lg font-normal leading-relaxed max-w-2xl">
                            Choose a comfortable starting Words Per Minute (WPM) rate. The average adult reads at ~250 WPM. We recommend starting slightly higher than your comfort zone.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 md:p-12 shadow-sm border border-slate-100 dark:border-slate-800 mb-10 flex flex-col items-center">

                        <div className="w-48 h-48 rounded-full border-[12px] border-blue-50 dark:border-blue-900/20 flex flex-col items-center justify-center mb-10 relative">
                            <div className="absolute inset-0 rounded-full border-[12px] border-blue-600 border-l-transparent border-b-transparent transform rotate-45"></div>
                            <Gauge className="w-8 h-8 text-blue-600 mb-2" />
                            <span className="text-4xl font-black text-slate-900 dark:text-white">{wpm}</span>
                            <span className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-1">WPM</span>
                        </div>

                        <div className="w-full max-w-2xl">
                            <input
                                type="range"
                                min="100"
                                max="1000"
                                step="10"
                                value={wpm}
                                onChange={(e) => setWpm(parseInt(e.target.value))}
                                className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
                            />
                            <div className="flex justify-between mt-4 text-sm font-semibold text-slate-400 dark:text-slate-500">
                                <span>100 WPM</span>
                                <span className="text-blue-600 flex items-center gap-1"><Activity className="w-4 h-4" /> Average (250)</span>
                                <span>1000+ WPM</span>
                            </div>
                        </div>

                        <div className="mt-8 text-center bg-blue-50 dark:bg-blue-900/10 p-4 rounded-xl border border-blue-100 dark:border-blue-900/30">
                            <p className="text-blue-800 dark:text-blue-300 font-medium">
                                {wpm < 200 ? "A steady, relaxed pace. Great for beginners." :
                                    wpm < 350 ? "Average pace. A solid starting point for improvement." :
                                        wpm < 500 ? "Above average! You're already quite fast." :
                                            "Advanced speed! Prepare for an intense training session."}
                            </p>
                        </div>
                    </div>

                    <div className="flex justify-between items-center pt-8 border-t border-slate-200 dark:border-slate-800">
                        <Link href="/onboarding/style" className="flex min-w-[120px] items-center justify-center gap-2 rounded-lg h-12 px-6 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-base font-bold transition-colors hover:bg-slate-200 dark:hover:bg-slate-700">
                            <ArrowLeft className="w-5 h-5" />
                            <span>Back</span>
                        </Link>
                        <button
                            onClick={handleFinish}
                            disabled={loading}
                            className="flex min-w-[160px] items-center justify-center gap-2 rounded-lg h-12 px-8 bg-blue-600 text-white text-base font-bold shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                                <>
                                    <span>Complete Setup</span>
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </div>

                </div>
            </main>
        </div>
    );
}
