// client/src/components/nodes/LetBindingNode.js
import React from 'react';
import { Handle, Position } from 'react-flow-renderer';
import { RiCodeLine } from 'react-icons/ri';
import { FaCog, FaTrash } from 'react-icons/fa';

const LetBindingNode = ({ id, data, isConnectable, onUpdateNodeData, onDeleteNode }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onUpdateNodeData(id, { [name]: value });
  };

  const handleDelete = () => {
    onDeleteNode(id);
  };

  return (
    <div className="bg-purpleBlock border border-purple-600 rounded-lg shadow-xl w-64 overflow-hidden relative">
      <div className="flex items-center justify-between p-3 bg-purple-700 text-white font-bold text-lg">
        <div className="flex items-center">
          <RiCodeLine className="mr-2 text-xl" />
          Let Binding
        </div>
        <div className="flex space-x-2">
          <FaCog className="cursor-pointer hover:text-purple-200" title="Settings" />
          <FaTrash onClick={handleDelete} className="cursor-pointer hover:text-red-400" title="Delete" />
        </div>
      </div>
      <div className="p-3 text-gray-100 text-sm">
        <div className="mb-2">
          <label className="font-semibold text-purple-200 block mb-1">Variable Name:</label>
          <input
            type="text"
            name="varName"
            value={data.varName || ''}
            onChange={handleChange}
            className="nodrag w-full p-1 bg-purple-800 border border-purple-600 rounded text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-400"
            placeholder="my-local-var"
          />
        </div>
        <div className="mb-2">
          <label className="font-semibold text-purple-200 block mb-1">Value Expression:</label>
          <input
            type="text"
            name="valueExpr"
            value={data.valueExpr || ''}
            onChange={handleChange}
            className="nodrag w-full p-1 bg-purple-800 border border-purple-600 rounded text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-400"
            placeholder="u100"
          />
        </div>
      </div>
      <Handle type="target" position={Position.Left} id="in" isConnectable={isConnectable} className="w- 8 h-8 rounded-full bg-purple-300 border-2 border-purple-700" />
      <Handle type="source" position={Position.Right} id="out" isConnectable={isConnectable} className="w- 8 h-8 rounded-full bg-purple-300 border-2 border-purple-700" />
    </div>
  );
};

export default LetBindingNode;