// client/src/components/nodes/EntryFunctionNode.js
import React from "react";
import { Handle, Position } from "react-flow-renderer"; // or react-flow for v11+
import { RiFunctionLine } from "react-icons/ri";
import { FaCog, FaTrash } from "react-icons/fa";

const EntryFunctionNode = ({ data }) => {

  const handleChange = (e) => {
    const { name, value } = e.target;
    onUpdateNodeData(id, { [name]: value });
  };

  const handleDelete = () => {
    onDeleteNode(id);
  };
  return (
    <div className="bg-greenBlock border border-green-600 rounded-lg shadow-xl w-60 overflow-hidden relative">
      <div className="flex items-center justify-between p-3 bg-green-700 text-white font-bold text-lg">
        <div className="flex items-center">
          <RiFunctionLine className="mr-2 text-xl" />
          Entry Function
        </div>
        <div className="flex space-x-2">
          <FaCog
            className="cursor-pointer hover:text-green-200"
            title="Settings"
          />
          <FaTrash
            className="cursor-pointer hover:text-red-400"
            onClick={handleDelete}
            title="Delete"
          />
        </div>
      </div>
      <div className="p-3 text-gray-100 text-sm">
        <div className="mb-1">
          <span className="font-semibold text-green-200">Name:</span>{" "}
          {data.name || "my_function"}
        </div>
        <div>
          <span className="font-semibold text-green-200">Params:</span>{" "}
          {data.params || "account: &signer"}
        </div>
      </div>
      <Handle
        type="target"
        position={Position.Left}
        id="b"
        className="w-18 h-18 rounded-full bg-green-300 border-2 border-green-700"
      />
      <Handle
        type="source"
        position={Position.Right}
        id="c"
        className="w-18 h-18 rounded-full bg-green-300 border-2 border-green-700"
      />
    </div>
  );
};

export default EntryFunctionNode;
