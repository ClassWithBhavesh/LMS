import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import StarRating from "./StarRating";
import { formatPrice } from "../data";

gsap.registerPlugin(ScrollTrigger);

export default function CourseCard({ course, index = 0 }) {
  if (!course) return null;
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef(null);
  const price = formatPrice(course?.price || 0);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.6,
        delay: index * 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });
    });
    return () => ctx.revert();
  }, [index]);

  const handleMouseEnter = () => {
    setHovered(true);
    gsap.to(cardRef.current, { y: -6, duration: 0.3, ease: "power2.out" });
  };
  const handleMouseLeave = () => {
    setHovered(false);
    gsap.to(cardRef.current, { y: 0, duration: 0.3, ease: "power2.out" });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => navigate(`/course/${course.slug}`)}
      style={{
        background: "rgba(255,255,255,0.035)",
        border: `1px solid ${hovered ? "rgba(129,140,248,0.25)" : "rgba(255,255,255,0.07)"}`,
        borderRadius: 16,
        overflow: "hidden",
        cursor: "pointer",
        boxShadow: hovered ? "0 20px 40px rgba(0,0,0,0.3)" : "none",
        transition: "border-color 0.3s, box-shadow 0.3s",
      }}
    >
      {/* Thumbnail */}
      <div
        style={{
          aspectRatio: "16/9",
          overflow: "hidden",
          position: "relative",
          background: "linear-gradient(135deg,#1a1a2e,#12121f)",
        }}
      >
        {course?.thumbnail ? (
          <img
            src={course.thumbnail}
            alt={course.title}
            loading="lazy"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: hovered ? "scale(1.07)" : "scale(1)",
              transition: "transform 0.4s ease",
            }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background:
                "linear-gradient(135deg,rgba(79,70,229,0.15),rgba(124,58,237,0.1))",
            }}
          >
            <span style={{ fontSize: "2.5rem", opacity: 0.4 }}>📚</span>
          </div>
        )}
        <span
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            padding: "0.25rem 0.6rem",
            borderRadius: 6,
            background: "rgba(10,10,18,0.8)",
            backdropFilter: "blur(10px)",
            fontSize: "0.7rem",
            fontWeight: 600,
            color: "#a5b4fc",
            border: "1px solid rgba(129,140,248,0.2)",
          }}
        >
          {course.category || "Course"}
        </span>
      </div>

      {/* Body */}
      <div style={{ padding: "1.2rem" }}>
        <div
          style={{
            fontSize: "0.75rem",
            color: "#8b87a8",
            marginBottom: "0.4rem",
            display: "flex",
            alignItems: "center",
            gap: "0.3rem",
          }}
        >
          👤 {course.instructor?.name || "Instructor"}
        </div>
        <div
          style={{
            fontWeight: 600,
            fontSize: "1rem",
            marginBottom: "0.75rem",
            lineHeight: 1.4,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {course.title}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.3rem",
              fontSize: "0.82rem",
            }}
          >
            <StarRating rating={course.ratingsAverage} />
            <span style={{ color: "#8b87a8" }}>
              {(course.ratingsAverage || 0).toFixed(1)}
            </span>
          </div>
          <div
            style={{ fontSize: "1.1rem", fontWeight: 700, color: "#818cf8" }}
          >
            {price}
          </div>
        </div>
      </div>
    </div>
  );
}
