import React, { useState, useEffect, useContext } from 'react';
import ApplicationContext from '../../contexts/application-context';
import {
    FormControl,
    FormLabel,
    Input,
    Box,
    Textarea,
    Stack
} from "@chakra-ui/react";

const Properties = () => {
    const { state, updateNode } = useContext(ApplicationContext);
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
        setName(e.target.value);
        updateNode(nodeSelected.id, { name: e.target.value });
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
        updateNode(nodeSelected.id, { description: e.target.value });
    };

    if (!nodeSelected) {
        return <div>Select a node to edit its properties.</div>;
    }

    return (
        <div className='m-1'>
            <Box mb={1} marginBottom={4}>
                <Stack spacing={3} mb={1} paddingTop={3}>
                    <FormControl variant="floating" id="type">
                        <Input autocomplete="off" placeholder=" " value="Manual" disabled />
                        <FormLabel>Type</FormLabel>
                    </FormControl>
                    <FormControl variant="floating" id="name">
                        <Input autocomplete="off" placeholder=" " value={name} onChange={handleNameChange} />
                        <FormLabel>Name</FormLabel>
                    </FormControl>
                    <FormControl variant="floating" id="description">
                        <Textarea autocomplete="off" placeholder=" " value={description} onChange={handleDescriptionChange} />
                        <FormLabel>Description</FormLabel>
                    </FormControl>
                </Stack>
            </Box>
        </div>
    );
};

export default Properties;
