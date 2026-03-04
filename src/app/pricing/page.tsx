import Link from "next/link";
import { BookOpen, CheckCircle2, TrendingUp, Sparkles, Building2 } from "lucide-react";

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200">

            {/* Navigation */}
            <nav className="fixed top-0 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600/10 text-blue-600">
                            <BookOpen className="w-5 h-5" />
                        </div>
                        <Link href="/" className="text-xl font-bold leading-tight tracking-tight">SwiftRead AI</Link>
                    </div>

                    <div className="hidden md:flex items-center gap-6">
                        <Link href="/#features" className="text-sm font-medium hover:text-blue-600 transition-colors text-slate-500">Features</Link>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link href="/auth/login" className="text-sm font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">Log In</Link>
                        <Link href="/auth/signup" className="hidden sm:flex text-sm font-bold bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm">Get Started</Link>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center">

                <div className="text-center max-w-3xl mb-16">
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-6">Simple, transparent pricing</h1>
                    <p className="text-xl text-slate-500 dark:text-slate-400 leading-relaxed">
                        Invest in your cognitive performance. Accelerate your reading speed and retain more information with our AI-powered platform.
                    </p>

                    {/* Basic Toggle */}
                    <div className="mt-10 inline-flex items-center bg-slate-200 dark:bg-slate-800 p-1 rounded-xl">
                        <button className="px-6 py-2.5 rounded-lg text-sm font-bold bg-white dark:bg-slate-900 shadow-sm text-slate-900 dark:text-white">Monthly</button>
                        <button className="px-6 py-2.5 rounded-lg text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-2">
                            Yearly <span className="text-[10px] bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 px-2 py-0.5 rounded-full uppercase tracking-wider">Save 20%</span>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl mx-auto">

                    {/* Free Tier */}
                    <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 flex flex-col shadow-sm">
                        <div className="mb-8">
                            <h3 className="text-lg font-bold uppercase tracking-widest text-slate-500 mb-4">Starter</h3>
                            <div className="flex items-baseline gap-2">
                                <span className="text-5xl font-black">$0</span>
                                <span className="text-slate-500 dark:text-slate-400 font-medium">/ forever</span>
                            </div>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-4 leading-relaxed">
                                Perfect for trying out the core speed reading techniques.
                            </p>
                        </div>

                        <ul className="space-y-4 mb-8 flex-1">
                            {[
                                'Basic reading trainer (up to 400 WPM)',
                                '3 AI content generations per day',
                                'Basic analytics & history',
                                'Standard word-flash mode',
                                'Community support'
                            ].map((feature, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                                    <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">{feature}</span>
                                </li>
                            ))}
                        </ul>
                        <Link href="/auth/signup" className="w-full py-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold text-center hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600 transition-colors">
                            Get Started Free
                        </Link>
                    </div>

                    {/* Pro Tier (Highlighted) */}
                    <div className="bg-blue-600 dark:bg-blue-600 rounded-3xl p-8 border-2 border-blue-600 flex flex-col shadow-2xl shadow-blue-600/20 relative transform md:-translate-y-4">
                        <div className="absolute top-0 right-0 bg-gradient-to-tr from-cyan-400 to-blue-400 text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-bl-xl rounded-tr-xl flex items-center gap-1 shadow-sm">
                            <Sparkles className="w-3.5 h-3.5" />
                            Most Popular
                        </div>

                        <div className="mb-8">
                            <h3 className="text-lg font-bold uppercase tracking-widest text-blue-200 mb-4 flex items-center gap-2">
                                <TrendingUp className="w-5 h-5" /> Pro
                            </h3>
                            <div className="flex items-baseline gap-2 text-white">
                                <span className="text-5xl font-black">$10</span>
                                <span className="text-blue-200 font-medium">/ month</span>
                            </div>
                            <p className="text-sm text-blue-100 mt-4 leading-relaxed">
                                Unlock exponential growth with unlimited AI and advanced tracking.
                            </p>
                        </div>

                        <ul className="space-y-4 mb-8 flex-1">
                            {[
                                'Unlimited reading speed (1000+ WPM)',
                                'Unlimited AI content generation',
                                'Advanced analytics & trend mapping',
                                'Multiplayer reading challenges',
                                'Browser extension for any webpage',
                                'AI comprehension quizzes',
                                'All advanced reading modes (Bionic, etc.)'
                            ].map((feature, i) => (
                                <li key={i} className="flex items-start gap-3 text-white">
                                    <CheckCircle2 className="w-5 h-5 text-cyan-300 shrink-0 mt-0.5" />
                                    <span className="text-sm font-medium">{feature}</span>
                                </li>
                            ))}
                        </ul>
                        <Link href="/auth/signup" className="w-full py-4 rounded-xl bg-white text-blue-600 font-bold text-center hover:bg-slate-50 transition-colors shadow-lg">
                            Start Free 7-Day Trial
                        </Link>
                    </div>

                    {/* Enterprise Tier */}
                    <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 flex flex-col shadow-sm">
                        <div className="mb-8">
                            <h3 className="text-lg font-bold uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-2">
                                <Building2 className="w-5 h-5" /> Enterprise
                            </h3>
                            <div className="flex items-baseline gap-2">
                                <span className="text-4xl font-black text-slate-900 dark:text-white">Custom</span>
                            </div>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-4 leading-relaxed">
                                For schools, universities, and corporate training programs.
                            </p>
                        </div>

                        <ul className="space-y-4 mb-8 flex-1">
                            {[
                                'Everything in Pro',
                                'Bulk seating & volume discounts',
                                'Dedicated admin dashboard',
                                'Custom curriculum integration',
                                'Priority 24/7 support',
                                'Custom SSO integration',
                                'Data export & compliance tools'
                            ].map((feature, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                                    <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">{feature}</span>
                                </li>
                            ))}
                        </ul>
                        <Link href="#" className="w-full py-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold text-center hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600 transition-colors">
                            Contact Sales
                        </Link>
                    </div>
                </div>

            </main>
        </div>
    );
}
