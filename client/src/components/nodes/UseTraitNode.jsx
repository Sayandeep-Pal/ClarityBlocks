// client/src/components/nodes/UseTraitNode.js
import React from 'react';
import { Handle, Position } from 'react-flow-renderer';
import { RiArrowRightLine } from 'react-icons/ri';
import { FaCog, FaTrash } from 'react-icons/fa';

const UseTraitNode = ({ id, data, isConnectable, onUpdateNodeData, onDeleteNode }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onUpdateNodeData(id, { [name]: value });
  };

  const handleDelete = () => {
    onDeleteNode(id);
  };

  return (
    <div className="bg-indigoBlock border border-indigo-600 rounded-lg shadow-xl w-64 overflow-hidden relative">
      <div className="flex items-center justify-between p-3 bg-indigo-700 text-white font-bold text-lg">
        <div className="flex items-center">
          <RiArrowRightLine className="mr-2 text-xl" />
          Use Trait
        </div>
        <div className="flex space-x-2">
          <FaCog className="cursor-pointer hover:text-indigo-200" title="Settings" />
          <FaTrash onClick={handleDelete} className="cursor-pointer hover:text-red-400" title="Delete" />
        </div>
      </div>
      <div className="p-3 text-gray-100 text-sm">
        <div className="mb-2">
          <label className="font-semibold text-indigo-200 block mb-1">Trait ID (e.g., .trait-contract-name.trait-name):</label>
          <input
            type="text"
            name="traitId"
            value={data.traitId || ''}
            onChange={handleChange}
            className="nodrag w-full p-1 bg-indigo-800 border border-indigo-600 rounded text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="SPX000...000.my-trait.my-trait-name"
          />
        </div>
      </div>
      <Handle type="target" position={Position.Left} id="in" isConnectable={isConnectable} className="w-18 h-18 rounded-full bg-indigo-300 border-2 border-indigo-700" />
      <Handle type="source" position={Position.Right} id="out" isConnectable={isConnectable} className="w-18 h-18 rounded-full bg-indigo-300 border-2 border-indigo-700" />
    </div>
  );
};

export default UseTraitNode;