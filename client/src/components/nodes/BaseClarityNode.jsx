// client/src/components/nodes/BaseClarityNode.js (You can copy this for new nodes)
import React from 'react';
import { Handle, Position } from 'react-flow-renderer';
import { FaCog, FaTrash } from 'react-icons/fa';

const BaseClarityNode = ({ data, IconComponent, title, bgColor, borderColor, textColor, handleType = 'source', leftHandle = true, rightHandle = true }) => {

    const handleChange = (e) => {
    const { name, value } = e.target;
    onUpdateNodeData(id, { [name]: value });
  };

  const handleDelete = () => {
    onDeleteNode(id);
  };

  return (
    <div className={`${bgColor} border ${borderColor} rounded-lg shadow-xl w-64 overflow-hidden relative`}>
      <div className={`flex items-center justify-between p-3 ${bgColor.replace('bg-', 'bg-').split('-')[0]}-700 ${textColor} font-bold text-lg`}>
        <div className="flex items-center">
          {IconComponent && <IconComponent className="mr-2 text-xl" />}
          {title}
        </div>
        <div className="flex space-x-2">
          <FaCog className="cursor-pointer hover:text-opacity-75" title="Settings" />
          <FaTrash onClick={handleDelete} className="cursor-pointer hover:text-red-400" title="Delete" />
        </div>
      </div>
      <div className="p-3 text-gray-100 text-sm">
        {data.label && (
          <div className="mb-1">
            <span className={`font-semibold ${textColor.replace('text-', 'text-').split('-')[0]}-200`}>Type:</span> {data.label}
          </div>
        )}
        {/* Render specific data fields here */}
        {data.name && (
          <div className="mb-1">
            <span className={`font-semibold ${textColor.replace('text-', 'text-').split('-')[0]}-200`}>Name:</span> {data.name}
          </div>
        )}
        {/* Add more generic fields or specific fields as needed */}
      </div>

      {leftHandle && <Handle type="target" position={Position.Left} id="in" className="w- 8 h-8 rounded-full bg-gray-300 border-2 border-gray-700" />}
      {rightHandle && <Handle type="source" position={Position.Right} id="out" className="w- 8 h-8 rounded-full bg-gray-300 border-2 border-gray-700" />}
    </div>
  );
};

export default BaseClarityNode;