// client/src/util/clarityGenerator.js

const generateClarityCode = (nodes, edges) => {
  if (!nodes || nodes.length === 0) {
    return ";; Start building your contract by dragging blocks onto the canvas.";
  }

  let code = [];
  const globalDeclarations = [];
  const functions = [];

  // Sort nodes to ensure a somewhat logical order (e.g., module first, then declarations)
  // This is a simplistic sort. A proper builder would build an AST.
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
    let processedNodes = new Set(); // To prevent infinite loops in cycles or complex graphs

    while (currentNodeId && !processedNodes.has(currentNodeId)) {
      processedNodes.add(currentNodeId);
      const currentNode = nodes.find(n => n.id === currentNodeId);
      if (!currentNode) break;

      switch (currentNode.type) {
        case 'letBinding': {
          const varName = currentNode.data.varName || 'my-local-var';
          const valueExpr = currentNode.data.valueExpr || 'u0';
          bodyCode.push(`    (let ((${varName} ${valueExpr}))`);
          bodyCode.push(`      ;; Next expressions in this let scope`);
          // For now, let's assume `let` is the final statement or its children are nested
          // A real implementation would need to handle nested let scopes.
          // For sequential flow, we just generate the let and then proceed.
          break; // Don't continue for nested 'let' in this simple generator
        }
        case 'ifElseCondition': {
          const condition = currentNode.data.condition || 'true';
          bodyCode.push(`    (if ${condition}`);
          // Connect to 'then' branch
          const thenNodes = getConnectedNodes(currentNode.id, 'out', 'then');
          if (thenNodes.length > 0) {
            bodyCode.push(`      (begin`);
            bodyCode.push(generateFunctionBody(thenNodes[0].id).map(line => `        ${line}`).join('\n'));
            bodyCode.push(`      )`);
          } else {
            bodyCode.push(`      (ok true)`); // Default then branch
          }

          // Connect to 'else' branch
          const elseNodes = getConnectedNodes(currentNode.id, 'out', 'else');
          if (elseNodes.length > 0) {
            bodyCode.push(`      (begin`);
            bodyCode.push(generateFunctionBody(elseNodes[0].id).map(line => `        ${line}`).join('\n'));
            bodyCode.push(`      )`);
          } else {
            bodyCode.push(`      (ok false)`); // Default else branch
          }
          bodyCode.push(`    )`);
          // After if-else, the flow merges. This generator doesn't handle merges easily.
          // We'll stop further traversal for simplicity here to avoid generating duplicate code or incorrect sequences.
          currentNodeId = null; // Stop after if-else to prevent linear continuation
          break;
        }
        case 'returnOk': {
          const value = currentNode.data.value || 'true';
          bodyCode.push(`    (ok ${value})`);
          currentNodeId = null; // Return statements usually end the function flow
          break;
        }
        case 'returnErr': {
          const errorCode = currentNode.data.errorCode || 'u100';
          bodyCode.push(`    (err ${errorCode})`);
          currentNodeId = null; // Return statements usually end the function flow
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
          bodyCode.push(`    (map-set! ${mapName} { id: ${key} } { value: ${value} })`);
          break;
        }
        case 'mapDelete': {
          const mapName = currentNode.data.mapName || 'my-map';
          const key = currentNode.data.key || 'u1';
          bodyCode.push(`    (map-delete! ${mapName} { id: ${key} })`);
          break;
        }
        case 'contractCall': {
          const contractId = currentNode.data.contractId || '.some-contract';
          const functionName = currentNode.data.functionName || 'some-function';
          const args = currentNode.data.args || ''; // e.g., 'u100 true'
          bodyCode.push(`    (contract-call? ${contractId} ${functionName} ${args})`);
          break;
        }
        default:
          bodyCode.push(`    ;; Unhandled node type in function body: ${currentNode.type}`);
          break;
      }

      // Find the next node in the sequence
      const nextNodes = getConnectedNodes(currentNode.id, 'out', 'out'); // Standard output handle
      currentNodeId = nextNodes.length > 0 ? nextNodes[0].id : null;
    }
    return bodyCode;
  };

  let moduleName = "my-contract"; // Default
  let contractName = "my-module"; // Default

  const moduleNode = nodes.find(n => n.type === 'module');
  if (moduleNode) {
    moduleName = moduleNode.data.moduleName || moduleName;
    contractName = moduleNode.data.contractName || contractName;

    // Collect global declarations and function entry points directly connected to the module
    const moduleOutNodes = getConnectedNodes(moduleNode.id, 'out');

    moduleOutNodes.forEach(node => {
      switch (node.type) {
        case 'useTrait': {
          const traitId = node.data.traitId || 'SP2J6ZY48GV1EZ5V2V5RB9MP66NW8H1F2K7DCRGY5.trait-name';
          globalDeclarations.push(`(use-trait ${traitId})`);
          break;
        }
        case 'constant': {
          const name = node.data.name || 'MY_CONSTANT';
          const type = node.data.type || 'uint';
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
          const funcName = node.data.name || (funcKeyword === 'define-public' ? 'my-public-function' : funcKeyword === 'define-read-only' ? 'my-read-only-function' : 'my-private-function');
          const funcParams = node.data.params || '';
          const returnType = node.data.returnType || '(response bool uint)'; // Public/Private
          let functionSignature = `(${funcName} (${funcParams}))`;

          if (funcKeyword === 'define-read-only') {
              // Read-only functions don't usually specify (response ...) explicitly in signature, but in their body return.
              // For simplicity, we'll keep it as a comment if returnType is provided, or omit.
          } else {
              functionSignature += ` ${returnType}`;
          }


          // Find the first logic node connected to the function's output handle
          const funcBodyStartNodes = getConnectedNodes(node.id, 'out', 'out');
          let funcBody = [];
          if (funcBodyStartNodes.length > 0) {
            funcBody = generateFunctionBody(funcBodyStartNodes[0].id);
          } else {
            funcBody.push(`    ;; Function body goes here`);
            funcBody.push(`    (ok true)`); // Default return
          }

          functions.push(
            `(${funcKeyword} ${functionSignature}\n` +
            `  (begin\n` +
            (funcBody.length > 0 ? funcBody.join('\n') : `    ;; Empty function body\n    (ok true)`) + '\n' +
            `  )\n` +
            `)`
          );
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

  // code.push(`(define-contract ${contractName})`); // This is more common now for top-level module definition
  // code.push(``);
  // code.push(`(define-module ${moduleName}`);
  // code.push(`  (read-only-data)`);
  // code.push(`  (on-chain-data)`);
  // code.push(`)`);
  // code.push(``);

  code = code.concat(globalDeclarations.map(line => line));
  code.push(``);
  code = code.concat(functions.map(func => func));

  return code.join('\n\n'); // Add extra newlines between major sections
};

export default generateClarityCode;