"use client";

import Link from "next/link";
import { BookOpen, User, Shield, Save, Loader2, ArrowLeft, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function AccountPage() {
    const supabase = createClient();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [activeTab, setActiveTab] = useState("Personal Info");

    const [profile, setProfile] = useState({
        display_name: "",
        age: "",
    });

    useEffect(() => {
        const fetchProfile = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push("/auth/login");
                return;
            }
            setUser(user);

            const { data, error } = await supabase
                .from("user_profiles")
                .select("*")
                .eq("id", user.id)
                .single();

            if (data) {
                setProfile({
                    display_name: data.display_name || "",
                    age: data.age?.toString() || "",
                });
            }
            setLoading(false);
        };

        fetchProfile();
    }, [supabase, router]);

    const handleSave = async () => {
        if (!user) return;
        setSaving(true);
        setSaveSuccess(false);

        const { error } = await supabase
            .from("user_profiles")
            .update({
                display_name: profile.display_name,
                age: profile.age ? parseInt(profile.age) : null,
                updated_at: new Date().toISOString(),
            })
            .eq("id", user.id);

        setSaving(false);
        if (!error) {
            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 3000);
        } else {
            alert("Error saving profile: " + error.message);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200 flex flex-col">
            <header className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md px-6 py-4 sticky top-0 z-50">
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600/10 text-blue-600">
                        <BookOpen className="w-5 h-5" />
                    </div>
                    <Link href="/dashboard" className="text-xl font-bold leading-tight tracking-tight">SwiftRead AI</Link>
                </div>
                <Link href="/dashboard" className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                </Link>
            </header>

            <main className="flex-1 max-w-5xl w-full mx-auto p-6 md:p-10 flex flex-col md:flex-row gap-12">
                <aside className="w-full md:w-64 shrink-0">
                    <h1 className="text-3xl font-black mb-8 px-4">Account</h1>
                    <nav className="flex flex-row md:flex-col gap-1 overflow-x-auto pb-4 md:pb-0">
                        {[
                            { icon: User, label: 'Personal Info' },
                            { icon: Shield, label: 'Security' }
                        ].map((item, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveTab(item.label)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition whitespace-nowrap ${activeTab === item.label ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'}`}
                            >
                                <item.icon className="w-4 h-4" /> {item.label}
                            </button>
                        ))}
                    </nav>
                </aside>

                <div className="flex-1 max-w-2xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

                    {activeTab === 'Personal Info' && (
                        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
                            <div className="p-8 border-b border-slate-200 dark:border-slate-800">
                                <h2 className="text-xl font-black">Personal Information</h2>
                                <p className="text-sm text-slate-500 mt-1">Update your personal details and how you're seen in the community.</p>
                            </div>

                            <div className="p-8 space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-black text-slate-600 dark:text-slate-400 uppercase tracking-wider">Full Name</label>
                                        <input
                                            type="text"
                                            value={profile.display_name}
                                            onChange={(e) => setProfile({ ...profile, display_name: e.target.value })}
                                            className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl px-4 py-3 font-bold focus:border-blue-600 outline-none transition"
                                            placeholder="Your name"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-black text-slate-600 dark:text-slate-400 uppercase tracking-wider">Age</label>
                                        <input
                                            type="number"
                                            value={profile.age}
                                            onChange={(e) => setProfile({ ...profile, age: e.target.value })}
                                            className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl px-4 py-3 font-bold focus:border-blue-600 outline-none transition"
                                            placeholder="Your age"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-black text-slate-600 dark:text-slate-400 uppercase tracking-wider">Email Address</label>
                                    <input
                                        type="email"
                                        value={user?.email}
                                        disabled
                                        className="w-full bg-slate-200 dark:bg-slate-800/50 border-2 border-slate-100 dark:border-slate-700 rounded-2xl px-4 py-3 font-bold text-slate-500 cursor-not-allowed"
                                    />
                                    <p className="text-[10px] font-bold text-slate-500">Email cannot be changed directly.</p>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="flex flex-col gap-4">
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-black py-5 rounded-3xl transition-all shadow-2xl shadow-blue-600/30 transform active:scale-95 group"
                        >
                            {saving ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : saveSuccess ? (
                                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                            ) : (
                                <Save className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                            )}
                            {saving ? "SAVING..." : saveSuccess ? "CHANGES SAVED!" : "SAVE ACCOUNT"}
                        </button>

                        {saveSuccess && (
                            <p className="text-center text-xs font-bold text-emerald-500 animate-bounce">
                                Your account has been updated successfully!
                            </p>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
