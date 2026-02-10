"use client"

import React, { useEffect } from 'react';
import {
    ReactFlow,
    Background,
    Controls,
    MiniMap,
    useNodesState,
    useEdgesState,
    BackgroundVariant,
    Node,
    Edge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { ChatNode } from './ChatNode';
import { useChatContext } from '@/contexts/ChatContext';
import { calculateNodePositions } from '@/lib/flowchart-layout';
import { FlowNodeData } from '@/types/chat';

const nodeTypes = {
    chatNode: ChatNode,
};

export function FlowchartCanvas() {
    const { messages, selectNode } = useChatContext();
    const [nodes, setNodes, onNodesChange] = useNodesState<Node<FlowNodeData>>([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

    // Update nodes and edges when messages change
    useEffect(() => {
        if (messages.length > 0) {
            const { nodes: layoutedNodes, edges: layoutedEdges } = calculateNodePositions(
                messages,
                selectNode
            );
            setNodes(layoutedNodes);
            setEdges(layoutedEdges);
        } else {
            setNodes([]);
            setEdges([]);
        }
    }, [messages, selectNode, setNodes, setEdges]);

    const proOptions = { hideAttribution: true };

    return (
        <div className="w-full h-full">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                nodeTypes={nodeTypes}
                proOptions={proOptions}
                fitView
                fitViewOptions={{ padding: 0.2, maxZoom: 1.2 }}
                minZoom={0.1}
                maxZoom={2}
                defaultEdgeOptions={{
                    animated: true,
                    style: { strokeWidth: 3 },
                }}
            >
                {/* Gradient definition for edges */}
                <svg style={{ position: 'absolute', width: 0, height: 0 }}>
                    <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#a855f7" />
                            <stop offset="50%" stopColor="#ec4899" />
                            <stop offset="100%" stopColor="#3b82f6" />
                        </linearGradient>
                    </defs>
                </svg>

                <Background
                    variant={BackgroundVariant.Dots}
                    gap={20}
                    size={1}
                    className="bg-gray-50 dark:bg-[#1a1a1a]"
                />
                <Controls
                    className="bg-white dark:bg-[#2a2a2a] border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg"
                />
                <MiniMap
                    className="bg-white dark:bg-[#2a2a2a] border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg"
                    nodeColor={(node) => {
                        const nodeData = node.data as FlowNodeData | undefined;
                        if (nodeData?.message?.status === 'error') return '#ef4444';
                        if (nodeData?.message?.status === 'pending') return '#a855f7';
                        return '#3b82f6';
                    }}
                />
            </ReactFlow>
        </div>
    );
}
