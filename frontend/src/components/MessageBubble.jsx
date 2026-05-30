function MessageBubble({ message }) {
  return (
    <div
      className={`message ${
        message.sender === "user" ? "user" : "bot"
      }`}
    >
      <p>{message.text}</p>

      {message.intent && (
        <small>
          Intent: {message.intent}
        </small>
      )}
    </div>
  );
}

export default MessageBubble;