import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { useCallback } from "react";

// Icon imports (you can use react-icons or SVGs)
import { FaBolt, FaClock, FaHeart, FaSearch, FaUser } from "react-icons/fa";

function LandingPage({ theme }) {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const particlesOptions = {
    background: {
      color: {
        value: "transparent",
      },
    },
    fpsLimit: 60,
    particles: {
      number: {
        value: 50,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: theme === "dark"
          ? ["#ff4500", "#dc2626", "#facc15"]
          : ["#ff4500", "#d1d5db", "#facc15"],
      },
      shape: {
        type: ["circle", "triangle", "star"],
      },
      opacity: {
        value: { min: 0.2, max: 0.5 },
      },
      size: {
        value: { min: 2, max: 6 },
      },
      move: {
        enable: true,
        speed: 1,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out",
      },
    },
    interactivity: {
      events: {
        onhover: {
          enable: true,
          mode: "repulse",
        },
      },
      modes: {
        repulse: { distance: 100, duration: 0.4 },
      },
    },
    detectRetina: true,
  };

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"} font-sans`}>
      {/* Header */}
      <header className={`${theme === "dark" ? "bg-gray-800" : "bg-gray-100"} shadow-lg`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <motion.h1
            className="text-2xl font-bold"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Reddit Analyzer
          </motion.h1>
          <nav className="space-x-6">
            <Link to="/analyze" className={`hover:${theme === "dark" ? "text-orange-400" : "text-gray-700"} transition-colors`}>
              Get Started
            </Link>
            <a href="#features" className={`hover:${theme === "dark" ? "text-orange-400" : "text-gray-700"} transition-colors`}>
              Features
            </a>
            <a href="#stats" className={`hover:${theme === "dark" ? "text-orange-400" : "text-gray-700"} transition-colors`}>
              Stats
            </a>
            <a href="#about" className={`hover:${theme === "dark" ? "text-orange-400" : "text-gray-700"} transition-colors`}>
              About
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className={`relative ${theme === "dark" ? "bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800" : "bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100"} py-32 text-center overflow-hidden`}>
        <Particles
          id="hero-particles"
          init={particlesInit}
          options={particlesOptions}
          className="absolute inset-0 z-0"
        />
        <motion.div
          className="max-w-5xl mx-auto px-4 relative z-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500">
              Discover Reddit Like Never Before
            </span>
          </h2>
          <p className={`text-lg md:text-2xl mb-8 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
            Analyze user activity, predict viral posts, and uncover insights with Reddit Analyzer—your ultimate Reddit companion.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/analyze"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors shadow-lg"
            >
              Start Analyzing Now
            </Link>
            <a
              href="#features"
              className={`border ${theme === "dark" ? "border-gray-300 text-gray-300 hover:bg-gray-700" : "border-gray-600 text-gray-600 hover:bg-gray-200"} font-semibold py-3 px-8 rounded-lg transition-colors`}
            >
              Learn More
            </a>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className={`${theme === "dark" ? "bg-gray-800" : "bg-gray-100"} py-20`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-4xl font-bold text-center mb-12">Explore Our Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Toxicity Score", description: "Measure the toxicity of a user's comments and posts.", icon: <FaUser className="text-orange-500 text-3xl" /> },
              { title: "Viral Post Prediction", description: "Get tips to create Reddit posts with viral potential.", icon: <FaBolt className="text-orange-500 text-3xl" /> },
              { title: "Time Machine", description: "Explore your oldest posts and comments on Reddit.", icon: <FaClock className="text-orange-500 text-3xl" /> },
              { title: "Sentiment Analysis", description: "Understand the sentiment behind user activity.", icon: <FaHeart className="text-orange-500 text-3xl" /> },
              { title: "Subreddit Recommendations", description: "Discover new subreddits based on your interests.", icon: <FaSearch className="text-orange-500 text-3xl" /> },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className={`${theme === "dark" ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"} p-6 rounded-lg shadow-lg transition-all duration-300`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center mb-4">
                  {feature.icon}
                  <h4 className="text-xl font-semibold ml-3">{feature.title}</h4>
                </div>
                <p className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats/Testimonials Section */}
      <section id="stats" className={`${theme === "dark" ? "bg-gray-900" : "bg-gray-50"} py-20`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-4xl font-bold text-center mb-12">Our Impact</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <h4 className="text-5xl font-bold text-orange-500">10K+</h4>
              <p className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>Users Analyzed</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h4 className="text-5xl font-bold text-orange-500">50K+</h4>
              <p className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>Posts Predicted</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h4 className="text-5xl font-bold text-orange-500">1M+</h4>
              <p className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>Comments Scanned</p>
            </motion.div>
          </div>
          <div className="mt-12">
            <h4 className="text-2xl font-semibold text-center mb-8">What Users Say</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                className={`${theme === "dark" ? "bg-gray-700" : "bg-gray-200"} p-6 rounded-lg shadow-lg`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <p className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>"Reddit Analyzer helped me understand my online presence and create viral content!"</p>
                <p className="mt-4 font-semibold">— Alex K., Reddit Enthusiast</p>
              </motion.div>
              <motion.div
                className={`${theme === "dark" ? "bg-gray-700" : "bg-gray-200"} p-6 rounded-lg shadow-lg`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <p className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>"The Time Machine feature brought back so many memories. A must-have tool for Redditors!"</p>
                <p className="mt-4 font-semibold">— Sarah M., Content Creator</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`${theme === "dark" ? "bg-gray-800" : "bg-gray-100"} py-20`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-4xl font-bold mb-6">About Reddit Analyzer</h3>
          <p className="text-lg text-gray-300 dark:text-gray-400 mb-4">
            Reddit Analyzer is a passion project designed to provide deep insights into Reddit user behavior. Built with modern web technologies, it empowers users to understand their online presence and optimize their content strategy.
          </p>
          <p className="text-lg text-gray-300 dark:text-gray-400">
            Created by [Your Name], this tool showcases expertise in React, Node.js, API integration, and deployment on Vercel and Render.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className={`${theme === "dark" ? "bg-gray-800" : "bg-gray-100"} py-8`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center space-x-6 mb-6">
            <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className={`hover:${theme === "dark" ? "text-orange-400" : "text-gray-700"} transition-colors`}>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.207 11.387.6.113.793-.26.793-.577 0-.287-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.084 1.838 1.236 1.838 1.236 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.18.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
            <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className={`hover:${theme === "dark" ? "text-orange-400" : "text-gray-700"} transition-colors`}>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.327-.027-3.037-1.852-3.037-1.854 0-2.137 1.446-2.137 2.94v5.666H9.352V9.756h3.414v1.561h.048c.477-.9 1.638-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.53zM5.337 8.194c-1.144 0-2.063-.93-2.063-2.076 0-1.147.92-2.077 2.063-2.077 1.144 0 2.063.93 2.063 2.077 0 1.147-.92 2.076-2.063 2.076zm1.778 12.258H3.56V9.756h3.555v10.696zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454c.979 0 1.771-.773 1.771-1.729V1.729C24 .774 23.204 0 22.225 0z" />
              </svg>
            </a>
          </div>
          <p className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
            © {new Date().getFullYear()} Reddit Analyzer. All rights reserved. |{' '}
            <a href="mailto:your.email@example.com" className={`hover:${theme === "dark" ? "text-orange-400" : "text-gray-800"}`}>
              Contact
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;