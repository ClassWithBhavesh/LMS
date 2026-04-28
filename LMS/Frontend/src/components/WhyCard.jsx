import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function WhyCard({ icon, bg, title, desc, index = 0 }) {
  const cardRef = useRef(null);
  const iconRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        y: 40, opacity: 0, duration: 0.6,
        delay: index * 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });
    });
    return () => ctx.revert();
  }, [index]);

  const handleMouseEnter = () => {
    gsap.to(cardRef.current, { y: -4, duration: 0.3, ease: "power2.out" });
    gsap.to(iconRef.current, { scale: 1.15, rotation: 5, duration: 0.3, ease: "back.out(1.7)" });
  };
  const handleMouseLeave = () => {
    gsap.to(cardRef.current, { y: 0, duration: 0.3, ease: "power2.out" });
    gsap.to(iconRef.current, { scale: 1, rotation: 0, duration: 0.3, ease: "power2.out" });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        background: "rgba(255,255,255,0.035)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 16, padding: "1.75rem", cursor: "default",
        transition: "border-color 0.3s",
      }}
    >
      <div ref={iconRef} style={{ width: 48, height: 48, borderRadius: 12, background: bg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem", fontSize: "1.4rem", display: "inline-flex" }}>
        {icon}
      </div>
      <div style={{ fontWeight: 600, fontSize: "1rem", marginBottom: "0.5rem" }}>{title}</div>
      <div style={{ color: "#8b87a8", fontSize: "0.875rem", lineHeight: 1.65 }}>{desc}</div>
    </div>
  );
}
