import { useState, useEffect } from "react";

function JobForm({ onCreate , editJob }) {
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState("");

     useEffect(() => {
  if (editJob) {
    setCompany(editJob.company);
    setPosition(editJob.position);
    setStatus(editJob.status);
  }
}, [editJob]);

  const handleSubmit = () => {
    if (!company || !position || !status) {
      alert("Fill all fields");
      return;
    }

    onCreate({ company, position, status });

    setCompany("");
    setPosition("");
    setStatus("");
  };

  return (
    <div>
     <h3>{editJob ? "Edit Job" : "Add Job"}</h3>

      <input
        placeholder="Company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Position"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      />

      <br /><br />

      <button onClick={handleSubmit}>
  {editJob ? "Update Job" : "Add Job"}
</button>
    </div>
  );
}

export default JobForm;