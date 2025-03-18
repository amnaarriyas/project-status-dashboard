"use client"; // Ensures this component runs in the client-side environment (Next.js feature)

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";

// Define the structure of a Project object
interface Project {
  projectId: string;
  ProjectName: string;
  StartDate: string;
  EndDate: string;
  Status: string;
  Venue: string;
  CompanyLogoURL: string;
  DesignImageURL: string;
  VenueCountry: string;
  VenueHallNumber: string;
  VenueStandNumber: string;
  TotalSqMtr: string;
  VenueCity: string;
}

export default function ProjectDetailsPage() {
  const { projectId } = useParams(); // Get projectId from URL parameters
  const router = useRouter(); // Get router instance for navigation
  
  // State hooks for project details, list of projects, search functionality
  const [project, setProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);

  // Fetch all projects on component mount
  useEffect(() => {
    fetch("/data/projects.json")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
      })
      .catch((error) => console.error("Error fetching projects:", error)); // Handle fetch errors
  }, []);

  // Update the project details when projectId or projects list changes
  useEffect(() => {
    if (projectId) {
      const foundProject = projects.find((p) => p.projectId === projectId);
      setProject(foundProject || null);
    }
  }, [projectId, projects]);

  // Filter projects based on search input
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredProjects([]); // Reset search results when input is cleared
    } else {
      const results = projects.filter((p) =>
        p.ProjectName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProjects(results);
    }
  }, [searchTerm, projects]);

  // Handle project selection from search results
  const handleSelectProject = (selectedProjectId: string) => {
    setSearchTerm(""); // Clear search input
    setFilteredProjects([]); // Hide dropdown suggestions
    router.push(`/projects/${selectedProjectId}`); // Navigate to selected project page
  };

  // Show a loading state while project data is being fetched
  if (!project) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <div className="container mt-5">
      {/* 🔍 Search Bar */}
      <div className="d-flex justify-content-end mb-3 position-relative">
        <div className="input-group" style={{ maxWidth: "350px" }}>
          <span className="input-group-text">
            <Search size={18} />
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search other projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* 🔽 Search Suggestions Dropdown */}
        {filteredProjects.length > 0 && (
          <ul className="list-group position-absolute bg-white shadow mt-1" style={{ width: "100%", zIndex: 1000 }}>
            {filteredProjects.map((p) => (
              <li
                key={p.projectId}
                className="list-group-item list-group-item-action"
                onClick={() => handleSelectProject(p.projectId)}
                style={{ cursor: "pointer" }}
              >
                {p.ProjectName}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Project Title */}
      <h2 className="mb-4 fw-bold">{project.ProjectName}</h2>

      {/* Project Info Section */}
      <div className="card p-4 mb-4 shadow-sm">
        <div className="row align-items-center">
          {/* Company Logo */}
          <div className="col-md-3 text-center">
            <img
              src={project.CompanyLogoURL}
              alt="Company Logo"
              className="img-fluid rounded-circle"
              style={{ maxWidth: "120px" }}
            />
          </div>
          {/* Project Details */}
          <div className="col-md-9">
            <div className="row">
              <div className="col-md-6">
                <p><strong>Start Date:</strong> {project.StartDate}</p>
                <p><strong>End Date:</strong> {project.EndDate}</p>
                <p><strong>Venue Name:</strong> {project.Venue}</p>
              </div>
              <div className="col-md-6">
                <p><strong>Venue Country:</strong> {project.VenueCountry}</p>
                <p><strong>Venue City:</strong> {project.VenueCity}</p>
                <p><strong>Total Sq. Mtr:</strong> {project.TotalSqMtr}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Design Image */}
      <div className="text-center">
        <img
          src={project.DesignImageURL}
          alt="Project Design"
          className="img-fluid shadow-sm"
          style={{ maxWidth: "100%", borderRadius: "10px" }}
        />
      </div>
    </div>
  );
}
