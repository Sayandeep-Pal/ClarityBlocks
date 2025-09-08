// client/src/components/nodes/ConstantNode.js
import React from 'react';
import { Handle, Position } from 'react-flow-renderer';
import { RiNumbersLine } from 'react-icons/ri';
import { FaCog, FaTrash } from 'react-icons/fa';

const ConstantNode = ({ id, data, isConnectable, onUpdateNodeData, onDeleteNode }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onUpdateNodeData(id, { [name]: value });
  };

  const handleDelete = () => {
    onDeleteNode(id);
  };

  return (
    <div className="bg-yellowBlock border border-yellow-600 rounded-lg shadow-xl w-64 overflow-hidden relative">
      <div className="flex items-center justify-between p-3 bg-yellow-700 text-white font-bold text-lg">
        <div className="flex items-center">
          <RiNumbersLine className="mr-2 text-xl" />
          Constant
        </div>
        <div className="flex space-x-2">
          <FaCog className="cursor-pointer hover:text-yellow-200" title="Settings" />
          <FaTrash onClick={handleDelete} className="cursor-pointer hover:text-red-400" title="Delete" />
        </div>
      </div>
      <div className="p-3 text-gray-100 text-sm">
        <div className="mb-2">
          <label className="font-semibold text-yellow-200 block mb-1">Name:</label>
          <input
            type="text"
            name="name"
            value={data.name || ''}
            onChange={handleChange}
            className="nodrag w-full p-1 bg-yellow-800 border border-yellow-600 rounded text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="CONTRACT_OWNER"
          />
        </div>
        <div className="mb-2">
          <label className="font-semibold text-yellow-200 block mb-1">Value:</label>
          <input
            type="text"
            name="value"
            value={data.value || ''}
            onChange={handleChange}
            className="nodrag w-full p-1 bg-yellow-800 border border-yellow-600 rounded text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="tx-sender"
          />
        </div>
      </div>
      <Handle type="target" position={Position.Left} id="in" isConnectable={isConnectable} className="w-18 h-18 rounded-full bg-yellow-300 border-2 border-yellow-700" />
      <Handle type="source" position={Position.Right} id="out" isConnectable={isConnectable} className="w-18 h-18 rounded-full bg-yellow-300 border-2 border-yellow-700" />
    </div>
  );
};

export default ConstantNode;