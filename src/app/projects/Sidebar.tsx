"use client"; // Enables React Server Components in Next.js to be interactive on the client side.

import Link from "next/link"; // Importing Link for client-side navigation.
import {
  Home as LucideHome, // Importing icons from Lucide for UI elements.
  HardHat as LucideHardHat,
  ClipboardList as LucideClipboardList,
  Users as LucideUsers,
} from "lucide-react";

import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap for styling.
import "./custom.css"; // Import custom CSS for additional styling.

export default function Sidebar() {
  // Define navigation items for the sidebar with names, icons, and paths.
  const navItems = [
    { name: "Explore", icon: <LucideHome size={20} />, path: "/" },
    { name: "Contractors", icon: <LucideHardHat size={20} />, path: "/contractors" },
    { name: "Projects", icon: <LucideClipboardList size={20} />, path: "/projects" },
    { name: "Users", icon: <LucideUsers size={20} />, path: "/users" },
  ];

  return (
    <div
      className="d-flex flex-column align-items-center text-white position-fixed"
      style={{
        padding: "24px 8px",
        gap: "24px",
        width: "136px",
        height: "97.5vh",
        left: "8px",
        top: "8px",
        backgroundColor: "#0B083E",
        borderRadius: "16px",
      }}
    >
      {/* Sidebar Logo */}
      <h5 className="mb-4">
        Logo<span style={{ color: "#5d5df0" }}>.</span>
      </h5>

      {/* Navigation List */}
      <ul className="nav flex-column text-center w-100">
        {navItems.map((item) => (
          <li key={item.name} className="nav-item my-3 w-100">
            {/* Navigation Links */}
            <Link
              href={item.path}
              className="nav-link d-flex flex-column align-items-center text-white"
              style={{ fontSize: "12px", textDecoration: "none" }}
            >
              {/* Icon Container */}
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                }}
              >
                {item.icon}
              </div>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
