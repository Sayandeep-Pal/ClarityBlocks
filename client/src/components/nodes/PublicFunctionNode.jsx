// client/src/components/nodes/PublicFunctionNode.js
import React from 'react';
import { Handle, Position } from 'react-flow-renderer';
import { RiUser2Line } from 'react-icons/ri';
import { FaCog, FaTrash } from 'react-icons/fa';

const PublicFunctionNode = ({ id, data, isConnectable, onUpdateNodeData, onDeleteNode }) => {
    console.log(`[PublicFunctionNode ${id}] Rendered with data:`, data);
  console.log(`[PublicFunctionNode ${id}] onUpdateNodeData is:`, typeof onUpdateNodeData, onUpdateNodeData);
  console.log(`[PublicFunctionNode ${id}] onDeleteNode is:`, typeof onDeleteNode, onDeleteNode);
  const handleChange = (e) => {
    const { name, value } = e.target;
    onUpdateNodeData(id, { [name]: value });
  };

  const handleDelete = () => {
    onDeleteNode(id);
  };

  return (
    <div className="bg-greenBlock border border-green-600 rounded-lg shadow-xl w-64 overflow-hidden relative">
      <div className="flex items-center justify-between p-3 bg-green-700 text-white font-bold text-lg">
        <div className="flex items-center">
          <RiUser2Line className="mr-2 text-xl" />
          Public Function
        </div>
        <div className="flex space-x-2">
          <FaCog className="cursor-pointer hover:text-green-200" title="Settings" />
          <FaTrash onClick={handleDelete} className="cursor-pointer hover:text-red-400" title="Delete" />
        </div>
      </div>
      <div className="p-3 text-gray-100 text-sm">
        <div className="mb-2">
          <label className="font-semibold text-green-200 block mb-1">Name:</label>
          <input
            type="text"
            name="name"
            value={data.name || ''}
            onChange={handleChange}
            className="nodrag w-full p-1 bg-green-800 border border-green-600 rounded text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="my-function"
          />
        </div>
        <div className="mb-2">
          <label className="font-semibold text-green-200 block mb-1">Parameters (e.g., a principal):</label>
          <input
            type="text"
            name="params"
            value={data.params || ''}
            onChange={handleChange}
            className="nodrag w-full p-1 bg-green-800 border border-green-600 rounded text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="value uint, recipient principal"
          />
        </div>
        <div className="mb-2">
          <label className="font-semibold text-green-200 block mb-1">Return Type:</label>
          <input
            type="text"
            name="returnType"
            value={data.returnType || ''}
            onChange={handleChange}
            className="nodrag w-full p-1 bg-green-800 border border-green-600 rounded text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="(response bool uint)"
          />
        </div>
      </div>
      <Handle type="target" position={Position.Left} id="in" isConnectable={isConnectable} className="w- 8 h-8 rounded-full bg-green-300 border-2 border-green-700" />
      <Handle type="source" position={Position.Right} id="out" isConnectable={isConnectable} className="w- 8 h-8 rounded-full bg-green-300 border-2 border-green-700" />
    </div>
  );
};

export default PublicFunctionNode;