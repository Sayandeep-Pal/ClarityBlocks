// client/src/components/nodes/VarGetNode.js
import React from 'react';
import { Handle, Position } from 'react-flow-renderer';
import { RiDatabaseLine } from 'react-icons/ri';
import { FaCog, FaTrash } from 'react-icons/fa';

const VarGetNode = ({ id, data, isConnectable, onUpdateNodeData, onDeleteNode }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onUpdateNodeData(id, { [name]: value });
  };

  const handleDelete = () => {
    onDeleteNode(id);
  };

  return (
    <div className="bg-blueGrayBlock border border-gray-600 rounded-lg shadow-xl w-64 overflow-hidden relative">
      <div className="flex items-center justify-between p-3 bg-gray-700 text-white font-bold text-lg">
        <div className="flex items-center">
          <RiDatabaseLine className="mr-2 text-xl text-red-300" />
          Var Get
        </div>
        <div className="flex space-x-2">
          <FaCog className="cursor-pointer hover:text-gray-200" title="Settings" />
          <FaTrash onClick={handleDelete} className="cursor-pointer hover:text-red-400" title="Delete" />
        </div>
      </div>
      <div className="p-3 text-gray-100 text-sm">
        <div className="mb-2">
          <label className="font-semibold text-gray-200 block mb-1">Variable Name:</label>
          <input
            type="text"
            name="variableName"
            value={data.variableName || ''}
            onChange={handleChange}
            className="nodrag w-full p-1 bg-gray-800 border border-gray-600 rounded text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400"
            placeholder="my-data-var"
          />
        </div>
      </div>
      <Handle type="target" position={Position.Left} id="in" isConnectable={isConnectable} className="w-18 h-18 rounded-full bg-gray-300 border-2 border-gray-700" />
      <Handle type="source" position={Position.Right} id="out" isConnectable={isConnectable} className="w-18 h-18 rounded-full bg-gray-300 border-2 border-gray-700" />
    </div>
  );
};

export default VarGetNode;