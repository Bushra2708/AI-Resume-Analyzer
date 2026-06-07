function ResultCard({ result }) {
  if (!result) {
    return (
      <div className="card glass-card result-card placeholder-card" id="results">
        <div className="card-header">
          <div>
            <h2>Analysis Results</h2>
            <p>Your results will appear here when the resume has been analyzed.</p>
          </div>
        </div>
        <div className="placeholder-copy">
          <p>Upload your resume and paste the job description to generate a polished scorecard with recommendations.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card glass-card result-card" id="results">
      <div className="card-header">
        <div>
          <h2>Analysis Report</h2>
          <p>Insightful metrics and skill-level feedback for your resume.</p>
        </div>
        <span className="badge secondary">ATS Score</span>
      </div>

      <div className="metrics-grid">
        <div className="metric-item">
          <span>{result.ats_score}</span>
          <p>ATS Score</p>
        </div>
        <div className="metric-item">
          <span>{result.semantic_match}</span>
          <p>Semantic Match</p>
        </div>
        <div className="metric-item">
          <span>{result.matched_skills?.length ?? 0}</span>
          <p>Matched Skills</p>
        </div>
      </div>

      <div className="info-grid">
        <div>
          <p className="info-label">Email</p>
          <p>{result.email || "Not found"}</p>
        </div>
        <div>
          <p className="info-label">Phone</p>
          <p>{result.phone || "Not found"}</p>
        </div>
        <div>
          <p className="info-label">LinkedIn</p>
          <p>{result.linkedin || "Not found"}</p>
        </div>
        <div>
          <p className="info-label">GitHub</p>
          <p>{result.github || "Not found"}</p>
        </div>
      </div>

      <div className="lists-grid">
        <div className="list-panel">
          <h3>Resume Skills</h3>
          <ul>
            {result.resume_skills?.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </div>
        <div className="list-panel">
          <h3>Missing Skills</h3>
          <ul>
            {result.missing_skills?.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </div>
      </div>

      {result.resume_preview && (
        <div className="preview-panel">
          <h3>Resume Preview</h3>
          <p>{result.resume_preview}</p>
        </div>
      )}
    </div>
  );
}

export default ResultCard;