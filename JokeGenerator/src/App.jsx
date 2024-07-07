import React, { useState, useEffect } from "react";

const App = () => {
  const [joke, setJoke] = useState("");
  const [loading, setLoading] = useState(true);

  const generateJoke = async () => {
    setLoading(true);
    try {
      let response = await fetch("https://v2.jokeapi.dev/joke/Any");
      let data = await response.json();
      const jokeText =
        data.type === "single" ? data.joke : `${data.setup} - ${data.delivery}`;
      setJoke(jokeText);
    } catch (error) {
      console.log(error);
      setJoke("Failed to fetch joke.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    generateJoke();
  }, []);

  return (
    <div className="bg-yellow-300 min-h-screen flex items-center justify-center">
      <div className="bg-[#15161A] rounded-lg shadow-lg p-10 w-[80vmin] text-center relative">
        <span className="block text-8xl">&#128514;</span>

        {loading ? (
          console.log("...loading")
        ) : (
          <p
            id="joke"
            className={`text-white text-base font-normal mt-8 transition-opacity duration-1000 ${
              loading ? "opacity-0" : "opacity-100"
            }`}
            style={{ transitionDelay: "1s" }}
          >
            {joke}
          </p>
        )}

        <button
          className="mt-6 bg-yellow-200 border border-black text-base font-light py-3 px-6 rounded relative overflow-hidden transition duration-200 hover:bg-yellow-500 hover:border-transparent hover:translate-x-0 hover:translate-y-0"
          onClick={generateJoke}
        >
          Get Random Joke
          {/* Background overlay */}
          <span className="absolute top-0 left-0 w-full h-full bg-ffe54c transition duration-200 transform translate-x-7 translate-y-7"></span>
        </button>
      </div>
    </div>
  );
};

export default App;
