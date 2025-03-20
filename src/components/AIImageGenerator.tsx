import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { motion } from "framer-motion";
import axios from "axios";

const FIREWORKS_API_KEY = "your_fireworks_api_key";
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
    <div className="p-8 flex flex-col items-center bg-gray-900 min-h-screen text-white">
      <motion.h1 className="text-4xl font-bold mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Imagen - AI Image Generator</motion.h1>
      <div className="flex gap-4 w-full max-w-lg mb-6">
        <Input value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Enter your prompt..." className="w-full" />
        <Select onValueChange={setStyle} defaultValue={style}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Style" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="realistic">Realistic</SelectItem>
            <SelectItem value="anime">Anime</SelectItem>
            <SelectItem value="cyberpunk">Cyberpunk</SelectItem>
          </SelectContent>
        </Select>
        <Input type="number" min="1" max="5" value={count} onChange={(e) => setCount(Number(e.target.value))} className="w-16" />
      </div>
      <Button onClick={generateImages} disabled={loading} className="bg-blue-500 hover:bg-blue-600">{loading ? "Generating..." : "Generate"}</Button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {images.map((image, index) => (
          <Card key={index} className="overflow-hidden">
            <CardContent className="p-2">
              <motion.img src={image} alt="AI Generated" className="rounded-lg" initial={{ scale: 0.9 }} animate={{ scale: 1 }} />
              <Button className="mt-2 w-full" onClick={() => window.open(image, "_blank")}>
                Download
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
