import { useState } from "react";
import axios from "axios";

function App() {
  const [text, setText] = useState("");
  const [videos, setVideos] = useState([]);

  const getMoodMusic = async () => {
    try {
      const res = await axios.post("https://youtube-recommendation-5aw2.onrender.com/mood", {
        text: text,
      });

      setVideos(res.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h1>YouTube Mood Music RECOMMENDER 🎵</h1>

      <input
        type="text"
        placeholder="How are you feeling today?"
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ padding: "10px", width: "300px" }}
      />

      <br /><br />

      <button onClick={getMoodMusic} style={{ padding: "10px 20px" }}>
        Get Music
      </button>

      <div style={{ marginTop: "30px" }}>
        {videos.map((video) => (
          <div key={video.id.videoId} style={{ marginBottom: "20px" }}>
            <h4>{video.snippet.title}</h4>
            <iframe
              width="400"
              height="220"
              src={`https://www.youtube.com/embed/${video.id.videoId}`}
              title={video.snippet.title}
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
