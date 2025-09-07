// client/src/components/nodes/ContractCallNode.js
import React from 'react';
import { Handle, Position } from 'react-flow-renderer';
import { RiExternalLinkLine } from 'react-icons/ri';
import { FaCog, FaTrash } from 'react-icons/fa';

const ContractCallNode = ({ id, data, isConnectable, onUpdateNodeData, onDeleteNode }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onUpdateNodeData(id, { [name]: value });
  };

  const handleDelete = () => {
    onDeleteNode(id);
  };

  return (
    <div className="bg-deepPurpleBlock border border-deepPurple-600 rounded-lg shadow-xl w-64 overflow-hidden relative">
      <div className="flex items-center justify-between p-3 bg-deepPurple-700 text-white font-bold text-lg">
        <div className="flex items-center">
          <RiExternalLinkLine className="mr-2 text-xl" />
          Contract Call
        </div>
        <div className="flex space-x-2">
          <FaCog className="cursor-pointer hover:text-deepPurple-200" title="Settings" />
          <FaTrash onClick={handleDelete} className="cursor-pointer hover:text-red-400" title="Delete" />
        </div>
      </div>
      <div className="p-3 text-gray-100 text-sm">
        <div className="mb-2">
          <label className="font-semibold text-deepPurple-200 block mb-1">Contract ID (e.g., .my-contract):</label>
          <input
            type="text"
            name="contractId"
            value={data.contractId || ''}
            onChange={handleChange}
            className="nodrag w-full p-1 bg-deepPurple-800 border border-deepPurple-600 rounded text-gray-100 focus:outline-none focus:ring-2 focus:ring-deepPurple-400"
            placeholder="SPX000...000.other-contract"
          />
        </div>
        <div className="mb-2">
          <label className="font-semibold text-deepPurple-200 block mb-1">Function Name:</label>
          <input
            type="text"
            name="functionName"
            value={data.functionName || ''}
            onChange={handleChange}
            className="nodrag w-full p-1 bg-deepPurple-800 border border-deepPurple-600 rounded text-gray-100 focus:outline-none focus:ring-2 focus:ring-deepPurple-400"
            placeholder="transfer-tokens"
          />
        </div>
        <div className="mb-2">
          <label className="font-semibold text-deepPurple-200 block mb-1">Arguments (space separated, e.g., u100 .other-contract):</label>
          <input
            type="text"
            name="args"
            value={data.args || ''}
            onChange={handleChange}
            className="nodrag w-full p-1 bg-deepPurple-800 border border-deepPurple-600 rounded text-gray-100 focus:outline-none focus:ring-2 focus:ring-deepPurple-400"
            placeholder="u100 'ST000...000.receiver-wallet"
          />
        </div>
      </div>
      <Handle type="target" position={Position.Left} id="in" isConnectable={isConnectable} className="w- 8 h-8 rounded-full bg-deepPurple-300 border-2 border-deepPurple-700" />
      <Handle type="source" position={Position.Right} id="out" isConnectable={isConnectable} className="w- 8 h-8 rounded-full bg-deepPurple-300 border-2 border-deepPurple-700" />
    </div>
  );
};

export default ContractCallNode;