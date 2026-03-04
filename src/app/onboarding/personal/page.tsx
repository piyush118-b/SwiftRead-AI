"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, User, Calendar, Brain, ArrowRight } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export default function PersonalOnboardingPage() {
    const router = useRouter();
    const supabase = createClient();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        full_name: "",
        age: "",
        reading_goals: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
            const { error } = await supabase
                .from("user_profiles")
                .update({
                    display_name: formData.full_name,
                    age: parseInt(formData.age),
                })
                .eq("id", user.id);


            if (!error) {
                router.push("/onboarding/level");
            } else {
                alert("Error saving profile: " + error.message);
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
                <div className="flex flex-col max-w-2xl w-full">

                    {/* Progress Section */}
                    <div className="flex flex-col gap-4 p-6 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 mb-8">
                        <div className="flex gap-6 justify-between items-center">
                            <p className="text-slate-900 dark:text-slate-100 text-base font-semibold">Onboarding Progress</p>
                            <p className="text-blue-600 text-sm font-bold">Step 0 of 5</p>
                        </div>
                        <div className="h-2.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                            <div className="h-full rounded-full bg-blue-600 transition-all duration-500" style={{ width: "5%" }}></div>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">Let's get to know you</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 mb-8">
                        <h1 className="text-slate-900 dark:text-slate-100 text-4xl font-black leading-tight tracking-tight">
                            Welcome to SwiftRead AI!
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 text-lg font-normal leading-relaxed">
                            Before we start your training, we need a few basic details to personalize your experience.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
                                <User className="w-4 h-4 text-blue-600" /> Full Name
                            </label>
                            <input
                                type="text"
                                value={formData.full_name}
                                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                                placeholder="e.g. John Doe"
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all outline-none text-lg font-medium"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-blue-600" /> Your Age
                                </label>
                                <input
                                    type="number"
                                    value={formData.age}
                                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                                    placeholder="e.g. 24"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all outline-none text-lg font-medium"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
                                    <Brain className="w-4 h-4 text-blue-600" /> Primary Reading Goal
                                </label>
                                <select
                                    value={formData.reading_goals}
                                    onChange={(e) => setFormData({ ...formData, reading_goals: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white appearance-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all outline-none cursor-pointer text-lg font-medium"
                                    required
                                >
                                    <option value="">Select a goal</option>
                                    <option value="speed">Read Faster</option>
                                    <option value="comprehension">Better Understanding</option>
                                    <option value="focus">Improved Focus</option>
                                    <option value="academic">Academic Success</option>
                                </select>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 mt-4 text-lg active:scale-[0.98]"
                        >
                            {loading ? "Starting..." : (
                                <>
                                    <span>Let's Begin</span>
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
}
