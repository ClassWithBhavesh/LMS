import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import LoginModal from "../components/LoginModal";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Navbar({ visible }) {
  const [user, setUser] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const navigate = useNavigate();
  const navRef = useRef(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      if (storedUser == undefined){
        return;
      }
      setUser(JSON.parse(storedUser));
    }
  }, [showAuthModal]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (visible && navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", delay: 0.1 },
      );
    }
  }, [visible]);

  const logoStyle = {
    fontSize: "1.5rem",
    fontWeight: 900,
    background: "linear-gradient(135deg,#818cf8,#c084fc)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    cursor: "pointer",
  };

  function openLogin() {
    setAuthMode("login");
    setShowAuthModal(true);
    setMobileOpen(false);
  }

  function openRegister() {
    setAuthMode("register");
    setShowAuthModal(true);
    setMobileOpen(false);
  }

  function handleLogout() {
    // Remove auth data
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Close dropdown/mobile if needed
    setMobileOpen(false);

    // Redirect to home page
    navigate("/");

    setUser(null);
    toast.info("Log Out Successfully");
  }

  return (
    <>
      <nav
        ref={navRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: scrolled ? "0.8rem 2rem" : "1.2rem 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: scrolled ? "rgba(10,10,18,0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "none",
          opacity: 0,
          transition: "background 0.3s, backdrop-filter 0.3s, padding 0.3s",
        }}
      >
        <div style={logoStyle}>EduVerse</div>

        <div
          className="nav-links-desktop"
          style={{ display: "flex", alignItems: "center", gap: "2rem" }}
        >
          {["Home", "Courses"].map((l) => {
            const path = l === "Home" ? "/" : "/courses";

            return (
              <Link
                key={l}
                to={path}
                style={{
                  color: "#8b87a8",
                  textDecoration: "none",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#f1f0ff")}
                onMouseLeave={(e) => (e.target.style.color = "#8b87a8")}
              >
                {l}
              </Link>
            );
          })}
        </div>

        {/* <div
            className="nav-actions-desktop"
            style={{ display: "flex", gap: "0.75rem" }}
          >
            <button
              onClick={openLogin}
              style={{
                padding: "0.45rem 1.2rem",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 8,
                color: "#8b87a8",
                background: "transparent",
                fontFamily: "inherit",
                fontSize: "0.85rem",
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(129,140,248,0.5)";
                e.currentTarget.style.color = "#f1f0ff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                e.currentTarget.style.color = "#8b87a8";
              }}
            >
              Login
            </button>
            <button
              onClick={openRegister}
              style={{
                padding: "0.45rem 1.2rem",
                border: "none",
                borderRadius: 8,
                background: "linear-gradient(135deg,#4f46e5,#7c3aed)",
                color: "#fff",
                fontFamily: "inherit",
                fontSize: "0.85rem",
                fontWeight: 500,
                cursor: "pointer",
                transition: "opacity 0.2s, transform 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "0.88";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "1";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Register
            </button>
          </div> */}

        <div
          className="nav-actions-desktop"
          style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}
        >
          {!user ? (
            <>
              <button
                onClick={openLogin}
                style={{
                  padding: "0.45rem 1.2rem",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 8,
                  color: "#8b87a8",
                  background: "transparent",
                  fontFamily: "inherit",
                  fontSize: "0.85rem",
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                Login
              </button>

              <button
                onClick={openRegister}
                style={{
                  padding: "0.45rem 1.2rem",
                  border: "none",
                  borderRadius: 8,
                  background: "linear-gradient(135deg,#4f46e5,#7c3aed)",
                  color: "#fff",
                  fontFamily: "inherit",
                  fontSize: "0.85rem",
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                Register
              </button>
            </>
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg,#4f46e5,#7c3aed)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  cursor: "pointer",
                }}
              >
                {user.firstname?.charAt(0).toUpperCase()}
              </div>

              <button
                onClick={handleLogout}
                style={{
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "#8b87a8",
                  borderRadius: "8px",
                  padding: "8px 14px",
                  cursor: "pointer",
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>

        <div
          className="hamburger-btn"
          onClick={() => setMobileOpen(true)}
          style={{
            display: "none",
            flexDirection: "column",
            gap: 5,
            cursor: "pointer",
            padding: 4,
          }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                width: 22,
                height: 2,
                background: "#8b87a8",
                borderRadius: 2,
                display: "block",
              }}
            />
          ))}
        </div>
      </nav>

      {mobileOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(10,10,18,0.97)",
            zIndex: 99,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1.5rem",
            backdropFilter: "blur(20px)",
          }}
        >
          <span
            onClick={() => setMobileOpen(false)}
            style={{
              position: "absolute",
              top: "1.5rem",
              right: "1.5rem",
              fontSize: "1.5rem",
              cursor: "pointer",
              color: "#8b87a8",
            }}
          >
            ✕
          </span>
          {["Home", "Courses"].map((l) => (
            <a
              key={l}
              onClick={() => setMobileOpen(false)}
              href="#"
              style={{
                color: "#8b87a8",
                fontSize: "1.5rem",
                fontWeight: 500,
                textDecoration: "none",
              }}
            >
              {l}
            </a>
          ))}
          <button
            onClick={openLogin}
            style={{
              padding: "0.7rem 2.5rem",
              fontSize: "1rem",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 10,
              background: "transparent",
              color: "#a5b4fc",
              fontFamily: "inherit",
              cursor: "pointer",
            }}
          >
            Login
          </button>
          <button
            onClick={openRegister}
            style={{
              padding: "0.7rem 2.5rem",
              fontSize: "1rem",
              border: "none",
              borderRadius: 10,
              background: "linear-gradient(135deg,#4f46e5,#7c3aed)",
              color: "#fff",
              fontFamily: "inherit",
              cursor: "pointer",
            }}
          >
            Register
          </button>
        </div>
      )}

      {showAuthModal && (
        <LoginModal
          onClose={() => setShowAuthModal(false)}
          initialMode={authMode} // 🔥 KEY PART
        />
      )}
    </>
  );
}
