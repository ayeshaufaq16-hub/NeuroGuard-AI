export default function MessageBubble({
  message
}) {
  return (
    <div
      className={`message ${message.sender}`}
    >
      <p>{message.text}</p>

      {message.intent && (
        <div className="intent">
          Intent: {message.intent}
        </div>
      )}

      {message.confidence && (
        <>
          <div
            style={{
              marginTop: "10px"
            }}
          >
            Confidence:
            {" "}
            {message.confidence}%
          </div>

          <div className="progress">
            <div
              className="progress-fill"
              style={{
                width:
                  `${message.confidence}%`
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}