import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

function Insights({ theme }) {
  const [username, setUsername] = useState("");
  const [insights, setInsights] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setInsights(null);
    setLoading(true);
    try {
      const response = await axios.post("https://reddit-analyzer-backend-3w6f.onrender.com/insights", { username });
      setInsights(response.data);
    } catch (err) {
      setError(err.response?.data?.detail || "Something went wrong");
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
      <h2 className="text-2xl font-semibold mb-6">User Insights</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter Reddit username"
          className={`w-full p-3 rounded-lg border ${
            theme === "dark" ? "bg-gray-700 border-gray-600 text-white" : "bg-gray-50 border-gray-300 text-gray-900"
          } focus:outline-none focus:ring-2 focus:ring-primary`}
          required
        />
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
            "Get Insights"
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
      {insights && insights.insights && (
        <motion.div
          className={`mt-6 p-6 rounded-lg ${theme === "dark" ? "bg-gray-700" : "bg-gray-50"}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h3 className="font-semibold text-lg mb-4">OSINT Insights for {insights.username}</h3>
          {insights.message ? (
            <p>{insights.message}</p>
          ) : (
            <>
              <h4 className="font-medium mb-2">Activity Summary:</h4>
              {insights.insights.activity_summary?.summary && (
                <motion.p
                  className="mb-4 italic"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {insights.insights.activity_summary.summary}
                </motion.p>
              )}
              <motion.ul
                className="list-disc pl-5 space-y-2 mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ staggerChildren: 0.1 }}
              >
                <motion.li initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.3 }}>
                  Account Age: {insights.insights.activity_summary?.account_age_years ?? "N/A"} years
                </motion.li>
                <motion.li initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.3 }}>
                  Total Posts: {insights.insights.activity_summary?.total_posts ?? "N/A"}
                </motion.li>
                <motion.li initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.3 }}>
                  Total Comments: {insights.insights.activity_summary?.total_comments ?? "N/A"}
                </motion.li>
                <motion.li initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.3 }}>
                  Total Karma: {insights.insights.activity_summary?.total_karma ?? "N/A"}
                </motion.li>
              </motion.ul>

              <h4 className="font-medium mb-2">Top Interests:</h4>
              {insights.insights.top_interests?.length > 0 ? (
                <motion.ul
                  className="list-disc pl-5 space-y-2 mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ staggerChildren: 0.1 }}
                >
                  {insights.insights.top_interests.map((item, index) => (
                    <motion.li
                      key={item.word}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {item.word}: {item.count} mentions
                    </motion.li>
                  ))}
                </motion.ul>
              ) : (
                <p className="mb-4">No significant keywords identified.</p>
              )}

              <h4 className="font-medium mb-2">Potential Interests:</h4>
              <motion.ul
                className="list-disc pl-5 space-y-2 mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ staggerChildren: 0.1 }}
              >
                {insights.insights.potential_interests?.map((interest, index) => (
                  <motion.li
                    key={interest}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {interest}
                  </motion.li>
                )) ?? <p>No potential interests identified.</p>}
              </motion.ul>

              <h4 className="font-medium mb-2">Posting Patterns:</h4>
              <motion.div
                className="space-y-2 mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ staggerChildren: 0.1 }}
              >
                <p>
                  <strong>Most Active Hours:</strong>{" "}
                  {insights.insights.posting_patterns?.most_active_hours
                    ?.map((hourData) => `${hourData.hour}:00 (${hourData.count} activities)`)
                    .join(", ") ?? "N/A"}
                </p>
                <p>
                  <strong>Most Active Days:</strong>{" "}
                  {insights.insights.posting_patterns?.most_active_days
                    ?.map((dayData) => `${dayData.day} (${dayData.count} activities)`)
                    .join(", ") ?? "N/A"}
                </p>
              </motion.div>

              <h4 className="font-medium mb-2">Subreddit Engagement:</h4>
              <motion.ul
                className="list-disc pl-5 space-y-2 mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ staggerChildren: 0.1 }}
              >
                {insights.insights.subreddit_engagement?.map((entry, index) => (
                  <motion.li
                    key={entry.subreddit}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    r/{entry.subreddit}: {entry.stats.activity_count} activities, {entry.stats.total_upvotes} upvotes, {entry.stats.total_downvotes} downvotes, Net Engagement: {entry.stats.net_engagement}
                  </motion.li>
                )) ?? <p>No subreddit engagement data available.</p>}
              </motion.ul>

              <h4 className="font-medium mb-2">Sentiment Analysis:</h4>
              <motion.div
                className="mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <p>Average Sentiment Score: {insights.insights.sentiment_analysis?.average_sentiment ?? "N/A"}</p>
                <p>Sentiment: {insights.insights.sentiment_analysis?.sentiment_label ?? "N/A"}</p>
              </motion.div>

              <h4 className="font-medium mb-2">Controversial Takes:</h4>
              {insights.insights.controversial_takes?.length > 0 && !insights.insights.controversial_takes[0].message ? (
                <motion.ul
                  className="list-disc pl-5 space-y-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ staggerChildren: 0.1 }}
                >
                  {insights.insights.controversial_takes.map((comment, index) => (
                    <motion.li
                      key={comment.id}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      "{comment.body}" (r/{comment.subreddit}, {comment.downvotes} downvotes)
                    </motion.li>
                  ))}
                </motion.ul>
              ) : (
                <p>{insights.insights.controversial_takes?.[0]?.message || "No controversial takes found."}</p>
              )}
            </>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}

export default Insights;