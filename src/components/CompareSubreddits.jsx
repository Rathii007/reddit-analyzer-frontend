import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

function CompareSubreddits({ theme }) {
  const [subreddit1, setSubreddit1] = useState("");
  const [subreddit2, setSubreddit2] = useState("");
  const [comparison, setComparison] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setComparison(null);
    setLoading(true);
    try {
      const response = await axios.post("https://reddit-analyzer-backend-3w6f.onrender.com/compare-subreddits", { subreddit1, subreddit2 });
      if (response.data && response.data.comparison) {
        setComparison(response.data);
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
      className={`p-8 rounded-xl shadow-lg ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-2xl font-semibold mb-6">Compare Subreddits</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={subreddit1}
            onChange={(e) => setSubreddit1(e.target.value)}
            placeholder="Enter first subreddit (e.g., memes)"
            className={`w-full p-3 rounded-lg border ${
              theme === "dark" ? "bg-gray-700 border-gray-600 text-white" : "bg-gray-50 border-gray-300 text-gray-900"
            } focus:outline-none focus:ring-2 focus:ring-primary`}
            required
          />
          <input
            type="text"
            value={subreddit2}
            onChange={(e) => setSubreddit2(e.target.value)}
            placeholder="Enter second subreddit (e.g., funny)"
            className={`w-full p-3 rounded-lg border ${
              theme === "dark" ? "bg-gray-700 border-gray-600 text-white" : "bg-gray-50 border-gray-300 text-gray-900"
            } focus:outline-none focus:ring-2 focus:ring-primary`}
            required
          />
        </div>
        <motion.button
          type="submit"
          className={`w-full p-3 rounded-lg font-semibold ${
            theme === "dark" ? "bg-primary hover:bg-orange-600" : "bg-primary hover:bg-orange-500"
          } text-white flex justify-center items-center`}
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
            "Compare Subreddits"
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
      {comparison && comparison.comparison && (
        <motion.div
          className={`mt-6 p-6 rounded-lg ${theme === "dark" ? "bg-gray-700" : "bg-gray-50"}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h3 className="font-semibold text-lg mb-4">Subreddit Comparison</h3>
          <h4 className="font-medium mb-2">Sentiment Comparison:</h4>
          <p>r/{comparison.comparison.subreddit1}: {comparison.comparison.sentiment_comparison?.[comparison.comparison.subreddit1]?.toFixed(2) ?? "N/A"}</p>
          <p>r/{comparison.comparison.subreddit2}: {comparison.comparison.sentiment_comparison?.[comparison.comparison.subreddit2]?.toFixed(2) ?? "N/A"}</p>
          <h4 className="font-medium mt-4 mb-2">Engagement Comparison:</h4>
          <p>r/{comparison.comparison.subreddit1}: {comparison.comparison.engagement_comparison?.[comparison.comparison.subreddit1]?.toFixed(2) ?? "N/A"} average upvotes</p>
          <p>r/{comparison.comparison.subreddit2}: {comparison.comparison.engagement_comparison?.[comparison.comparison.subreddit2]?.toFixed(2) ?? "N/A"} average upvotes</p>
        </motion.div>
      )}
    </motion.div>
  );
}

export default CompareSubreddits;