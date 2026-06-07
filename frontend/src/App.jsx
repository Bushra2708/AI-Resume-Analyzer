import { useState } from "react";

import UploadCard from "./components/UploadCard";
import ResultCard from "./components/ResultCard";

import "./App.css";

function App() {

  const [result, setResult] = useState(null);

  return (

    <div className="container">

      <h1>

        AI Resume Analyzer

      </h1>

      <UploadCard
        setResult={setResult}
      />

      <ResultCard
        result={result}
      />

    </div>

  );
}

export default App;