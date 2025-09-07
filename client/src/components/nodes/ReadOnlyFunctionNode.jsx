// client/src/components/nodes/ReadOnlyFunctionNode.js
import React from 'react';
import { Handle, Position } from 'react-flow-renderer';
import { RiEyeLine } from 'react-icons/ri';
import { FaCog, FaTrash } from 'react-icons/fa';

const ReadOnlyFunctionNode = ({ id, data, isConnectable, onUpdateNodeData, onDeleteNode }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onUpdateNodeData(id, { [name]: value });
  };

  const handleDelete = () => {
    onDeleteNode(id);
  };

  return (
    <div className="bg-cyanBlock border border-cyan-600 rounded-lg shadow-xl w-64 overflow-hidden relative">
      <div className="flex items-center justify-between p-3 bg-cyan-700 text-white font-bold text-lg">
        <div className="flex items-center">
          <RiEyeLine className="mr-2 text-xl" />
          Read-Only Function
        </div>
        <div className="flex space-x-2">
          <FaCog className="cursor-pointer hover:text-cyan-200" title="Settings" />
          <FaTrash onClick={handleDelete} className="cursor-pointer hover:text-red-400" title="Delete" />
        </div>
      </div>
      <div className="p-3 text-gray-100 text-sm">
        <div className="mb-2">
          <label className="font-semibold text-cyan-200 block mb-1">Name:</label>
          <input
            type="text"
            name="name"
            value={data.name || ''}
            onChange={handleChange}
            className="nodrag w-full p-1 bg-cyan-800 border border-cyan-600 rounded text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            placeholder="get-value"
          />
        </div>
        <div className="mb-2">
          <label className="font-semibold text-cyan-200 block mb-1">Parameters (e.g., id uint):</label>
          <input
            type="text"
            name="params"
            value={data.params || ''}
            onChange={handleChange}
            className="nodrag w-full p-1 bg-cyan-800 border border-cyan-600 rounded text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            placeholder="owner principal"
          />
        </div>
        <div className="mb-2">
          <label className="font-semibold text-cyan-200 block mb-1">Return Type:</label>
          <input
            type="text"
            name="returnType"
            value={data.returnType || ''}
            onChange={handleChange}
            className="nodrag w-full p-1 bg-cyan-800 border border-cyan-600 rounded text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            placeholder="uint"
          />
        </div>
      </div>
      <Handle type="target" position={Position.Left} id="in" isConnectable={isConnectable} className="w- 8 h-8 rounded-full bg-cyan-300 border-2 border-cyan-700" />
      <Handle type="source" position={Position.Right} id="out" isConnectable={isConnectable} className="w- 8 h-8 rounded-full bg-cyan-300 border-2 border-cyan-700" />
    </div>
  );
};

export default ReadOnlyFunctionNode;