import MessageBubble from "./MessageBubble";

function ChatBox({ messages }) {
  return (
    <div className="chat-container">
      {messages.map((msg, index) => (
        <MessageBubble
          key={index}
          message={msg}
        />
      ))}
    </div>
  );
}

export default ChatBox;