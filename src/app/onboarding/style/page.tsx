import Link from "next/link";
import { BookOpen, ArrowLeft, ArrowRight, Zap, Target, AlignLeft, Eye } from "lucide-react";

export default function OnboardingStylePage() {
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

                    <div className="flex flex-col gap-4 p-6 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 mb-8">
                        <div className="flex gap-6 justify-between items-center">
                            <p className="text-slate-900 dark:text-slate-100 text-base font-semibold">Onboarding Progress</p>
                            <p className="text-blue-600 text-sm font-bold">Step 5 of 6</p>
                        </div>
                        <div className="h-2.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                            <div className="h-full rounded-full bg-blue-600 transition-all duration-500" style={{ width: "83%" }}></div>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">Preferences: Reading Style</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 mb-8">
                        <h1 className="text-slate-900 dark:text-slate-100 text-4xl font-black leading-tight tracking-tight max-w-2xl">
                            Choose your reading style
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 text-lg font-normal leading-relaxed max-w-2xl">
                            Select how you want text to be presented during your speed reading training. You can always change this later.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                        {/* Word Flash Mode */}
                        <label className="relative group cursor-pointer">
                            <input type="radio" name="reading_style" value="word_flash" className="peer sr-only" defaultChecked />
                            <div className="flex flex-col gap-5 p-5 bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-100 dark:border-slate-800 transition-all duration-200 peer-checked:border-blue-600 peer-checked:ring-4 peer-checked:ring-blue-600/10 hover:shadow-md h-full">
                                <div className="w-full bg-slate-50 dark:bg-slate-800 aspect-video rounded-lg overflow-hidden flex flex-col items-center justify-center p-4">
                                    <span className="text-2xl font-bold font-mono tracking-widest text-slate-800 dark:text-slate-200">FOCUS</span>
                                    <div className="mt-2 w-16 h-1 bg-blue-600 rounded"></div>
                                    <Target className="w-6 h-6 text-blue-600/50 absolute top-4 right-4" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center justify-between">
                                        <p className="text-slate-900 dark:text-slate-100 text-xl font-bold">Word Flash</p>
                                        <div className="h-5 w-5 rounded-full border-2 border-slate-300 dark:border-slate-700 peer-checked:bg-blue-600 peer-checked:border-blue-600 flex items-center justify-center transition-colors">
                                            <div className="h-2 w-2 rounded-full bg-white opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                                        </div>
                                    </div>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-relaxed">
                                        Single words flash in the center of the screen to minimize eye movement. Best for maximum WPM.
                                    </p>
                                </div>
                            </div>
                        </label>

                        {/* Sentence Highlight Mode */}
                        <label className="relative group cursor-pointer">
                            <input type="radio" name="reading_style" value="sentence" className="peer sr-only" />
                            <div className="flex flex-col gap-5 p-5 bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-100 dark:border-slate-800 transition-all duration-200 peer-checked:border-blue-600 peer-checked:ring-4 peer-checked:ring-blue-600/10 hover:shadow-md h-full">
                                <div className="w-full bg-slate-50 dark:bg-slate-800 aspect-video rounded-lg overflow-hidden flex flex-col justify-center p-4">
                                    <div className="space-y-2">
                                        <div className="flex text-sm font-mono text-slate-400 dark:text-slate-500">
                                            <span className="bg-blue-100 dark:bg-blue-900/50 text-slate-900 dark:text-slate-100 px-1 rounded transition max-w-full truncate">The quick brown fox</span>
                                            <span>&nbsp;jumps</span>
                                        </div>
                                        <div className="text-sm font-mono text-slate-400 dark:text-slate-500">over the lazy dog.</div>
                                    </div>
                                    <AlignLeft className="w-6 h-6 text-blue-600/50 absolute top-4 right-4" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center justify-between">
                                        <p className="text-slate-900 dark:text-slate-100 text-xl font-bold">Sentence Hint</p>
                                        <div className="h-5 w-5 rounded-full border-2 border-slate-300 dark:border-slate-700 peer-checked:bg-blue-600 peer-checked:border-blue-600 flex items-center justify-center transition-colors">
                                            <div className="h-2 w-2 rounded-full bg-white opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                                        </div>
                                    </div>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-relaxed">
                                        Full text is visible, but phrases are highlighted sequentially. Great for maintaining context.
                                    </p>
                                </div>
                            </div>
                        </label>

                        {/* Paragraph Bionic Mode */}
                        <label className="relative group cursor-pointer">
                            <input type="radio" name="reading_style" value="paragraph" className="peer sr-only" />
                            <div className="flex flex-col gap-5 p-5 bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-100 dark:border-slate-800 transition-all duration-200 peer-checked:border-blue-600 peer-checked:ring-4 peer-checked:ring-blue-600/10 hover:shadow-md h-full">
                                <div className="w-full bg-slate-50 dark:bg-slate-800 aspect-video rounded-lg overflow-hidden flex flex-col justify-center p-4">
                                    <div className="space-y-2 text-sm">
                                        <div><b>Th</b>is <b>i</b>s <b>a</b>n <b>examp</b>le <b>o</b>f</div>
                                        <div><b>bion</b>ic <b>read</b>ing <b>for</b>mat.</div>
                                    </div>
                                    <Eye className="w-6 h-6 text-blue-600/50 absolute top-4 right-4" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center justify-between">
                                        <p className="text-slate-900 dark:text-slate-100 text-xl font-bold">Bionic Reading</p>
                                        <div className="h-5 w-5 rounded-full border-2 border-slate-300 dark:border-slate-700 peer-checked:bg-blue-600 peer-checked:border-blue-600 flex items-center justify-center transition-colors">
                                            <div className="h-2 w-2 rounded-full bg-white opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                                        </div>
                                    </div>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-relaxed">
                                        Highlights the first few letters of each word to let your brain naturally complete the rest.
                                    </p>
                                </div>
                            </div>
                        </label>
                    </div>

                    <div className="flex justify-between items-center pt-8 border-t border-slate-200 dark:border-slate-800">
                        <Link href="/onboarding/topics" className="flex min-w-[120px] items-center justify-center gap-2 rounded-lg h-12 px-6 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-base font-bold transition-colors hover:bg-slate-200 dark:hover:bg-slate-700">
                            <ArrowLeft className="w-5 h-5" />
                            <span>Back</span>
                        </Link>
                        <Link href="/onboarding/speed" className="flex min-w-[160px] items-center justify-center gap-2 rounded-lg h-12 px-8 bg-blue-600 text-white text-base font-bold shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all">
                            <span>Next Step</span>
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
