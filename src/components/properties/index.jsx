import React, { useState, useEffect, useContext } from 'react';
import ApplicationContext from '../../contexts/application-context';
import { Input } from '@chakra-ui/react'
import { Textarea } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'

const Properties = () => {
    const { state, setState } = useContext(ApplicationContext);
    const { nodeSelected } = state;

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (nodeSelected) {
            setName(nodeSelected.data.name || '');
            setDescription(nodeSelected.data.description || '');
        }
    }, [nodeSelected]);

    const handleNameChange = (e) => {
        const newName = e.target.value;
        setName(newName);

        setState((prevState) => ({
            ...prevState,
            nodeSelected: {
                ...prevState.nodeSelected,
                data: {
                    ...prevState.nodeSelected.data,
                    name: newName,
                },
            },
        }));
    };

    const handleDescriptionChange = (e) => {
        const newDescription = e.target.value;
        setDescription(newDescription);

        setState((prevState) => ({
            ...prevState,
            nodeSelected: {
                ...prevState.nodeSelected,
                data: {
                    ...prevState.nodeSelected.data,
                    description: newDescription,
                },
            },
        }));
    };

    if (!nodeSelected) {
        return <div>Select a node to edit its properties.</div>;
    }

    return (
        <div className='m-1'>
            <Box mb={4}>
                <Input placeholder='Name' size='sm' />
            </Box>
            <Box mb={4}>
                <Textarea placeholder='Here is a sample placeholder' />
            </Box>
        </div>
    );
};

export default Properties;
