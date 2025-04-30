import { useState } from "react";
import { motion } from "framer-motion";
import SubredditRoast from "./SubredditRoast";
import UserRoast from "./UserRoast";
import Insights from "./Insights";
import Therapist from "./Therapist";
import Sentiment from "./Sentiment";
import CompareSubreddits from "./CompareSubreddits";
import ToxicityScore from "./ToxicityScore";
import ViralPost from "./ViralPost";
import TimeMachine from "./TimeMachine";
import RecommendSubreddits from "./RecommendSubreddits";
import ThemeToggle from "./ThemeToggle";

function AnalyzePage({ theme, toggleTheme }) {
  const [activeTab, setActiveTab] = useState("subreddit-roast");

  const tabs = [
    { id: "subreddit-roast", label: "Subreddit Roast", component: <SubredditRoast theme={theme} /> },
    { id: "user-roast", label: "User Roast", component: <UserRoast theme={theme} /> },
    { id: "insights", label: "User Insights", component: <Insights theme={theme} /> },
    { id: "therapist", label: "Reddit Therapist", component: <Therapist theme={theme} /> },
    { id: "sentiment", label: "Subreddit Sentiment", component: <Sentiment theme={theme} /> },
    { id: "compare-subreddits", label: "Compare Subreddits", component: <CompareSubreddits theme={theme} /> },
    { id: "toxicity-score", label: "Toxicity Score", component: <ToxicityScore theme={theme} /> },
    { id: "viral-post", label: "Viral Post Prediction", component: <ViralPost theme={theme} /> },
    { id: "time-machine", label: "Time Machine", component: <TimeMachine theme={theme} /> },
    { id: "recommend-subreddits", label: "Subreddit Recommendations", component: <RecommendSubreddits theme={theme} /> },
  ];

  return (
    <div
      data-theme={theme}
      className={`min-h-screen relative ${
        theme === "dark" ? "dark bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Header */}
      <motion.div
        className="flex justify-between items-center mb-8 p-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Reddit Analyzer</h1>
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      </motion.div>

      {/* Tab Navigation */}
      <motion.div
        className="flex flex-wrap gap-2 mb-8 p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            className={`px-4 py-2 rounded-lg font-semibold ${
              activeTab === tab.id
                ? "bg-primary text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
            onClick={() => setActiveTab(tab.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {tab.label}
          </motion.button>
        ))}
      </motion.div>

      {/* Content Area */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="p-6"
      >
        {tabs.find((tab) => tab.id === activeTab)?.component}
      </motion.div>
    </div>
  );
}

export default AnalyzePage;