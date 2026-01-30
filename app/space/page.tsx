"use client"

import React from "react";
import { PromptBox } from "@/components/chatgpt-prompt-input";

export default function SpacePage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 via-white to-gray-100 dark:from-[#1a1a1a] dark:via-[#212121] dark:to-[#2a2a2a] px-4">
            <div className="w-full max-w-3xl mx-auto space-y-8 mt-5">
                {/* Welcome Section */}
                <div className="text-center space-y-6 animate-fade-in">
                    {/* Main Heading */}
                    <h2 className="text-3xl md:text-3xl lg:text-6xl font-bold bg-clip-text text-transparent bg-linear-to-r from-purple-600 via-pink-600 to-blue-600 dark:from-purple-400 dark:via-pink-400 dark:to-blue-400 animate-gradient-x pb-2">
                        What can I help with?
                    </h2>

                    {/* Subtitle */}
                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
                        Ask me anything, and let&apos;s create something amazing together
                    </p>
                </div>

                {/* Prompt Box */}
                <div className="animate-slide-up">
                    <PromptBox />
                </div>

                {/* Recent Chats Section */}
                <div className="space-y-3">
                    <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 px-1">
                        Recent Chats
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 animate-fade-in-delayed">
                        {[1, 2, 3, 4].map((_, index) => (
                            <div
                                key={index}
                                className="group p-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-[#303030]/50 backdrop-blur-sm hover:bg-white dark:hover:bg-[#303030] hover:shadow-lg transition-all duration-300 cursor-pointer"
                            >
                                <div className="space-y-3">
                                    {/* Skeleton Title */}
                                    <div className="flex items-center gap-2">
                                        <div className="h-4 bg-linear-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-shimmer w-3/4"></div>
                                    </div>
                                    {/* Skeleton Description */}
                                    <div className="space-y-2">
                                        <div className="h-3 bg-linear-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-shimmer w-full"></div>
                                        <div className="h-3 bg-linear-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-shimmer w-5/6"></div>
                                    </div>
                                    {/* Skeleton Timestamp */}
                                    <div className="h-2.5 bg-linear-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-shimmer w-1/4"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes slide-up {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes gradient-x {
                    0%, 100% {
                        background-position: 0% 50%;
                    }
                    50% {
                        background-position: 100% 50%;
                    }
                }

                @keyframes shimmer {
                    0% {
                        background-position: -200% 0;
                    }
                    100% {
                        background-position: 200% 0;
                    }
                }

                .animate-fade-in {
                    animation: fade-in 0.6s ease-out;
                }

                .animate-slide-up {
                    animation: slide-up 0.8s ease-out 0.2s both;
                }

                .animate-fade-in-delayed {
                    animation: fade-in 1s ease-out 0.4s both;
                }

                .animate-gradient-x {
                    background-size: 200% 200%;
                    animation: gradient-x 5s ease infinite;
                }

                .animate-shimmer {
                    background-size: 200% 100%;
                    animation: shimmer 2s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
};

