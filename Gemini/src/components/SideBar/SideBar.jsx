import React, { useContext, useState, useEffect } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets.js";
import { Context } from "../../context/Context.jsx";

const SideBar = () => {
  const [extended, setExtended] = useState(false);
  const {
    setRecentPrompt,
    setResultData,
    setShowResult,
    setLoading,
    previousPrompt,
    setPreviousPrompts,
    newChat,
  } = useContext(Context);

  // Load data from local storage when component mounts
  useEffect(() => {
    const storedPreviousPrompts = localStorage.getItem("previousPrompts");
    if (storedPreviousPrompts) {
      setPreviousPrompts(JSON.parse(storedPreviousPrompts));
    }
  }, []);

  // Function to load prompt and show result
  const loadPrompt = (prompt) => {
    setRecentPrompt(prompt);

    // Check if the result is already in local storage
    const storedResult = localStorage.getItem(prompt);
    if (storedResult) {
      setResultData(storedResult);
      setShowResult(true);
      setLoading(false);
    } else {
      // If no stored result, handle it (e.g., show an error or fetch again)
      setResultData("No result found in local storage.");
      setShowResult(true);
      setLoading(false);
    }
  };

  // Function to update state and local storage with new prompts
  const updatePreviousPrompts = (newPrompts) => {
    setPreviousPrompts(newPrompts);
    localStorage.setItem("previousPrompts", JSON.stringify(newPrompts));
  };

  return (
    <div className="Side-bar">
      <div className="top">
        <img
          onClick={() => setExtended((prev) => !prev)}
          src={assets.menu_icon}
          alt=""
          className="menu"
        />
        <div className="new-chat" onClick={() => newChat()}>
          <img src={assets.plus_icon} alt="" />
          {extended ? <p>New Chat</p> : null}
        </div>

        {extended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {previousPrompt.map((item, index) => {
              return (
                <div
                  onClick={() => loadPrompt(item)}
                  className="recent-entry"
                  key={index}
                >
                  <img src={assets.message_icon} alt="" />
                  <p>{item.slice(0, 18)}...</p>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>

      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="" />
          {extended ? <p>Help</p> : null}
        </div>

        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="" />
          {extended ? <p>Activity</p> : null}
        </div>

        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="" />
          {extended ? <p>Setting</p> : null}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
