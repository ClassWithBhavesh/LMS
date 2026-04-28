import { useEffect, useRef } from "react";
import gsap from "gsap";


export default function Aboutus() {
  const pageRef = useRef(null);

  useEffect(() => {
    gsap.from(pageRef.current, {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: "power3.out",
    });
  }, []);

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
          About EduVerse 🚀
        </h1>

        <p style={{ color: "#8b87a8", marginBottom: "2rem", lineHeight: 1.7 }}>
          EduVerse is a modern learning platform designed to help students and professionals
          build real-world skills. Our mission is to make high-quality education accessible,
          practical, and engaging for everyone.
        </p>

        {/* Mission */}
        <div style={{ marginBottom: "3rem" }}>
          <h2 style={{ marginBottom: "1rem" }}>Our Mission</h2>
          <p style={{ color: "#8b87a8", lineHeight: 1.7 }}>
            We aim to bridge the gap between traditional education and industry needs by
            providing hands-on learning experiences. Our courses are designed by experts
            and focused on real-world applications.
          </p>
        </div>

        {/* Vision */}
        <div style={{ marginBottom: "3rem" }}>
          <h2 style={{ marginBottom: "1rem" }}>Our Vision</h2>
          <p style={{ color: "#8b87a8", lineHeight: 1.7 }}>
            To become a global platform where learners can grow their skills, build their
            careers, and achieve their goals with confidence.
          </p>
        </div>

        {/* Stats */}
        <div style={{ marginBottom: "3rem" }}>
          <h2 style={{ marginBottom: "1.5rem" }}>Our Impact</h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "1.5rem" }}>
            <div style={{ padding: "1.5rem", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px" }}>
              <h3>200+</h3>
              <p style={{ color: "#8b87a8" }}>Courses</p>
            </div>

            <div style={{ padding: "1.5rem", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px" }}>
              <h3>50K+</h3>
              <p style={{ color: "#8b87a8" }}>Students</p>
            </div>

            <div style={{ padding: "1.5rem", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px" }}>
              <h3>100+</h3>
              <p style={{ color: "#8b87a8" }}>Instructors</p>
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="group relative">


          <h2 style={{ marginBottom: "1.5rem" }}>Our Team</h2>

          <p style={{ color: "#8b87a8", marginBottom: "1.5rem", lineHeight: 1.7 }}>
            Our team consists of passionate developers, designers, and educators who are
            dedicated to building the best learning experience for you.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "1.5rem" }}>
            
            <div style={{ padding: "1rem", borderRadius: "12px", background: "rgba(255,255,255,0.03)", textAlign: "center" }}>
              <div style={{ fontSize: "2rem" }}>👨‍💻</div>
              <h4>Frontend Team</h4>
            </div>

            <div style={{ padding: "1rem", borderRadius: "12px", background: "rgba(255,255,255,0.03)", textAlign: "center" }}>
              <div style={{ fontSize: "2rem" }}>🛠️</div>
              <h4>Backend Team</h4>
            </div>

            <div style={{ padding: "1rem", borderRadius: "12px", background: "rgba(255,255,255,0.03)", textAlign: "center" }}>
              <div style={{ fontSize: "2rem" }}>🎨</div>
              <h4>Design Team</h4>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}