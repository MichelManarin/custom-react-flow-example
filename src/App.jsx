import React, { useState, useEffect } from 'react';
import Flow from './components/flow/index';

import { ReactFlowProvider } from '@xyflow/react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import Sidebar from './components/sidebar'
import ApplicationContext from './contexts/application-context'

const activeLabelStyles = {
  transform: "scale(0.85) translateY(-24px)"
};

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
