import Link from "next/link";
import { BookOpen, ArrowLeft, ArrowRight, Zap, Brain, School, Globe } from "lucide-react";

export default function OnboardingGoalsPage() {
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
                            <p className="text-blue-600 text-sm font-bold">Step 3 of 6</p>
                        </div>
                        <div className="h-2.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                            <div className="h-full rounded-full bg-blue-600 transition-all duration-500" style={{ width: "50%" }}></div>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">Personalization: Reading Goals</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 mb-8">
                        <h1 className="text-slate-900 dark:text-slate-100 text-4xl font-black leading-tight tracking-tight max-w-2xl">
                            What are your reading goals?
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 text-lg font-normal leading-relaxed max-w-2xl">
                            Select all that apply to help us customize your training plan. We'll tailor exercises and content to match your specific needs.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                        {/* Improve speed */}
                        <label className="group relative flex flex-col gap-4 p-5 bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-100 dark:border-slate-800 hover:border-blue-600 dark:hover:border-blue-600 transition-all cursor-pointer shadow-sm has-[:checked]:border-blue-600 has-[:checked]:bg-blue-600/5">
                            <input type="checkbox" className="peer sr-only" defaultChecked />
                            <div className="w-full aspect-video rounded-lg bg-slate-100 dark:bg-slate-800 overflow-hidden relative flex items-center justify-center group-has-[:checked]:bg-blue-600/10">
                                <Zap className="w-16 h-16 text-blue-600" />
                            </div>
                            <div className="flex flex-col">
                                <div className="flex justify-between items-start">
                                    <p className="text-lg font-bold">Improve speed</p>
                                    <div className="w-5 h-5 rounded-md border-2 border-slate-300 dark:border-slate-600 group-hover:border-blue-600 peer-checked:bg-blue-600 peer-checked:border-blue-600 flex items-center justify-center transition-all">
                                        <svg className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                </div>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Read more pages in less time</p>
                            </div>
                        </label>

                        {/* Comprehension */}
                        <label className="group relative flex flex-col gap-4 p-5 bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-100 dark:border-slate-800 hover:border-blue-600 dark:hover:border-blue-600 transition-all cursor-pointer shadow-sm has-[:checked]:border-blue-600 has-[:checked]:bg-blue-600/5">
                            <input type="checkbox" className="peer sr-only" />
                            <div className="w-full aspect-video rounded-lg bg-slate-100 dark:bg-slate-800 overflow-hidden relative flex items-center justify-center group-has-[:checked]:bg-blue-600/10">
                                <Brain className="w-16 h-16 text-blue-600" />
                            </div>
                            <div className="flex flex-col">
                                <div className="flex justify-between items-start">
                                    <p className="text-lg font-bold">Comprehension</p>
                                    <div className="w-5 h-5 rounded-md border-2 border-slate-300 dark:border-slate-600 group-hover:border-blue-600 peer-checked:bg-blue-600 peer-checked:border-blue-600 flex items-center justify-center transition-all">
                                        <svg className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                </div>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Deeply retain more information</p>
                            </div>
                        </label>

                        {/* Study faster */}
                        <label className="group relative flex flex-col gap-4 p-5 bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-100 dark:border-slate-800 hover:border-blue-600 dark:hover:border-blue-600 transition-all cursor-pointer shadow-sm has-[:checked]:border-blue-600 has-[:checked]:bg-blue-600/5">
                            <input type="checkbox" className="peer sr-only" />
                            <div className="w-full aspect-video rounded-lg bg-slate-100 dark:bg-slate-800 overflow-hidden relative flex items-center justify-center group-has-[:checked]:bg-blue-600/10">
                                <School className="w-16 h-16 text-blue-600" />
                            </div>
                            <div className="flex flex-col">
                                <div className="flex justify-between items-start">
                                    <p className="text-lg font-bold">Study faster</p>
                                    <div className="w-5 h-5 rounded-md border-2 border-slate-300 dark:border-slate-600 group-hover:border-blue-600 peer-checked:bg-blue-600 peer-checked:border-blue-600 flex items-center justify-center transition-all">
                                        <svg className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                </div>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Optimize your academic learning</p>
                            </div>
                        </label>

                        {/* Learn English */}
                        <label className="group relative flex flex-col gap-4 p-5 bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-100 dark:border-slate-800 hover:border-blue-600 dark:hover:border-blue-600 transition-all cursor-pointer shadow-sm has-[:checked]:border-blue-600 has-[:checked]:bg-blue-600/5">
                            <input type="checkbox" className="peer sr-only" />
                            <div className="w-full aspect-video rounded-lg bg-slate-100 dark:bg-slate-800 overflow-hidden relative flex items-center justify-center group-has-[:checked]:bg-blue-600/10">
                                <Globe className="w-16 h-16 text-blue-600" />
                            </div>
                            <div className="flex flex-col">
                                <div className="flex justify-between items-start">
                                    <p className="text-lg font-bold">Learn English</p>
                                    <div className="w-5 h-5 rounded-md border-2 border-slate-300 dark:border-slate-600 group-hover:border-blue-600 peer-checked:bg-blue-600 peer-checked:border-blue-600 flex items-center justify-center transition-all">
                                        <svg className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                </div>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Master vocabulary & grammar</p>
                            </div>
                        </label>
                    </div>

                    <div className="flex justify-between items-center pt-8 border-t border-slate-200 dark:border-slate-800">
                        <Link href="/onboarding/level" className="flex min-w-[120px] items-center justify-center gap-2 rounded-lg h-12 px-6 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-base font-bold transition-colors hover:bg-slate-200 dark:hover:bg-slate-700">
                            <ArrowLeft className="w-5 h-5" />
                            <span>Back</span>
                        </Link>
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-slate-500 font-medium hidden sm:block">Pick at least one</span>
                            <Link href="/onboarding/topics" className="flex min-w-[160px] items-center justify-center gap-2 rounded-lg h-12 px-8 bg-blue-600 text-white text-base font-bold shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all">
                                <span>Next Step</span>
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
