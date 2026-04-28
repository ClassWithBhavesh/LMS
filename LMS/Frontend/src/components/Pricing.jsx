import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Pricing() {
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
          Pricing 💰
        </h1>

        <p style={{ color: "#8b87a8", marginBottom: "2rem", lineHeight: 1.7 }}>
          Choose a plan that fits your learning journey.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "1.5rem" }}>

          <div style={{ padding: "1.5rem", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px" }}>
            <h3>Free</h3>
            <p style={{ color: "#8b87a8" }}>₹0/month</p>
          </div>

          <div style={{ padding: "1.5rem", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px" }}>
            <h3>Pro</h3>
            <p style={{ color: "#8b87a8" }}>₹499/month</p>
          </div>

          <div style={{ padding: "1.5rem", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px" }}>
            <h3>Premium</h3>
            <p style={{ color: "#8b87a8" }}>₹999/month</p>
          </div>

        </div>

      </div>
    </section>
  );
}