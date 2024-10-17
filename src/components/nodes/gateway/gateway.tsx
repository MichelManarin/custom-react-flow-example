import React, { useState, useCallback } from 'react';
import { Handle, Position } from '@xyflow/react';
import './gateway.css';

export function GatewayNode({ data }) {
  const [showDescription, setShowDescription] = useState(false);

  const toggleDescription = useCallback(() => {
    setShowDescription((prev) => !prev);
  }, []);

  return (
    <div className="decision-node-container">
      <Handle type="target" position={Position.Top} id="c" style={{ bottom: '100%', left: '0%' }} />
      <Handle type="source" position={Position.Bottom} id="a" style={{ bottom: '0px', left: '100%' }} />
      
      <div className="decision-node-content">
        <span className="decision-icon">🤔</span>
      </div>
    </div>
  );
}
