function JobList({ jobs, onDelete , onEdit }) {
  if (jobs.length === 0) {
    return <p>No jobs found</p>;
  }

  return (
    <div>
      {jobs.map((job) => {
        const jobId = job.Id ?? job.id;

        return (
          <div key={jobId}>
            <p><b>Company:</b> {job.company}</p>
            <p><b>Position:</b> {job.position}</p>
            <p><b>Status:</b> {job.status}</p>

            <button onClick={() => onDelete(jobId)}>
              Delete
            </button>

           <button onClick={() => {
  console.log("EDIT CLICKED", job);
  onEdit(job);
}}>
  Edit
</button>

            <hr />
          </div>
        );
      })}
    </div>
  );
}

export default JobList;