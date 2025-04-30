import { useState, Component } from "react";
import { motion } from "framer-motion";
import axios from "axios";

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h2>Something went wrong. Please try again later.</h2>;
    }
    return this.props.children;
  }
}

function RecommendSubreddits({ theme }) {
  const [username, setUsername] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setRecommendations([]);
    setLoading(true);
    try {
      const response = await axios.post("https://reddit-analyzer-backend-3w6f.onrender.com/recommend-subreddits", { username });
      if (response.data && Array.isArray(response.data.recommendations)) {
        setRecommendations(response.data.recommendations);
      } else {
        throw new Error("Invalid response format from server");
      }
    } catch (err) {
      setError(err.response?.data?.detail || err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="p-8 rounded-xl shadow-lg"
      style={{ backgroundColor: "var(--card)" }}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-2xl font-semibold mb-6">Subreddit Recommendations</h2>
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
            boxShadow: "0 0 0 2px var(--accent)",
          }}
          aria-label="Reddit username for subreddit recommendations"
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
            "Get Recommendations"
          )}
        </motion.button>
      </form>
      {error && (
        <motion.p className="text-red-500 mt-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
          {error}
        </motion.p>
      )}
      <ErrorBoundary>
        {recommendations.length > 0 && (
          <motion.ul className="mt-6 space-y-4">
            {recommendations.map((rec, index) => (
              <motion.li
                key={rec.subreddit || index} // Use subreddit name or index as fallback
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="p-4 rounded-lg"
                style={{ backgroundColor: "var(--input)" }}
              >
                <p>
                  Subreddit: <strong>{rec.subreddit}</strong> - Reason: {rec.reason}
                </p>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </ErrorBoundary>
    </motion.div>
  );
}

export default RecommendSubreddits;