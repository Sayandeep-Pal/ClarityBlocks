// client/src/components/nodes/ModuleNode.js
import React from 'react';
import { Handle, Position } from 'react-flow-renderer';
import { SiReactos } from 'react-icons/si';
import { FaCog, FaTrash } from 'react-icons/fa';

const ModuleNode = ({ id, data, isConnectable, onUpdateNodeData, onDeleteNode }) => { // Add onUpdateNodeData, onDeleteNode
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Call the updater function from FlowCanvas
    onUpdateNodeData(id, { [name]: value });
  };

  const handleDelete = () => {
    onDeleteNode(id);
  };

  return (
    <div className="bg-blueBlock border border-blue-600 rounded-lg shadow-xl w-64 overflow-hidden relative">
      <div className="flex items-center justify-between p-3 bg-blue-700 text-white font-bold text-lg">
        <div className="flex items-center">
          <SiReactos className="mr-2 text-xl" />
          Module
        </div>
        <div className="flex space-x-2">
          <FaCog className="cursor-pointer hover:text-blue-200" title="Settings" />
          <FaTrash onClick={handleDelete} className="cursor-pointer hover:text-red-400" title="Delete" /> {/* Add onClick */}
        </div>
      </div>
      <div className="p-3 text-gray-100 text-sm">
        <div className="mb-2">
          <label className="font-semibold text-blue-200 block mb-1">Module Name:</label>
          <input
            type="text"
            name="moduleName"
            value={data.moduleName || ''}
            onChange={handleChange}
            className="nodrag w-full p-1 bg-blue-800 border border-blue-600 rounded text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="my-contract"
          />
        </div>
        <div className="mb-2">
          <label className="font-semibold text-blue-200 block mb-1">Contract Name:</label>
          <input
            type="text"
            name="contractName"
            value={data.contractName || ''}
            onChange={handleChange}
            className="nodrag w-full p-1 bg-blue-800 border border-blue-600 rounded text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="my-module"
          />
        </div>
      </div>
      <Handle type="source" position={Position.Right} id="out" isConnectable={isConnectable} className="w-18 h-18 rounded-full bg-blue-300 border-2 border-blue-700" />
    </div>
  );
};

export default ModuleNode;