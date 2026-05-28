import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useCallback } from "react";
import { registerUser } from "../services/authService";
import { loginUser } from "../services/authService";
import { toast } from "react-toastify";

function getStrength(pw) {
  if (!pw) return { level: 0, label: "", color: "" };
  if (pw.length < 6) return { level: 1, label: "Too short", color: "#ef4444" };
  if (pw.length < 10 || !/[0-9]/.test(pw))
    return { level: 2, label: "Medium", color: "#f59e0b" };
  return { level: 3, label: "Strong", color: "#22c55e" };
}

export default function LoginModal({ onClose, initialMode }) {
  const [mode, setMode] = useState(initialMode);
  const [registerData, setRegisterData] = useState({
    firstname: "",
    lastname: "",
    usermail: "",
    password: "",
  });
  const [loginData, setLoginData] = useState({
    usermail: "",
    password: "",
  });
  const [password, setPassword] = useState("");
  const strength = getStrength(password);

  const overlayRef = useRef(null);
  const modalRef = useRef(null);
  const loginRef = useRef(null);
  const registerRef = useRef(null);
  const wrapperRef = useRef(null);
  const isAnimating = useRef(false);

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  const handleRegister = async () => {
    try {
      const payload = {
        firstname: registerData.firstname,
        lastname: registerData.lastname,
        usermail: registerData.usermail,
        password: registerData.password,
      };
      // console.log(payload);

      const data = await registerUser(payload);

      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("user", JSON.stringify(data.visiter));

      handleCloseFunc();
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  const handleRegisterChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    try {
      const data = await loginUser(loginData);
      console.log(data);
      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("user", JSON.stringify(data.visiter));

      toast.success(data.message || "Login Successful");

      handleCloseFunc();
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Login Failed");
    }
  };

  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCloseFunc = useCallback(
    function handleClose() {
      gsap.to(modalRef.current, {
        scale: 0.85,
        opacity: 0,
        y: 10,
        duration: 0.25,
        ease: "power2.in",
      });
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: onClose,
      });
    },
    [onClose],
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";

    gsap.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.35, ease: "power2.out" },
    );
    gsap.fromTo(
      modalRef.current,
      { scale: 0, opacity: 0, y: 20 },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.45,
        ease: "back.out(1.6)",
        delay: 0.05,
      },
    );

    // Measure register panel height (it's off-screen but rendered)
    // Temporarily make it visible to measure, then hide again
    if (initialMode === "login") {
      gsap.set(loginRef.current, { x: "0%", opacity: 1 });
      gsap.set(registerRef.current, { x: "100%", opacity: 0 });
    } else {
      gsap.set(loginRef.current, { x: "-100%", opacity: 0 });
      gsap.set(registerRef.current, { x: "0%", opacity: 1 });
    }

    // Use register height as the fixed height for the wrapper
    const registerHeight = registerRef.current.offsetHeight;
    gsap.set(wrapperRef.current, { height: registerHeight });

    const onKey = (e) => {
      if (e.key === "Escape") handleCloseFunc();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [handleCloseFunc]);

  function handleOverlayClick(e) {
    if (e.target === overlayRef.current) handleCloseFunc();
  }

  function handleToggle() {
    if (isAnimating.current) return;
    isAnimating.current = true;

    const isLogin = mode === "login";

    const currentEl = isLogin ? loginRef.current : registerRef.current;
    const nextEl = isLogin ? registerRef.current : loginRef.current;

    const tl = gsap.timeline({
      onComplete: () => {
        setMode(isLogin ? "register" : "login");
        isAnimating.current = false;
      },
    });

    tl.to(currentEl, {
      x: "-100%",
      opacity: 0,
      duration: 0.4,
      ease: "power2.inOut",
    });

    tl.fromTo(
      nextEl,
      { x: "100%", opacity: 0 },
      { x: "0%", opacity: 1, duration: 0.4, ease: "power2.out" },
      0,
    );
  }

  const inp = {
    width: "100%",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 10,
    padding: "11px 14px",
    color: "#f1f0ff",
    fontSize: "0.875rem",
    fontFamily: "inherit",
    marginBottom: 10,
    outline: "none",
  };

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "rgba(5,5,15,0.75)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
    >
      <div
        ref={modalRef}
        style={{
          width: "100%",
          maxWidth: 420,
          background: "rgba(18,18,32,0.85)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 24,
          padding: "clamp(1.5rem, 5vw, 2rem)",
          position: "relative",
          boxShadow:
            "0 25px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(129,140,248,0.05)",
        }}
      >
        {/* Glow orbs */}
        <div
          style={{
            position: "absolute",
            width: 200,
            height: 200,
            background: "rgba(79,70,229,0.18)",
            borderRadius: "50%",
            filter: "blur(60px)",
            top: -60,
            left: -60,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 150,
            height: 150,
            background: "rgba(124,58,237,0.12)",
            borderRadius: "50%",
            filter: "blur(50px)",
            bottom: -40,
            right: -40,
            pointerEvents: "none",
          }}
        />

        {/* Close */}
        <button
          onClick={handleCloseFunc}
          style={{
            position: "absolute",
            top: 16,
            right: 18,
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 8,
            width: 32,
            height: 32,
            color: "#8b87a8",
            fontSize: "1rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            lineHeight: 1,
          }}
        >
          ✕
        </button>

        {/* Wrapper — fixed height = register panel height, never changes */}
        <div
          ref={wrapperRef}
          style={{
            position: "relative",
            overflow: "hidden",
            minHeight: "430px",
          }}
        >
          {/* ── LOGIN PANEL ── */}
          <div
            ref={loginRef}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              zIndex: mode === "login" ? 2 : 1,
            }}
          >
            <div
              style={{
                fontSize: "1.4rem",
                fontWeight: 900,
                background: "linear-gradient(135deg,#818cf8,#c084fc)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginBottom: 4,
              }}
            >
              EduVerse
            </div>
            <h2
              style={{
                color: "#f1f0ff",
                fontSize: "1.25rem",
                fontWeight: 700,
                marginBottom: 4,
              }}
            >
              Welcome back
            </h2>
            <p
              style={{
                color: "#8b87a8",
                fontSize: "0.85rem",
                marginBottom: 24,
              }}
            >
              Sign in to continue learning
            </p>

            <input
              name="usermail"
              style={inp}
              type="email"
              placeholder="usermail address"
              onFocus={(e) => {
                e.target.style.borderColor = "rgba(129,140,248,0.65)";
                e.target.style.background = "rgba(129,140,248,0.08)";
                e.target.style.boxShadow = "0 0 0 3px rgba(129,140,248,0.13)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(255,255,255,0.1)";
                e.target.style.background = "rgba(255,255,255,0.05)";
                e.target.style.boxShadow = "none";
              }}
              value={loginData.usermail}
              onChange={handleLoginChange}
            />
            <input
              name="password"
              style={inp}
              type="password"
              placeholder="Password"
              onFocus={(e) => {
                e.target.style.borderColor = "rgba(129,140,248,0.65)";
                e.target.style.background = "rgba(129,140,248,0.08)";
                e.target.style.boxShadow = "0 0 0 3px rgba(129,140,248,0.13)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(255,255,255,0.1)";
                e.target.style.background = "rgba(255,255,255,0.05)";
                e.target.style.boxShadow = "none";
              }}
              value={loginData.password}
              onChange={handleLoginChange}
            />

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginBottom: 16,
              }}
            >
              <span
                style={{
                  color: "#818cf8",
                  fontSize: "0.8rem",
                  cursor: "pointer",
                }}
              >
                Forgot password?
              </span>
            </div>

            <button
              style={{
                width: "100%",
                padding: "11px",
                borderRadius: 10,
                border: "none",
                background: "linear-gradient(135deg,#4f46e5,#7c3aed)",
                color: "#fff",
                fontFamily: "inherit",
                fontSize: "0.9rem",
                fontWeight: 600,
                cursor: "pointer",
                letterSpacing: "0.02em",
              }}
              onClick={handleLogin}
            >
              Log In →
            </button>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                margin: "16px 0",
              }}
            >
              <span
                style={{
                  flex: 1,
                  height: 1,
                  background: "rgba(255,255,255,0.07)",
                }}
              />
              <span style={{ color: "#3e3b56", fontSize: "0.75rem" }}>
                or continue with
              </span>
              <span
                style={{
                  flex: 1,
                  height: 1,
                  background: "rgba(255,255,255,0.07)",
                }}
              />
            </div>

            <button
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: 10,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "#8b87a8",
                fontFamily: "inherit",
                fontSize: "0.85rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              <span
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg,#4285f4,#ea4335,#fbbc04,#34a853)",
                  flexShrink: 0,
                  display: "inline-block",
                }}
              />
              Continue with Google
            </button>

            <p
              style={{
                textAlign: "center",
                marginTop: 18,
                fontSize: "0.82rem",
                color: "#4a4766",
              }}
            >
              Don't have an account?{" "}
              <span
                onClick={handleToggle}
                style={{ color: "#818cf8", cursor: "pointer", fontWeight: 600 }}
              >
                Register free
              </span>
            </p>
          </div>

          {/* ── REGISTER PANEL ── */}
          <div
            ref={registerRef}
            style={{
              position: "absolute",
              top: "50%",
              left: 0,
              width: "100%",
              zIndex: mode === "register" ? 2 : 1,
              transform: "translate(0, -50%)",
            }}
          >
            <div
              style={{
                fontSize: "1.4rem",
                fontWeight: 900,
                background: "linear-gradient(135deg,#818cf8,#c084fc)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginBottom: 4,
              }}
            >
              EduVerse
            </div>
            <h2
              style={{ color: "#f1f0ff", fontSize: "1.25rem", fontWeight: 700 }}
            >
              Create account
            </h2>

            {/* Name Row */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 10,
              }}
            >
              <input
                name="firstname"
                type="firstname"
                style={inp}
                placeholder="First name"
                onChange={handleRegisterChange}
              />
              <input
                name="lastname"
                type="lastname"
                style={inp}
                placeholder="Last name"
                onChange={handleRegisterChange}
              />
            </div>

            <input
              name="usermail"
              style={inp}
              type="usermail"
              placeholder="usermail address"
              onChange={handleRegisterChange}
            />

            <input
              name="password"
              style={inp}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                handleRegisterChange(e);
              }}
            />

            {/* Strength Bar */}
            {password.length > 0 && (
              <div style={{ marginBottom: 12 }}>
                <div style={{ display: "flex", gap: 4 }}>
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      style={{
                        flex: 1,
                        height: 3,
                        background:
                          i <= strength.level
                            ? strength.color
                            : "rgba(255,255,255,0.08)",
                      }}
                    />
                  ))}
                </div>
                <span style={{ fontSize: "0.75rem", color: strength.color }}>
                  {strength.label}
                </span>
              </div>
            )}

            <button
              onClick={handleRegister}
              style={{
                width: "100%",
                padding: "11px",
                borderRadius: 10,
                border: "none",
                background: "linear-gradient(135deg,#4f46e5,#7c3aed)",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              Create Account →
            </button>

            <p style={{ textAlign: "center", marginTop: 16 }}>
              Already have an account?{" "}
              <span
                onClick={handleToggle}
                style={{ color: "#818cf8", cursor: "pointer" }}
              >
                Sign in
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
