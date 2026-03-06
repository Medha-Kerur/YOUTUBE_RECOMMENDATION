const express = require("express");
const axios = require("axios");
const Sentiment = require("sentiment");

const router = express.Router();
const sentiment = new Sentiment();

const API_KEY = process.env.YOUTUBE_API_KEY;

function detectMood(text) {
  const score = sentiment.analyze(text).score;

  if (score > 2) {
    return "happy songs";
  } else if (score < -2) {
    return "sad songs";
  } else {
    return "relaxing music";
  }
}

router.post("/", async (req, res) => {
  try {
    const { text } = req.body;

    const mood = detectMood(text);

    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          part: "snippet",
          q: mood,
          key: API_KEY,
          maxResults: 5,
          type: "video",
        },
      }
    );

    res.json(response.data.items);
  } catch (error) {
    console.error("Error fetching YouTube videos:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;