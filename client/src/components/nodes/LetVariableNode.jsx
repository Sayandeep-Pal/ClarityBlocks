// client/src/components/nodes/LetVariableNode.js
import React from "react";
import { Handle, Position } from "react-flow-renderer"; // or react-flow for v11+
import { RiArrowRightLine } from "react-icons/ri";
import { FaCog, FaTrash } from "react-icons/fa";

const LetVariableNode = ({ data }) => {

  const handleChange = (e) => {
    const { name, value } = e.target;
    onUpdateNodeData(id, { [name]: value });
  };

  const handleDelete = () => {
    onDeleteNode(id);
  };
  return (
    <div className="bg-purpleBlock border border-purple-600 rounded-lg shadow-xl w-60 overflow-hidden relative">
      <div className="flex items-center justify-between p-3 bg-purple-700 text-white font-bold text-lg">
        <div className="flex items-center">
          <RiArrowRightLine className="mr-2 text-xl" />
          Let Variable
        </div>
        <div className="flex space-x-2">
          <FaCog
            className="cursor-pointer hover:text-purple-200"
            title="Settings"
          />
          <FaTrash
          onClick={handleDelete}
            className="cursor-pointer hover:text-red-400"
            title="Delete"
          />
        </div>
      </div>
      <div className="p-3 text-gray-100 text-sm">
        <div className="mb-1">
          <span className="font-semibold text-purple-200">Name:</span>{" "}
          {data.name || "my_var"}
        </div>
        <div>
          <span className="font-semibold text-purple-200">Value:</span>{" "}
          {data.value || "0"}
        </div>
      </div>
      <Handle
        type="target"
        position={Position.Left}
        id="d"
        className="w-18 h-18 rounded-full bg-purple-300 border-2 border-purple-700"
      />
      <Handle
        type="source"
        position={Position.Right}
        id="e"
        className="w-18 h-18 rounded-full bg-purple-300 border-2 border-purple-700"
      />
    </div>
  );
};

export default LetVariableNode;
