import dagre from 'dagre';
import { Node, Edge } from '@xyflow/react';
import { ChatMessage, FlowNodeData } from '@/types/chat';

const NODE_WIDTH = 320;
const NODE_HEIGHT = 140;
const RANK_SEP = 120; // Vertical spacing between nodes
const NODE_SEP = 150; // Horizontal spacing between nodes

export function createFlowElements(
    messages: ChatMessage[],
    onNodeClick: (messageId: string) => void
): { nodes: Node<FlowNodeData>[]; edges: Edge[] } {
    const nodes: Node<FlowNodeData>[] = messages.map((message, index) => ({
        id: message.id,
        type: 'chatNode',
        position: { x: 0, y: 0 }, // Will be calculated by layout
        data: {
            message,
            onNodeClick,
        },
    }));

    const edges: Edge[] = messages.slice(1).map((message, index) => ({
        id: `edge-${messages[index].id}-${message.id}`,
        source: messages[index].id,
        target: message.id,
        type: 'smoothstep',
        animated: true,
        style: {
            stroke: 'url(#gradient)',
            strokeWidth: 3,
        },
    }));

    return { nodes, edges };
}

export function getLayoutedElements(
    nodes: Node<FlowNodeData>[],
    edges: Edge[]
): { nodes: Node<FlowNodeData>[]; edges: Edge[] } {
    const dagreGraph = new dagre.graphlib.Graph();
    dagreGraph.setDefaultEdgeLabel(() => ({}));
    dagreGraph.setGraph({
        rankdir: 'TB', // Top to Bottom
        ranksep: RANK_SEP,
        nodesep: NODE_SEP,
        marginx: 50,
        marginy: 50,
    });

    nodes.forEach((node) => {
        dagreGraph.setNode(node.id, { width: NODE_WIDTH, height: NODE_HEIGHT });
    });

    edges.forEach((edge) => {
        dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    const layoutedNodes = nodes.map((node) => {
        const nodeWithPosition = dagreGraph.node(node.id);
        return {
            ...node,
            position: {
                x: nodeWithPosition.x - NODE_WIDTH / 2,
                y: nodeWithPosition.y - NODE_HEIGHT / 2,
            },
        };
    });

    return { nodes: layoutedNodes, edges };
}

export function calculateNodePositions(messages: ChatMessage[], onNodeClick: (messageId: string) => void) {
    const { nodes, edges } = createFlowElements(messages, onNodeClick);
    return getLayoutedElements(nodes, edges);
}
