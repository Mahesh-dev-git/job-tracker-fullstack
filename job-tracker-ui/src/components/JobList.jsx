import "./JobList.css";
function JobList({ jobs, onDelete, onEdit }) {
  if (jobs.length === 0) {
    return <div className="no-jobs-message">No jobs found</div>;
  }
  
  const getStatusClass = (status) => {
    const lowerStatus = status?.toLowerCase() || "";
    if (lowerStatus === "applied" || lowerStatus === "open") return "status-applied";
    if (lowerStatus === "interview") return "status-interview";
    if (lowerStatus === "offer") return "status-offer";
    if (lowerStatus === "rejected" || lowerStatus === "closed") return "status-rejected";
    return "status-pending";
  };

  return (
    <div className="job-list-section">
      <div className="job-list-header">
        <h2 className="job-list-title">Applications</h2>
        <span className="job-count-badge">{jobs.length} total</span>
      </div>
      <div className="job-cards-container">
        {jobs.map((job) => {
          const jobId = job.Id ?? job.id;
          const statusClass = getStatusClass(job.status);
          return (
            <div className="job-card" key={jobId}>
              <div className="job-card-left">
                <div className="job-company">{job.company}</div>
                <div className="job-position">{job.position}</div>
              </div>
              <div className="job-card-right">
                <span className={`status-badge ${statusClass}`}>{job.status}</span>
                <div className="job-card-actions">
                  <button className="btn-edit" onClick={() => onEdit(job)}>
                    Edit
                  </button>
                  <button className="btn-delete" onClick={() => onDelete(jobId)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default JobList;