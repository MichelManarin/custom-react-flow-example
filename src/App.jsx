import React, { useState, useEffect } from 'react';
import Flow from './components/flow/index';

import { ReactFlowProvider } from '@xyflow/react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import Sidebar from './components/sidebar'
import ApplicationContext from './contexts/application-context'

const activeLabelStyles = {
  transform: "scale(0.85) translateY(-24px)"
};

let initialNodes = [
  { id: '3', position: { x: 290, y: 15 }, data: { label: '3', name: "Loan Analysis", description: "" }, type: 'manual' },
  { id: '4', position: { x: 520, y: 250 }, data: { label: '4', name: "Reject email", description: "" }, type: 'email' },
  { id: '6', position: { x: 720, y: 560 }, data: { label: '6', name: "Approved email", description: "" }, type: 'email' },
  { id: '5', position: { x: 720, y: 450 }, data: { label: '5', name: "Decision", description: "" }, type: 'gateway' },
];

let initialEdges = [{ id: 'e3-4', source: '3', target: '4', animated: true, markerEnd: { type: 'arrowclosed' }, style: { strokeWidth: 2, strokeDasharray: '5' } },
{ id: 'e4-5', source: '4', target: '5', animated: true, markerEnd: { type: 'arrowclosed' }, style: { strokeWidth: 2, strokeDasharray: '5' } },
{ id: 'e5-6', source: '5', target: '6', animated: true, markerEnd: { type: 'arrowclosed' }, style: { strokeWidth: 2, strokeDasharray: '5' } },
];

export const theme = extendTheme({
  components: {
    Form: {
      variants: {
        floating: {
          container: {
            _focusWithin: {
              label: {
                ...activeLabelStyles
              }
            },
            "input:not(:placeholder-shown) + label, .chakra-select__wrapper + label, textarea:not(:placeholder-shown) ~ label": {
              ...activeLabelStyles
            },
            label: {
              top: 0,
              left: 0,
              zIndex: 2,
              position: "absolute",
              backgroundColor: "white",
              pointerEvents: "none",
              mx: 3,
              px: 1,
              my: 2,
              transformOrigin: "left top"
            }
          }
        }
      }
    }
  }
});

export default function App() {
  const generalStyle = { width: '100vw', height: '100vh', position: 'relative' };

  const [state, setState] = useState({
    showSidebar: false,
    nodeSelected: null,
    initialEdges,
    initialNodes,
  });

  console.log("state ", state);

  const updateNode = (id, newData) => {
    setState((prevState) => ({
      ...prevState,
      initialNodes: prevState.initialNodes.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, ...newData } } : node
      ),
      nodeSelected: { ...prevState.nodeSelected, data: { ...prevState.nodeSelected.data, ...newData } },
    }));
  };

  useEffect(() => {
  }, []);

  return (
    <div style={generalStyle}>
      <ApplicationContext.Provider value={{ state, setState, updateNode }}>
        <ChakraProvider theme={theme}>
          <ReactFlowProvider>
            <Flow />
            <Sidebar />
          </ReactFlowProvider>
        </ChakraProvider>
      </ApplicationContext.Provider>
    </div>
  );
}
