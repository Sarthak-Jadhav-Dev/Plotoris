"use client"

import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { motion } from 'framer-motion';
import { FlowNodeData } from '@/types/chat';

interface ChatNodeProps {
    data: FlowNodeData;
    selected?: boolean;
}

export function ChatNode({ data, selected }: ChatNodeProps) {
    const { message, onNodeClick } = data;
    const isLoading = message.status === 'pending';
    const isError = message.status === 'error';

    const truncateText = (text: string, maxLength: number) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

    return (
        <>
            <Handle type="target" position={Position.Top} className="bg-linear-to-r from-purple-500 via-pink-500 to-blue-500 w-3 h-3 border-2 border-white dark:border-gray-800" />

            <motion.div
                initial={{ opacity: 0, scale: 0.8, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }}
                onClick={() => onNodeClick(message.id)}
                className={`
          relative w-80 h-auto min-h-[140px] rounded-2xl p-4 cursor-pointer
          bg-white/80 dark:bg-[#2a2a2a]/80 backdrop-blur-md
          border-2 transition-all duration-300
          hover:scale-105 hover:shadow-2xl
          ${selected
                        ? 'border-gradient shadow-xl scale-105'
                        : isError
                            ? 'border-red-500'
                            : 'border-gray-200 dark:border-gray-700'
                    }
        `}
                style={{
                    background: selected
                        ? 'linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(236, 72, 153, 0.1) 50%, rgba(59, 130, 246, 0.1) 100%)'
                        : undefined,
                }}
            >
                {/* Gradient border effect */}
                {!isError && (
                    <div className="absolute -inset-0.5 bg-linear-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10" />
                )}

                {/* Query section */}
                <div className="mb-3">
                    <div className="text-xs font-semibold text-purple-600 dark:text-purple-400 mb-1 flex items-center gap-2">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                            <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                        </svg>
                        QUERY
                    </div>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200 line-clamp-2">
                        {truncateText(message.query, 100)}
                    </p>
                </div>

                {/* Response section */}
                <div>
                    <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1 flex items-center gap-2">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                        </svg>
                        RESPONSE
                    </div>
                    {isLoading ? (
                        <div className="flex items-center gap-2">
                            <div className="flex gap-1">
                                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                            <span className="text-xs text-gray-500 dark:text-gray-400">Generating response...</span>
                        </div>
                    ) : isError ? (
                        <p className="text-sm text-red-600 dark:text-red-400">
                            {message.error || 'Failed to generate response'}
                        </p>
                    ) : (
                        <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
                            {truncateText(message.response, 150)}
                        </p>
                    )}
                </div>

                {/* Timestamp */}
                <div className="mt-3 text-xs text-gray-400 dark:text-gray-500">
                    {new Date(message.timestamp).toLocaleTimeString()}
                </div>

                {/* Click hint */}
                <div className="absolute bottom-2 right-2 text-xs text-gray-400 dark:text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    Click to expand
                </div>
            </motion.div>

            <Handle type="source" position={Position.Bottom} className="bg-linear-to-r from-purple-500 via-pink-500 to-blue-500 w-3 h-3 border-2 border-white dark:border-gray-800" />
        </>
    );
}



