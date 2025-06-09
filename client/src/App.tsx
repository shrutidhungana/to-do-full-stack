import React, { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// If you have a separate CSS file for App-specific styles that you're porting to Tailwind,
// you might remove or comment out its import if you're replacing those styles with Tailwind.
// import './App.css' // Assuming you remove this if you're fully moving to Tailwind

function App() {
  const [count, setCount] = useState(0);

  return (
    // Apply some basic flexbox and spacing using Tailwind
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="flex items-center space-x-8 mb-8">
        <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
          <img
            src={viteLogo}
            className="h-24 w-24 hover:drop-shadow-lg transition-all duration-300"
            alt="Vite logo"
          />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img
            src={reactLogo}
            className="h-24 w-24 hover:drop-shadow-lg transition-all duration-300"
            alt="React logo"
          />
        </a>
      </div>

      {/* Center the main title and apply text styles */}
      <h1 className="text-5xl font-extrabold text-gray-800 mb-6 tracking-tight">
        <span className="text-purple-600">Vite</span> +{" "}
        <span className="text-cyan-500">React</span>
      </h1>

      {/* Button with Tailwind styles */}
      <div className="card mb-8">
        <button
          onClick={() => setCount((count) => count + 1)}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-all duration-200"
        >
          count is {count}
        </button>
        <p className="mt-4 text-sm text-gray-600">
          Edit{" "}
          <code className="bg-gray-200 px-1 py-0.5 rounded text-gray-800">
            src/App.tsx
          </code>{" "}
          and save to test HMR
        </p>
      </div>

      <p className="read-the-docs text-gray-500 text-sm">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
