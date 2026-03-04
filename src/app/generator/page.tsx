"use client";

import Link from "next/link";
import { BookOpen, Sparkles, SlidersHorizontal, Settings2, FileText, ArrowRight, Brain, Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function GeneratorPage() {
    const router = useRouter();
    const [topic, setTopic] = useState("");
    const [difficulty, setDifficulty] = useState("intermediate");
    const [length, setLength] = useState("medium");
    const [tone, setTone] = useState("informative");
    const [isGenerating, setIsGenerating] = useState(false);
    const [activeTab, setActiveTab] = useState("ai"); // "ai" or "manual"
    const [manualText, setManualText] = useState("");

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsGenerating(true);

        try {
            const res = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ topic, difficulty, length, tone })
            });

            if (res.ok) {
                const data = await res.json();
                localStorage.setItem("swiftread_generated_text", data.text);
                router.push("/trainer");
            } else {
                const data = await res.json();
                alert(`Generation failed: ${data.error || "Unknown error"}`);
            }

        } catch (error) {
            console.error(error);
            alert("Error connecting to AI service.");
        } finally {
            setIsGenerating(false);
        }
    };

    const handleManualSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (manualText.trim().length < 50) {
            alert("Please paste a bit more text (at least 50 characters) for a better training session.");
            return;
        }
        localStorage.setItem("swiftread_generated_text", manualText);
        router.push("/trainer");
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200">

            {/* Navigation */}
            <nav className="fixed top-0 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600/10 text-blue-600">
                            <BookOpen className="w-5 h-5" />
                        </div>
                        <Link href="/dashboard" className="text-xl font-bold leading-tight tracking-tight">SwiftRead AI</Link>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link href="/dashboard" className="text-sm font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
                            Back to Dashboard
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto flex flex-col items-center">

                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white mb-6 shadow-xl shadow-blue-500/20">
                        <Sparkles className="w-8 h-8" />
                    </div>
                    <h1 className="text-4xl font-black tracking-tight mb-4 text-slate-900 dark:text-white">Practice Generator</h1>
                    <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
                        Whether you want AI to craft something new or you have your own text to master, we've got you covered.
                    </p>
                </div>

                {/* Tab Switcher */}
                <div className="flex p-1 bg-slate-200 dark:bg-slate-800 rounded-xl mb-8 w-full max-w-md shadow-inner">
                    <button
                        onClick={() => setActiveTab("ai")}
                        className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${activeTab === "ai" ? "bg-white dark:bg-slate-700 text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"}`}
                    >
                        AI Generator
                    </button>
                    <button
                        onClick={() => setActiveTab("manual")}
                        className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${activeTab === "manual" ? "bg-white dark:bg-slate-700 text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"}`}
                    >
                        Paste Your Text
                    </button>
                </div>

                <div className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm overflow-hidden flex flex-col md:flex-row">

                    {/* Left Column: Form */}
                    <div className="w-full md:w-3/5 p-8 md:p-12 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800">
                        {activeTab === "ai" ? (
                            <form className="space-y-8" onSubmit={handleGenerate}>
                                {/* Topic Input */}
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
                                        <FileText className="w-4 h-4 text-blue-600" /> Subject or Topic
                                    </label>
                                    <input
                                        type="text"
                                        value={topic}
                                        onChange={(e) => setTopic(e.target.value)}
                                        placeholder="e.g., The history of quantum mechanics, Stoic philosophy..."
                                        className="w-full px-4 py-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all outline-none"
                                        required
                                        disabled={isGenerating}
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {/* Difficulty */}
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
                                            <Brain className="w-4 h-4 text-blue-600" /> Reading Level
                                        </label>
                                        <select
                                            value={difficulty}
                                            onChange={(e) => setDifficulty(e.target.value)}
                                            className="w-full px-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white appearance-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all outline-none cursor-pointer"
                                        >
                                            <option value="beginner">Beginner (Simple vocabulary)</option>
                                            <option value="intermediate">Intermediate (Standard)</option>
                                            <option value="advanced">Advanced (Complex concepts)</option>
                                            <option value="academic">Academic (Research level)</option>
                                        </select>
                                    </div>

                                    {/* Length */}
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
                                            <SlidersHorizontal className="w-4 h-4 text-blue-600" /> Length
                                        </label>
                                        <select
                                            value={length}
                                            onChange={(e) => setLength(e.target.value)}
                                            className="w-full px-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white appearance-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all outline-none cursor-pointer"
                                        >
                                            <option value="short">Short (~250 words)</option>
                                            <option value="medium">Medium (~500 words)</option>
                                            <option value="long">Long (~1000 words)</option>
                                            <option value="epic">Epic (~2000 words)</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Tone */}
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
                                        <Settings2 className="w-4 h-4 text-blue-600" /> Tone & Style
                                    </label>
                                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                                        {['Informative', 'Narrative', 'Persuasive', 'Analytical'].map((t) => (
                                            <button
                                                key={t}
                                                type="button"
                                                onClick={() => setTone(t.toLowerCase())}
                                                className={`px-4 py-2.5 rounded-lg border text-sm font-semibold transition ${tone === t.toLowerCase()
                                                    ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-600/20"
                                                    : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600"
                                                    }`}
                                            >
                                                {t}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isGenerating}
                                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 mt-4"
                                >
                                    {isGenerating ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Generating Content...
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles className="w-5 h-5" /> Generate & Start Reading
                                        </>
                                    )}
                                </button>
                            </form>
                        ) : (
                            <form className="space-y-6" onSubmit={handleManualSubmit}>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
                                        <FileText className="w-4 h-4 text-blue-600" /> Paste your reading material
                                    </label>
                                    <textarea
                                        value={manualText}
                                        onChange={(e) => setManualText(e.target.value)}
                                        placeholder="Paste an article, book chapter, or any text you want to practice speed reading with..."
                                        className="w-full h-80 px-4 py-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all outline-none resize-none font-sans"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2"
                                >
                                    <ArrowRight className="w-5 h-5" /> Start Training with Custom Text
                                </button>
                            </form>
                        )}
                    </div>


                    {/* Right Column: Preview/Prompt Info */}
                    <div className="w-full md:w-2/5 p-8 md:p-12 bg-slate-50 dark:bg-slate-950 flex flex-col justify-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

                        <div className="relative z-10">
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Generated Prompt</h3>
                            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-inner font-mono text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                <span className="text-blue-500">System:</span> Generate a reading practice text about <span className="text-emerald-500 font-bold">"{topic || '...'}"</span>.
                                <br /><br />
                                <span className="text-blue-500">Parameters:</span><br />
                                - Difficulty: <span className="text-emerald-500">{difficulty}</span><br />
                                - Length: <span className="text-emerald-500">{length}</span><br />
                                - Tone: <span className="text-emerald-500">{tone}</span><br />
                                <br />
                                <span className="text-blue-500">Constraint:</span> Format output clearly without markdown headers, ensuring text flows continuously for speed reading extraction.
                            </div>

                            <div className="mt-8 flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/10 rounded-lg border border-blue-100 dark:border-blue-900/30">
                                <Brain className="w-6 h-6 text-blue-600 shrink-0" />
                                <p className="text-sm text-blue-800 dark:text-blue-300 font-medium">
                                    A quick comprehension quiz will be automatically generated based on the text to test your retention afterward.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}
