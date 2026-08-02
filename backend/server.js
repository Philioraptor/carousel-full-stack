const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).json({ status: "online", message: "Carousel AI Backend is live!" });
});

app.post('/api/generate-carousel', (req, res) => {
  const { topic } = req.body;
  
  if (!topic) {
    return res.status(400).json({ success: false, error: "Topic is required" });
  }

  // High-detail structured slides generation simulation
  const slides = [
    {
      slide: 1,
      title: `Mastering ${topic}`,
      content: `Unlock the foundational secrets and modern strategies behind ${topic}.`,
      imagePrompt: `Minimalist futuristic neon abstract vector illustration representing ${topic}, dark background`
    },
    {
      slide: 2,
      title: "Core Architecture & Flow",
      content: "Breaking down the mechanics step-by-step for absolute engineering clarity.",
      imagePrompt: `Clean modern data flow infographic, tech style, blue and purple palette, 4k`
    },
    {
      slide: 3,
      title: "Real-World Execution",
      content: "How top engineers deploy and scale this setup without breaking production.",
      imagePrompt: `Sleek dark mode dashboard analytics interface design, minimalist aesthetic`
    },
    {
      slide: 4,
      title: "The Ultimate Takeaway",
      content: "Automate your workflows, eliminate bottlenecks, and ship faster than ever.",
      imagePrompt: `Inspirational typographic minimalist concept art, sleek developer workspace`
    }
  ];

  res.status(200).json({
    success: true,
    topic,
    totalSlides: slides.length,
    slides
  });
});

app.get('/api/generate-image', (req, res) => {
  const prompt = req.query.prompt || "Abstract modern tech aesthetic";
  const encoded = encodeURIComponent(prompt);
  const imageUrl = `https://image.pollinations.ai/prompt/${encoded}?width=1080&height=1080&nologo=true`;

  res.status(200).json({ success: true, prompt, imageUrl });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
