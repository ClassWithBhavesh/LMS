import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MOCK_TESTI } from "../data";

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const [activeIdx, setActiveIdx] = useState(1);
  const headingRef = useRef(null);
  const gridRef    = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 30, opacity: 0, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
      });
      gsap.from(".testi-card-item", {
        y: 40, opacity: 0, duration: 0.6, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: gridRef.current, start: "top 85%" },
      });
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const iv = setInterval(() => setActiveIdx((i) => (i + 1) % MOCK_TESTI.length), 3500);
    return () => clearInterval(iv);
  }, []);

  return (
    <section style={{ padding: "6rem 2rem", background: "#0a0a12" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div ref={headingRef} style={{ textAlign: "center", maxWidth: 560, margin: "0 auto 3rem" }}>
          <p style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "#818cf8", fontWeight: 600, marginBottom: "0.75rem" }}>Testimonials</p>
          <h2 style={{fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 700, lineHeight: 1.2 }}>
            What our learners{" "}
            <span style={{ background: "linear-gradient(135deg,#818cf8,#c084fc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>say</span>
          </h2>
        </div>

        <div ref={gridRef} className="testi-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.5rem" }}>
          {MOCK_TESTI.map((t, i) => (
            <div key={t.name} className="testi-card-item" style={{
              background: "rgba(255,255,255,0.035)",
              border: `1px solid ${i === activeIdx ? "rgba(129,140,248,0.3)" : "rgba(255,255,255,0.07)"}`,
              borderRadius: 16, padding: "1.75rem",
              transform: i === activeIdx ? "translateY(-4px)" : "translateY(0)",
              transition: "border-color 0.4s, transform 0.4s",
            }}>
              <div style={{ fontSize: "2.5rem", lineHeight: 1, color: "rgba(129,140,248,0.2)", fontFamily: "serif", marginBottom: "0.5rem" }}>"</div>
              <p style={{ fontSize: "0.9rem", color: "#8b87a8", lineHeight: 1.7, marginBottom: "1.25rem" }}>{t.text}</p>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: `linear-gradient(135deg,${t.color},${t.color}cc)`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "0.9rem", color: "#fff", flexShrink: 0 }}>{t.initials}</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>{t.name}</div>
                  <div style={{ fontSize: "0.75rem", color: "#8b87a8" }}>{t.role}</div>
                  <div style={{ color: "#f59e0b", fontSize: "0.75rem", marginTop: 3 }}>{"★".repeat(t.rating)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
