import React, { useState, useEffect, useContext } from 'react';
import ApplicationContext from '../../contexts/application-context';

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
        <div>
            {/* <div style={{ marginBottom: '8px' }}>
                <label style={{ display: 'block' }}>Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={handleNameChange}
                    style={{ width: '100%', padding: '4px' }}
                />
            </div>
            <div>
                <label style={{ display: 'block' }}>Description:</label>
                <textarea
                    value={description}
                    onChange={handleDescriptionChange}
                    rows={3}
                    style={{ width: '100%', padding: '4px' }}
                />
            </div> */}
        </div>
    );
};

export default Properties;
