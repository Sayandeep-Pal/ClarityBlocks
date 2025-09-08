// client/src/components/nodes/ReturnErrNode.js
import React from 'react';
import { Handle, Position } from 'react-flow-renderer';
import { RiCloseLine } from 'react-icons/ri';
import { FaCog, FaTrash } from 'react-icons/fa';

const ReturnErrNode = ({ id, data, isConnectable, onUpdateNodeData, onDeleteNode }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onUpdateNodeData(id, { [name]: value });
  };

  const handleDelete = () => {
    onDeleteNode(id);
  };

  return (
    <div className="bg-roseBlock border border-rose-600 rounded-lg shadow-xl w-64 overflow-hidden relative">
      <div className="flex items-center justify-between p-3 bg-rose-700 text-white font-bold text-lg">
        <div className="flex items-center">
          <RiCloseLine className="mr-2 text-xl" />
          Return Err
        </div>
        <div className="flex space-x-2">
          <FaCog className="cursor-pointer hover:text-rose-200" title="Settings" />
          <FaTrash onClick={handleDelete} className="cursor-pointer hover:text-red-400" title="Delete" />
        </div>
      </div>
      <div className="p-3 text-gray-100 text-sm">
        <div className="mb-2">
          <label className="font-semibold text-rose-200 block mb-1">Error Code (e.g., u100, ERR_UNAUTHORIZED):</label>
          <input
            type="text"
            name="errorCode"
            value={data.errorCode || ''}
            onChange={handleChange}
            className="nodrag w-full p-1 bg-rose-800 border border-rose-600 rounded text-gray-100 focus:outline-none focus:ring-2 focus:ring-rose-400"
            placeholder="u100"
          />
        </div>
      </div>
      <Handle type="target" position={Position.Left} id="in" isConnectable={isConnectable} className="w-18 h-18 rounded-full bg-rose-300 border-2 border-rose-700" />
      {/* No source handle, as 'err' typically terminates a function path */}
    </div>
  );
};

export default ReturnErrNode;