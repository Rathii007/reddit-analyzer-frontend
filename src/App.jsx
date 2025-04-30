import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import AnalyzePage from "./components/AnalyzePage";

function App() {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const particlesOptions = {
    background: {
      color: {
        value: theme === "dark" ? "#1f2937" : "#ffffff",
      },
    },
    fpsLimit: 60,
    particles: {
      number: {
        value: 100,
        density: {
          enable: true,
          value_area: 600,
        },
      },
      color: {
        value: theme === "dark"
          ? ["#ff4500", "#dc2626", "#facc15"]
          : ["#ff4500", "#d1d5db", "#facc15"],
      },
      shape: {
        type: ["circle", "triangle", "star"],
        options: {
          star: { sides: 5 },
          triangle: { sides: 3 },
        },
      },
      opacity: {
        value: { min: 0.3, max: 0.7 },
        animation: {
          enable: true,
          speed: 1,
          sync: false,
          opacity_min: 0.1,
        },
      },
      size: {
        value: { min: 4, max: 12 },
        random: true,
        animation: {
          enable: true,
          speed: 2,
          size_min: 2,
          sync: false,
        },
      },
      move: {
        enable: true,
        speed: 1,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out",
        attract: {
          enable: true,
          distance: 200,
          rotate: {
            x: 600,
            y: 1200,
          },
        },
      },
    },
    interactivity: {
      events: {
        onhover: {
          enable: true,
          mode: ["repulse", "grab"],
        },
        onclick: {
          enable: true,
          mode: "push",
        },
      },
      modes: {
        repulse: { distance: 150, duration: 0.5 },
        grab: { distance: 200, line_linked: { opacity: 0.3 } },
        push: { particles_nb: 5 },
      },
    },
    detectRetina: true,
  };

  return (
    <Router>
      <div
        data-theme={theme}
        className={`min-h-screen relative ${
          theme === "dark" ? "dark bg-gray-900 text-white" : "bg-white text-gray-900"
        }`}
      >
        {/* Creative Particle Background */}
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={particlesOptions}
          className="absolute inset-0 z-0"
        />
        <div className="container mx-auto p-6 relative z-10">
          <Routes>
            <Route path="/" element={<LandingPage theme={theme} />} />
            <Route
              path="/analyze"
              element={<AnalyzePage theme={theme} toggleTheme={toggleTheme} />}
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;