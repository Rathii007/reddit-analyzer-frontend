import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

function Therapist({ theme }) {
  const [username, setUsername] = useState("");
  const [advice, setAdvice] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setAdvice("");
    setLoading(true);
    try {
      const response = await axios.post("https://reddit-analyzer-backend-3w6f.onrender.com/reddit-therapist", { username });
      if (response.data && typeof response.data.advice === "string") {
        setAdvice(response.data.advice);
      } else {
        throw new Error("Invalid response format from server");
      }
    } catch (err) {
      setError(err.response?.data?.detail || err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Split advice into lines for safer rendering
  const renderAdviceLines = (text) => {
    return text.split("\n").map((line, index, array) => (
      <span key={index}>
        {line}
        {index < array.length - 1 && <br />}
      </span>
    ));
  };

  return (
    <motion.div
      className="p-8 rounded-xl shadow-lg"
      style={{ backgroundColor: "var(--card)" }}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-2xl font-semibold mb-6">Reddit Therapist</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter Reddit username"
          className="w-full p-3 rounded-lg border focus:outline-none"
          style={{
            backgroundColor: "var(--input)",
            borderColor: "var(--input)",
            color: "var(--text)",
            boxShadow: "0 0 0 2px var(--accent)", // Use --accent for focus ring
          }}
          aria-label="Reddit username for therapist advice"
          required
        />
        <motion.button
          type="submit"
          className="w-full p-3 rounded-lg font-semibold bg-[#ff4500] hover:bg-[#e03e00] text-white flex justify-center items-center"
          disabled={loading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {loading ? (
            <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          ) : (
            "Get Advice"
          )}
        </motion.button>
      </form>
      {error && (
        <motion.p
          className="text-red-500 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {error}
        </motion.p>
      )}
      {advice && advice.trim().length > 0 && (
        <motion.div
          className="mt-6 p-6 rounded-lg result-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h3 className="font-semibold text-lg mb-2">Therapist Advice:</h3>
          <div className="prose max-w-none">{renderAdviceLines(advice)}</div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default Therapist;