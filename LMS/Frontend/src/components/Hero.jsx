import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const subRef   = useRef(null);
  const btnsRef  = useRef(null);
  const statsRef = useRef(null);
  const navigate = useNavigate();

  const orbs = [
    { w: 400, h: 400, bg: "rgba(79,70,229,0.12)",   top: "-10%",  left: "-5%",   delay: "0s" },
    { w: 300, h: 300, bg: "rgba(124,58,237,0.1)",   bottom: "10%", right: "5%",  delay: "3s" },
    { w: 200, h: 200, bg: "rgba(192,132,252,0.08)", top: "40%",   left: "60%",   delay: "5s" },
  ];

  const stats = [
    ["50K+", "Active Students"],
    ["200+", "Expert Courses"],
    ["95%",  "Completion Rate"],
    ["4.9★", "Average Rating"],
  ];

  useEffect(() => {
    const els = [badgeRef, titleRef, subRef, btnsRef, statsRef].map(r => r.current);
    gsap.set(els, { opacity: 1, y: 0 });

    const tl = gsap.timeline({ delay: 0.1 });
    tl.from(badgeRef.current, { y: 20, opacity: 0, duration: 0.6, ease: "power3.out" })
      .from(titleRef.current, { y: 40, opacity: 0, duration: 0.7, ease: "power3.out" }, "-=0.3")
      .from(subRef.current,   { y: 25, opacity: 0, duration: 0.6, ease: "power3.out" }, "-=0.4")
      .from(btnsRef.current,  { y: 20, opacity: 0, duration: 0.6, ease: "power3.out" }, "-=0.3")
      .from(statsRef.current, { opacity: 0,         duration: 0.6, ease: "power2.out" }, "-=0.2");

    return () => tl.kill();
  }, []);

  return (
    <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", padding: "6rem 1.5rem 4rem" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% 0%,rgba(79,70,229,0.15) 0%,transparent 60%),radial-gradient(ellipse 40% 40% at 80% 80%,rgba(124,58,237,0.1) 0%,transparent 60%)" }} />

      {orbs.map((orb, i) => (
        <div key={i} style={{ position: "absolute", borderRadius: "50%", filter: "blur(80px)", animation: "float 8s ease-in-out infinite", animationDelay: orb.delay, width: orb.w, height: orb.h, background: orb.bg, top: orb.top, left: orb.left, bottom: orb.bottom, right: orb.right }} />
      ))}

      <div style={{ position: "relative", textAlign: "center", maxWidth: 860, width: "100%", zIndex: 2 }}>
        <div ref={badgeRef} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.4rem 1rem", borderRadius: 50, border: "1px solid rgba(129,140,248,0.3)", background: "rgba(79,70,229,0.1)", color: "#a5b4fc", fontSize: "0.8rem", fontWeight: 500, marginBottom: "1.5rem" }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#818cf8", animation: "pulse 2s infinite", display: "inline-block" }} />
          10,000+ learners enrolled this month
        </div>

        <h1 ref={titleRef} style={{fontSize: "clamp(2.2rem,7vw,5.5rem)", fontWeight: 900, lineHeight: 1.08, marginBottom: "1.5rem" }}>
          Upgrade Your Skills with<br />
          <span style={{ background: "linear-gradient(135deg,#818cf8 0%,#c084fc 50%,#f472b6 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Industry-Level
          </span>{" "}Courses
        </h1>

        <p ref={subRef} style={{ fontSize: "clamp(0.95rem,2.5vw,1.1rem)", color: "#8b87a8", maxWidth: 580, margin: "0 auto 2.5rem", lineHeight: 1.7 }}>
          Expert-led courses designed to take you from beginner to pro. Learn at your pace, build real projects, and land your dream role.
        </p>

        <div ref={btnsRef} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
          <button onClick={() => {
    const section = document.getElementById("courses");
    section?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }}style={{ padding: "0.8rem 2rem", borderRadius: 10, fontFamily: "inherit", fontSize: "0.95rem", fontWeight: 600, cursor: "pointer", background: "linear-gradient(135deg,#4f46e5,#7c3aed)", border: "none", color: "#fff" }}>
            Explore Courses →
          </button>
          <button style={{ padding: "0.8rem 2rem", borderRadius: 10, fontFamily: "inherit", fontSize: "0.95rem", fontWeight: 600, cursor: "pointer", background: "transparent", border: "1px solid rgba(255,255,255,0.12)", color: "#8b87a8" }}>
            Become an Instructor
          </button>
        </div>

        <div ref={statsRef} className="hero-stats" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "2.5rem", marginTop: "3.5rem", paddingTop: "3rem", borderTop: "1px solid rgba(255,255,255,0.07)", flexWrap: "wrap" }}>
          {stats.map(([num, label]) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{fontSize: "clamp(1.5rem,3vw,2rem)", fontWeight: 700, color: "#f1f0ff" }}>{num}</div>
              <div style={{fontSize: "0.8rem", color: "#8b87a8", marginTop: 2 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
