require("dotenv").config();
const express = require("express");
const cors = require("cors");

const moodRoutes = require("./routes/mood");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/mood", moodRoutes);

// ADD THIS ROUTE
app.get("/", (req, res) => {
  res.send("YouTube Mood Prediction API is running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});