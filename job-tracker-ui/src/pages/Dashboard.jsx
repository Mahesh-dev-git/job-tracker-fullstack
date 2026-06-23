
import "./Dashboard.css";
import { useEffect, useState } from "react";
import API from "../services/api";
import JobForm from "../components/JobForm";
import JobList from "../components/JobList";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [editJob, setEditJob] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, [search, statusFilter, page]);

 const fetchJobs = async () => {
  try {
    const res = await API.get(`/jobs?search=${search}&status=${statusFilter}&page=${page}&pageSize=${pageSize}`);

    console.log("FULL RESPONSE:", res.data); // ADD THIS

    setJobs(res.data);
  } catch (error) {
    console.error(error);
  }
};

 const createJob = async (jobData) => {
  try {
    if (editJob) {
      await updateJob(editJob.id, jobData);
      setEditJob(null); 
    } else {
      await API.post("/jobs", jobData);
    }

    fetchJobs();
  } catch (error) {
    console.error(error);
    alert("Failed");
  }
};

  const deleteJob = async (Id) => {
  try {
    await API.delete(`/jobs/${Id}`);
    fetchJobs(); // refresh list
  } catch (error) {
   console.error("FULL ERROR:", error);
console.error("RESPONSE:", error.response);

alert(
  error.response?.data?.message || 
  JSON.stringify(error.response?.data) || 
  "Delete failed"
);
  }
};

const handleEdit = (job) => {
  console.log("HANDLE EDIT:", job);
  setEditJob(job);
};

const updateJob = async (id, jobData) => {
  try {
    await API.put(`/jobs/${id}`, jobData);
    fetchJobs();
  } catch (error) {
    console.error(error);
    alert("Update failed");
  }
};

const handleLogout = () => {
  localStorage.removeItem("token");
  navigate("/");
};

  


  return (
    <div className="dashboard-page">
      <nav className="dashboard-navbar">
        <h1 className="navbar-title">Job Tracker</h1>
        <button className="navbar-logout-btn" onClick={handleLogout}>Logout</button>
        <div className="navbar-avatar"></div>
      </nav>
      <div className="dashboard-container">
        <div className="dashboard-grid">
          <aside className="dashboard-sidebar">
            <JobForm 
              onCreate={createJob}
              editJob={editJob}
              onUpdate={updateJob}
            />
          </aside>
          <main className="dashboard-main">
             <div className="filters">
  <input
    type="text"
    placeholder="Search jobs..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />

  <select
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value)}
  >
    <option value="">All</option>
    <option value="Applied">Applied</option>
    <option value="Interview">Interview</option>
    <option value="Rejected">Rejected</option>
    <option value="Active">Active</option>
  </select>
</div>

            <JobList 
              jobs={jobs} 
              onDelete={deleteJob} 
              onEdit={handleEdit}
              
            />
            <div className="pagination">
  <button
    onClick={() => setPage(page - 1)}
    disabled={page === 1}
  >
    Prev
  </button>

  <span>Page {page}</span>

  <button onClick={() => setPage(page + 1)}>
    Next
  </button>
</div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;