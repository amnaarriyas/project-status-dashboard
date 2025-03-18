"use client"; // Ensures this component runs on the client side in Next.js

import { useState, useEffect } from "react"; // Import React hooks
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap for styling
import { BarChart, CheckCircle, Clock, FileText } from "lucide-react"; // Import icons from lucide-react

// Define the Project interface to enforce type safety for project objects
interface Project {
  projectId: string;
  Status: string;
}

export default function HomePage() {
  // State to hold project data
  const [projects, setProjects] = useState<Project[]>([]);

  // State to track counts of different project statuses
  const [statusCounts, setStatusCounts] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    submitted: 0,
    confirmed: 0,
  });

  // Fetch project data from a local JSON file when the component mounts
  useEffect(() => {
    fetch("/data/projects.json") // Fetch the project data
      .then((res) => res.json()) // Parse JSON response
      .then((data) => {
        setProjects(data); // Update projects state
        calculateStatusCounts(data); // Compute status counts
      })
      .catch((err) => console.error("Error fetching projects:", err)); // Handle fetch errors
  }, []); // Empty dependency array ensures this runs only once on mount

  // Function to calculate the count of projects based on their status
  const calculateStatusCounts = (data: Project[]) => {
    const total = data.length;
    const pending = data.filter((p) => p.Status === "Pending").length;
    const approved = data.filter((p) => p.Status === "Admin Approved").length;
    const submitted = data.filter((p) => p.Status === "Design Submitted").length;
    const confirmed = data.filter((p) => p.Status === "Project Confirmed").length;
    setStatusCounts({ total, pending, approved, submitted, confirmed });
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Dashboard</h2>

      {/* Key Stats Overview - Displays total, ongoing, submitted, and confirmed projects */}
      <div className="row g-3">
        <div className="col-md-3">
          <div className="card shadow-sm p-3 text-center">
            <FileText size={40} className="text-primary mb-2" /> {/* Icon for total projects */}
            <h5>Total Projects</h5>
            <h3>{statusCounts.total}</h3> {/* Display total count */}
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm p-3 text-center">
            <Clock size={40} className="text-warning mb-2" /> {/* Icon for ongoing projects */}
            <h5>Ongoing Projects</h5>
            <h3>{statusCounts.pending + statusCounts.approved}</h3> {/* Pending + approved projects */}
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm p-3 text-center">
            <CheckCircle size={40} className="text-success mb-2" /> {/* Icon for submitted projects */}
            <h5>Submitted Projects</h5>
            <h3>{statusCounts.submitted}</h3> {/* Display submitted count */}
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm p-3 text-center">
            <CheckCircle size={40} className="text-info mb-2" /> {/* Icon for confirmed projects */}
            <h5>Confirmed Projects</h5>
            <h3>{statusCounts.confirmed}</h3> {/* Display confirmed count */}
          </div>
        </div>
      </div>

      {/* Status Progress Bars - Visual representation of project status distribution */}
      <div className="card shadow-sm mt-4 p-4">
        <h4 className="mb-3">
          <BarChart size={24} className="me-2" />Project Status Overview
        </h4>

        {/* Pending Projects Progress Bar */}
        <div className="mb-3">
          <p>Pending</p>
          <div className="progress">
            <div
              className="progress-bar bg-warning"
              style={{ width: `${(statusCounts.pending / statusCounts.total) * 100 || 0}%` }}
            >
              {statusCounts.pending}
            </div>
          </div>
        </div>

        {/* Admin Approved Projects Progress Bar */}
        <div className="mb-3">
          <p>Admin Approved</p>
          <div className="progress">
            <div
              className="progress-bar bg-primary"
              style={{ width: `${(statusCounts.approved / statusCounts.total) * 100 || 0}%` }}
            >
              {statusCounts.approved}
            </div>
          </div>
        </div>

        {/* Submitted Projects Progress Bar */}
        <div className="mb-3">
          <p>Submitted</p>
          <div className="progress">
            <div
              className="progress-bar bg-success"
              style={{ width: `${(statusCounts.submitted / statusCounts.total) * 100 || 0}%` }}
            >
              {statusCounts.submitted}
            </div>
          </div>
        </div>

        {/* Confirmed Projects Progress Bar */}
        <div className="mb-3">
          <p>Confirmed</p>
          <div className="progress">
            <div
              className="progress-bar bg-info"
              style={{ width: `${(statusCounts.confirmed / statusCounts.total) * 100 || 0}%` }}
            >
              {statusCounts.confirmed}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
