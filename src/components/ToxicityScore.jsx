import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

function ToxicityScore({ theme }) {
  const [username, setUsername] = useState("");
  const [toxicity, setToxicity] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setToxicity(null);
    setLoading(true);
    try {
      const response = await axios.post("https://reddit-analyzer-backend-3w6f.onrender.com/toxicity-score", { username });
      console.log("Backend Response:", response.data); // For debugging
      const analysis = response.data.toxicity_analysis;
      if (
        response.data &&
        typeof response.data.username === "string" &&
        analysis &&
        typeof analysis.toxicity_score === "number" &&
        Number.isInteger(analysis.toxic_comments_count)
      ) {
        setToxicity({
          username: response.data.username,
          toxicity_score: analysis.toxicity_score,
          toxic_comments_count: analysis.toxic_comments_count,
          total_comments: analysis.total_comments,
          top_toxic_comments: analysis.top_toxic_comments || [],
          summary: analysis.summary || "",
        });
      } else {
        throw new Error("Invalid response format from server: " + JSON.stringify(response.data));
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
      <h2 className="text-2xl font-semibold mb-6">Toxicity Score</h2>
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
          aria-label="Reddit username for toxicity score analysis"
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
            "Get Toxicity Score"
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
      {toxicity && (
        <motion.div
          className="mt-6 p-6 rounded-lg result-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h3 className="font-semibold text-lg mb-4">Toxicity Analysis for {toxicity.username}</h3>
          <p>Toxicity Score: {(toxicity.toxicity_score ?? 0).toFixed(2)}%</p>
          <p>Toxic Comments: {toxicity.toxic_comments_count ?? "N/A"} (out of {toxicity.total_comments ?? "N/A"} total comments)</p>
          {toxicity.summary && <p className="mt-2">Summary: {toxicity.summary}</p>}
          {toxicity.top_toxic_comments.length > 0 && (
            <div className="mt-4">
              <h4 className="font-semibold text-md mb-2">Top Toxic Comments:</h4>
              <ul className="list-disc pl-5 space-y-2">
                {toxicity.top_toxic_comments.map((comment, index) => (
                  <li key={index}>
                    "{comment.body}" (Posted in {comment.subreddit} on {comment.posted_at}, Downvotes: {comment.downvotes ?? 0})
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}

export default ToxicityScore;