import React, { useState, useContext } from 'react';

import ApplicationContext from '../../contexts/application-context'
import Properties from '../../components/properties/index'

import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
} from '@chakra-ui/react'

import { Box } from '@chakra-ui/react'

export default function Sidebar() {
    const { state, setState } = useContext(ApplicationContext)
    const { showSidebar } = state;

    const sidebarStyle = {
        color: 'black',
        position: 'fixed',
        top: 0,
        right: showSidebar ? 0 : '-330px',
        width: '300px',
        height: '100vh',
        backgroundColor: '#f9f9f9',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
        transition: 'right 0.3s ease',
        zIndex: 100,
        borderBottomLeftRadius: '5rem'
    };

    const sections = [
        {
            title: 'Properties',
            component: Properties
        },
        {
            title: 'Features',
            component: Properties
        },
        {
            title: 'Access control',
            component: Properties
        }
    ];

    return (
        <div style={sidebarStyle}>
            <Accordion>
                {sections.map((section, index) => (
                    <AccordionItem key={index}>
                        <h2>
                            <AccordionButton>
                                <Box as='span' flex="1" textAlign='left'>
                                    {section.title}
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            <section.component />
                        </AccordionPanel>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
}
