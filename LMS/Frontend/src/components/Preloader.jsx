import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

export default function Preloader({ onDone }) {
  const [progress, setProgress] = useState(0);
  const logoRef = useRef(null);
  const ringRef = useRef(null);
  const barRef  = useRef(null);
  const preRef  = useRef(null);

  useEffect(() => {
    // Entrance sequence
    const tl = gsap.timeline();
    tl.from(logoRef.current, { opacity: 0, y: 20, duration: 0.6, ease: "power3.out" })
      .from(ringRef.current, { opacity: 0, scale: 0.6, duration: 0.4, ease: "back.out(1.7)" }, "-=0.2")
      .from(barRef.current,  { opacity: 0, scaleX: 0, duration: 0.3, transformOrigin: "left" }, "-=0.1");

    // Progress fill
    const iv = setInterval(() => {
      setProgress((p) => {
        if (p >= 95) { clearInterval(iv); return 95; }
        return Math.min(p + Math.random() * 20, 95);
      });
    }, 200);

    // Exit
    const t = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        gsap.to(preRef.current, {
          opacity: 0, y: -20, duration: 0.5, ease: "power2.in",
          onComplete: onDone,
        });
      }, 400);
    }, 1800);

    return () => { clearInterval(iv); clearTimeout(t); };
  }, [onDone]);

  return (
    <div ref={preRef} style={{
      position: "fixed", inset: 0, background: "#0a0a12", zIndex: 9999,
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", gap: "2rem",
    }}>
      <div ref={logoRef} style={{
        fontSize: "2.5rem", fontWeight: 900,
        background: "linear-gradient(135deg,#818cf8,#a78bfa,#c084fc)",
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
      }}>
        EduVerse
      </div>

      <div ref={ringRef} style={{
        width: 60, height: 60, borderRadius: "50%",
        border: "2px solid rgba(129,140,248,0.2)", borderTopColor: "#818cf8",
        animation: "spin 1s linear infinite",
      }} />

      <div ref={barRef} style={{ width: 200, height: 2, background: "rgba(255,255,255,0.08)", borderRadius: 2, overflow: "hidden" }}>
        <div style={{
          height: "100%", background: "linear-gradient(90deg,#818cf8,#c084fc)",
          width: `${progress}%`, transition: "width 0.3s ease",
        }} />
      </div>
    </div>
  );
}
