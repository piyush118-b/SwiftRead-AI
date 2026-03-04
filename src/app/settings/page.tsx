import Link from "next/link";
import { BookOpen, Settings2, User, Bell, Shield, Paintbrush, Database, HelpCircle, Save } from "lucide-react";

export default function SettingsPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200 flex flex-col">
            <header className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md px-6 py-4 sticky top-0 z-50">
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600/10 text-blue-600">
                        <BookOpen className="w-5 h-5" />
                    </div>
                    <Link href="/dashboard" className="text-xl font-bold leading-tight tracking-tight">SwiftRead AI</Link>
                </div>
                <Link href="/dashboard" className="text-sm font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
                    Back to Dashboard
                </Link>
            </header>

            <main className="flex-1 max-w-5xl w-full mx-auto p-6 md:p-10 flex flex-col md:flex-row gap-8">
                <aside className="w-full md:w-64 shrink-0">
                    <h1 className="text-2xl font-black mb-6 px-4">Settings</h1>
                    <nav className="flex flex-row md:flex-col gap-1 overflow-x-auto pb-4 md:pb-0">
                        {[
                            { icon: Settings2, label: 'General', active: true },
                            { icon: User, label: 'Account' },
                            { icon: Paintbrush, label: 'Appearance' },
                            { icon: Bell, label: 'Notifications' },
                            { icon: Shield, label: 'Privacy & Security' },
                            { icon: Database, label: 'Data & Export' }
                        ].map((item, idx) => (
                            <button key={idx} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition whitespace-nowrap ${item.active ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'}`}>
                                <item.icon className="w-4 h-4" /> {item.label}
                            </button>
                        ))}
                    </nav>
                </aside>

                <div className="flex-1 max-w-2xl space-y-8">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
                            <h2 className="text-lg font-bold">General Preferences</h2>
                            <p className="text-sm text-slate-500 mt-1">Manage your default reading settings and application behavior.</p>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Setting Item */}
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Default Reading Speed</label>
                                <div className="flex items-center gap-4">
                                    <input type="range" min="150" max="1000" step="10" defaultValue="350" className="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600" />
                                    <span className="text-sm font-bold bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 w-20 text-center">350</span>
                                </div>
                            </div>

                            {/* Setting Item */}
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Primary Reading Mode</label>
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                                    {['Word Flash', 'Sentence Hint', 'Bionic', 'Standard'].map((mode, i) => (
                                        <label key={i} className="flex items-center justify-center py-2.5 px-3 border-2 border-slate-200 dark:border-slate-700 rounded-xl cursor-pointer hover:border-blue-600/50 transition has-[:checked]:border-blue-600 has-[:checked]:bg-blue-50 dark:has-[:checked]:bg-blue-900/20">
                                            <input type="radio" name="mode" className="hidden" defaultChecked={i === 0} />
                                            <span className="text-sm font-semibold">{mode}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Toggle */}
                            <div className="flex items-center justify-between py-2 border-t border-slate-100 dark:border-slate-800 pt-6">
                                <div>
                                    <h4 className="font-semibold text-sm">Adaptive Difficulty</h4>
                                    <p className="text-xs text-slate-500 mt-0.5">Automatically adjust AI text complexity based on your quiz scores.</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" defaultChecked />
                                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-blue-600"></div>
                                </label>
                            </div>
                        </div>

                        <div className="bg-slate-50 dark:bg-slate-800/50 p-6 flex justify-end">
                            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2.5 rounded-xl transition shadow-lg shadow-blue-600/20">
                                <Save className="w-4 h-4" /> Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
