
import "./JobForm.css";
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
    <div className="job-form-card">
      <h3 className="job-form-title">{editJob ? "Edit Job" : "Add Job"}</h3>
      <form className="job-form" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        <div className="form-group">
          <input
            className="form-input"
            type="text"
            placeholder="Company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            className="form-input"
            type="text"
            placeholder="Position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          />
        </div>
        <div className="form-group">
          <select
            className="form-input form-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Select Status</option>
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
        <button className="form-submit-btn" type="submit">
          {editJob ? "Update Job" : "Add Job"}
        </button>
      </form>
    </div>
  );
}

export default JobForm;