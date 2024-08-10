import { createContext, useState } from "react";
import run from "../config/Gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [previousPrompt, setPreviousPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false); // Ensure setShowResult is defined
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const delaypara = (index, nextword) => {
    setTimeout(function () {
      setResultData((prev) => prev + nextword);
    }, 75 * index);
  };

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  };

  const onSent = async (prompt) => {
    const storedResult = localStorage.getItem(prompt);
    if (storedResult) {
      setResultData(storedResult);
      setShowResult(true);
      setLoading(false);
      setRecentPrompt(prompt); // Ensure recentPrompt is updated
      return;
    }

    setResultData("");
    setLoading(true);
    setShowResult(true);
    setRecentPrompt(prompt);

    if (!previousPrompt.includes(prompt)) {
      setPreviousPrompts((prev) => [...prev, prompt]);
    }

    try {
      const response = await run(prompt);
      let responseArray = response.split("**");
      let newResponse = "";
      for (let i = 0; i < responseArray.length; i++) {
        if (i === 0 || i % 2 !== 1) {
          newResponse += responseArray[i];
        } else {
          newResponse += "<b>" + responseArray[i] + "</b>";
        }
      }
      let newResponse2 = newResponse.split("*").join("</br>");
      setResultData(newResponse2);

      localStorage.setItem(prompt, newResponse2);
    } catch (error) {
      console.error("Error fetching response:", error);
      setResultData("Error fetching response.");
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  const contextValue = {
    previousPrompt,
    setPreviousPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    setShowResult, 
    loading,
    setLoading,
    resultData,
    input,
    setInput,
    setResultData,
    newChat,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
