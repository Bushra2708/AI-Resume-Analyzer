import { useState } from "react";
import API from "../services/api";

function UploadCard({ setResult }) {
  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState("");

  const handleSubmit = async () => {
    if (!resume) {
      alert("Upload Resume");
      return;
    }

    const formData = new FormData();

    formData.append(
      "resume",
      resume
    );

    formData.append(
      "job_description",
      jobDescription
    );

    try {
      const response = await API.post(
        "/analyze",
        formData
      );

      setResult(
        response.data
      );

    } catch (error) {
      console.log(error);

      alert(
        "Analysis Failed"
      );
    }
  };

  return (
    <div>

      <h2>
        AI Resume Analyzer
      </h2>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) =>
          setResume(
            e.target.files[0]
          )
        }
      />

      <br />
      <br />

      <textarea

        rows="10"

        cols="50"

        placeholder="Paste Job Description"

        value={jobDescription}

        onChange={(e) =>
          setJobDescription(
            e.target.value
          )
        }

      />

      <br />
      <br />

      <button
        onClick={
          handleSubmit
        }
      >
        Analyze
      </button>

    </div>
  );
}

export default UploadCard;