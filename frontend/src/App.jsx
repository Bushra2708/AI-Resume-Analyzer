import { useState } from "react";
import UploadCard from "./components/UploadCard";
import ResultCard from "./components/ResultCard";
import "./App.css";

function App() {
  const [result, setResult] = useState(null);
  const [notification, setNotification] = useState("");

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark">AI</span>
          Resume Analyzer
        </div>
        <nav>
          <a href="#analyze">Analyze</a>
          <a href="#results">Results</a>
        </nav>
      </header>

      <main className="page-grid">
        <section className="hero-panel">
          <div className="hero-copy">
            <p className="eyebrow">AI-powered resume intelligence</p>
            <h1>Perfect your resume with instant ATS insights</h1>
            <p>
              Upload a PDF and paste the job description to get a complete report on contact details,
              skills match, ATS score, and resume optimization recommendations.
            </p>
            <div className="hero-actions">
              <a href="#analyze" className="primary-btn">Analyze Resume</a>
              <a href="#results" className="secondary-btn">See Example Report</a>
            </div>
          </div>
          <div className="hero-panel-card glass-card">
            <div className="card-title">Resume analysis in one click</div>
            <div className="stats-grid">
              <div className="stat-box">
                <span>99%</span>
                <p>ATS Compatibility</p>
              </div>
              <div className="stat-box">
                <span>Fast</span>
                <p>Instant insights</p>
              </div>
              <div className="stat-box">
                <span>Clean</span>
                <p>Professional output</p>
              </div>
            </div>
          </div>
        </section>

        <section id="analyze" className="workspace">
          {notification && <div className="status-banner">{notification}</div>}
          <div className="workspace-grid">
            <UploadCard setResult={setResult} setNotification={setNotification} />
            <ResultCard result={result} />
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>Deployment ready for Vercel. Built with React and Vite.</p>
      </footer>
    </div>
  );
}

export default App;