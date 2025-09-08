// client/src/components/ClarityCodeViewer.js
import React, { useEffect, useState, useCallback } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

const API_BASE =  "http://localhost:5000";

const ClarityCodeViewer = ({ code, contractName = "my-contract" }) => {
  const [validation, setValidation] = useState(null);
  const [debug, setDebug] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Debounce function to avoid too many API calls
  const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  const fetchAnalysis = useCallback(async (codeToAnalyze) => {
    if (!codeToAnalyze || codeToAnalyze.trim().length === 0) {
      setValidation(null);
      setDebug(null);
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      // 1. First run validation (fast, client-side-ish)
      const validationRes = await fetch(`${API_BASE}/api/validate-contract`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clarityCode: codeToAnalyze }),
      });
      
      if (!validationRes.ok) {
        throw new Error(`Validation failed: ${validationRes.status}`);
      }
      
      const validationData = await validationRes.json();
      setValidation(validationData.validation);

      // 2. Run debugging with clarinet
      const debugRes = await fetch(`${API_BASE}/api/debug-contract`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clarityCode: codeToAnalyze }),
      });
      
      if (!debugRes.ok) {
        throw new Error(`Debug failed: ${debugRes.status}`);
      }
      
      const debugData = await debugRes.json();
      setDebug(debugData);

    } catch (err) {
      console.error("API error:", err);
      setError(err.message);
      setValidation(null);
      setDebug(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounced version of fetchAnalysis
  const debouncedFetchAnalysis = useCallback(
    debounce(fetchAnalysis, 1000), // Wait 1 second after user stops typing
    [fetchAnalysis]
  );

  useEffect(() => {
    debouncedFetchAnalysis(code);
  }, [code, debouncedFetchAnalysis]);

  const exportContract = () => {
    if (!code) return;
    
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${contractName || 'contract'}.clar`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = async () => {
    if (!code) return;
    
    try {
      await navigator.clipboard.writeText(code);
      // You could add a toast notification here
      console.log('Code copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className="w-1/3 bg-darkSidebar text-gray-200 p-4 overflow-auto shadow-lg rounded-2xl">
      {/* Title */}
      <h2 className="text-xl font-semibold mb-4 text-white tracking-wide">
        Clarity Code
      </h2>

      {/* Code block */}
      <div className="bg-darkCard rounded-xl p-4 font-mono text-sm leading-relaxed shadow-inner border border-gray-700">
        {code ? (
          <SyntaxHighlighter
            language="lisp"
            style={vscDarkPlus}
            showLineNumbers
            customStyle={{
              backgroundColor: "transparent",
              padding: 0,
              fontSize: "0.85rem",
              lineHeight: "1.5",
            }}
          >
            {code}
          </SyntaxHighlighter>
        ) : (
          <p className="text-gray-400 italic">
            Drag blocks onto the canvas to generate Clarity code.
          </p>
        )}
      </div>

      {/* Analysis Section */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-3 text-white">
          Contract Analysis
        </h3>
        <div className="bg-darkCard rounded-xl p-4 font-mono text-sm text-gray-300 border border-gray-700">
          {loading ? (
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <p className="italic text-gray-400">Analyzing contract...</p>
            </div>
          ) : error ? (
            <div className="text-red-400">
              <p className="font-semibold">Analysis Error:</p>
              <p className="text-sm">{error}</p>
            </div>
          ) : (
            <>
              {/* Validation Errors/Warnings */}
              {validation && (
                <div className="mb-4">
                  <h4 className="font-semibold text-white mb-2">Validation:</h4>
                  {validation.errors.length > 0 && (
                    <div className="mb-2">
                      <p className="text-red-400 font-medium">Errors:</p>
                      <ul className="list-disc list-inside text-red-400 text-xs">
                        {validation.errors.map((error, idx) => (
                          <li key={idx}>{error}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {validation.warnings.length > 1 && (
                    <div className="mb-2">
                      <p className="text-yellow-400 font-medium">Warnings:</p>
                      <ul className="list-disc list-inside text-yellow-400 text-xs">
                        {validation.warnings.map((warning, idx) => (
                          <li key={idx}>{warning}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  { validation.warnings.length === 0 && (
                    <p className="text-green-400">✓ Validation passed</p>
                  )}
                </div>
              )}

              {/* Compiler Output */}
              {debug && (
                <div className="mb-4">
                  <h4 className="font-semibold text-white mb-2">Compiler:</h4>
                  {debug.status === "success" ? (
                    <p className="text-green-400">✓ Compilation successful</p>
                  ) : (
                    <div className="text-red-400">
                      <p className="font-medium">Compilation failed:</p>
                      <pre className="text-xs bg-gray-800 p-2 rounded mt-1 overflow-x-auto">
                        {debug.compilerErrors || debug.error || "Unknown error"}
                      </pre>
                    </div>
                  )}
                </div>
              )}

              {!validation && !debug && !loading && code && (
                <p className="text-gray-400 italic">Ready to analyze...</p>
              )}
            </>
          )}
        </div>
      </div>

      {/* Action buttons */}
      <div className="mt-6 flex flex-col space-y-2">
        <div className="flex justify-end space-x-2">
          <button 
            onClick={copyToClipboard}
            disabled={!code}
            className="bg-gray-600 hover:bg-gray-500 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-medium py-2 px-3 rounded-xl shadow-md transition duration-200 ease-in-out text-sm"
          >
            Copy
          </button>
          <button 
            onClick={exportContract}
            disabled={!code}
            className="bg-blueBlock hover:bg-blue-600 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-xl shadow-md transition duration-200 ease-in-out text-sm"
          >
            Export
          </button>
        </div>
        <button 
          disabled={true}
          className="bg-gray-700 cursor-not-allowed text-gray-400 font-medium py-2 px-4 rounded-xl shadow-md text-sm w-full"
        >
          Deploy (Coming Soon)
        </button>
      </div>
    </div>
  );
};

export default ClarityCodeViewer;