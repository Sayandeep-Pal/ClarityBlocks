// client/src/components/ClarityCodeViewer.js
import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"; // Dark theme

const ClarityCodeViewer = ({ code }) => {
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

      {/* Future analysis section */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-3 text-white">
          Contract Analysis (Coming Soon)
        </h3>
        <div className="bg-darkCard rounded-xl p-4 font-mono text-sm text-gray-400 border border-gray-700">
          <p className="mb-2">Cost analysis and debugging features will appear here.</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Gas Estimate: <span className="text-gray-300">N/A</span></li>
            <li>Potential Errors: <span className="text-gray-300">None</span></li>
            <li>Security Warnings: <span className="text-gray-300">None</span></li>
          </ul>
        </div>
      </div>

      {/* Action buttons */}
      <div className="mt-6 flex justify-end space-x-3">
        <button className="bg-blueBlock hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-xl shadow-md transition duration-200 ease-in-out">
          Export Contract
        </button>
        <button className="bg-greenBlock hover:bg-green-600 text-white font-medium py-2 px-4 rounded-xl shadow-md transition duration-200 ease-in-out">
          Deploy (Soon)
        </button>
      </div>
    </div>
  );
};

export default ClarityCodeViewer;
