"use client"

import React from 'react';
import { ChatProvider, useChatContext } from '@/contexts/ChatContext';
import { FlowchartCanvas } from '@/components/flowchart-chat/FlowchartCanvas';
import { ChatInput } from '@/components/flowchart-chat/ChatInput';
import { NodeDetailModal } from '@/components/flowchart-chat/NodeDetailModal';

function SpaceContent() {
    const { messages, selectedNode, selectNode } = useChatContext();
    const selectedMessage = messages.find(msg => msg.id === selectedNode) || null;

    return (
        <div className="relative h-screen w-full overflow-hidden bg-linear-to-br from-gray-50 via-white to-gray-100 dark:from-[#1a1a1a] dark:via-[#212121] dark:to-[#2a2a2a]">
            {/* Flowchart Canvas */}
            <FlowchartCanvas />

            {/* Chat Input */}
            <ChatInput />

            {/* Node Detail Modal */}
            <NodeDetailModal
                message={selectedMessage}
                isOpen={!!selectedNode}
                onClose={() => selectNode(null)}
            />
        </div>
    );
}

export default function SpacePage() {
    return (
        <ChatProvider>
            <SpaceContent />
        </ChatProvider>
    );
}

