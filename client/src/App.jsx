// client/src/App.js
import React, { useState, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import FlowCanvas from './components/FlowCanvas';
import ClarityCodeViewer from './components/ClarityCodeViewer';
import generateClarityCode from './util/clarityGenerator';
import { ReactFlowProvider } from 'react-flow-renderer';
import { Connect } from '@stacks/connect-react';
import { connect, isConnected } from '@stacks/connect';
import { FaGithub, FaTwitter } from 'react-icons/fa';
import { IoLogoBitcoin } from 'react-icons/io5';
import Logo from './assets/logo.png';

function App() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [clarityCode, setClarityCode] = useState('');
  const [isLanding, setIsLanding] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [userSession, setUserSession] = useState(null);

  const handleFlowChange = useCallback((newNodes, newEdges) => {
    setNodes(newNodes);
    setEdges(newEdges);
    setClarityCode(generateClarityCode(newNodes, newEdges));
  }, []);

  const handleConnectWallet = async () => {
    if (isConnected()) {
      console.log('Already authenticated');
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setIsLanding(false);
      }, 2000);
      return;
    };

    // Connect to wallet
    setIsLoading(true);
    const response = await connect();
    console.log('Connected:', response.addresses[0]);
    setTimeout(() => {
      setIsLoading(false);
      setIsLanding(false);
    }, 2000);
  };

  return (
    <Connect>
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-purple-300 text-lg font-light">Connecting to wallet...</p>
          </div>
        </div>
      )}
      {isLanding ? (
        <div className="min-h-screen bg-[#0A0A0A] text-white">
          {/* Navigation - Sleeker and Minimal */}
          <nav className="container mx-auto px-8 py-6 backdrop-blur-sm bg-black/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img src={Logo} alt="Logo" className="w-10 h-10 mr-2 animate-pulse" />
                {/* <IoLogoBitcoin className="text-3xl text-purple-500 mr-2 animate-pulse" /> */}
                <span className="text-xl font-light tracking-wider">Clarity Block Builder</span>
              </div>
              <div className="flex items-center space-x-6">
                {/* <a href='/tutorial' className="hover:text-purple-500 transition-colors duration-300">Tutorial</a> */}
                <a href="https://github.com/Sayandeep-Pal" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="hover:text-purple-500 transition-colors duration-300">
                  <FaGithub className="text-xl" />
                </a>
                <a href="https://twitter.com/ClarityBlocks" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="hover:text-purple-500 transition-colors duration-300">
                  <FaTwitter className="text-xl" />
                </a>
                <button
                  onClick={handleConnectWallet}
                  className="bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/50 text-purple-300 
                           font-medium py-2 px-6 rounded-full transition duration-300 ease-in-out 
                           hover:shadow-[0_0_15px_rgba(168,85,247,0.5)] backdrop-blur-sm"
                >
                  Connect Wallet
                </button>
              </div>
            </div>
          </nav>

          {/* Hero Section - Modern and Minimal */}
          <div className="container mx-auto px-8 py-24">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/2 mb-12 md:mb-0">
                <div className="space-y-8">
                  <h1 className="text-6xl font-extralight mb-6 leading-tight">
                    Build Clarity
                    <span className="block mt-2">
                      <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent font-medium">
                        Visually.
                      </span>
                    </span>
                  </h1>
                  <p className="text-lg text-gray-400 leading-relaxed max-w-xl">
                    Create and deploy Stacks smart contracts using an intuitive block-based interface. 
                    No complex coding required.
                  </p>
                  <button
                    onClick={handleConnectWallet}
                    className="group relative inline-flex items-center justify-center px-8 py-3 overflow-hidden 
                             font-medium transition duration-300 ease-out border-2 border-purple-500 rounded-full 
                             shadow-md text-purple-300 hover:text-white"
                  >
                    <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white 
                                   duration-300 -translate-x-full bg-purple-500 group-hover:translate-x-0 ease">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    </span>
                    <span className="absolute flex items-center justify-center w-full h-full transition-all 
                                   duration-300 transform group-hover:translate-x-full ease">
                      Start Building
                    </span>
                    <span className="relative invisible">Start Building</span>
                  </button>
                </div>
              </div>
              <div className="md:w-1/2 relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg blur opacity-20"></div>
                <div className="relative bg-black/40 backdrop-blur-xl rounded-lg p-8">
                  <pre className="text-sm text-gray-300 font-mono">
                    <code>{`(define-public (build-contract)
  (let ((success true))
    (asserts! success
      (err u100))
    (ok success)))`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>

          {/* Features Section - Minimal Cards */}
          <div className="container mx-auto px-8 py-24">
            <h2 className="text-2xl font-light text-center mb-16">Features</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Visual Building",
                  description: "Drag and drop blocks to create smart contracts without writing code."
                },
                {
                  title: "Real-Time Preview",
                  description: "See your contract code update instantly as you build."
                },
                {
                  title: "One-Click Deploy",
                  description: "Deploy directly to the Stacks blockchain with a single click."
                }
              ].map((feature, index) => (
                <div key={index} 
                     className="group relative p-8 rounded-lg transition-all duration-300 hover:scale-105
                              bg-gradient-to-b from-black/40 to-purple-500/5 backdrop-blur-sm
                              border border-purple-500/10 hover:border-purple-500/30">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 
                                opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                  <h3 className="text-xl font-medium mb-4 relative z-10">{feature.title}</h3>
                  <p className="text-gray-400 relative z-10">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : isLoading ? (
        <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
          <div className="text-center space-y-8">
            <div className="relative">
              <div className="w-32 h-32 border-t-4 border-r-4 border-purple-500 border-solid rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 border-b-4 border-l-4 border-pink-500 border-solid rounded-full animate-spin-slow"></div>
              </div>
            </div>
            <div className="relative space-y-4">
              <h2 className="text-3xl font-light text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse">
                Initializing Builder
              </h2>
              <p className="text-gray-400 text-sm">Preparing your workspace...</p>
              <div className="h-1.5 w-60 mx-auto bg-gray-800/50 rounded-full overflow-hidden backdrop-blur-xl">
                <div className="h-full w-2/3 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 animate-shimmer rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <ReactFlowProvider>
          <div className="flex h-screen bg-darkBg text-white overflow-hidden">
            <Sidebar />
            <FlowCanvas onFlowChange={handleFlowChange} />
            <ClarityCodeViewer code={clarityCode} />
          </div>
        </ReactFlowProvider>
      )}
    </Connect>
  );
}

export default App;