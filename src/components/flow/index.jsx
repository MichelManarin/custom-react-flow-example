import React, { useCallback, useMemo, useContext } from 'react';
import {
    ReactFlow,
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
    useReactFlow,
} from '@xyflow/react';

import { ManualNode } from '../../components/nodes/manual/manual';
import { EmailNode } from '../../components/nodes/email/email';
import { GatewayNode } from '../../components/nodes/gateway/gateway';
import { Toolbar } from '../../components/toolbar/index';
import ApplicationContext from '../../contexts/application-context';

import '@xyflow/react/dist/style.css';
import '../../App.css';

const initialNodes = [
    { id: '3', position: { x: 500, y: 200 }, data: { label: '3', name: "Loan Analysis", description: "" }, type: 'manual' },
    { id: '4', position: { x: 500, y: 400 }, data: { label: '4', name: "Reject email", description: "" }, type: 'email' },
    { id: '6', position: { x: 700, y: 800 }, data: { label: '6', name: "Approved email", description: "" }, type: 'email' },
    { id: '5', position: { x: 610, y: 600 }, data: { label: '5', name: "Decision", description: "" }, type: 'gateway' },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

export default function Flow() {
    const { state, setState } = useContext(ApplicationContext);

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const { getViewport } = useReactFlow();

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );

    const nodeTypes = useMemo(() => ({ manual: ManualNode, email: EmailNode, gateway: GatewayNode }), []);

    const generateId = useCallback(() => {
        return `${Date.now().toString(36)}-${Math.random().toString(36).substr(2, 9)}`;
    }, []);

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();
            const reactFlowBounds = event.currentTarget.getBoundingClientRect();
            const type = event.dataTransfer.getData('application/reactflow');
            if (!type) return;

            const { x, y, zoom } = getViewport();
            const position = {
                x: (event.clientX - reactFlowBounds.left - x) / zoom,
                y: (event.clientY - reactFlowBounds.top - y) / zoom,
            };

            const newNode = {
                id: generateId(),
                type,
                position,
                data: {
                    name: `Untitle`,
                    label: `${type} node`,
                    description: "",
                },
            };

            setNodes((nds) => nds.concat(newNode));
        },
        [getViewport, setNodes, generateId]
    );

    const updateNode = useCallback((id, newData) => {
        setNodes((nds) =>
            nds.map((node) => (node.id === id ? { ...node, data: { ...node.data, ...newData } } : node))
        );
    }, [setNodes]);

    const deleteNode = useCallback((id) => {
        setNodes((nds) => nds.filter((node) => node.id !== id));
        setEdges((eds) => eds.filter((edge) => edge.source !== id && edge.target !== id));
    }, [setNodes, setEdges]);

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onPaneClick = useCallback(() => {
        setState({
            ...state,
            showSidebar: false,
        });
    }, [state, setState]);

    const onNodeClick = useCallback((event, node) => {
        setState({
            ...state,
            showSidebar: true,
            nodeSelected: node,
        });
    }, [state, setState]);

    return (
        <div style={{ width: '100%', height: '100%', position: 'relative' }} onDrop={onDrop} onDragOver={onDragOver}>
            <Toolbar />
            <ReactFlow
                nodeTypes={nodeTypes}
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onNodeClick={onNodeClick}
                onPaneClick={onPaneClick}
            >
                <Controls showFitView={false} style={{ color: 'black' }} />
                <MiniMap />
                <Background bgColor="#f4f4f5" variant="dots" gap={12} size={1} />
            </ReactFlow>
        </div>
    );
}
