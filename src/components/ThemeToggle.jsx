import { motion } from "framer-motion";

function ThemeToggle({ theme, toggleTheme }) {
  return (
    <motion.button
      onClick={toggleTheme}
      className="p-2 rounded-full"
      style={{
        backgroundColor: theme === "light" ? "var(--bg-gray-200)" : "var(--bg-gray-700)",
        color: theme === "light" ? "var(--text-gray-700)" : "var(--text-gray-300)",
      }}
      whileHover={{
        scale: 1.1,
        backgroundColor: theme === "light" ? "var(--bg-gray-300-hover)" : "var(--bg-gray-600-hover)",
      }}
      whileTap={{ scale: 0.9 }}
      aria-label={`Toggle ${theme === "light" ? "dark" : "light"} theme`}
    >
      {theme === "light" ? (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ) : (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      )}
    </motion.button>
  );
}

export default ThemeToggle;