import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { courseData } from "../data/courseData";

gsap.registerPlugin(ScrollTrigger);

export default function CoursePage() {
  const { slug } = useParams();

  const course = useMemo(
    () => courseData.find((item) => item.slug === slug),
    [slug],
  );

  const [openModule, setOpenModule] = useState(0);

  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const sidebarRef = useRef(null);

  useEffect(() => {
    if (!course) return;

    const ctx = gsap.context(() => {
      gsap.from(".course-hero-left", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".course-hero-right", {
        x: 80,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
      });

      gsap.utils.toArray(".reveal-section").forEach((section) => {
        gsap.from(section, {
          y: 60,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
          },
        });
      });
    });

    return () => ctx.revert();
  }, [course]);

  if (!course) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a12",
          color: "#fff",
        }}
      >
        Course not found.
      </div>
    );
  }

  const cardStyle = {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 24,
    padding: "1.5rem",
    backdropFilter: "blur(20px)",
  };

  return (
    <div
      style={{
        background: "#0a0a12",
        color: "#f1f0ff",
        minHeight: "100vh",
      }}
    >
      {/* HERO */}
      <section
        ref={heroRef}
        style={{
          padding: "8rem 2rem 4rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at top left, rgba(79,70,229,0.2), transparent 45%)",
          }}
        />

        <div
          style={{
            maxWidth: 1300,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1.2fr 0.8fr",
            gap: "3rem",
            alignItems: "center",
          }}
        >
          <div className="course-hero-left">
            <div
              style={{
                display: "inline-flex",
                padding: "0.45rem 1rem",
                borderRadius: 999,
                background: "rgba(79,70,229,0.12)",
                border: "1px solid rgba(129,140,248,0.2)",
                marginBottom: "1.5rem",
                color: "#a5b4fc",
                fontSize: "0.8rem",
              }}
            >
              {course.level} Level
            </div>

            <h1
              style={{
                fontSize: "clamp(2.5rem,5vw,4.8rem)",
                lineHeight: 1.1,
                fontWeight: 900,
                marginBottom: "1rem",
              }}
            >
              {course.title}
            </h1>

            <p
              style={{
                color: "#8b87a8",
                fontSize: "1.05rem",
                lineHeight: 1.8,
                maxWidth: 700,
                marginBottom: "2rem",
              }}
            >
              {course.description}
            </p>

            <div
              style={{
                display: "flex",
                gap: "1rem",
                flexWrap: "wrap",
                marginBottom: "2rem",
              }}
            >
              {[course.students, `${course.rating} Rating`, course.duration].map(
                (item) => (
                  <div
                    key={item}
                    style={{
                      padding: "0.9rem 1.2rem",
                      background: "rgba(255,255,255,0.03)",
                      borderRadius: 14,
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "#c4c1da",
                    }}
                  >
                    {item}
                  </div>
                ),
              )}
            </div>

            <button
              style={{
                background: "linear-gradient(135deg,#4f46e5,#7c3aed)",
                border: "none",
                color: "white",
                padding: "1rem 2rem",
                borderRadius: 14,
                cursor: "pointer",
                fontWeight: 700,
                fontSize: "0.95rem",
              }}
            >
              Start Learning →
            </button>
          </div>

          <div className="course-hero-right">
            <div
              style={{
                borderRadius: 30,
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.03)",
                boxShadow: "0 30px 80px rgba(0,0,0,0.45)",
              }}
            >
              <img
                src={course.thumbnail}
                alt={course.title}
                style={{
                  width: "100%",
                  display: "block",
                  objectFit: "cover",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section
        ref={contentRef}
        style={{
          maxWidth: 1300,
          margin: "0 auto",
          padding: "0 2rem 6rem",
          display: "grid",
          gridTemplateColumns: "1fr 360px",
          gap: "2rem",
        }}
      >
        {/* LEFT */}
        <div>
          {/* OVERVIEW */}
          <div className="reveal-section" style={{ ...cardStyle, marginBottom: "2rem" }}>
            <h2 style={{ marginBottom: "1rem", fontSize: "1.7rem" }}>
              Course Overview
            </h2>

            <p
              style={{
                color: "#8b87a8",
                lineHeight: 1.9,
              }}
            >
              {course.description}
            </p>
          </div>

          {/* BENEFITS */}
          <div className="reveal-section" style={{ marginBottom: "2rem" }}>
            <h2 style={{ marginBottom: "1.5rem", fontSize: "1.7rem" }}>
              What You'll Learn
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
                gap: "1rem",
              }}
            >
              {course.benefits.map((benefit, index) => (
                <div
                  key={index}
                  style={{
                    ...cardStyle,
                    transition: "all 0.3s ease",
                  }}
                >
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: 12,
                      background:
                        "linear-gradient(135deg,#4f46e5,#7c3aed)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "1rem",
                    }}
                  >
                    ✓
                  </div>

                  <div
                    style={{
                      fontWeight: 600,
                      lineHeight: 1.7,
                    }}
                  >
                    {benefit}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* MODULES */}
          <div className="reveal-section" style={{ marginBottom: "2rem" }}>
            <h2 style={{ marginBottom: "1.5rem", fontSize: "1.7rem" }}>
              Course Modules
            </h2>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              {course.modules.map((module, index) => {
                const open = openModule === index;

                return (
                  <div
                    key={index}
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 20,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      onClick={() => setOpenModule(open ? null : index)}
                      style={{
                        padding: "1.2rem 1.5rem",
                        cursor: "pointer",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 700, marginBottom: 4 }}>
                          {module.title}
                        </div>
                        <div style={{ color: "#8b87a8", fontSize: "0.85rem" }}>
                          {module.lessons.length} Lessons
                        </div>
                      </div>

                      <div
                        style={{
                          fontSize: "1.2rem",
                          transform: open ? "rotate(45deg)" : "rotate(0deg)",
                          transition: "0.3s",
                        }}
                      >
                        +
                      </div>
                    </div>

                    {open && (
                      <div
                        style={{
                          padding: "0 1.5rem 1.5rem",
                        }}
                      >
                        {module.lessons.map((lesson, lessonIndex) => (
                          <div
                            key={lessonIndex}
                            style={{
                              padding: "0.8rem 0",
                              borderBottom:
                                lessonIndex !== module.lessons.length - 1
                                  ? "1px solid rgba(255,255,255,0.05)"
                                  : "none",
                              color: "#c4c1da",
                            }}
                          >
                            • {lesson}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* TOOLS */}
          <div className="reveal-section" style={cardStyle}>
            <h2 style={{ marginBottom: "1.5rem", fontSize: "1.7rem" }}>
              Tools Covered
            </h2>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.8rem",
              }}
            >
              {course.tools.map((tool) => (
                <span
                  key={tool}
                  style={{
                    padding: "0.7rem 1rem",
                    borderRadius: 999,
                    background: "rgba(79,70,229,0.12)",
                    border: "1px solid rgba(129,140,248,0.18)",
                    color: "#a5b4fc",
                    fontSize: "0.85rem",
                  }}
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* SIDEBAR */}
        <div>
          <div
            ref={sidebarRef}
            style={{
              position: "sticky",
              top: 120,
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 28,
              padding: "1.6rem",
              backdropFilter: "blur(20px)",
            }}
          >
            <div
              style={{
                fontSize: "2rem",
                fontWeight: 800,
                marginBottom: "1.5rem",
              }}
            >
              {course.price}
            </div>

            <button
              style={{
                width: "100%",
                padding: "1rem",
                borderRadius: 14,
                border: "none",
                cursor: "pointer",
                background: "linear-gradient(135deg,#4f46e5,#7c3aed)",
                color: "white",
                fontWeight: 700,
                marginBottom: "1.5rem",
              }}
            >
              Enroll Now
            </button>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              {[
                ["Duration", course.duration],
                ["Instructor", course.instructor],
                ["Level", course.level],
              ].map(([label, value]) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    color: "#c4c1da",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                    paddingBottom: "0.8rem",
                  }}
                >
                  <span>{label}</span>
                  <span>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
