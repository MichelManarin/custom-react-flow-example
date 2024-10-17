import React, { useCallback, useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import './email.css';

const handleStyle = { left: 10 };

export function EmailNode({ data }) {
  const [showDescription, setShowDescription] = useState(false);

  const toggleDescription = useCallback(() => {
    setShowDescription((prev) => !prev);
  }, []);

  return (
    <div className="node-container">
      <Handle type="target" position={Position.Top} />
      <div className="node-content">
        <div className="node-header">
          <h4>✉️ {data.name}</h4>
        </div>
        <div className="node-stats">
          <p><b>Counter: {data.count || 99} | Delays: 3 | Avg time: {data.averageTime || '45m'} </b></p>
        </div>
        <button className="toggle-description" onClick={toggleDescription}>
          {showDescription ? 'Collect' : 'Learn more'}
        </button>
        {showDescription && (
          <div className="node-description">
            <p>{data.description || 'No information'}</p>
          </div>
        )}
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
    </div>
  );
}
