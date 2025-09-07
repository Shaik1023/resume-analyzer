import React, { useState } from "react";
import ResumeUploader from "./components/ResumeUploader";
import PastResumesTable from "./components/PastResumesTable";
import ResumeDetails from "./components/ResumeDetails";

function App() {
  const [tab, setTab] = useState("upload");

  return (
    <div>
      <h1>Resume Analyzer</h1>
      <nav>
        <button onClick={() => setTab("upload")}>Resume Analysis</button>
        <button onClick={() => setTab("history")}>History</button>
      </nav>

      {tab === "upload" && <ResumeUploader />}
      {tab === "history" && <PastResumesTable />}
    </div>
  );
}

export default App;
