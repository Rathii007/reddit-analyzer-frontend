import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

function TimeMachine({ theme }) {
  const [username, setUsername] = useState("");
  const [timeMachine, setTimeMachine] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setTimeMachine(null);
    setLoading(true);
    try {
      const response = await axios.post("https://reddit-analyzer-backend-3w6f.onrender.com/time-machine", { username });
      console.log("Backend Response:", response.data); // Log the response for debugging
      const timeData = response.data.time_machine;
      if (
        response.data &&
        typeof response.data.username === "string" &&
        timeData &&
        typeof timeData.oldest_activity_date === "string" &&
        timeData.oldest_post &&
        typeof timeData.oldest_post.title === "string" &&
        typeof timeData.oldest_post.subreddit === "string" &&
        typeof timeData.oldest_post.posted_at === "string" &&
        timeData.oldest_comment &&
        typeof timeData.oldest_comment.body === "string" &&
        typeof timeData.oldest_comment.subreddit === "string" &&
        typeof timeData.oldest_comment.posted_at === "string"
      ) {
        setTimeMachine({
          username: response.data.username,
          oldest_activity_date: timeData.oldest_activity_date,
          oldest_post: {
            title: timeData.oldest_post.title,
            subreddit: timeData.oldest_post.subreddit,
            posted_at: timeData.oldest_post.posted_at,
          },
          oldest_comment: {
            body: timeData.oldest_comment.body,
            subreddit: timeData.oldest_comment.subreddit,
            posted_at: timeData.oldest_comment.posted_at,
          },
          narrative: timeData.narrative || "",
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
      <h2 className="text-2xl font-semibold mb-6">Reddit Time Machine</h2>
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
          aria-label="Reddit username for time machine analysis"
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
            "Travel Back in Time"
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
      {timeMachine && (
        <motion.div
          className="mt-6 p-6 rounded-lg result-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h3 className="font-semibold text-lg mb-4">Time Machine for {timeMachine.username}</h3>
          <p>Oldest Activity Date: {timeMachine.oldest_activity_date || "N/A"}</p>
          <p>
            Oldest Post: "{timeMachine.oldest_post.title}" (Posted in {timeMachine.oldest_post.subreddit} on{" "}
            {timeMachine.oldest_post.posted_at})
          </p>
          <p>
            Oldest Comment: "{timeMachine.oldest_comment.body}" (Posted in {timeMachine.oldest_comment.subreddit} on{" "}
            {timeMachine.oldest_comment.posted_at})
          </p>
          {timeMachine.narrative && <p className="mt-2">Narrative: {timeMachine.narrative}</p>}
        </motion.div>
      )}
    </motion.div>
  );
}

export default TimeMachine;