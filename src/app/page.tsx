import Link from "next/link";
import { ArrowRight, BookOpen, Brain, Zap, Trophy, Plug, TrendingUp } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors duration-200">
      <header className="fixed top-0 w-full bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-primary">
            <BookOpen className="w-8 h-8 text-blue-600 dark:text-blue-500" />
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">SwiftRead AI</span>
          </div>
          <nav className="hidden md:flex gap-8">
            <Link href="#features" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400">Features</Link>
            <Link href="#how-it-works" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400">How it Works</Link>
            <Link href="/pricing" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400">Pricing</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/auth/login" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">Log in</Link>
            <Link href="/auth/signup" className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700 transition">Start Free</Link>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="px-4 py-20 text-center max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium mb-8">
            <Zap className="w-4 h-4" />
            AI-Powered Speed Reading Training
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
            Train Your Brain to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Read Faster</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Double your reading speed and boost comprehension with adaptive AI training, word highlighting techniques, and personalized practice material.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/auth/signup" className="flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg transition shadow-lg shadow-blue-500/20">
              Start Training Free
              <ArrowRight className="w-5 h-5" />
            </Link>
            <button className="flex items-center gap-2 px-8 py-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white rounded-xl font-bold text-lg transition">
              Watch Demo
              <TrendingUp className="w-5 h-5" />
            </button>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-slate-50 dark:bg-slate-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to master speed reading</h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg">Powerful features designed to increase your WPM and comprehension.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: Brain, title: "AI Generated Content", desc: "Endless practice material tailored to your reading level and interests." },
                { icon: Zap, title: "Speed Reading Trainer", desc: "Scientific word highlighting techniques to eliminate subvocalization." },
                { icon: Trophy, title: "Comprehension Quizzes", desc: "AI quizzes test your understanding to ensure you don't sacrifice retention." },
                { icon: TrendingUp, title: "Reading Analytics", desc: "Track your WPM growth, reading streaks, and focus metrics over time." },
                { icon: Plug, title: "Browser Plug", desc: "Convert any webpage into a speed reading session instantly." },
                { icon: BookOpen, title: "Dynamic Adaptation", desc: "AI automatically adjusts text difficulty based on your quiz performance." }
              ].map((feature, idx) => (
                <div key={idx} className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center mb-6">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg">Three simple steps to unlock your reading potential.</p>
            </div>
            <div className="flex flex-col md:flex-row justify-center gap-12 text-center">
              {[
                { step: "1", title: "Generate or Import", desc: "Let AI generate material on topics you love, or import articles via URL." },
                { step: "2", title: "Train at Your Pace", desc: "Use the visual trainer with dynamic word highlighting to push your WPM." },
                { step: "3", title: "Test & Improve", desc: "Take an AI comprehension quiz and track your growth on the dashboard." }
              ].map((item, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center">
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-6 shadow-lg shadow-blue-500/20">{item.step}</div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-50 dark:bg-slate-900 py-12 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <BookOpen className="w-6 h-6 text-blue-600" />
            <span className="text-xl font-bold">SwiftRead AI</span>
          </div>
          <p className="text-slate-500 dark:text-slate-400 mb-6">Master the art of reading faster and retaining more.</p>
          <div className="flex justify-center gap-6 mb-8 text-sm font-medium">
            <Link href="#" className="hover:text-blue-600">Terms of Service</Link>
            <Link href="#" className="hover:text-blue-600">Privacy Policy</Link>
            <Link href="#" className="hover:text-blue-600">Contact</Link>
          </div>
          <p className="text-slate-400 text-sm">© {new Date().getFullYear()} SwiftRead AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
