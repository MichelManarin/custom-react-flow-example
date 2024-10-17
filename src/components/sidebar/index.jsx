import React, { useState, useContext } from 'react';

import ApplicationContext from '../../contexts/application-context'
import Properties from '../../components/properties/index'

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
        padding: '1rem',
        borderBottomLeftRadius: '5rem'
    };

    const sectionStyle = {
        marginBottom: '2px',
    };

    const separatorStyle = {
        height: '1px',
        backgroundColor: '#ccc',
        margin: '10px 0',
    };

    const sections = [
        {
            title: 'Properties',
            component: Properties
        },
        {
            title: 'Features',
            component: null
        },
        {
            title: 'Access control',
            component: null
        }
    ];


    return (
        <div style={sidebarStyle}>
            {sections.map((section, index) => (
                <div key={index} style={sectionStyle}>
                    <h5 className='m-0 p-0'>{section.title}</h5>
                    {section.component && (
                        <div style={{ marginTop: '10px' }}>
                            <section.component />
                        </div>
                    )}
                    {index < sections.length - 1 && <div style={separatorStyle}></div>}
                </div>
            ))}
        </div>
    );
}
