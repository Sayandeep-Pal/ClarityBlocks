// client/src/components/Sidebar.js
import React from 'react';
import {
  SiReactos, SiDatabricks, SiHashnode, SiGitlab, SiFiles, SiGooglesheets, SiDocker, SiOpenstreetmap
} from 'react-icons/si';
import {
  RiFunctionLine, RiArrowRightLine, RiCodeLine, RiNumbersLine,
  RiDatabaseLine, RiExchangeLine, RiCheckLine, RiCloseLine, RiFlowChart,
  RiArrowLeftRightLine, RiExternalLinkLine, RiLockLine, RiEyeLine, RiUser2Line
} from 'react-icons/ri';

const globalDeclarationBlocks = [
  { id: 'module', label: 'Module', description: 'Define a Clarity module', icon: <SiReactos className="text-blueBlock" /> },
  { id: 'useTrait', label: 'Use Trait', description: 'Import a trait/interface', icon: <RiArrowRightLine className="text-indigo-400" /> },
  { id: 'constant', label: 'Constant', description: 'Define an immutable constant', icon: <RiNumbersLine className="text-yellow-400" /> },
  { id: 'dataVariable', label: 'Data Variable', description: 'Define mutable state (global)', icon: <RiDatabaseLine className="text-red-400" /> },
  { id: 'map', label: 'Map', description: 'Define a key-value map (global)', icon: <SiGooglesheets className="text-orange-400" /> },
  { id: 'traitDefinition', label: 'Trait Definition', description: 'Define a contract trait/interface', icon: <SiGitlab className="text-pink-400" /> },
];

const functionBlocks = [
  { id: 'publicFunction', label: 'Public Function', description: 'Create an entrypoint for anyone', icon: <RiUser2Line className="text-greenBlock" /> },
  { id: 'readOnlyFunction', label: 'Read-Only Function', description: 'Create a view function (no state change)', icon: <RiEyeLine className="text-blue-400" /> },
  { id: 'privateFunction', label: 'Private Function', description: 'Create an internal function', icon: <RiLockLine className="text-purple-400" /> },
];

const logicBlocks = [
  { id: 'letBinding', label: 'Let Binding', description: 'Declare a local variable', icon: <RiCodeLine className="text-purpleBlock" /> },
  { id: 'ifElseCondition', label: 'If-Else Condition', description: 'Execute logic conditionally', icon: <RiFlowChart className="text-teal-400" /> },
  { id: 'returnOk', label: 'Return Ok', description: 'Return a successful result', icon: <RiCheckLine className="text-lime-400" /> },
  { id: 'returnErr', label: 'Return Err', description: 'Return an error result', icon: <RiCloseLine className="text-rose-400" /> },
  { id: 'assert', label: 'Assert', description: 'Ensure a condition is true', icon: <SiHashnode className="text-amber-400" /> },
  { id: 'varGet', label: 'Var Get', description: 'Read a data variable', icon: <RiDatabaseLine className="text-red-300" /> },
  { id: 'varSet', label: 'Var Set', description: 'Update a data variable', icon: <RiDatabaseLine className="text-red-500" /> },
  { id: 'mapGet', label: 'Map Get', description: 'Read from a map', icon: <SiGooglesheets className="text-orange-300" /> },
  { id: 'mapSet', label: 'Map Set', description: 'Write to a map', icon: <SiGooglesheets className="text-orange-500" /> },
  { id: 'mapDelete', label: 'Map Delete', description: 'Delete from a map', icon: <SiGooglesheets className="text-orange-700" /> },
  { id: 'contractCall', label: 'Contract Call', description: 'Call a function on another contract', icon: <RiExternalLinkLine className="text-indigo-600" /> },
];

const Sidebar = () => {
  const onDragStart = (event, nodeType, initialData = {}) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.setData('application/json', JSON.stringify({ label: nodeType, ...initialData }));
    event.dataTransfer.effectAllowed = 'move';
  };

  const renderBlockSection = (title, blocks, titleColorClass) => (
    <div className="mb-8">
      <h3 className={`text-base font-bold mb-3 ${titleColorClass} px-3 py-1 rounded-md bg-gradient-to-r from-gray-800/50 to-gray-700/30 backdrop-blur-md border border-gray-600 shadow`}>
        {title}
      </h3>
      <div className="space-y-3">
        {blocks.map((block) => (
          <div
            key={block.id}
            className="flex items-center p-3 bg-gradient-to-br from-gray-800/60 to-gray-900/60 border border-gray-700 rounded-xl cursor-grab shadow-md hover:shadow-lg hover:scale-[1.02] hover:border-indigo-500 transition-all duration-200 ease-out"
            draggable
            onDragStart={(event) => onDragStart(event, block.id, { label: block.label })}
          >
            <span className="text-2xl mr-3 drop-shadow-md">{block.icon}</span>
            <div>
              <div className="font-semibold text-gray-100">{block.label}</div>
              <div className="text-xs text-gray-400">{block.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <aside className="w-72 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-gray-200 p-5 flex flex-col justify-between shadow-2xl rounded-r-2xl backdrop-blur-md border-r border-gray-800 overflow-y-auto">
      <div>
        <h2 className="text-2xl font-extrabold mb-8 text-white tracking-wide flex items-center gap-2">
          ⚡ Clarity Blocks
        </h2>

        {renderBlockSection("Global Declarations", globalDeclarationBlocks, "text-blue-300")}
        {renderBlockSection("Functions", functionBlocks, "text-green-300")}
        {renderBlockSection("Logic & Statements", logicBlocks, "text-purple-300")}
      </div>

      <div className="p-4 bg-gradient-to-br from-gray-800/60 to-gray-900/60 border border-gray-700 rounded-xl text-sm text-gray-400 mt-6 shadow-inner backdrop-blur-md">
        <p className="font-bold text-gray-200 mb-2">💡 Tip:</p>
        <p>Drag blocks to the canvas and connect them to build your smart contract logic.</p>
      </div>
    </aside>
  );
};

export default Sidebar;
