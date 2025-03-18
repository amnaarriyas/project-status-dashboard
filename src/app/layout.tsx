import Sidebar from "./projects/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        <div className="d-flex">
          <Sidebar />
          <div className="container-fluid p-4" style={{ marginLeft: "152px" }}>
            {children} {/* This renders the current page */}
          </div>
        </div>
      </body>
    </html>
  );
}
