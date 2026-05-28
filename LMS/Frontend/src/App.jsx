import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Preloader from "./components/Preloader";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import CoursesSection from "./pages/CoursesSection";
import Aboutus from "./components/Aboutus";
import Career from "./components/Career";
import Pricing from "./components/Pricing";
import Partners from "./components/Partner";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import CoursePage from "./pages/CoursePage";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [navVisible, setNavVisible] = useState(false);

  const handlePreloaderDone = () => {
    setLoaded(true);
    setTimeout(() => setNavVisible(true), 200);
  };

  return (
    <>
      <style>{`
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body {
          font-family: 'DM Sans', sans-serif;
          background: #0a0a12;
          color: #f1f0ff;
          overflow-x: hidden;
          line-height: 1.6;
        }
        @keyframes spin    { to { transform: rotate(360deg); } }
        @keyframes pulse   { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        @keyframes float   { 0%, 100% { transform: translateY(0) scale(1); } 50% { transform: translateY(-30px) scale(1.05); } }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

        @media (max-width: 768px) {
          .nav-links-desktop, .nav-actions-desktop { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
      `}</style>

      <>
        {!loaded && <Preloader onDone={handlePreloaderDone} />}

        {loaded && (
          <Routes>
            <Route path="/" element={<Layout />}>
              {/* Home Page */}
              <Route index element={<Home />} />

              {/* Courses Page */}
              <Route path="courses" element={<CoursesSection />} />
              <Route path="course/:slug" element={<CoursePage />} />
              <Route path="about" element={<Aboutus />} />
              <Route path="Careers" element={<Career />} />
              <Route path="Partners" element={<Partners />} />
              <Route path="Pricing" element={<Pricing />} />
              <Route path="Blog" element={<Blog />} />
              <Route path="Contact" element={<Contact />} />
            </Route>
          </Routes>
        )}
      </>
    </>
  );
}

