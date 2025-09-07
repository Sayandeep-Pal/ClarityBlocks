// client/src/components/FlowCanvas.js
import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
} from 'react-flow-renderer';
import { v4 as uuidv4 } from 'uuid';

// Import all custom nodes
import ModuleNode from './nodes/ModuleNode';
import UseTraitNode from './nodes/UseTraitNode';
import ConstantNode from './nodes/ConstantNode';
import DataVariableNode from './nodes/DataVariableNode';
import MapNode from './nodes/MapNode';
import PublicFunctionNode from './nodes/PublicFunctionNode';
import ReadOnlyFunctionNode from './nodes/ReadOnlyFunctionNode';
import PrivateFunctionNode from './nodes/PrivateFunctionNode';
import LetBindingNode from './nodes/LetBindingNode';
import IfElseConditionNode from './nodes/IfElseConditionNode';
import ReturnOkNode from './nodes/ReturnOkNode';
import ReturnErrNode from './nodes/ReturnErrNode';
import AssertNode from './nodes/AssertNode';
import VarGetNode from './nodes/VarGetNode';
import VarSetNode from './nodes/VarSetNode';
import MapGetNode from './nodes/MapGetNode';
import MapSetNode from './nodes/MapSetNode';
import MapDeleteNode from './nodes/MapDeleteNode';
import ContractCallNode from './nodes/ContractCallNode';

const initialNodes = [];
const initialEdges = [];

const baseNodeTypes = {
  module: ModuleNode,
  useTrait: UseTraitNode,
  constant: ConstantNode,
  dataVariable: DataVariableNode,
  map: MapNode,
  publicFunction: PublicFunctionNode,
  readOnlyFunction: ReadOnlyFunctionNode,
  privateFunction: PrivateFunctionNode,
  letBinding: LetBindingNode,
  ifElseCondition: IfElseConditionNode,
  returnOk: ReturnOkNode,
  returnErr: ReturnErrNode,
  assert: AssertNode,
  varGet: VarGetNode,
  varSet: VarSetNode,
  mapGet: MapGetNode,
  mapSet: MapSetNode,
  mapDelete: MapDeleteNode,
  contractCall: ContractCallNode,
};

const FlowCanvas = ({ onFlowChange }) => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onUpdateNodeData = useCallback((id, newData) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, ...newData } } : node
      )
    );
  }, [setNodes]);

  const onDeleteNode = useCallback((id) => {
    setNodes((nds) => nds.filter((node) => node.id !== id));
    setEdges((eds) => eds.filter((edge) => edge.source !== id && edge.target !== id));
  }, [setNodes, setEdges]);

  const onNodesChangeHandler = useCallback((changes) => {
    setNodes((nds) => applyNodeChanges(changes, nds));
  }, [setNodes]);

  const onEdgesChangeHandler = useCallback((changes) => {
    setEdges((eds) => applyEdgeChanges(changes, eds));
  }, [setEdges]);

  const onConnect = useCallback((params) => {
    setEdges((eds) =>
      addEdge(
        {
          ...params,
          type: 'smoothstep',
          animated: true,
          style: {
            stroke: 'url(#edge-gradient)',
            strokeWidth: 2.2,
          },
        },
        eds
      )
    );
  }, [setEdges]);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');
      const nodeData = JSON.parse(event.dataTransfer.getData('application/json') || '{}');

      if (!type) return;

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode = {
        id: uuidv4(),
        type,
        position,
        data: { label: nodeData.label, ...nodeData },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  useEffect(() => {
    onFlowChange(nodes, edges);
  }, [nodes, edges, onFlowChange]);

  const customNodeTypes = useMemo(() => {
    return Object.entries(baseNodeTypes).reduce((acc, [key, NodeComponent]) => {
      acc[key] = (nodeProps) => (
        <NodeComponent
          {...nodeProps}
          onUpdateNodeData={onUpdateNodeData}
          onDeleteNode={onDeleteNode}
        />
      );
      return acc;
    }, {});
  }, [onUpdateNodeData, onDeleteNode]);

  return (
    <div
      className="flex-grow h-full relative rounded-xl overflow-hidden 
                 bg-gradient-to-br from-gray-950 via-gray-900 to-black shadow-inner"
      ref={reactFlowWrapper}
    >
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChangeHandler}
          onEdgesChange={onEdgesChangeHandler}
          onConnect={onConnect}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeTypes={customNodeTypes}
          fitView
          attributionPosition="top-right"
          className="reactflow-canvas"
        >
          {/* Edge gradient definition */}
          <svg>
            <defs>
              <linearGradient id="edge-gradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#7f57f1" />
                <stop offset="100%" stopColor="#00e0ff" />
              </linearGradient>
            </defs>
          </svg>

          <Controls
            className="!bg-gray-800/60 !text-gray-200 !border !border-gray-700 
                       !rounded-lg shadow-lg backdrop-blur-md hover:!border-indigo-400 transition-all"
          />
          <Background
            gap={20}
            size={1}
            color="#3f3f46"
            className="opacity-70"
          />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
};

export default FlowCanvas;
