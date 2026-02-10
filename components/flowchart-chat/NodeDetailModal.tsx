"use client"

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatMessage } from '@/types/chat';

interface NodeDetailModalProps {
    message: ChatMessage | null;
    isOpen: boolean;
    onClose: () => void;
}

export function NodeDetailModal({ message, isOpen, onClose }: NodeDetailModalProps) {
    if (!message) return null;

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90vw] max-w-3xl max-h-[85vh] overflow-y-auto"
                    >
                        <div className="bg-white dark:bg-[#2a2a2a] rounded-3xl shadow-2xl border-2 border-gray-200 dark:border-gray-700 overflow-hidden">
                            {/* Header */}
                            <div className="sticky top-0 bg-linear-to-r from-purple-600 via-pink-600 to-blue-600 p-6 text-white">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-2xl font-bold">Conversation Detail</h2>
                                    <button
                                        onClick={onClose}
                                        className="p-2 rounded-full hover:bg-white/20 transition-colors"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="text-sm mt-2 opacity-90">
                                    {new Date(message.timestamp).toLocaleString()}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 space-y-6">
                                {/* Query Section */}
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-semibold text-purple-600 dark:text-purple-400 flex items-center gap-2">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                                                <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                                            </svg>
                                            Your Query
                                        </h3>
                                        <button
                                            onClick={() => copyToClipboard(message.query)}
                                            className="text-sm text-gray-500 hover:text-purple-600 dark:hover:text-purple-400 transition-colors flex items-center gap-1"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                            </svg>
                                            Copy
                                        </button>
                                    </div>
                                    <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
                                        <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                                            {message.query}
                                        </p>
                                    </div>
                                </div>

                                {/* Divider */}
                                <div className="border-t border-gray-200 dark:border-gray-700" />

                                {/* Response Section */}
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-2">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                                            </svg>
                                            AI Response
                                        </h3>
                                        <button
                                            onClick={() => copyToClipboard(message.response)}
                                            className="text-sm text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                            </svg>
                                            Copy
                                        </button>
                                    </div>
                                    <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                                        {message.status === 'error' ? (
                                            <p className="text-red-600 dark:text-red-400">
                                                {message.error || 'Failed to generate response'}
                                            </p>
                                        ) : (
                                            <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap leading-relaxed">
                                                {message.response}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

