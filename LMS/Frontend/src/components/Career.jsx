import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Careers() {
  const pageRef = useRef(null);

  useEffect(() => {
    gsap.from(pageRef.current, {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: "power3.out",
    });
  }, []);

  const jobs = [
    {
      title: "Frontend Developer",
      location: "Remote",
      type: "Full-time",
    },
    {
      title: "Backend Developer",
      location: "Remote",
      type: "Full-time",
    },
    {
      title: "UI/UX Designer",
      location: "Remote",
      type: "Contract",
    },
  ];

  return (
    <section
      ref={pageRef}
      style={{
        padding: "6rem 2rem",
        minHeight: "100vh",
        background: "#12121f",
      }}
    >
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        
        {/* Heading */}
        <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
          Careers at EduVerse 🚀
        </h1>

        <p style={{ color: "#8b87a8", marginBottom: "2rem", lineHeight: 1.7 }}>
          Join our team and help us build the future of online learning.
          We are always looking for passionate people who love to learn,
          build, and grow.
        </p>

        {/* Why Join */}
        <div style={{ marginBottom: "3rem" }}>
          <h2 style={{ marginBottom: "1rem" }}>Why Join Us?</h2>
          <ul style={{ color: "#8b87a8", lineHeight: 1.8 }}>
            <li>✨ Work on real-world impactful products</li>
            <li>🌍 Remote-friendly culture</li>
            <li>📈 Growth and learning opportunities</li>
            <li>🤝 Supportive and collaborative team</li>
          </ul>
        </div>

        {/* Job Listings */}
        <div>
          <h2 style={{ marginBottom: "1.5rem" }}>Open Positions</h2>

          <div style={{ display: "grid", gap: "1.5rem" }}>
            {jobs.map((job, index) => (
              <div
                key={index}
                style={{
                  padding: "1.5rem",
                  borderRadius: "12px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(255,255,255,0.03)",
                }}
              >
                <h3 style={{ marginBottom: "0.5rem" }}>{job.title}</h3>
                <p style={{ color: "#8b87a8", fontSize: "0.9rem" }}>
                  {job.location} • {job.type}
                </p>

                <button
                  style={{
                    marginTop: "1rem",
                    padding: "0.5rem 1rem",
                    borderRadius: "8px",
                    border: "none",
                    background: "#818cf8",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                >
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}