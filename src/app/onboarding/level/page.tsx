import Link from "next/link";
import { BookOpen, ArrowLeft, ArrowRight, School, TrendingUp, Rocket } from "lucide-react";

export default function OnboardingLevelPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200 flex flex-col">
            <header className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 py-4 lg:px-10 sticky top-0 z-50">
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600/10 text-blue-600">
                        <BookOpen className="w-5 h-5" />
                    </div>
                    <h2 className="text-xl font-bold leading-tight tracking-tight">SwiftRead AI</h2>
                </div>
                <div className="flex items-center gap-8">
                    <Link href="/auth/login" className="flex items-center justify-center rounded-lg h-10 px-5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-sm font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                        Sign Out
                    </Link>
                </div>
            </header>

            <main className="flex flex-1 justify-center py-12 px-4 md:px-10">
                <div className="flex flex-col max-w-4xl w-full flex-1">

                    {/* Progress Section */}
                    <div className="flex flex-col gap-4 p-6 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 mb-8">
                        <div className="flex gap-6 justify-between items-center">
                            <p className="text-slate-900 dark:text-slate-100 text-base font-semibold">Onboarding Progress</p>
                            <p className="text-blue-600 text-sm font-bold">Step 2 of 6</p>
                        </div>
                        <div className="h-2.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                            <div className="h-full rounded-full bg-blue-600 transition-all duration-500" style={{ width: "33%" }}></div>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">Getting Started: Reading Level</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 mb-8">
                        <h1 className="text-slate-900 dark:text-slate-100 text-4xl font-black leading-tight tracking-tight max-w-2xl">
                            What is your current reading level?
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 text-lg font-normal leading-relaxed max-w-2xl">
                            Select the option that best describes your current reading speed and comprehension. This helps us personalize your training plan.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                        {/* Beginner */}
                        <label className="relative group cursor-pointer">
                            <input type="radio" name="reading_level" value="beginner" className="peer sr-only" defaultChecked />
                            <div className="flex flex-col gap-5 p-5 bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-100 dark:border-slate-800 transition-all duration-200 peer-checked:border-blue-600 peer-checked:ring-4 peer-checked:ring-blue-600/10 hover:shadow-md h-full">
                                <div className="w-full bg-slate-50 dark:bg-slate-800 aspect-video rounded-lg overflow-hidden flex items-center justify-center bg-gradient-to-br from-blue-600/5 to-transparent">
                                    <School className="w-12 h-12 text-blue-600" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center justify-between">
                                        <p className="text-slate-900 dark:text-slate-100 text-xl font-bold">Beginner</p>
                                        <div className="h-5 w-5 rounded-full border-2 border-slate-300 dark:border-slate-700 peer-checked:bg-blue-600 peer-checked:border-blue-600 flex items-center justify-center transition-colors">
                                            <div className="h-2 w-2 rounded-full bg-white opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                                        </div>
                                    </div>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-relaxed">
                                        I read slowly, often subvocalizing every word, and want to build a solid foundation.
                                    </p>
                                </div>
                            </div>
                        </label>

                        {/* Intermediate */}
                        <label className="relative group cursor-pointer">
                            <input type="radio" name="reading_level" value="intermediate" className="peer sr-only" />
                            <div className="flex flex-col gap-5 p-5 bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-100 dark:border-slate-800 transition-all duration-200 peer-checked:border-blue-600 peer-checked:ring-4 peer-checked:ring-blue-600/10 hover:shadow-md h-full">
                                <div className="w-full bg-slate-50 dark:bg-slate-800 aspect-video rounded-lg overflow-hidden flex items-center justify-center bg-gradient-to-br from-blue-600/10 to-transparent">
                                    <TrendingUp className="w-12 h-12 text-blue-600" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center justify-between">
                                        <p className="text-slate-900 dark:text-slate-100 text-xl font-bold">Intermediate</p>
                                        <div className="h-5 w-5 rounded-full border-2 border-slate-300 dark:border-slate-700 peer-checked:bg-blue-600 peer-checked:border-blue-600 flex items-center justify-center transition-colors">
                                            <div className="h-2 w-2 rounded-full bg-white opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                                        </div>
                                    </div>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-relaxed">
                                        I read at an average pace but struggle with focus during long texts.
                                    </p>
                                </div>
                            </div>
                        </label>

                        {/* Advanced */}
                        <label className="relative group cursor-pointer">
                            <input type="radio" name="reading_level" value="advanced" className="peer sr-only" />
                            <div className="flex flex-col gap-5 p-5 bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-100 dark:border-slate-800 transition-all duration-200 peer-checked:border-blue-600 peer-checked:ring-4 peer-checked:ring-blue-600/10 hover:shadow-md h-full">
                                <div className="w-full bg-slate-50 dark:bg-slate-800 aspect-video rounded-lg overflow-hidden flex items-center justify-center bg-gradient-to-br from-blue-600/15 to-transparent">
                                    <Rocket className="w-12 h-12 text-blue-600" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center justify-between">
                                        <p className="text-slate-900 dark:text-slate-100 text-xl font-bold">Advanced</p>
                                        <div className="h-5 w-5 rounded-full border-2 border-slate-300 dark:border-slate-700 peer-checked:bg-blue-600 peer-checked:border-blue-600 flex items-center justify-center transition-colors">
                                            <div className="h-2 w-2 rounded-full bg-white opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                                        </div>
                                    </div>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-relaxed">
                                        I'm already a fast reader and want to master elite speed-reading techniques.
                                    </p>
                                </div>
                            </div>
                        </label>
                    </div>

                    <div className="flex justify-between items-center pt-8 border-t border-slate-200 dark:border-slate-800">
                        <Link href="/onboarding/personal" className="flex min-w-[120px] items-center justify-center gap-2 rounded-lg h-12 px-6 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-base font-bold transition-colors hover:bg-slate-200 dark:hover:bg-slate-700">
                            <ArrowLeft className="w-5 h-5" />
                            <span>Back</span>
                        </Link>
                        <Link href="/onboarding/goals" className="flex min-w-[160px] items-center justify-center gap-2 rounded-lg h-12 px-8 bg-blue-600 text-white text-base font-bold shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all">
                            <span>Next Step</span>
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
