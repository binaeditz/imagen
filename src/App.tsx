import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const FIREWORKS_API_KEY = "fw_3ZT2yyqt4zk2443nZgYit7M7";
const API_URL = "https://api.fireworks.ai/v1/generate";

export default function Imagen() {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("realistic");
  const [count, setCount] = useState(1);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateImages = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        API_URL,
        { prompt, style, count },
        { headers: { Authorization: `Bearer ${FIREWORKS_API_KEY}` } }
      );
      setImages(response.data.images);
    } catch (error) {
      console.error("Error generating images:", error);
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: "20px", textAlign: "center", backgroundColor: "#121212", minHeight: "100vh", color: "white" }}>
      <motion.h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "20px" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        Imagen - AI Image Generator
      </motion.h1>
      <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginBottom: "20px" }}>
        <input 
          value={prompt} 
          onChange={(e) => setPrompt(e.target.value)} 
          placeholder="Enter your prompt..." 
          style={{ padding: "10px", width: "300px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <select value={style} onChange={(e) => setStyle(e.target.value)} style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}>
          <option value="realistic">Realistic</option>
          <option value="anime">Anime</option>
          <option value="cyberpunk">Cyberpunk</option>
        </select>
        <input 
          type="number" 
          min="1" max="5" 
          value={count} 
          onChange={(e) => setCount(Number(e.target.value))} 
          style={{ padding: "10px", width: "60px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
      </div>
      <button 
        onClick={generateImages} 
        disabled={loading} 
        style={{ padding: "10px 20px", backgroundColor: "#007BFF", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
        {loading ? "Generating..." : "Generate"}
      </button>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px", marginTop: "20px" }}>
        {images.map((image, index) => (
          <div key={index} style={{ padding: "10px", backgroundColor: "#1e1e1e", borderRadius: "10px" }}>
            <motion.img 
              src={image} 
              alt="AI Generated" 
              style={{ width: "100%", borderRadius: "10px" }}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
            />
            <button 
              style={{ marginTop: "10px", padding: "5px", width: "100%", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
              onClick={() => window.open(image, "_blank")}
            >
              Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
