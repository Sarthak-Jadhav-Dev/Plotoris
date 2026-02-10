"use client"

import React, { useState, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChatContext } from '@/contexts/ChatContext';

export function ChatInput() {
    const { sendMessage, isLoading, isFirstMessage } = useChatContext();
    const [value, setValue] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Auto-resize textarea
    useLayoutEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            const newHeight = Math.min(textarea.scrollHeight, 200);
            textarea.style.height = `${newHeight}px`;
        }
    }, [value]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!value.trim() || isLoading) return;

        const query = value.trim();
        setValue('');
        await sendMessage(query);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <motion.div
            animate={
                isFirstMessage
                    ? {
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        x: '-50%',
                        y: '-50%',
                    }
                    : {
                        position: 'fixed',
                        left: '50%',
                        bottom: '2rem',
                        x: '-50%',
                        y: 0,
                    }
            }
            transition={{
                type: 'spring',
                damping: 25,
                stiffness: 200,
                duration: 0.6,
            }}
            className="z-40 w-full max-w-3xl"
        >
            {/* Welcome message - only show on first message */}
            <AnimatePresence>
                {isFirstMessage && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="text-center mb-6 space-y-3"
                    >
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-linear-to-r from-purple-600 via-pink-600 to-blue-600 dark:from-purple-400 dark:via-pink-400 dark:to-blue-400">
                            What can I help with?
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 font-light">
                            Start a conversation and watch your ideas flow
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Input box */}
            <form onSubmit={handleSubmit} className="w-full px-4">
                <div className="flex flex-col rounded-[28px] p-2 shadow-2xl transition-colors bg-white border-2 border-gray-200 dark:bg-[#303030] dark:border-gray-700 ml-10">
                    <textarea
                        ref={textareaRef}
                        rows={1}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type your message..."
                        disabled={isLoading}
                        className="w-full resize-none border-0 bg-transparent p-3 text-foreground dark:text-white placeholder:text-muted-foreground dark:placeholder:text-gray-400 focus:ring-0 focus-visible:outline-none min-h-12 disabled:opacity-50"
                    />

                    <div className="flex items-center justify-between p-2 pt-0">
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                            {isLoading ? 'Generating response...' : 'Press Enter to send, Shift+Enter for new line'}
                        </div>

                        <button
                            type="submit"
                            disabled={!value.trim() || isLoading}
                            className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-r from-purple-600 via-pink-600 to-blue-600 text-white transition-all hover:shadow-lg hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19V5m0 0l-7 7m7-7l7 7" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </form>
        </motion.div>
    );
}

