export const Toolbar = () => {
    const numberColumns = 2;
    const styleToolbarFlow = {
        position: 'absolute',
        margin: '15px',
        padding: '5px',
        color: 'black',
        backgroundColor: '#f9f9f9',
        borderRadius: '5px',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.12), 0px 8px 12px rgba(0, 0, 0, 0.08), 0px 8px 16px rgba(0, 0, 0, 0.08)',
        display: 'grid',
        gridTemplateColumns: `repeat(${numberColumns}, 1fr)`,
        gap: '5px',
        zIndex: 10,
        backdropFilter: 'blur(1rem)',
        borderColor: '#1b19194d',
        borderStyle: 'solid',
        borderWidth: '1px',
        fontWeight: 'bold',
        fontSize: '0.8rem',
        padding: "0.5rem",
    };

    const styleItemToolbarFlow = {
        cursor: 'grab',
        padding: '0.3rem',
        borderColor: '#1b19194d',
        borderStyle: 'dashed',
        borderWidth: '1px',
        borderRadius: '3px',
        textAlign: 'center',
        fontSize: '0.8rem',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    };

    const titleStyle = {
        gridColumn: `span ${numberColumns}`,
        fontWeight: 'bold',
        fontSize: '0.9rem',
        marginBottom: '5px',
        textAlign: 'center',
    };

    const separatorStyle = {
        height: '1px',
        backgroundColor: '#ccc',
        margin: '10px 0',
        gridColumn: `span ${numberColumns}`,
    };

    const menuItems = [
        { type: 'manual', icon: '📋', label: 'Manual' },
        { type: 'email', icon: '✉️', label: 'E-mail' },
        { type: 'gateway', icon: '🤔', label: 'Decisão' },
        { type: 'gateway', icon: '📝', label: 'Checklist' },
        { type: 'gateway', icon: '📝', label: 'Formulário' },
        { type: 'gateway', icon: '📝', label: 'Comming' },
    ];

    const customFields = [
        { type: 'text', icon: '📝', label: 'Name' },
        { type: 'date', icon: '📅', label: 'Date of Birth' },
        { type: 'number', icon: '🔢', label: 'Age' },
    ];

    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <>
            <div className="toolbar-flow" style={styleToolbarFlow}>
                <div style={titleStyle}>Flow Elements</div>
                {menuItems.map((item, index) => (
                    <div
                        key={index}
                        onDragStart={(event) => onDragStart(event, item.type)}
                        draggable
                        style={styleItemToolbarFlow}
                    >
                        {item.icon} {item.label}
                    </div>
                ))}
                <div style={separatorStyle}></div>
                <div style={titleStyle}>Custom Fields</div>
                {customFields.map((field, index) => (
                    <div
                        key={index}
                        draggable
                        style={styleItemToolbarFlow}
                    >
                        {field.icon} {field.label}
                    </div>
                ))}
            </div>
        </>
    );
};
