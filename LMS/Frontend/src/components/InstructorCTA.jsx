import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const AVATARS = [
  { initials: "AK", grad: "linear-gradient(135deg,#4f46e5,#7c3aed)" },
  { initials: "SR", grad: "linear-gradient(135deg,#7c3aed,#c084fc)" },
  { initials: "MJ", grad: "linear-gradient(135deg,#6d28d9,#4f46e5)" },
  { initials: "+",  grad: "linear-gradient(135deg,#c084fc,#f472b6)" },
];

const PERKS = [
  "Keep up to 97% of your course revenue",
  "Powerful course creation tools included",
  "Access to 50,000+ engaged learners",
  "Dedicated instructor success team",
];

export default function InstructorCTA() {
  const textRef   = useRef(null);
  const visualRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textRef.current, {
        x: -50, opacity: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: textRef.current, start: "top 78%" },
      });
      gsap.from(visualRef.current, {
        x: 50, opacity: 0, duration: 0.8, delay: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: visualRef.current, start: "top 78%" },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section style={{ padding: "6rem 2rem", background: "#12121f", overflow: "hidden" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="cta-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>

          <div ref={textRef}>
            <span style={{ display: "inline-block", padding: "0.3rem 0.8rem", background: "rgba(79,70,229,0.15)", border: "1px solid rgba(79,70,229,0.3)", borderRadius: 6, fontSize: "0.75rem", fontWeight: 600, color: "#a5b4fc", marginBottom: "1rem" }}>For Educators</span>
            <h2 style={{fontSize: "clamp(1.8rem,3.5vw,2.4rem)", fontWeight: 700, lineHeight: 1.2, marginBottom: "1rem" }}>
              Become an<br />
              <span style={{ background: "linear-gradient(135deg,#818cf8,#c084fc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Instructor</span>
            </h2>
            <p style={{ color: "#8b87a8", lineHeight: 1.7, marginBottom: "1.75rem" }}>
              Join 1,200+ instructors sharing their expertise on EduVerse. Turn your knowledge into income and impact thousands of learners worldwide.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "2rem" }}>
              {PERKS.map((perk) => (
                <div key={perk} style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.9rem", color: "#8b87a8" }}>
                  <div style={{ width: 18, height: 18, borderRadius: "50%", background: "rgba(79,70,229,0.2)", border: "1px solid rgba(79,70,229,0.4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, flexShrink: 0, color: "#818cf8" }}>✓</div>
                  {perk}
                </div>
              ))}
            </div>
            <button style={{ padding: "0.8rem 2rem", borderRadius: 10, fontFamily: "inherit", fontSize: "0.95rem", fontWeight: 600, cursor: "pointer", background: "linear-gradient(135deg,#4f46e5,#7c3aed)", border: "none", color: "#fff" }}>
              Start Teaching Today →
            </button>
          </div>

          <div ref={visualRef} className="cta-visual">
            <div style={{ background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: "2rem", textAlign: "center" }}>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.5rem" }}>
                {AVATARS.map((a, i) => (
                  <div key={i} style={{ width: 56, height: 56, borderRadius: "50%", border: "3px solid #12121f", marginLeft: i === 0 ? 0 : -12, background: a.grad, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "1.1rem", color: "#fff", flexShrink: 0 }}>
                    {a.initials}
                  </div>
                ))}
              </div>
              <div style={{fontSize: "2.5rem", fontWeight: 700, color: "#818cf8" }}>1,200+</div>
              <div style={{ color: "#8b87a8", fontSize: "0.85rem", marginTop: "0.25rem" }}>Active Instructors</div>
              <div style={{ height: 1, background: "rgba(255,255,255,0.07)", margin: "1.5rem 0" }} />
              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 1rem", background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: 8, color: "#f59e0b", fontSize: "0.85rem", fontWeight: 600 }}>
                💰 Avg. $4,800/month earned
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
