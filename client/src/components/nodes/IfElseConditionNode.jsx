// client/src/components/nodes/IfElseConditionNode.js
import React from 'react';
import { Handle, Position } from 'react-flow-renderer';
import { RiFlowChart } from 'react-icons/ri';
import { FaCog, FaTrash } from 'react-icons/fa';

const IfElseConditionNode = ({ id, data, isConnectable, onUpdateNodeData, onDeleteNode }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onUpdateNodeData(id, { [name]: value });
  };

  const handleDelete = () => {
    onDeleteNode(id);
  };

  return (
    <div className="bg-tealBlock border border-teal-600 rounded-lg shadow-xl w-64 overflow-hidden relative">
      <div className="flex items-center justify-between p-3 bg-teal-700 text-white font-bold text-lg">
        <div className="flex items-center">
          <RiFlowChart className="mr-2 text-xl" />
          If-Else Condition
        </div>
        <div className="flex space-x-2">
          <FaCog className="cursor-pointer hover:text-teal-200" title="Settings" />
          <FaTrash onClick={handleDelete} className="cursor-pointer hover:text-red-400" title="Delete" />
        </div>
      </div>
      <div className="p-3 text-gray-100 text-sm">
        <div className="mb-2">
          <label className="font-semibold text-teal-200 block mb-1">Condition:</label>
          <input
            type="text"
            name="condition"
            value={data.condition || ''}
            onChange={handleChange}
            className="nodrag w-full p-1 bg-teal-800 border border-teal-600 rounded text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-400"
            placeholder="(< my-var u100)"
          />
        </div>
      </div>
      {/* Input Handle */}
      <Handle type="target" position={Position.Left} id="in" isConnectable={isConnectable} className="w- 8 h-8 rounded-full bg-teal-300 border-2 border-teal-700" />
      {/* Output Handles for 'then' and 'else' branches */}
      <Handle type="source" position={Position.Bottom} id="then" isConnectable={isConnectable} style={{ left: '30%', transform: 'translateX(-50%)', background: '#84cc16' }} className="w- 8 h-8 rounded-full border-2 border-green-700" >
        <div className="absolute -bottom-6 text-xs text-lime-200 font-semibold">Then</div>
      </Handle>
      <Handle type="source" position={Position.Bottom} id="else" isConnectable={isConnectable} style={{ left: '70%', transform: 'translateX(-50%)', background: '#ef4444' }} className="w- 8 h-8 rounded-full border-2 border-red-700" >
        <div className="absolute -bottom-6 text-xs text-rose-200 font-semibold">Else</div>
      </Handle>
    </div>
  );
};

export default IfElseConditionNode;