"use client"

import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { LucideIcon, FlaskConical } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
    name: string
    url: string
    icon: LucideIcon
}

interface NavBarProps {
    items: NavItem[]
    className?: string
    defaultActive?: string
}

export function AnimeNavBar({ items, className, defaultActive = "Home" }: NavBarProps) {
    const pathname = usePathname()
    const router = useRouter()
    const [mounted, setMounted] = useState(false)
    const [hoveredTab, setHoveredTab] = useState<string | null>(null)
    const [activeTab, setActiveTab] = useState<string>(defaultActive)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768)
        }

        handleResize()
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    if (!mounted) return null

    return (
        <div className="fixed top-5 left-0 right-0 z-9999">
            <div className="flex justify-center pt-6">
                <motion.div
                    className="flex items-center gap-3 bg-black/50 border border-white/10 backdrop-blur-lg py-2 px-2 rounded-full shadow-lg relative"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                    }}
                >
                    {items.map((item) => {
                        const Icon = item.icon
                        const isActive = activeTab === item.name
                        const isHovered = hoveredTab === item.name

                        return (
                            <Link
                                key={item.name}
                                href={item.url}
                                onClick={(e) => {
                                    setActiveTab(item.name)
                                    router.push(item.url)
                                }}
                                onMouseEnter={() => setHoveredTab(item.name)}
                                onMouseLeave={() => setHoveredTab(null)}
                                className={cn(
                                    "relative cursor-pointer text-sm font-semibold px-6 py-3 rounded-full transition-all duration-300",
                                    "text-white/70 hover:text-white",
                                    isActive && "text-white"
                                )}
                            >
                                {isActive && (
                                    <motion.div
                                        className="absolute inset-0 rounded-full -z-10 overflow-hidden"
                                        initial={{ opacity: 0 }}
                                        animate={{
                                            opacity: [0.3, 0.5, 0.3],
                                            scale: [1, 1.03, 1]
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                    >
                                        <div className="absolute inset-0 bg-primary/25 rounded-full blur-md" />
                                        <div className="absolute inset-[-4px] bg-primary/20 rounded-full blur-xl" />
                                        <div className="absolute inset-[-8px] bg-primary/15 rounded-full blur-2xl" />
                                        <div className="absolute inset-[-12px] bg-primary/5 rounded-full blur-3xl" />

                                        <div
                                            className="absolute inset-0 bg-linear-to-r from-primary/0 via-primary/20 to-primary/0"
                                            style={{
                                                animation: "shine 3s ease-in-out infinite"
                                            }}
                                        />
                                    </motion.div>
                                )}

                                <motion.span
                                    className="hidden md:inline relative z-10"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {item.name}
                                </motion.span>
                                <motion.span
                                    className="md:hidden relative z-10"
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <Icon size={18} strokeWidth={2.5} />
                                </motion.span>

                                <AnimatePresence>
                                    {isHovered && !isActive && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            className="absolute inset-0 bg-white/10 rounded-full -z-10"
                                        />
                                    )}
                                </AnimatePresence>

                                {isActive && (
                                    <motion.div
                                        layoutId="flask-logo"
                                        className="absolute -top-12 left-1/2 -translate-x-1/2 pointer-events-none"
                                        initial={false}
                                        transition={{
                                            type: "spring",
                                            stiffness: 300,
                                            damping: 30,
                                        }}
                                    >
                                        <div className="relative w-10 h-10">
                                            {/* Animated Conical Flask */}
                                            <motion.div
                                                className="absolute left-1/2 -translate-x-1/2 top-1"
                                                animate={
                                                    hoveredTab ? {
                                                        scale: [1, 1.15, 1],
                                                        rotate: [0, -8, 8, 0],
                                                        transition: {
                                                            duration: 0.6,
                                                            ease: "easeInOut"
                                                        }
                                                    } : {
                                                        y: [0, -4, 0],
                                                        transition: {
                                                            duration: 2.5,
                                                            repeat: Infinity,
                                                            ease: "easeInOut"
                                                        }
                                                    }
                                                }
                                            >
                                                {/* Flask Container with custom shape */}
                                                <div className="relative w-8 h-10">
                                                    {/* Flask neck */}
                                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-purple-200/90 border-t-2 border-purple-300 rounded-t-lg" />

                                                    {/* Flask body */}
                                                    <svg width="32" height="40" viewBox="0 0 44 56" className="absolute top-0 left-0">
                                                        <defs>
                                                            <linearGradient id="flaskGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                                                <stop offset="0%" stopColor="#e9d5ff" />
                                                                <stop offset="100%" stopColor="#ddd6fe" />
                                                            </linearGradient>
                                                            <linearGradient id="liquidGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                                                <stop offset="0%" stopColor="#c084fc" />
                                                                <stop offset="50%" stopColor="#a855f7" />
                                                                <stop offset="100%" stopColor="#fb923c" />
                                                            </linearGradient>
                                                        </defs>

                                                        {/* Flask outline */}
                                                        <path
                                                            d="M 13 14 L 13 20 L 6 40 C 5 45 7 52 22 52 C 37 52 39 45 38 40 L 31 20 L 31 14 Z"
                                                            fill="url(#flaskGradient)"
                                                            stroke="#c4b5fd"
                                                            strokeWidth="1.5"
                                                        />

                                                        {/* Animated liquid */}
                                                        <motion.path
                                                            d="M 10 35 L 15 24 L 29 24 L 34 35 C 35 38 34 46 22 46 C 10 46 9 38 10 35 Z"
                                                            fill="url(#liquidGradient)"
                                                            animate={{
                                                                d: hoveredTab
                                                                    ? [
                                                                        "M 10 35 L 15 24 L 29 24 L 34 35 C 35 38 34 46 22 46 C 10 46 9 38 10 35 Z",
                                                                        "M 9 32 L 14 20 L 30 20 L 35 32 C 36 36 35 48 22 48 C 9 48 8 36 9 32 Z",
                                                                        "M 10 35 L 15 24 L 29 24 L 34 35 C 35 38 34 46 22 46 C 10 46 9 38 10 35 Z"
                                                                    ]
                                                                    : [
                                                                        "M 11 38 L 16 26 L 28 26 L 33 38 C 34 41 33 46 22 46 C 11 46 10 41 11 38 Z",
                                                                        "M 10 36 L 15 25 L 29 25 L 34 36 C 35 39 34 47 22 47 C 10 47 9 39 10 36 Z",
                                                                        "M 11 38 L 16 26 L 28 26 L 33 38 C 34 41 33 46 22 46 C 11 46 10 41 11 38 Z"
                                                                    ]
                                                            }}
                                                            transition={{
                                                                duration: hoveredTab ? 1 : 3,
                                                                repeat: Infinity,
                                                                ease: "easeInOut"
                                                            }}
                                                            opacity="0.9"
                                                        />
                                                    </svg>

                                                    {/* Bubbles */}
                                                    <motion.div
                                                        className="absolute w-2 h-2 bg-white/70 rounded-full"
                                                        animate={{
                                                            y: [12, -2],
                                                            opacity: [0, 1, 0],
                                                            scale: [0.5, 1, 0.5]
                                                        }}
                                                        transition={{
                                                            duration: 1.5,
                                                            repeat: Infinity,
                                                            ease: "easeOut",
                                                            delay: 0
                                                        }}
                                                        style={{ left: '35%', top: '40px' }}
                                                    />
                                                    <motion.div
                                                        className="absolute w-1.5 h-1.5 bg-white/80 rounded-full"
                                                        animate={{
                                                            y: [14, -4],
                                                            opacity: [0, 1, 0],
                                                            scale: [0.4, 1, 0.4]
                                                        }}
                                                        transition={{
                                                            duration: 2,
                                                            repeat: Infinity,
                                                            ease: "easeOut",
                                                            delay: 0.5
                                                        }}
                                                        style={{ right: '28%', top: '38px' }}
                                                    />
                                                    <motion.div
                                                        className="absolute w-1 h-1 bg-white/60 rounded-full"
                                                        animate={{
                                                            y: [10, -3],
                                                            opacity: [0, 1, 0],
                                                            scale: [0.6, 1, 0.6]
                                                        }}
                                                        transition={{
                                                            duration: 1.8,
                                                            repeat: Infinity,
                                                            ease: "easeOut",
                                                            delay: 1
                                                        }}
                                                        style={{ left: '48%', top: '42px' }}
                                                    />

                                                    {/* Shine effect */}
                                                    <div className="absolute top-6 left-3 w-2 h-4 bg-white/40 rounded-full blur-sm" />
                                                </div>
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                )}
                            </Link>
                        )
                    })}
                </motion.div>
            </div>
        </div>
    )
}
