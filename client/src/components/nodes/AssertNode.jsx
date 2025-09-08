// client/src/components/nodes/AssertNode.js
import React from 'react';
import { Handle, Position } from 'react-flow-renderer';
import { SiHashnode } from 'react-icons/si';
import { FaCog, FaTrash } from 'react-icons/fa';

const AssertNode = ({ id, data, isConnectable, onUpdateNodeData, onDeleteNode }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onUpdateNodeData(id, { [name]: value });
  };

  const handleDelete = () => {
    onDeleteNode(id);
  };

  return (
    <div className="bg-amberBlock border border-amber-600 rounded-lg shadow-xl w-64 overflow-hidden relative">
      <div className="flex items-center justify-between p-3 bg-amber-700 text-white font-bold text-lg">
        <div className="flex items-center">
          <SiHashnode className="mr-2 text-xl" />
          Assert
        </div>
        <div className="flex space-x-2">
          <FaCog className="cursor-pointer hover:text-amber-200" title="Settings" />
          <FaTrash onClick={handleDelete} className="cursor-pointer hover:text-red-400" title="Delete" />
        </div>
      </div>
      <div className="p-3 text-gray-100 text-sm">
        <div className="mb-2">
          <label className="font-semibold text-amber-200 block mb-1">Condition (e.g., `(is-eq tx-sender deployer)`):</label>
          <input
            type="text"
            name="condition"
            value={data.condition || ''}
            onChange={handleChange}
            className="nodrag w-full p-1 bg-amber-800 border border-amber-600 rounded text-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-400"
            placeholder="(is-eq sender CONTRACT_OWNER)"
          />
        </div>
        <div className="mb-2">
          <label className="font-semibold text-amber-200 block mb-1">Error Code:</label>
          <input
            type="text"
            name="errorCode"
            value={data.errorCode || ''}
            onChange={handleChange}
            className="nodrag w-full p-1 bg-amber-800 border border-amber-600 rounded text-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-400"
            placeholder="u401"
          />
        </div>
      </div>
      <Handle type="target" position={Position.Left} id="in" isConnectable={isConnectable} className="w-18 h-18 rounded-full bg-amber-300 border-2 border-amber-700" />
      <Handle type="source" position={Position.Right} id="out" isConnectable={isConnectable} className="w-18 h-18 rounded-full bg-amber-300 border-2 border-amber-700" />
    </div>
  );
};

export default AssertNode;