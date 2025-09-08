import React from 'react';

const Tutorial = () => {
  const steps = [
    {
      title: "Welcome to ClarityBlocks",
    //   image: "../assets/welcome.png",
      description: "ClarityBlocks is a visual builder for Stacks smart contracts. Build your contracts by dragging and dropping blocks, without writing any code!"
    },
    {
      title: "Module Creation",
    //   image: "/tutorial/module.png",
      description: "Start by dragging a Module block onto the canvas. This is the foundation of your contract. Fill in your contract name and any other required details."
    },
    {
      title: "Data Variables",
    //   image: "/tutorial/data-vars.png",
      description: "Add data variables to store state in your contract. Drag a Data Variable block and connect it to your module. Set the variable name and type."
    },
    {
      title: "Maps & Storage",
    //   image: "/tutorial/maps.png",
      description: "Use Maps to store key-value data. Connect map operations (Get, Set, Delete) to interact with your stored data."
    },
    {
      title: "Functions",
    //   image: "/tutorial/functions.png",
      description: "Create functions by adding Public, Private, or Read-Only function blocks. These define how users interact with your contract."
    },
    {
      title: "Control Flow",
    //   image: "/tutorial/control-flow.png",
      description: "Add logic to your functions using If-Else conditions, Let bindings, and Assert statements. Connect return blocks (Ok/Err) to handle success and failure cases."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-light mb-8">
          How to Build with 
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent font-medium ml-2">
            ClarityBlocks
          </span>
        </h1>
        
        <div className="space-y-16">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
                  <div className="relative">
                    <img 
                      src={step?.image} 
                      alt={step.title} 
                      className="rounded-lg shadow-2xl border border-gray-800"
                    />
                  </div>
                </div>
              </div>
              <div className="md:w-1/2">
                <h2 className="text-2xl font-medium mb-4">{step.title}</h2>
                <p className="text-gray-400 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 p-6 bg-gradient-to-br from-gray-900 to-purple-900/20 rounded-xl border border-purple-500/20">
          <h3 className="text-xl font-medium mb-4">Tips & Tricks</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>Drag blocks from the sidebar onto the canvas</li>
            <li>Connect blocks by dragging from one handle to another</li>
            <li>Configure each block by filling in its properties</li>
            <li>Watch your Clarity code generate in real-time</li>
            <li>Use the Export button to download your contract</li>
            <li>Check the Analysis panel for validation results</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Tutorial;
