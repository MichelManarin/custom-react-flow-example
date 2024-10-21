import React, { useState, useEffect, useContext } from 'react';
import ApplicationContext from '../../contexts/application-context';
import {
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Input,
    Box,
    Textarea,
    Stack
} from "@chakra-ui/react";

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
            <Box mb={1} marginBottom={4}>
                <Stack spacing={3} mb={1} paddingTop={3}>
                    <FormControl variant="floating" id="first-name" >
                        <Input placeholder=" " value={"Manual"} disabled/>
                        <FormLabel>Type</FormLabel>
                        {/* <FormHelperText>Keep it very short and sweet!</FormHelperText>
                        <FormErrorMessage>Your First name is invalid</FormErrorMessage> */}
                    </FormControl>
                    <FormControl variant="floating" id="first-name">
                        <Input placeholder=" " />
                        <FormLabel>Name</FormLabel>
                        {/* <FormHelperText>Keep it very short and sweet!</FormHelperText>
                        <FormErrorMessage>Your First name is invalid</FormErrorMessage> */}
                    </FormControl>
                    <FormControl variant="floating" id="first-name">
                        <Textarea placeholder=" "/>
                        <FormLabel>Type</FormLabel>
                        {/* <FormHelperText>Keep it very short and sweet!</FormHelperText>
                        <FormErrorMessage>Your First name is invalid</FormErrorMessage> */}
                    </FormControl>
                </Stack>
            </Box>
        </div>
    );
};

export default Properties;
