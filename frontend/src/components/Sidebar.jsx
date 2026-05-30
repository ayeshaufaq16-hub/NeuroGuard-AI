export default function Sidebar({ messages }) {
  return (
    <div className="sidebar">
      <h2>🛡 NeuroGuard</h2>

      <div className="stat-card">
        <p>Messages</p>
        <div className="stat-value">
          {messages}
        </div>
      </div>

      <div className="stat-card">
        <p>Guardrails</p>
        <div className="stat-value">
          Active
        </div>
      </div>

      <div className="stat-card">
        <p>Memory Layer</p>
        <div className="stat-value">
          Enabled
        </div>
      </div>

      <div className="stat-card">
        <p>AI Engine</p>
        <div className="stat-value">
          Hybrid NLP
        </div>
      </div>

      <div
        style={{
          marginTop: "50px",
          color: "#94a3b8"
        }}
      >
        <p>Version 1.0</p>

        <br />

        <p>React</p>
        <p>FastAPI</p>
        <p>Sentence Transformers</p>
        <p>Scikit-Learn</p>
      </div>
    </div>
  );
}