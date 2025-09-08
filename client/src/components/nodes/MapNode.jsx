// client/src/components/nodes/MapNode.js
import React from 'react';
import { Handle, Position } from 'react-flow-renderer';
import { SiGooglesheets } from 'react-icons/si';
import { FaCog, FaTrash } from 'react-icons/fa';

const MapNode = ({ id, data, isConnectable, onUpdateNodeData, onDeleteNode }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onUpdateNodeData(id, { [name]: value });
  };

  const handleDelete = () => {
    onDeleteNode(id);
  };

  return (
    <div className="bg-orangeBlock border border-orange-600 rounded-lg shadow-xl w-64 overflow-hidden relative">
      <div className="flex items-center justify-between p-3 bg-orange-700 text-white font-bold text-lg">
        <div className="flex items-center">
          <SiGooglesheets className="mr-2 text-xl" />
          Map
        </div>
        <div className="flex space-x-2">
          <FaCog className="cursor-pointer hover:text-orange-200" title="Settings" />
          <FaTrash onClick={handleDelete} className="cursor-pointer hover:text-red-400" title="Delete" />
        </div>
      </div>
      <div className="p-3 text-gray-100 text-sm">
        <div className="mb-2">
          <label className="font-semibold text-orange-200 block mb-1">Name:</label>
          <input
            type="text"
            name="name"
            value={data.name || ''}
            onChange={handleChange}
            className="nodrag w-full p-1 bg-orange-800 border border-orange-600 rounded text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="balances"
          />
        </div>
        <div className="mb-2">
          <label className="font-semibold text-orange-200 block mb-1">Key Type (e.g., {`{ owner: principal }`}):</label>
          <input
            type="text"
            name="keyType"
            value={data.keyType || ''}
            onChange={handleChange}
            className="nodrag w-full p-1 bg-orange-800 border border-orange-600 rounded text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="{ id: uint }"
          />
        </div>
        <div className="mb-2">
          <label className="font-semibold text-orange-200 block mb-1">Value Type (e.g., uint):</label>
          <input
            type="text"
            name="valueType"
            value={data.valueType || ''}
            onChange={handleChange}
            className="nodrag w-full p-1 bg-orange-800 border border-orange-600 rounded text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="{ amount: uint }"
          />
        </div>
      </div>
      <Handle type="target" position={Position.Left} id="in" isConnectable={isConnectable} className="w-18 h-18 rounded-full bg-orange-300 border-2 border-orange-700" />
      <Handle type="source" position={Position.Right} id="out" isConnectable={isConnectable} className="w-18 h-18 rounded-full bg-orange-300 border-2 border-orange-700" />
    </div>
  );
};

export default MapNode; 