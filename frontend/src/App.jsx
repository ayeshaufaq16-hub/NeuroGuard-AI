// import { useState } from "react";
import { useState } from "react";
import Header from "./components/Header";
import ChatBox from "./components/ChatBox";
import InputBar from "./components/InputBar";

import { sendMessage } from "./services/api";

import "./styles/main.css";

function App() {
  const [messages, setMessages] = useState([]);

  const handleSend = async (text) => {
    const userMessage = {
      sender: "user",
      text
    };

    setMessages((prev) => [
      ...prev,
      userMessage
    ]);

    const response = await sendMessage(text);

    const botMessage = {
      sender: "bot",
      text: response.response,
      intent: response.intent
    };

    setMessages((prev) => [
      ...prev,
      botMessage
    ]);
  };

  return (
    <div className="app">
      <Header />
      <ChatBox messages={messages} />
      <InputBar onSend={handleSend} />
    </div>
  );
}

export default App;