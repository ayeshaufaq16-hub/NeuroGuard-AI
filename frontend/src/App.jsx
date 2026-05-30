import { useState } from "react";

import Header from "./components/Header";
import ChatBox from "./components/ChatBox";
import InputBar from "./components/InputBar";
import Sidebar from "./components/Sidebar";

import { sendMessage } from "./services/api";

import "./styles/main.css";

function App() {
  const [messages, setMessages] = useState([]);
  const [thinking, setThinking] = useState(false);

  const handleSend = async (text) => {
    const userMessage = {
      sender: "user",
      text
    };

    setMessages((prev) => [...prev, userMessage]);

    setThinking(true);

    try {
      const response = await sendMessage(text);

      const botMessage = {
        sender: "bot",
        text: response.response,
        intent: response.intent,
        confidence: response.confidence
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Backend connection failed.",
          intent: "error"
        }
      ]);
    }

    setThinking(false);
  };

  return (
    <div className="app">
      <Sidebar messages={messages.length} />

      <div className="main">
        <Header />

        <ChatBox
          messages={messages}
          thinking={thinking}
        />

        <InputBar onSend={handleSend} />
      </div>
    </div>
  );
}

export default App;