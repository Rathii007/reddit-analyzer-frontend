import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

function ViralPost({ theme }) {
  const [username, setUsername] = useState("");
  const [topic, setTopic] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setPrediction(null);
    setLoading(true);
    try {
      const response = await axios.post("https://reddit-analyzer-backend-3w6f.onrender.com/predict-viral-post", { username, topic });
      console.log("Backend Response:", response.data); // Log the response for debugging
      const predData = response.data.prediction;
      if (
        response.data &&
        predData &&
        typeof predData.text === "string"
      ) {
        setPrediction({
          text: predData.text,
          context: predData.context || {
            top_subreddit: null,
            past_successful_posts: [],
            note: null,
          },
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

  // Split prediction into lines for safer rendering
  const renderPredictionLines = (text) => {
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
      <h2 className="text-2xl font-semibold mb-6">Viral Post Prediction</h2>
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
          aria-label="Reddit username for viral post prediction"
          required
        />
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter post topic (e.g., dank memes)"
          className="w-full p-3 rounded-lg border focus:outline-none"
          style={{
            backgroundColor: "var(--input)",
            borderColor: "var(--input)",
            color: "var(--text)",
            boxShadow: "0 0 0 2px var(--accent)",
          }}
          aria-label="Post topic for viral post prediction"
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
            "Predict Viral Post"
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
      {prediction && prediction.text.trim().length > 0 && (
        <motion.div
          className="mt-6 p-6 rounded-lg result-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h3 className="font-semibold text-lg mb-2">Viral Post Prediction for {username}</h3>
          <div className="prose max-w-none">{renderPredictionLines(prediction.text)}</div>
          {prediction.context.top_subreddit && (
            <p className="mt-2">Top Subreddit: {prediction.context.top_subreddit}</p>
          )}
          {prediction.context.past_successful_posts.length > 0 && (
            <div className="mt-2">
              <h4 className="font-semibold text-md mb-1">Past Successful Posts:</h4>
              <ul className="list-disc pl-5 space-y-1">
                {prediction.context.past_successful_posts.map((post, index) => (
                  <li key={index}>
                    "{post.title}" (Upvotes: {post.upvotes}, Posted on {post.posted_at})
                  </li>
                ))}
              </ul>
            </div>
          )}
          {prediction.context.note && (
            <p className="mt-2">Note: {prediction.context.note}</p>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}

export default ViralPost;