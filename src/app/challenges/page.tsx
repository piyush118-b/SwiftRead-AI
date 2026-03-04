import Link from "next/link";
import { BookOpen, Trophy, Brain, Timer, User, CheckCircle, Lightbulb, Play, ArrowRight, Activity, Medal, Orbit } from "lucide-react";

export default function ChallengesPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200">

            {/* Navigation */}
            <nav className="fixed top-0 w-full bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 z-50">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600/10 text-blue-600">
                            <BookOpen className="w-5 h-5" />
                        </div>
                        <Link href="/dashboard" className="text-xl font-bold leading-tight tracking-tight">SwiftRead AI</Link>
                    </div>

                    <div className="hidden md:flex items-center gap-6">
                        <Link href="/dashboard" className="text-sm font-medium hover:text-blue-600 transition-colors text-slate-500">Dashboard</Link>
                        <Link href="/library" className="text-sm font-medium hover:text-blue-600 transition-colors text-slate-500">Library</Link>
                        <Link href="/analytics" className="text-sm font-medium hover:text-blue-600 transition-colors text-slate-500">Analytics</Link>
                        <Link href="/challenges" className="text-blue-600 font-semibold border-b-2 border-blue-600 py-5">
                            Challenges
                        </Link>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex items-center gap-2 bg-slate-100 dark:bg-slate-800/50 p-1 rounded-full border border-slate-200 dark:border-slate-800">
                            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded-full text-xs font-bold uppercase tracking-wider">
                                <Activity className="w-3.5 h-3.5" />
                                450 WPM
                            </div>
                            <div className="flex items-center gap-1.5 px-3 py-1.5 text-slate-600 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
                                <Timer className="w-3.5 h-3.5" />
                                2:15
                            </div>
                        </div>
                        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-400 text-white flex items-center justify-center font-bold text-sm shadow-md border-2 border-blue-600/20">
                            JD
                        </div>
                    </div>
                </div>
            </nav>

            <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">

                {/* Main Content Area */}
                <div className="flex-1 space-y-6">

                    {/* Session Success Header */}
                    <div className="bg-gradient-to-br from-blue-600/10 to-transparent border border-blue-600/20 rounded-2xl p-8 text-center relative overflow-hidden">
                        <div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
                        <div className="flex flex-col items-center gap-4 relative z-10">
                            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-600/20">
                                <Trophy className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold tracking-tight dark:text-white">Session Complete!</h2>
                                <p className="text-slate-500 dark:text-slate-400 mt-1">Excellent pace. Now, prove your understanding.</p>
                            </div>
                        </div>
                    </div>

                    {/* Quiz Card */}
                    <div className="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
                        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <BookOpen className="w-5 h-5 text-blue-600" />
                                <h3 className="text-lg font-semibold">Comprehension Quiz</h3>
                            </div>
                            <span className="text-xs font-bold px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full">5 QUESTIONS</span>
                        </div>

                        <div className="p-8 space-y-10">
                            {/* Question 1 */}
                            <div className="space-y-4">
                                <h4 className="text-base font-medium leading-relaxed">1. What was the primary thesis regarding the economic shift mentioned in the second paragraph?</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {['Decentralized finance scaling', 'Resource scarcity myths', 'Global supply chain fragility', 'Hyper-localization of labor'].map((ans, idx) => (
                                        <label key={idx} className="flex items-center gap-4 px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-800 hover:border-blue-600/50 cursor-pointer transition-all group has-[:checked]:border-blue-600 has-[:checked]:bg-blue-600/5">
                                            <input type="radio" name="q1" className="w-5 h-5 text-blue-600 border-slate-300 focus:ring-blue-600 dark:bg-slate-900" defaultChecked={idx === 0} />
                                            <span className="text-sm text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{ans}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Question 2 */}
                            <div className="space-y-4">
                                <h4 className="text-base font-medium leading-relaxed">2. Which technological disruption was identified as the 'catalyst' for the change?</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {['Quantum encryption', 'Biometric authentication', 'Neural language models', 'Autonomous logistics'].map((ans, idx) => (
                                        <label key={idx} className="flex items-center gap-4 px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-800 hover:border-blue-600/50 cursor-pointer transition-all group has-[:checked]:border-blue-600 has-[:checked]:bg-blue-600/5">
                                            <input type="radio" name="q2" className="w-5 h-5 text-blue-600 border-slate-300 focus:ring-blue-600 dark:bg-slate-900" defaultChecked={idx === 2} />
                                            <span className="text-sm text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{ans}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Questions 3-5 omitted for brevity in UI demo */}
                            <div className="text-center text-sm text-slate-400 italic py-4">Questions 3-5 omitted for demo</div>

                            {/* Submit Section */}
                            <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                                <div className="flex items-center gap-2 text-slate-500 text-sm">
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                    Answers saved automatically
                                </div>
                                <Link href="/analytics" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-transform active:scale-95 shadow-lg shadow-blue-600/20 flex items-center gap-2">
                                    Submit Results
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Sidebar: Rankings */}
                <aside className="w-full lg:w-80 flex flex-col gap-6">

                    {/* Potential Points Card */}
                    <div className="bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl p-6 text-white shadow-xl shadow-blue-600/20 relative overflow-hidden">
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                        <h4 className="text-sm font-bold uppercase tracking-widest opacity-80">Potential Score</h4>
                        <div className="mt-4 flex items-baseline gap-2">
                            <span className="text-4xl font-black">1,250</span>
                            <span className="text-sm font-medium opacity-80">pts</span>
                        </div>
                        <div className="mt-6 space-y-3">
                            <div className="flex items-center justify-between text-xs">
                                <span className="opacity-80">Speed Bonus</span>
                                <span className="font-bold">+450</span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                                <span className="opacity-80">Accuracy (Est.)</span>
                                <span className="font-bold">+800</span>
                            </div>
                            <div className="w-full relative mt-2">
                                <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
                                    <div className="bg-white h-full w-3/4 shadow-[0_0_10px_rgba(255,255,255,0.8)]"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Live Rankings Widget */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col shadow-sm">
                        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Medal className="w-5 h-5 text-amber-500" />
                                <h3 className="font-bold text-sm">Live Rankings</h3>
                            </div>
                            <div className="flex items-center gap-1.5 bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded border border-green-200 dark:border-green-800/50">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                                <span className="text-[10px] font-bold uppercase text-green-600 dark:text-green-400 tracking-wider">Live</span>
                            </div>
                        </div>

                        <div className="p-2 flex flex-col gap-1">
                            {/* Ranking Item 1 */}
                            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
                                <div className="flex items-center gap-3">
                                    <span className="text-xs font-bold w-4 text-center text-slate-500">1</span>
                                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 text-xs font-bold">AC</div>
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold text-slate-900 dark:text-white">Alex Chen</span>
                                        <span className="text-[10px] text-slate-500 uppercase font-semibold">Finished</span>
                                    </div>
                                </div>
                                <span className="text-xs font-bold text-blue-600 dark:text-blue-400">1,420</span>
                            </div>

                            {/* Ranking Item 2 */}
                            <div className="flex items-center justify-between p-3 rounded-xl border border-transparent hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                <div className="flex items-center gap-3">
                                    <span className="text-xs font-bold w-4 text-center text-slate-500">2</span>
                                    <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center text-purple-600 text-xs font-bold">SJ</div>
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold text-slate-900 dark:text-white">Sarah J.</span>
                                        <span className="text-[10px] text-slate-500 uppercase font-semibold">Finished</span>
                                    </div>
                                </div>
                                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">1,385</span>
                            </div>

                            {/* Current User Ranking */}
                            <div className="flex items-center justify-between p-3 rounded-xl bg-blue-50/50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800/50 relative overflow-hidden">
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600"></div>
                                <div className="flex items-center gap-3 pl-2">
                                    <span className="text-xs font-bold w-4 text-center text-blue-600">3</span>
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-400 text-white flex items-center justify-center text-xs font-bold shadow-sm border border-white/20">JD</div>
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold text-slate-900 dark:text-white">You</span>
                                        <span className="text-[10px] text-blue-600 font-bold uppercase flex items-center gap-1">
                                            <Orbit className="w-3 h-3 animate-spin" /> Answering...
                                        </span>
                                    </div>
                                </div>
                                <span className="text-xs font-bold text-blue-600 italic">~1,250</span>
                            </div>

                            {/* Ranking Item 4 */}
                            <div className="flex items-center justify-between p-3 rounded-xl border border-transparent opacity-60">
                                <div className="flex items-center gap-3">
                                    <span className="text-xs font-bold w-4 text-center text-slate-500">4</span>
                                    <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-600 text-xs font-bold">MV</div>
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold text-slate-900 dark:text-white">Marcus V.</span>
                                        <span className="text-[10px] text-slate-500 uppercase font-semibold">Reading...</span>
                                    </div>
                                </div>
                                <span className="text-xs font-bold text-slate-400">—</span>
                            </div>
                        </div>

                        <button className="p-3 text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors uppercase tracking-widest border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30 rounded-b-2xl">
                            View Full Leaderboard
                        </button>
                    </div>

                    {/* Accuracy Tips */}
                    <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/30 rounded-2xl p-5 flex gap-3">
                        <Lightbulb className="w-5 h-5 text-amber-500 shrink-0" />
                        <div className="space-y-1">
                            <h5 className="text-xs font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wider">Pro Tip</h5>
                            <p className="text-xs leading-relaxed text-amber-700 dark:text-amber-300 font-medium pb-1">Accuracy is weighted 2x more than speed in the final ranking. Take your time with the tricky questions!</p>
                        </div>
                    </div>

                </aside>
            </main>
        </div>
    );
}
