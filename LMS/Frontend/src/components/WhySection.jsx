import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WhyCard from "./WhyCard";
import { WHY_CARDS } from "../data";

gsap.registerPlugin(ScrollTrigger);

export default function WhySection() {
  const headingRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 30, opacity: 0, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section style={{ padding: "6rem 2rem", background: "#0a0a12" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <div ref={headingRef} style={{ textAlign: "center", maxWidth: 560, margin: "0 auto 3rem" }}>
          <p style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "#818cf8", fontWeight: 600, marginBottom: "0.75rem" }}>
            Why EduVerse
          </p>
          <h2 style={{fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 700, lineHeight: 1.2, marginBottom: "1rem" }}>
            Everything you need to{" "}
            <span style={{ background: "linear-gradient(135deg,#818cf8,#c084fc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>succeed</span>
          </h2>
          <p style={{ color: "#8b87a8", fontSize: "1rem", lineHeight: 1.7, margin: "0 auto" }}>
            We've built the platform learners deserve — modern, focused, and results-driven.
          </p>
        </div>

        {/* Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: "1.5rem" }}>
          {WHY_CARDS.map((card, i) => (
            <WhyCard key={card.title} {...card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
