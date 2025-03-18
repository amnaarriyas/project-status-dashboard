"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // ✅ Next.js router
import "bootstrap/dist/css/bootstrap.min.css";
import "./custom.css"; // ✅ Ensure the file exists
import { Search } from "lucide-react";

// Interface defining the structure of a project object
interface Project {
  projectId: string;
  ProjectName: string;
  StartDate: string;
  EndDate: string;
  Status: string;
  Venue: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]); // State to store project data
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [currentPage, setCurrentPage] = useState(1); // State for pagination
  const projectsPerPage = 9; // Number of projects per page
  const router = useRouter(); // ✅ Next.js navigation

  useEffect(() => {
    // Fetch projects from local JSON file
    fetch("/data/projects.json") // ✅ Ensure this is in `public/data/projects.json`
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch projects");
        return res.json();
      })
      .then((data) => setProjects(data))
      .catch((err) => console.error("Error fetching projects:", err));
  }, []);

  // ✅ Filter projects based on name, location, status, and dates
  const filteredProjects = projects.filter((project) =>
    [project.ProjectName, project.Venue, project.Status, project.StartDate, project.EndDate]
      .some((field) =>
        field.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * projectsPerPage,
    currentPage * projectsPerPage
  );

  // Function to handle project click and navigate to details page
  const handleProjectClick = (projectId: string) => {
    router.push(`/projects/${projectId}`); // ✅ Navigate to dynamic project detail page
  };

  return (
    <div>
      {/* Header + Search */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Projects</h2>
        <div className="input-group rounded-search-bar" style={{ maxWidth: "400px" }}>
          <span className="input-group-text">
            <Search size={18} className="search-icon" />
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search by name, location, status, or date..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Project Table */}
      {filteredProjects.length > 0 ? (
        <div className="table-responsive shadow-sm rounded p-3">
          <table className="table table-hover">
            <thead className="rounded-table-header">
              <tr>
                <th>Name</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
                <th>Venue</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProjects.map((project) => (
                <tr
                  key={project.projectId}
                  onClick={() => handleProjectClick(project.projectId)}
                  style={{ cursor: "pointer" }}
                >
                  <td>{project.ProjectName}</td>
                  <td>{project.StartDate}</td>
                  <td>{project.EndDate}</td>
                  <td>
                    <span
                      className={`badge custom-badge ${
                        project.Status === "Pending"
                          ? "status-pending"
                          : project.Status === "Design Submitted"
                          ? "status-design-submitted"
                          : project.Status === "Admin Approved"
                          ? "status-admin-approved"
                          : project.Status === "Project Confirmed"
                          ? "status-project-confirmed"
                          : "status-default"
                      }`}
                    >
                      {project.Status}
                    </span>
                  </td>
                  <td>{project.Venue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-muted text-center">No projects found.</p>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="d-flex flex-wrap justify-content-between align-items-center mt-3">
          <span className="text-muted">
            Showing <strong>{paginatedProjects.length}</strong> of <strong>{filteredProjects.length}</strong> entries
          </span>
          <ul className="pagination mb-0 ms-auto" style={{ height: "38px" }}>
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => setCurrentPage(1)}>«</button>
            </li>
            {Array.from({ length: totalPages }, (_, i) => (
              <li key={i} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
                <button className="page-link" onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => setCurrentPage(totalPages)}>»</button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
