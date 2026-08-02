import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Download, Loader2 } from 'lucide-react';

export default function App() {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!topic.trim()) return;
    setLoading(true);

    try {
      // Replace with your deployed Render Backend URL once live
      const backendUrl = "https://carousel-full-stack.onrender.com";
      
      const res = await fetch(backendUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic })
      });
      const data = await res.json();
      
      if (data.success) {
        // Fetch matching image URLs for each slide
        const enrichedSlides = await Promise.all(data.slides.map(async (slide) => {
          const imgRes = await fetch(`https://image.pollinations.ai/prompt/${encodeURIComponent(slide.imagePrompt)}?width=1080&height=1080&nologo=true`);
          return { ...slide, imageUrl: imgRes.url };
        }));
        setSlides(enrichedSlides);
        setCurrentIndex(0);
      }
    } catch (err) {
      console.error("Error generating carousel:", err);
      // Fallback mock slides if backend isn't connected yet
      setSlides([
        {
          slide: 1,
          title: `Intro to ${topic}`,
          content: "Exploring the fundamentals and core principles.",
          imageUrl: "https://image.pollinations.ai/prompt/cyberpunk%20minimalist%20tech%20background?width=1080&height=1080&nologo=true"
        },
        {
          slide: 2,
          title: "Deep Dive Mechanics",
          content: "Understanding how the system operates under high load.",
          imageUrl: "https://image.pollinations.ai/prompt/futuristic%20data%20flow%20graphic%20blue?width=1080&height=1080&nologo=true"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 font-sans">
      <div className="max-w-xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent mb-2">
            AI Carousel Maker
          </h1>
          <p className="text-slate-400 text-sm">Generate stunning Instagram carousels instantly using AI & free container workers.</p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleGenerate} className="flex gap-2 mb-8">
          <input 
            type="text" 
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter any topic (e.g. Next.js 15, AI Agents)..." 
            className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500"
          />
          <button 
            type="submit" 
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-500 px-6 py-3 rounded-xl text-sm font-semibold flex items-center gap-2 transition disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            Generate
          </button>
        </form>

        {/* Carousel Preview Card */}
        {slides.length > 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
            {/* Visual Slide Box */}
            <div className="relative aspect-square bg-slate-950 flex flex-col justify-end p-8 overflow-hidden group">
              <img 
                src={slides[currentIndex].imageUrl} 
                alt="Slide background" 
                className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
              
              <div className="relative z-10">
                <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest mb-2 block">
                  Slide {slides[currentIndex].slide} of {slides.length}
                </span>
                <h2 className="text-2xl font-bold mb-3 leading-tight">{slides[currentIndex].title}</h2>
                <p className="text-slate-300 text-sm leading-relaxed">{slides[currentIndex].content}</p>
              </div>
            </div>

            {/* Navigation & Actions */}
            <div className="p-4 flex items-center justify-between border-t border-slate-800 bg-slate-900/50">
              <div className="flex gap-2">
                <button 
                  onClick={() => setCurrentIndex(prev => Math.max(prev - 1, 0))}
                  disabled={currentIndex === 0}
                  className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg disabled:opacity-30 transition"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setCurrentIndex(prev => Math.min(prev + 1, slides.length - 1))}
                  disabled={currentIndex === slides.length - 1}
                  className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg disabled:opacity-30 transition"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <a 
                href={slides[currentIndex].imageUrl} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-2 text-xs font-medium bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg transition"
              >
                <Download className="w-4 h-4" /> Download Slide
              </a>
            </div>
          </div>
        ) : (
          <div className="border border-dashed border-slate-800 rounded-2xl p-12 text-center text-slate-500">
            <p className="text-sm">Type a topic above to generate your first carousel preview.</p>
          </div>
        )}
      </div>
    </div>
  );
}
