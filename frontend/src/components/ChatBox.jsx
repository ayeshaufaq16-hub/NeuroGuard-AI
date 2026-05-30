import MessageBubble from "./MessageBubble";

export default function ChatBox({
  messages,
  thinking
}) {
  return (
    <div className="chat-area">

      {messages.length === 0 && (
        <div className="hero">
          <h1>Explainable AI with Memory</h1>

          <p>
            Semantic Intent Detection, AI Guardrails and Transparent Decision Making
          </p>
        </div>
      )}

      {messages.map((msg, index) => (
        <MessageBubble
          key={index}
          message={msg}
        />
      ))}

      {thinking && (
        <div className="message bot">
          🛡 NeuroGuard is thinking...
        </div>
      )}
    </div>
  );
}