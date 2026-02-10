import { ConversationSession, ChatMessage } from '@/types/chat';

const STORAGE_KEYS = {
    SESSION_PREFIX: 'chat_session_',
    SESSIONS_INDEX: 'chat_sessions_index',
    CURRENT_SESSION: 'chat_current_session',
};

export function generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

export function saveSession(session: ConversationSession): void {
    try {
        // Save session data
        localStorage.setItem(
            `${STORAGE_KEYS.SESSION_PREFIX}${session.id}`,
            JSON.stringify(session)
        );

        // Update sessions index
        const sessions = getAllSessionIds();
        if (!sessions.includes(session.id)) {
            sessions.push(session.id);
            localStorage.setItem(STORAGE_KEYS.SESSIONS_INDEX, JSON.stringify(sessions));
        }

        // Update current session
        localStorage.setItem(STORAGE_KEYS.CURRENT_SESSION, session.id);
    } catch (error) {
        console.error('Error saving session:', error);
    }
}

export function loadSession(sessionId: string): ConversationSession | null {
    try {
        const data = localStorage.getItem(`${STORAGE_KEYS.SESSION_PREFIX}${sessionId}`);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Error loading session:', error);
        return null;
    }
}

export function getAllSessions(): ConversationSession[] {
    const sessionIds = getAllSessionIds();
    return sessionIds
        .map(loadSession)
        .filter((session): session is ConversationSession => session !== null)
        .sort((a, b) => b.updatedAt - a.updatedAt);
}

function getAllSessionIds(): string[] {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.SESSIONS_INDEX);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Error loading sessions index:', error);
        return [];
    }
}

export function getCurrentSessionId(): string | null {
    try {
        return localStorage.getItem(STORAGE_KEYS.CURRENT_SESSION);
    } catch (error) {
        console.error('Error loading current session:', error);
        return null;
    }
}

export function deleteSession(sessionId: string): void {
    try {
        // Remove session data
        localStorage.removeItem(`${STORAGE_KEYS.SESSION_PREFIX}${sessionId}`);

        // Update sessions index
        const sessions = getAllSessionIds();
        const updatedSessions = sessions.filter(id => id !== sessionId);
        localStorage.setItem(STORAGE_KEYS.SESSIONS_INDEX, JSON.stringify(updatedSessions));

        // Clear current session if it matches
        if (getCurrentSessionId() === sessionId) {
            localStorage.removeItem(STORAGE_KEYS.CURRENT_SESSION);
        }
    } catch (error) {
        console.error('Error deleting session:', error);
    }
}

export function createNewSession(firstMessage?: ChatMessage): ConversationSession {
    const session: ConversationSession = {
        id: generateSessionId(),
        title: firstMessage?.query.substring(0, 50) || 'New Chat',
        messages: firstMessage ? [firstMessage] : [],
        createdAt: Date.now(),
        updatedAt: Date.now(),
    };

    saveSession(session);
    return session;
}
