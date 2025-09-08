// client/src/util/clarityGenerator.js

const generateClarityCode = (nodes, edges) => {
  if (!nodes || nodes.length === 0) {
    return ";; Start building your contract by dragging blocks onto the canvas.";
  }

  let code = [];
  const globalDeclarations = [];
  const functions = [];

  // Sort nodes to ensure a somewhat logical order (e.g., module first, then declarations)
  nodes.sort((a, b) => {
    if (a.type === 'module') return -1;
    if (b.type === 'module') return 1;
    return 0;
  });

  const getConnectedNodes = (sourceNodeId, edgeType, handleId = 'out') => {
    return edges
      .filter(edge => edge.source === sourceNodeId && edge.sourceHandle === handleId)
      .map(edge => nodes.find(n => n.id === edge.target))
      .filter(Boolean);
  };

  const generateFunctionBody = (startNodeId) => {
    let bodyCode = [];
    let currentNodeId = startNodeId;
    let processedNodes = new Set();

    while (currentNodeId && !processedNodes.has(currentNodeId)) {
      processedNodes.add(currentNodeId);
      const currentNode = nodes.find(n => n.id === currentNodeId);
      if (!currentNode) break;

      switch (currentNode.type) {
        case 'letBinding': {
          const varName = currentNode.data.varName || 'my-local-var';
          const valueExpr = currentNode.data.valueExpr || 'u0';
          
          // Find what comes after the let binding
          const nextNodes = getConnectedNodes(currentNode.id, 'out', 'out');
          let letBody = [];
          if (nextNodes.length > 0) {
            letBody = generateFunctionBody(nextNodes[0].id);
          } else {
            letBody.push(`      (ok true)`);
          }
          
          bodyCode.push(`    (let ((${varName} ${valueExpr}))`);
          bodyCode = bodyCode.concat(letBody.map(line => `  ${line}`));
          bodyCode.push(`    )`);
          currentNodeId = null; // Let handles its own body
          break;
        }
        case 'ifElseCondition': {
          const condition = currentNode.data.condition || 'true';
          bodyCode.push(`    (if ${condition}`);
          
          // Handle 'then' branch
          const thenNodes = getConnectedNodes(currentNode.id, 'out', 'then');
          if (thenNodes.length > 0) {
            const thenBody = generateFunctionBody(thenNodes[0].id);
            if (thenBody.length === 1) {
              bodyCode.push(`      ${thenBody[0].trim()}`);
            } else {
              bodyCode.push(`      (begin`);
              bodyCode = bodyCode.concat(thenBody.map(line => `    ${line}`));
              bodyCode.push(`      )`);
            }
          } else {
            bodyCode.push(`      (ok true)`);
          }

          // Handle 'else' branch
          const elseNodes = getConnectedNodes(currentNode.id, 'out', 'else');
          if (elseNodes.length > 0) {
            const elseBody = generateFunctionBody(elseNodes[0].id);
            if (elseBody.length === 1) {
              bodyCode.push(`      ${elseBody[0].trim()}`);
            } else {
              bodyCode.push(`      (begin`);
              bodyCode = bodyCode.concat(elseBody.map(line => `    ${line}`));
              bodyCode.push(`      )`);
            }
          } else {
            bodyCode.push(`      (ok false)`);
          }
          bodyCode.push(`    )`);
          currentNodeId = null;
          break;
        }
        case 'returnOk': {
          const value = currentNode.data.value || 'true';
          bodyCode.push(`    (ok ${value})`);
          currentNodeId = null;
          break;
        }
        case 'returnErr': {
          const errorCode = currentNode.data.errorCode || 'u100';
          bodyCode.push(`    (err ${errorCode})`);
          currentNodeId = null;
          break;
        }
        case 'assert': {
          const condition = currentNode.data.condition || 'true';
          const errorCode = currentNode.data.errorCode || 'u1';
          bodyCode.push(`    (asserts! ${condition} (err ${errorCode}))`);
          break;
        }
        case 'varGet': {
          const varName = currentNode.data.varName || 'my-var';
          bodyCode.push(`    (var-get ${varName})`);
          break;
        }
        case 'varSet': {
          const varName = currentNode.data.varName || 'my-var';
          const value = currentNode.data.value || 'u0';
          bodyCode.push(`    (var-set ${varName} ${value})`);
          break;
        }
        case 'mapGet': {
          const mapName = currentNode.data.mapName || 'my-map';
          const key = currentNode.data.key || 'u1';
          bodyCode.push(`    (map-get? ${mapName} { id: ${key} })`);
          break;
        }
        case 'mapSet': {
          const mapName = currentNode.data.mapName || 'my-map';
          const key = currentNode.data.key || 'u1';
          const value = currentNode.data.value || 'true';
          bodyCode.push(`    (map-set ${mapName} { id: ${key} } { value: ${value} })`);
          break;
        }
        case 'mapDelete': {
          const mapName = currentNode.data.mapName || 'my-map';
          const key = currentNode.data.key || 'u1';
          bodyCode.push(`    (map-delete ${mapName} { id: ${key} })`);
          break;
        }
        case 'contractCall': {
          const contractId = currentNode.data.contractId || '.some-contract';
          const functionName = currentNode.data.functionName || 'some-function';
          const args = currentNode.data.args || '';
          const argsStr = args ? ` ${args}` : '';
          bodyCode.push(`    (contract-call? ${contractId} ${functionName}${argsStr})`);
          break;
        }
        default:
          bodyCode.push(`    ;; Unhandled node type in function body: ${currentNode.type}`);
          break;
      }

      // Find the next node in the sequence
      const nextNodes = getConnectedNodes(currentNode.id, 'out', 'out');
      currentNodeId = nextNodes.length > 0 ? nextNodes[0].id : null;
    }
    return bodyCode;
  };

  let moduleName = "my-contract";
  let contractName = "my-module";

  const moduleNode = nodes.find(n => n.type === 'module');
  if (moduleNode) {
    moduleName = moduleNode.data.moduleName || moduleName;
    contractName = moduleNode.data.contractName || contractName;

    const moduleOutNodes = getConnectedNodes(moduleNode.id, 'out');

    moduleOutNodes.forEach(node => {
      switch (node.type) {
        case 'useTrait': {
          const traitId = node.data.traitId || 'SP2J6ZY48GV1EZ5V2V5RB9MP66NW8H1F2K7DCRGY5.trait-name';
          globalDeclarations.push(`(use-trait ${traitId})`);
          break;
        }
        case 'constant': {
          const name = node.data.name || 'MY-CONSTANT';
          const value = node.data.value || 'u100';
          globalDeclarations.push(`(define-constant ${name} ${value})`);
          break;
        }
        case 'dataVariable': {
          const name = node.data.name || 'my-data-var';
          const type = node.data.type || 'uint';
          const initialValue = node.data.initialValue || 'u0';
          globalDeclarations.push(`(define-data-var ${name} ${type} ${initialValue})`);
          break;
        }
        case 'map': {
          const name = node.data.name || 'my-map';
          const keyType = node.data.keyType || '{ id: uint }';
          const valueType = node.data.valueType || '{ value: bool }';
          globalDeclarations.push(`(define-map ${name} ${keyType} ${valueType})`);
          break;
        }
        case 'publicFunction':
        case 'readOnlyFunction':
        case 'privateFunction': {
          const funcKeyword = node.type === 'publicFunction' ? 'define-public' :
                              node.type === 'readOnlyFunction' ? 'define-read-only' :
                              'define-private';
          const funcName = node.data.name || 'my-function';
          const funcParams = node.data.params || '';
          
          // Build parameter list
          let paramString = '';
          if (funcParams.trim()) {
            // Assume params are formatted as "param1 uint, param2 bool"
            const params = funcParams.split(',').map(p => p.trim());
            const formattedParams = params.map(param => {
              const parts = param.split(' ');
              if (parts.length >= 2) {
                const paramName = parts[0];
                const paramType = parts[1];
                return `(${paramName} ${paramType})`;
              }
              return `(${param} uint)`;
            });
            paramString = formattedParams.join(' ');
          }

          // Find the function body
          const funcBodyStartNodes = getConnectedNodes(node.id, 'out', 'out');
          let funcBody = [];
          if (funcBodyStartNodes.length > 0) {
            funcBody = generateFunctionBody(funcBodyStartNodes[0].id);
          } else {
            if (funcKeyword === 'define-read-only') {
              funcBody.push(`    u0`); // Default read-only return
            } else {
              funcBody.push(`    (ok true)`); // Default public/private return
            }
          }

          // Build function signature
          let functionDef;
          if (funcKeyword === 'define-read-only') {
            functionDef = `(${funcKeyword} (${funcName}${paramString ? ' ' + paramString : ''})`;
          } else {
            functionDef = `(${funcKeyword} (${funcName}${paramString ? ' ' + paramString : ''})`;
          }

          // Wrap body appropriately
          if (funcBody.length === 1) {
            functions.push(`${functionDef}\n  ${funcBody[0].trim()}\n)`);
          } else {
            functions.push(
              `${functionDef}\n` +
              `  (begin\n` +
              funcBody.join('\n') + '\n' +
              `  )\n` +
              `)`
            );
          }
          break;
        }
        default:
          globalDeclarations.push(`;; Unhandled global node type: ${node.type}`);
          break;
      }
    });
  } else {
    code.push(";; Start by dragging a 'Module' block to the canvas.");
    return code.join('\n');
  }

  // Add contract header comment
  if (contractName !== "my-module") {
    code.push(`;; ${contractName} Smart Contract`);
    code.push('');
  }

  // Add global declarations
  if (globalDeclarations.length > 0) {
    code = code.concat(globalDeclarations);
    code.push('');
  }

  // Add functions
  code = code.concat(functions);

  return code.join('\n');
};

export default generateClarityCode;