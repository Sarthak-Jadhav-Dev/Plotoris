"use client"

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ChatMessage, ChatContextType, ConversationSession, AIResponse } from '@/types/chat';
import {
    saveSession,
    loadSession,
    getCurrentSessionId,
    createNewSession,
    generateSessionId
} from '@/lib/storage';

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentSession, setCurrentSession] = useState<string | null>(null);
    const [selectedNode, setSelectedNode] = useState<string | null>(null);
    const [isFirstMessage, setIsFirstMessage] = useState(true);

    // Load session on mount
    useEffect(() => {
        const sessionId = getCurrentSessionId();
        if (sessionId) {
            const session = loadSession(sessionId);
            if (session) {
                setMessages(session.messages);
                setCurrentSession(session.id);
                setIsFirstMessage(session.messages.length === 0);
            }
        }
    }, []);

    // Save session when messages change
    useEffect(() => {
        if (currentSession && messages.length > 0) {
            const session: ConversationSession = {
                id: currentSession,
                title: messages[0]?.query.substring(0, 50) || 'New Chat',
                messages,
                createdAt: Date.now(),
                updatedAt: Date.now(),
            };
            saveSession(session);
        }
    }, [messages, currentSession]);

    const sendMessage = useCallback(async (query: string) => {
        if (!query.trim()) return;

        // Create new session if needed
        let sessionId = currentSession;
        if (!sessionId) {
            sessionId = generateSessionId();
            setCurrentSession(sessionId);
        }

        // Create pending message
        const messageId = `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
        const newMessage: ChatMessage = {
            id: messageId,
            query: query.trim(),
            response: '',
            timestamp: Date.now(),
            status: 'pending',
        };

        setMessages(prev => [...prev, newMessage]);
        setIsLoading(true);

        // Delay the state change slightly to allow the animation to trigger properly
        if (isFirstMessage) {
            setTimeout(() => {
                setIsFirstMessage(false);
            }, 100);
        }

        try {
            // Call AI API
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: query.trim(),
                    sessionId,
                    context: messages,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to get response from AI');
            }

            const data: AIResponse = await response.json();

            // Update message with response
            setMessages(prev =>
                prev.map(msg =>
                    msg.id === messageId
                        ? { ...msg, response: data.response, status: 'complete' as const }
                        : msg
                )
            );
        } catch (error) {
            console.error('Error sending message:', error);

            // Update message with error
            setMessages(prev =>
                prev.map(msg =>
                    msg.id === messageId
                        ? {
                            ...msg,
                            status: 'error' as const,
                            error: 'Failed to get response. Please try again.'
                        }
                        : msg
                )
            );
        } finally {
            setIsLoading(false);
        }
    }, [currentSession, messages, isFirstMessage]);

    const selectNode = useCallback((nodeId: string | null) => {
        setSelectedNode(nodeId);
    }, []);

    const clearChat = useCallback(() => {
        setMessages([]);
        setCurrentSession(null);
        setIsFirstMessage(true);
        setSelectedNode(null);
    }, []);

    const loadSessionById = useCallback((sessionId: string) => {
        const session = loadSession(sessionId);
        if (session) {
            setMessages(session.messages);
            setCurrentSession(session.id);
            setIsFirstMessage(session.messages.length === 0);
        }
    }, []);

    return (
        <ChatContext.Provider
            value={{
                messages,
                isLoading,
                currentSession,
                selectedNode,
                isFirstMessage,
                sendMessage,
                selectNode,
                clearChat,
                loadSession: loadSessionById,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
}

export function useChatContext() {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error('useChatContext must be used within a ChatProvider');
    }
    return context;
}
