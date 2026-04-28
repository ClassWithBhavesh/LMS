import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const pageRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: pageRef.current,
        start: "top 80%",
      },
    });

    tl.from(".contact-title", {
      opacity: 0,
      y: 50,
      duration: 0.6,
    })
      .from(".contact-desc", {
        opacity: 0,
        y: 30,
        duration: 0.5,
      }, "-=0.3")
      .from(".contact-form", {
        opacity: 0,
        y: 40,
        duration: 0.6,
      }, "-=0.2");
  }, []);

  // handle input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    alert("Message Sent 🚀"); // for now

    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <section
      ref={pageRef}
      style={{
        padding: "6rem 2rem",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f0f1a, #1a1a2e)",
        color: "#fff",
      }}
    >
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        
        <h1 className="contact-title" style={{ fontSize: "2.8rem", marginBottom: "1rem" }}>
          Contact Us 📩
        </h1>

        <p className="contact-desc" style={{ color: "#cfcde0", marginBottom: "2rem" }}>
          Send us a message and we will reply soon.
        </p>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="contact-form"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            background: "rgba(255,255,255,0.05)",
            padding: "2rem",
            borderRadius: "16px",
            border: "1px solid rgba(255,255,255,0.1)",
            backdropFilter: "blur(10px)",
          }}
        >
          {/* NAME */}
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          {/* EMAIL */}
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          {/* MESSAGE */}
          <textarea
            name="message"
            placeholder="Your Message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          {/* BUTTON */}
          <button
            type="submit"
            style={{
              padding: "0.9rem",
              borderRadius: "10px",
              border: "none",
              background: "#6c63ff",
              color: "#fff",
              fontSize: "1rem",
              cursor: "pointer",
              transition: "0.3s",
            }}
            onMouseEnter={(e) =>
              gsap.to(e.currentTarget, { scale: 1.05, duration: 0.2 })
            }
            onMouseLeave={(e) =>
              gsap.to(e.currentTarget, { scale: 1, duration: 0.2 })
            }
          >
            Send Message 🚀
          </button>
        </form>
      </div>
    </section>
  );
}

// reusable input style
const inputStyle = {
  padding: "0.9rem",
  borderRadius: "10px",
  border: "1px solid rgba(255,255,255,0.2)",
  background: "transparent",
  color: "#fff",
  fontSize: "1rem",
  outline: "none",
};