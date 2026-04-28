import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const FOOTER_COLS = [
  { 
    title: "Platform", 
    links: [
      { name: "Courses", path: "/courses" },
      { name: "Instructors", path: "/instructors" },
      { name: "Pricing", path: "/pricing" },
      { name: "Blog", path: "/blog" },
    ] 
  },
  { 
    title: "Company",  
    links: [
      { name: "About Us", path: "/about" },
      { name: "Careers", path: "/careers" },
      { name: "Press", path: "/press" },
      { name: "Partners", path: "/partners" },
    ] 
  },
  { 
    title: "Support",  
    links: [
      { name: "Help Center", path: "/help" },
      { name: "Community", path: "/community" },
      { name: "Contact Us", path: "/contact" },
      { name: "Privacy Policy", path: "/privacy" },
    ] 
  },
];
const SOCIAL_ICONS = ["𝕏", "in", "yt", "gh"];

export default function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(footerRef.current, {
        opacity: 0, y: 30, duration: 0.8, ease: "power2.out",
        scrollTrigger: { trigger: footerRef.current, start: "top 90%" },
      });
    });
    return () => ctx.revert();
  }, []);

  const logoStyle = {
    fontSize: "1.5rem", fontWeight: 900,
    background: "linear-gradient(135deg,#818cf8,#c084fc)",
    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
  };

  return (
    <footer ref={footerRef} style={{ background: "#12121f", borderTop: "1px solid rgba(255,255,255,0.07)", padding: "4rem 2rem 2rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", gap: "2.5rem", marginBottom: "3rem" }}>
          <div>
            <div style={logoStyle}>EduVerse</div>
            <p style={{ color: "#8b87a8", fontSize: "0.875rem", lineHeight: 1.7, marginTop: "0.75rem", maxWidth: 260 }}>
              The modern learning platform for ambitious professionals. 200+ courses, expert instructors, real results.
            </p>
          </div>
          {FOOTER_COLS.map((col) => (
            <div key={col.title}>
              <h4 style={{ fontWeight: 600, fontSize: "0.9rem", marginBottom: "1rem", color: "#f1f0ff" }}>{col.title}</h4>
              {col.links.map((link) => (
                <Link key={link.name} to={link.path} style={{ display: "block", color: "#8b87a8", fontSize: "0.85rem", textDecoration: "none", marginBottom: "0.5rem", transition: "color 0.2s" }}
                  onMouseEnter={e => e.target.style.color = "#f1f0ff"}
                  onMouseLeave={e => e.target.style.color = "#8b87a8"}
                >{link.name}</Link>
              ))}
            </div>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "2rem", borderTop: "1px solid rgba(255,255,255,0.07)", flexWrap: "wrap", gap: "1rem" }}>
          <span style={{ color: "#8b87a8", fontSize: "0.8rem" }}>© 2025 EduVerse. All rights reserved.</span>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            {SOCIAL_ICONS.map((icon) => (
              <div key={icon} style={{ width: 34, height: 34, borderRadius: 8, border: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: "0.85rem", color: "#8b87a8", transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(129,140,248,0.4)"; e.currentTarget.style.color = "#818cf8"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.color = "#8b87a8"; }}
              >{icon}</div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
