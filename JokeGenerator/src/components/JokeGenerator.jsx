// App.jsx

import React from "react";

const App = () => {
  return (
    <div className="bg-fab22e min-h-screen flex items-center justify-center">
      <div className="bg-15161a rounded-lg shadow-lg p-10 w-80vmin text-center relative">
        <span className="block text-8xl">&#128514;</span>
        <p
          id="joke"
          className="text-white text-base font-normal mt-8 opacity-0 transition-opacity duration-1500"
        ></p>
        <button
          id="btn"
          className="mt-6 bg-transparent border border-black text-base font-light py-3 px-6 rounded relative overflow-hidden transition duration-200 hover:bg-ffe54c hover:border-transparent hover:translate-x-0 hover:translate-y-0"
        >
          Get Random Joke
          <span className="absolute top-0 left-0 w-full h-full bg-ffe54c transition duration-200 transform translate-x-7 translate-y-7"></span>
        </button>
      </div>
    </div>
  );
};

export default App;
