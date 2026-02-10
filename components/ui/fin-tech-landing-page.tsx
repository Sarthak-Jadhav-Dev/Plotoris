"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, ArrowUpRight, Home, FileText, CreditCard, Info } from "lucide-react";
import { AnimeNavBar } from "@/components/ui/anime-navbar";

/** Moneyflow Fintech Landing Page (no browser chrome) */

interface StatProps {
    label: string;
    value: string;
}

const Stat = ({ label, value }: StatProps) => (
    <div className="space-y-1">
        <div className="text-3xl font-semibold tracking-tight text-slate-900">{value}</div>
        <div className="text-sm text-orange-500">{label}</div>
    </div>
);

interface SoftButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;
}

const SoftButton = ({ children, className = "", ...props }: SoftButtonProps) => (
    <button
        className={
            "rounded-full px-5 py-2.5 text-sm font-medium shadow-sm transition focus:outline-none focus:ring-2 focus:ring-offset-2 " +
            "bg-orange-900 text-white hover:bg-orange-800 focus:ring-orange-700 " +
            className
        }
        {...props}
    >
        {children}
    </button>
);

function MiniBars() {
    return (
        <div className="mt-6 flex h-36 items-end gap-4 rounded-xl bg-linear-to-b from-orange-50 to-purple p-4">
            {[18, 48, 72, 96].map((h, i) => (
                <motion.div
                    key={i}
                    initial={{ height: 0, opacity: 0.6 }}
                    animate={{ height: h }}
                    transition={{ delay: 0.5 + i * 0.15, type: "spring" }}
                    className="w-10 rounded-xl bg-linear-to-t from-orange-200 to-purple-400 shadow-inner"
                />
            ))}
        </div>
    );
}

function Planet() {
    return (
        <motion.svg
            initial={{ rotate: -8 }}
            animate={{ rotate: 0 }}
            transition={{ duration: 2, type: "spring" }}
            width="220"
            height="220"
            viewBox="0 0 220 220"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#D4BBF2" />
                    <stop offset="100%" stopColor="#EEBBF2" />
                </linearGradient>
            </defs>
            <circle cx="110" cy="110" r="56" fill="url(#grad)" opacity="0.95" />
            <circle cx="94" cy="98" r="10" fill="white" opacity="0.45" />
            <circle cx="132" cy="126" r="8" fill="white" opacity="0.35" />
            <motion.ellipse
                cx="110" cy="110" rx="100" ry="34" stroke="white" strokeOpacity="0.6" fill="none"
                animate={{ strokeDashoffset: [200, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} strokeDasharray="200 200"
            />
            <motion.circle cx="210" cy="110" r="4" fill="white" animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 2.2, repeat: Infinity }} />
        </motion.svg>
    );
}

export default function MoneyflowLandingPage() {
    const navItems = [
        {
            name: "Home",
            url: "/",
            icon: Home,
        },
        {
            name: "About Plotoris",
            url: "/about",
            icon: FileText,
        },
        {
            name: "Login",
            url: "/login",
            icon: CreditCard,
        },
        {
            name: "Register",
            url: "/register",
            icon: Info,
        },
    ];

    return (
        <div className="min-h-screen w-full bg-[#f3e0f7]">
            {/* Fonts */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        :root { --font-sans: 'Plus Jakarta Sans', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif; }
        .font-jakarta { font-family: var(--font-sans); }
      `}</style>

            {/* Anime Navbar */}
            <AnimeNavBar items={navItems} defaultActive="Home" />

            {/* Hero area */}
            <div className="mx-auto grid w-full max-w-[1180px] grid-cols-1 gap-6 px-4 pb-14 md:grid-cols-2 md:px-0 pt-32">
                {/* Left: headline */}
                <div className="flex flex-col justify-center space-y-12 pr-2">
                    <div>
                        <h1 className="text-5xl md:text-6xl font-semibold leading-[1.05] tracking-tight text-slate-900">
                            Organize your Research
                            <br />
                            with AI.
                        </h1>
                        <p className="mt-4 max-w-md text-slate-600">
                            Join thousands of researchers who choose <span className="font-medium text-slate-900">Plotoris</span> for intelligent, seamless, and collaborative AI-powered research management.
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <SoftButton>
                            Get Started <ArrowUpRight className="ml-1 inline h-4 w-4" />
                        </SoftButton>
                    </div>

                    <div className="grid grid-cols-2 gap-8 pt-2 md:max-w-sm">
                        <Stat label="AI Models" value="50+" />
                        <Stat label="Research Papers" value="100K+" />
                    </div>

                    <div className="mt-6 flex items-center gap-8 opacity-70">
                        <span className="text-xs text-slate-500">TRUSTED BY TOP INSTITUTIONS</span>
                        <div className="flex items-center gap-6 text-slate-400">
                            <span className="font-semibold">MIT</span>
                            <span className="font-semibold">Stanford</span>
                            <span className="font-semibold">Oxford</span>
                        </div>
                    </div>
                </div>

                {/* Right: animated card grid */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {/* Secure card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="relative col-span-1 overflow-hidden rounded-xl bg-linear-to-b from-emerald-900 to-emerald-800 p-6 text-emerald-50 shadow-lg"
                    >
                        <div className="absolute inset-0">
                            <svg className="absolute inset-0 h-full w-full opacity-30" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <radialGradient id="rg" cx="50%" cy="50%" r="50%">
                                        <stop offset="0%" stopColor="#22d3aa" stopOpacity="0.35" />
                                        <stop offset="100%" stopColor="transparent" />
                                    </radialGradient>
                                </defs>
                                <rect width="400" height="400" fill="url(#rg)" />
                                {[...Array(12)].map((_, i) => (
                                    <circle key={i} cx="200" cy="200" r={20 + i * 14} fill="none" stroke="currentColor" strokeOpacity="0.12" />
                                ))}
                            </svg>
                        </div>

                        <div className="relative flex h-full flex-col justify-between">
                            <div className="flex items-center gap-3">
                                <div className="rounded-full bg-purple-700/60 p-2 ring-1 ring-white/10">
                                    <ShieldCheck className="h-5 w-5" />
                                </div>
                                <span className="text-xs uppercase tracking-wider text-purple-200">AI-Powered</span>
                            </div>
                            <div className="mt-6 text-xl leading-snug text-purple-50/95">
                                Intelligent Analysis
                                <br /> keeps your research organized
                            </div>
                            <motion.div
                                className="absolute right-6 top-6 h-12 w-12 rounded-full bg-orange-600/40"
                                animate={{ boxShadow: ["0 0 0 0 rgba(255,185,129,0.35)", "0 0 0 16px rgba(255,185,129,0)"] }}
                                transition={{ duration: 2.5, repeat: Infinity }}
                            />
                        </div>
                    </motion.div>

                    {/* Currencies card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="relative col-span-1 overflow-hidden rounded-xl bg-linear-to-b from-orange-300 to-purple-500 p-6 text-white shadow-lg"
                    >
                        <div className="pointer-events-none absolute -right-8 -top-10 opacity-70">
                            <Planet />
                        </div>
                        <div className="relative mt-24 text-sm text-black/90">Collaboration</div>
                        <div className="text-xl font-medium leading-snug text-black/90">
                            Connect with researchers
                            <br /> worldwide in real-time
                        </div>
                    </motion.div>

                    {/* Growth card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="col-span-1 rounded-xl bg-white p-6 text-slate-800 shadow-lg ring-1 ring-slate-200"
                    >
                        <div className="text-sm text-slate-500">Research Impact</div>
                        <div className="mt-2 text-3xl font-semibold tracking-tight">12,847 <span className="text-sm font-medium text-slate-400 align-middle">Citations</span></div>
                        <div className="mt-1 text-xs text-emerald-600">↑ 24.5%</div>
                        <MiniBars />
                    </motion.div>

                    <div className="hidden md:block" />
                </div>
            </div>

            <footer className="mx-auto w-full max-w-[1180px] px-4 pb-10 text-center text-xs text-slate-400 md:px-0">
                © {new Date().getFullYear()} Plotoris, Inc. All rights reserved.
            </footer>
        </div>
    );
}
