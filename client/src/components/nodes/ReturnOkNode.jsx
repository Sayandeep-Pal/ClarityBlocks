// client/src/components/nodes/ReturnOkNode.js
import React from 'react';
import { Handle, Position } from 'react-flow-renderer';
import { RiCheckLine } from 'react-icons/ri';
import { FaCog, FaTrash } from 'react-icons/fa';

const ReturnOkNode = ({ id, data, isConnectable, onUpdateNodeData, onDeleteNode }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onUpdateNodeData(id, { [name]: value });
  };

  const handleDelete = () => {
    onDeleteNode(id);
  };

  return (
    <div className="bg-limeBlock border border-lime-600 rounded-lg shadow-xl w-64 overflow-hidden relative">
      <div className="flex items-center justify-between p-3 bg-lime-700 text-white font-bold text-lg">
        <div className="flex items-center">
          <RiCheckLine className="mr-2 text-xl" />
          Return Ok
        </div>
        <div className="flex space-x-2">
          <FaCog className="cursor-pointer hover:text-lime-200" title="Settings" />
          <FaTrash onClick={handleDelete} className="cursor-pointer hover:text-red-400" title="Delete" />
        </div>
      </div>
      <div className="p-3 text-gray-100 text-sm">
        <div className="mb-2">
          <label className="font-semibold text-lime-200 block mb-1">Value (e.g., true, u100):</label>
          <input
            type="text"
            name="value"
            value={data.value || ''}
            onChange={handleChange}
            className="nodrag w-full p-1 bg-lime-800 border border-lime-600 rounded text-gray-100 focus:outline-none focus:ring-2 focus:ring-lime-400"
            placeholder="true"
          />
        </div>
      </div>
      <Handle type="target" position={Position.Left} id="in" isConnectable={isConnectable} className="w-18 h-18 rounded-full bg-lime-300 border-2 border-lime-700" />
      {/* No source handle, as 'ok' typically terminates a function path */}
    </div>
  );
};

export default ReturnOkNode;