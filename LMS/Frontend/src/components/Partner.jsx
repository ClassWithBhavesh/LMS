import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Partners() {
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
    <section ref={pageRef} style={{ padding: "6rem 2rem", minHeight: "100vh", background: "#12121f" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>

        <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
          Our Partners 🤝
        </h1>

        <p style={{ color: "#8b87a8", marginBottom: "2rem", lineHeight: 1.7 }}>
          We collaborate with industry leaders.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "1.5rem" }}>

          <div style={{ padding: "1.5rem", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px" }}>
            <h3>Google</h3>
          </div>

          <div style={{ padding: "1.5rem", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px" }}>
            <h3>Microsoft</h3>
          </div>

          <div style={{ padding: "1.5rem", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px" }}>
            <h3>Amazon</h3>
          </div>

        </div>

      </div>
    </section>
  );
}