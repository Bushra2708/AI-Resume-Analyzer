import { useState } from "react";
import API from "../services/api";

function UploadCard({ setResult, setNotification }) {
  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!resume) {
      setNotification("Please upload a PDF resume before analyzing.");
      return;
    }
    if (!jobDescription || !jobDescription.trim()) {
      setNotification("Please paste the job description before analyzing.");
      return;
    }

    setNotification("");
    setLoading(true);

    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("job_description", jobDescription);

    try {
      const response = await API.post("/analyze", formData);
      setResult(response.data);
      setNotification("Analysis complete — review your insights below.");
    } catch (error) {
      setResult(null);
      
      let errorMsg = "Analysis failed. Check your PDF and try again.";
      const detail = error.response?.data?.detail;
      if (detail) {
        if (typeof detail === "string") {
          errorMsg = detail;
        } else if (Array.isArray(detail)) {
          errorMsg = detail
            .map((err) => {
              const field = err.loc ? err.loc[err.loc.length - 1] : "field";
              return `${field}: ${err.msg}`;
            })
            .join(", ");
        } else if (typeof detail === "object") {
          errorMsg = JSON.stringify(detail);
        }
      }
      
      setNotification(errorMsg);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card glass-card upload-card">
      <div className="card-header">
        <div>
          <h2>Upload & Analyze</h2>
          <p>Securely upload your resume and paste the job description to get instant feedback.</p>
        </div>
        <span className="badge">Fast</span>
      </div>

      <label className="input-group file-group">
        <span className="input-label">Resume PDF</span>
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setResume(e.target.files?.[0] ?? null)}
        />
        <div className="file-name">{resume ? resume.name : "No file selected"}</div>
      </label>

      <label className="input-group">
        <span className="input-label">Job Description</span>
        <textarea
          rows="10"
          placeholder="Paste the job description here"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />
      </label>

      <button
        className="primary-btn"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Analyzing..." : "Analyze Resume"}
      </button>
    </div>
  );
}

export default UploadCard;