import React, { useState, useEffect  } from 'react';
import Flow from './components/flow/index';

import { ReactFlowProvider } from '@xyflow/react';
import { ChakraProvider } from '@chakra-ui/react'
import Sidebar from './components/sidebar'
import ApplicationContext from './contexts/application-context'

export default function App() {
  const generalStyle = { width: '100vw', height: '100vh', position: 'relative' };
  const [state, setState] = useState({
    nodeSelected: null,
    showSidebar: false,
  });

  useEffect(() => {
    // const handleBeforeUnload = (event) => {
    //   const message = 'Are you sure? Some change will be los.';
    //   event.returnValue = message; 
    //   return message;
    // };

    // window.addEventListener('beforeunload', handleBeforeUnload);

    // return () => {
    //   window.removeEventListener('beforeunload', handleBeforeUnload);
    // };
  }, []);

  return (
    <div style={generalStyle}>
      <ApplicationContext.Provider value={{ state, setState }}>
        <ChakraProvider>
          <ReactFlowProvider>
            <Flow />
            <Sidebar />
          </ReactFlowProvider>
        </ChakraProvider>
      </ApplicationContext.Provider>
    </div>
  );
}
