// client/src/components/nodes/DataVariableNode.js
import React from 'react';
import { Handle, Position } from 'react-flow-renderer';
import { RiDatabaseLine } from 'react-icons/ri';
import { FaCog, FaTrash } from 'react-icons/fa';

const DataVariableNode = ({ id, data, isConnectable, onUpdateNodeData, onDeleteNode }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onUpdateNodeData(id, { [name]: value });
  };

  const handleDelete = () => {
    onDeleteNode(id);
  };

  return (
    <div className="bg-redBlock border border-red-600 rounded-lg shadow-xl w-64 overflow-hidden relative">
      <div className="flex items-center justify-between p-3 bg-red-700 text-white font-bold text-lg">
        <div className="flex items-center">
          <RiDatabaseLine className="mr-2 text-xl" />
          Data Variable
        </div>
        <div className="flex space-x-2">
          <FaCog className="cursor-pointer hover:text-red-200" title="Settings" />
          <FaTrash onClick={handleDelete} className="cursor-pointer hover:text-red-400" title="Delete" />
        </div>
      </div>
      <div className="p-3 text-gray-100 text-sm">
        <div className="mb-2">
          <label className="font-semibold text-red-200 block mb-1">Name:</label>
          <input
            type="text"
            name="name"
            value={data.name || ''}
            onChange={handleChange}
            className="nodrag w-full p-1 bg-red-800 border border-red-600 rounded text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-400"
            placeholder="last-id"
          />
        </div>
        <div className="mb-2">
          <label className="font-semibold text-red-200 block mb-1">Type (e.g., uint):</label>
          <input
            type="text"
            name="type"
            value={data.type || ''}
            onChange={handleChange}
            className="nodrag w-full p-1 bg-red-800 border border-red-600 rounded text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-400"
            placeholder="uint"
          />
        </div>
        <div className="mb-2">
          <label className="font-semibold text-red-200 block mb-1">Initial Value:</label>
          <input
            type="text"
            name="initialValue"
            value={data.initialValue || ''}
            onChange={handleChange}
            className="nodrag w-full p-1 bg-red-800 border border-red-600 rounded text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-400"
            placeholder="u0"
          />
        </div>
      </div>
      <Handle type="target" position={Position.Left} id="in" isConnectable={isConnectable} className="w- 8 h-8 rounded-full bg-red-300 border-2 border-red-700" />
      <Handle type="source" position={Position.Right} id="out" isConnectable={isConnectable} className="w- 8 h-8 rounded-full bg-red-300 border-2 border-red-700" />
    </div>
  );
};

export default DataVariableNode;