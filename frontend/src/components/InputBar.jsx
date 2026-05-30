import { useState } from "react";

function InputBar({ onSend }) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;

    onSend(message);
    setMessage("");
  };

  return (
    <div className="input-bar">
      <input
        value={message}
        onChange={(e) =>
          setMessage(e.target.value)
        }
        placeholder="Ask NeuroGuard..."
        onKeyDown={(e) => {
          if (e.key === "Enter")
            handleSend();
        }}
      />

      <button onClick={handleSend}>
        Send
      </button>
    </div>
  );
}

export default InputBar;