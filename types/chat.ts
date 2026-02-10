export interface ChatMessage {
    id: string;
    query: string;
    response: string;
    timestamp: number;
    status: 'pending' | 'complete' | 'error';
    error?: string;
}

export interface FlowNodeData {
    message: ChatMessage;
    onNodeClick: (messageId: string) => void;
    [key: string]: unknown;
}

export interface ConversationSession {
    id: string;
    title: string;
    messages: ChatMessage[];
    createdAt: number;
    updatedAt: number;
}

export interface AIResponse {
    response: string;
    messageId: string;
    timestamp: number;
    error?: string;
}

export interface ChatContextType {
    messages: ChatMessage[];
    isLoading: boolean;
    currentSession: string | null;
    selectedNode: string | null;
    isFirstMessage: boolean;
    sendMessage: (query: string) => Promise<void>;
    selectNode: (nodeId: string | null) => void;
    clearChat: () => void;
    loadSession: (sessionId: string) => void;
}
