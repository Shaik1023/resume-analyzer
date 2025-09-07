import React, { useEffect, useState } from "react";
import axios from "axios";
import ResumeDetails from "./ResumeDetails";

function PastResumesTable() {
  const [resumes, setResumes] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/resumes").then((res) => setResumes(res.data));
  }, []);

  return (
    <div>
      <h2>Past Resumes</h2>
      <table border="1">
        <thead>
          <tr>
            <th>File Name</th>
            <th>Uploaded</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {resumes.map((r) => (
            <tr key={r.id}>
              <td>{r.file_name}</td>
              <td>{new Date(r.uploaded_at).toLocaleString()}</td>
              <td><button onClick={() => setSelected(r)}>View</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      {selected && <ResumeDetails resume={selected} />}
    </div>
  );
}

export default PastResumesTable;
