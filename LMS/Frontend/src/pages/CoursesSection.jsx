import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CourseCard from "../components/CourseCard";
import SkeletonCard from "../components/SkeletonCard";
import { MOCK_COURSES } from "../data";
import { COURSES } from "../assets/assets";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

export default function CoursesSection() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const headerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        y: 30, opacity: 0, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: headerRef.current, start: "top 85%" },
      });
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res  = await fetch("/api/v1/courses", { headers: { "Content-Type": "application/json" } });
        if (!res.ok) throw new Error();
        const data = await res.json();
        const list = (data.courses || data.data || data).filter((c) => c.isPublished !== false);
        setCourses(list.slice(0, 6));
      } catch {
          setCourses(COURSES)
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  return (
    <section id="courses" style={{ padding: "6rem 2rem", background: "#12121f" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <div ref={headerRef} style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "3rem", gap: "1rem", flexWrap: "wrap" }}>
          <div>
            <p style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "#818cf8", fontWeight: 600, marginBottom: "0.75rem" }}>Featured Courses</p>
            <h2 style={{fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 700, marginBottom: "0.25rem", lineHeight: 1.2 }}>
              Learn from the{" "}
              <span style={{ background: "linear-gradient(135deg,#818cf8,#c084fc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Best</span>
            </h2>
            <p style={{ color: "#8b87a8", fontSize: "1rem", maxWidth: 540, lineHeight: 1.7, margin: 0 }}>Hand-picked courses taught by industry veterans</p>
          </div>
          <a href="" onClick={() => useNavigate('courses')} style={{ color: "#818cf8", fontSize: "0.85rem", fontWeight: 500, textDecoration: "none", flexShrink: 0 }}>View All Courses ↗</a>
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: "1.5rem" }}>
          {loading
            ? Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)
            : courses.map((c, i) => <CourseCard key={c._id} course={c} index={i} />)
          }
        </div>
      </div>
    </section>
  );
}
