
import "./Dashboard.css";
import { useEffect, useState } from "react";
import API from "../services/api";
import JobForm from "../components/JobForm";
import JobList from "../components/JobList";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [editJob, setEditJob] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, []);

 const fetchJobs = async () => {
  try {
    const res = await API.get("/jobs");

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
        <button onClick={handleLogout}> Logout</button>
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
            <JobList 
              jobs={jobs} 
              onDelete={deleteJob} 
              onEdit={handleEdit}
            />
          </main>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;