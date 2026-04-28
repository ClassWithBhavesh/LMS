import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BRANDS } from "../data";

gsap.registerPlugin(ScrollTrigger);

export default function TrustedBy() {
  const doubled   = [...BRANDS, ...BRANDS];
  const labelRef  = useRef(null);
  const wrapRef   = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(labelRef.current, {
        opacity: 0, y: 15, duration: 0.6, ease: "power3.out",
        scrollTrigger: { trigger: labelRef.current, start: "top 90%" },
      });
      gsap.from(wrapRef.current, {
        opacity: 0, duration: 0.8, ease: "power2.out",
        scrollTrigger: { trigger: wrapRef.current, start: "top 90%" },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div style={{ padding: "3rem 0", borderTop: "1px solid rgba(255,255,255,0.07)", borderBottom: "1px solid rgba(255,255,255,0.07)", overflow: "hidden", background: "#12121f" }}>
      <p ref={labelRef} style={{ textAlign: "center", fontSize: "0.75rem", color: "#8b87a8", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1.5rem", fontWeight: 500 }}>
        Trusted by learners from leading companies
      </p>
      <div ref={wrapRef} style={{ display: "flex", overflow: "hidden" }}>
        <div style={{ display: "flex", gap: "3rem", alignItems: "center", animation: "marquee 20s linear infinite", whiteSpace: "nowrap", padding: "0 1.5rem" }}>
          {doubled.map((brand, i) => (
            <div key={i} style={{ color: "rgba(255,255,255,0.25)", fontWeight: 600, fontSize: "1.1rem", letterSpacing: "-0.02em", flexShrink: 0 }}>
              {brand}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
