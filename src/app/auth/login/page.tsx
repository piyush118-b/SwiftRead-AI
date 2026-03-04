import Link from "next/link";
import { BookOpen, Lightbulb, Bookmark, Eye } from "lucide-react";
import { login } from "../actions";
import OAuthButtons from "@/components/OAuthButtons";

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4 md:p-8 font-sans antialiased">
            <div className="max-w-5xl w-full bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row min-h-[700px]">
                {/* Left Side: Illustration & Motivation */}
                <div className="hidden md:flex md:w-1/2 bg-blue-600/5 dark:bg-blue-600/10 flex-col justify-between p-12 relative overflow-hidden">
                    <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl"></div>

                    <div className="flex items-center gap-3 relative z-10">
                        <div className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center">
                            <BookOpen className="w-6 h-6" />
                        </div>
                        <Link href="/" className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">SwiftRead AI</Link>
                    </div>

                    <div className="relative z-10 flex flex-col items-center">
                        <div className="w-full aspect-square max-w-[320px] bg-gradient-to-br from-blue-600/20 to-blue-600/5 rounded-2xl shadow-inner flex items-center justify-center p-8">
                            <div className="relative w-full h-full bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 flex flex-col gap-4">
                                <div className="h-2 w-3/4 bg-slate-200 dark:bg-slate-700 rounded"></div>
                                <div className="h-2 w-full bg-blue-600/20 rounded"></div>
                                <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded"></div>
                                <div className="h-2 w-1/2 bg-slate-200 dark:bg-slate-700 rounded"></div>

                                <div className="absolute -right-4 top-1/4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs shadow-lg flex items-center gap-1 font-medium">
                                    <Lightbulb className="w-4 h-4" /> Key Insight
                                </div>
                                <div className="absolute -left-6 bottom-1/4 bg-white dark:bg-slate-700 border border-slate-100 dark:border-slate-600 px-3 py-1 rounded-full text-xs shadow-lg text-slate-600 dark:text-slate-300 flex items-center gap-1 font-medium">
                                    <Bookmark className="w-4 h-4 text-blue-600" /> Saved
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative z-10">
                        <p className="font-serif italic text-2xl text-slate-800 dark:text-slate-200 leading-relaxed">
                            "Reading is to the mind what exercise is to the body."
                        </p>
                        <p className="mt-4 text-slate-500 dark:text-slate-400 font-medium tracking-wide text-sm uppercase">— Joseph Addison</p>
                    </div>
                </div>

                {/* Right Side: Auth Form */}
                <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                    <div className="max-w-md w-full mx-auto">
                        <div className="mb-10 block md:hidden">
                            <div className="flex items-center gap-3 text-blue-600 mb-8">
                                <BookOpen className="w-8 h-8" />
                                <Link href="/" className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">SwiftRead AI</Link>
                            </div>
                        </div>
                        <div className="mb-10">
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Sign in to SwiftRead AI</h2>
                            <p className="mt-3 text-slate-500 dark:text-slate-400">Welcome back! Please enter your details to access your library.</p>
                        </div>

                        <OAuthButtons />

                        <div className="relative mb-8">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white dark:bg-slate-900 px-4 text-slate-400 font-semibold tracking-widest">Or continue with</span>
                            </div>
                        </div>

                        <form className="space-y-6" action={login}>
                            <div>
                                <label htmlFor="email" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
                                <input type="email" id="email" name="email" className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all outline-none" placeholder="name@company.com" required />
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label htmlFor="password" className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Password</label>
                                    <Link href="#" className="text-xs font-bold text-blue-600 hover:underline">Forgot password?</Link>
                                </div>
                                <div className="relative">
                                    <input type="password" id="password" name="password" className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all outline-none" placeholder="••••••••" required />
                                    <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                                        <Eye className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <input type="checkbox" id="remember" className="w-4 h-4 text-blue-600 border-slate-300 dark:border-slate-600 rounded focus:ring-blue-600" />
                                <label htmlFor="remember" className="ml-2 block text-sm text-slate-600 dark:text-slate-400">Remember me for 30 days</label>
                            </div>

                            <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3.5 px-4 rounded-lg hover:bg-blue-700 shadow-lg shadow-blue-600/20 active:scale-[0.98] transition-all">
                                Login / Continue to Onboarding
                            </button>
                        </form>

                        <p className="mt-8 text-center text-sm text-slate-600 dark:text-slate-400">
                            Don't have an account?
                            <Link href="/auth/signup" className="font-bold text-blue-600 hover:underline ml-1">Sign up for free</Link>
                        </p>

                        <div className="mt-12 flex justify-center gap-6 text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                            <Link href="#" className="hover:text-slate-600 dark:hover:text-slate-300">Terms of Service</Link>
                            <span>•</span>
                            <Link href="#" className="hover:text-slate-600 dark:hover:text-slate-300">Privacy Policy</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
