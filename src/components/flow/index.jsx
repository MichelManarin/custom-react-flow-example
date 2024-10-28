import React, { useCallback, useMemo, useContext, useEffect } from 'react';
import {
    ReactFlow,
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    useReactFlow,
} from '@xyflow/react';

import { ManualNode } from '../../components/nodes/manual/manual';
import { EmailNode } from '../../components/nodes/email/email';
import { GatewayNode } from '../../components/nodes/gateway/gateway';
import { Toolbar } from '../../components/toolbar/index';
import ApplicationContext from '../../contexts/application-context';

import '@xyflow/react/dist/style.css';
import '../../App.css';

const styleFlow = {
    width: '100%', height: '100%', position: 'relative'
}

const styleControls = {
    color: 'black'
}

export default function Flow() {
    const { state, setState } = useContext(ApplicationContext);
    const { initialNodes, initialEdges } = state;
    
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const { getViewport } = useReactFlow();

    const nodeTypes = useMemo(() => ({ manual: ManualNode, email: EmailNode, gateway: GatewayNode }), []);

    const generateId = useCallback(() => {
        return `${Date.now().toString(36)}-${Math.random().toString(36).substr(2, 9)}`;
    }, []);

    const onConnect = (params) => {
        setEdges((eds) => {
            const newEdges = [
                ...eds,
                {
                    ...params,
                    id: `${params.source}-${params.target}`,
                    animated: true,
                    markerEnd: { type: 'arrowclosed' },
                    style: { strokeWidth: 2, strokeDasharray: '5' },
                },
            ];
            setState((prevState) => ({ ...prevState, initialEdges: newEdges }));
            return newEdges;
        });
    };

    useEffect(() => {
        setNodes(initialNodes);
        setEdges(initialEdges);
    }, [initialNodes, initialEdges, setNodes, setEdges]);

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
                    name: ``,
                    label: `${type} node`,
                    description: "",
                },
            };

            setNodes((nds) => {
                const updatedNodes = nds.concat(newNode);
                setState((prevState) => ({ ...prevState, initialNodes: updatedNodes }));
                return updatedNodes;
            });
        },
        [getViewport, setNodes, generateId, setState]
    );

    const handleNodesChange = useCallback(
        (changes) => {
            onNodesChange(changes);
        },
        [onNodesChange]
    );

    const handleEdgesChange = useCallback(
        (changes) => {
            onEdgesChange(changes);
            setState((prevState) => ({ ...prevState, initialEdges: edges }));
        },
        [edges, onEdgesChange, setState]
    );

    const handleNodeDragStop = useCallback(
        (_, node) => {
            setState((prevState) => ({
                ...prevState,
                initialNodes: nodes.map((n) => (n.id === node.id ? node : n)),
            }));
        },
        [nodes, setState]
    );

    return (
        <div style={styleFlow} onDrop={onDrop} onDragOver={(event) => event.preventDefault()}>
            <Toolbar />
            <ReactFlow
                nodeTypes={nodeTypes}
                nodes={nodes}
                edges={edges}
                onNodesChange={handleNodesChange}
                onEdgesChange={handleEdgesChange}
                onConnect={onConnect}
                onNodeDragStop={handleNodeDragStop} 
                onPaneClick={() => setState({ ...state, showSidebar: false })}
                onNodeClick={(event, node) => setState({ ...state, showSidebar: true, nodeSelected: node })}
            >
                <Controls showFitView={false} style={styleControls} />
                <MiniMap />
                <Background bgColor="#f4f4f5" variant="dots" gap={12} size={1} />
            </ReactFlow>
        </div>
    );
}
