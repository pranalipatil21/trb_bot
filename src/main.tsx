import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleGenAI } from "@google/genai";
import './index.css';


const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

type Message = {
  role: 'user' | 'ai';
  content: string;
};

const App = () => {
  const [activeTab, setActiveTab] = useState<'support' | 'risk'>('support');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', content: "Welcome to the Red Baron Intelligence Hub. How can I assist you with your ATV needs today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const systemInstruction = activeTab === 'support'
        ? "You are the Red Baron motocorp Post-Sales AI Assistant. Provide maintenance, troubleshooting, and warranty advice for custom ATVs. Be technical, helpful, and precise."
        : "You are the Red Baron motocorp Risk Analyst. Analyze market trends, supply chain logistics, and environmental regulations for motorsports. Predict risks and suggest mitigation strategies.";

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: { systemInstruction },
      });

      setMessages(prev => [...prev, { role: 'ai', content: response.text || "Connection lost. Please retry." }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', content: "Error accessing AI core. Please check your connection." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleContact = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = fd.get('name');
    const msg = fd.get('message');
    const email = fd.get('email');
    
    const subject = `Inquiry from ${name} via Red Baron motocorp Website`;
    const body = `From: ${name} (${email})\n\nMessage:\n${msg}`;
    
    // Fixed: Opens the user's default email app with your email address
    window.location.href = `mailto:patilpranali453@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="relative min-h-screen selection:bg-rose-500 selection:text-white">
      <video autoPlay loop muted id="bg-video">
        <source src="/trb25.mp4" type="video/mp4" />
      </video>

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass-nav py-4 px-8 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
          <span className="brand-font text-xl font-black tracking-widest text-white"> RED BARON motocorp</span>
        </div>
        <div className="hidden lg:flex gap-8 text-xs font-bold uppercase tracking-widest">
          {['Home', 'About Us', 'Team', 'Sponsors', 'Gallery', 'Journey'].map(item => (
            <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="hover:text-rose-500 transition-colors">{item}</a>
          ))}
          <a href="#contact" className="text-rose-500 font-black">Contact</a>
        </div>
      </nav>

      {/* Hero */}
      <section id="home" className="relative h-screen flex flex-col justify-center items-center text-center px-4 hero-gradient">
        <h1 className="text-6xl md:text-8xl font-black mb-4 animate-pulse">RED BARON motocorp</h1>
        <h2 className="text-xl md:text-2xl font-light tracking-[0.5em] text-rose-500 mb-8 uppercase">Inspired To Build, Determined To Win.</h2>
        <p className="max-w-2xl text-slate-400 text-lg">
          Pushing the boundaries of motorsports through engineering excellence and strategic AI integration.
        </p>
      </section>

      {/* AI Scenarios Section */}
      <section id="ai-strategy" className="py-24 bg-slate-950/80">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-4xl font-black mb-12 border-l-4 border-rose-500 pl-6 uppercase">AI Integration Strategy</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-slate-900 p-8 rounded-2xl border border-white/5 hover:border-rose-500/50 transition-all">
              <i className="fas fa-shield-virus text-4xl text-rose-500 mb-6"></i>
              <h3 className="text-2xl font-bold mb-4">Risk Assessment & Mitigation</h3>
              <p className="text-slate-400 mb-6">Using AI to analyze logistics, commodity trends, and market disruptions. Our engine provides real-time predictions for supply chain stability.</p>
              <button onClick={() => { setShowChat(true); setActiveTab('risk'); }} className="text-rose-500 text-sm font-black uppercase hover:underline">Run Risk Simulation →</button>
            </div>
            <div className="bg-slate-900 p-8 rounded-2xl border border-white/5 hover:border-rose-500/50 transition-all">
              <i className="fas fa-headset text-4xl text-rose-500 mb-6"></i>
              <h3 className="text-2xl font-bold mb-4">AI Customer Support (Post-Sales)</h3>
              <p className="text-slate-400 mb-6">Intelligent troubleshooting for maintenance and technical queries. Enhancing the customer experience through 24/7 technical accessibility.</p>
              <button onClick={() => { setShowChat(true); setActiveTab('support'); }} className="text-rose-500 text-sm font-black uppercase hover:underline">Launch Support Bot →</button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section - FIXED */}
      <section id="contact" className="py-24 px-8">
        <div className="max-w-4xl mx-auto bg-slate-900 border border-white/10 rounded-3xl p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/20 blur-3xl rounded-full"></div>
          <h2 className="text-3xl font-black mb-8 uppercase tracking-widest">Contact Team </h2>
          <form onSubmit={handleContact} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input name="name" placeholder="YOUR NAME" className="bg-slate-800 border-none rounded-xl p-4 focus:ring-2 focus:ring-rose-500 outline-none" required />
            <input name="email" type="email" placeholder="YOUR EMAIL" className="bg-slate-800 border-none rounded-xl p-4 focus:ring-2 focus:ring-rose-500 outline-none" required />
            <textarea name="message" placeholder="TELL US ABOUT YOUR PROJECT..." className="md:col-span-2 bg-slate-800 border-none rounded-xl p-4 h-32 focus:ring-2 focus:ring-rose-500 outline-none" required></textarea>
            <button type="submit" className="md:col-span-2 bg-rose-600 hover:bg-rose-500 text-white font-black py-4 rounded-xl shadow-lg shadow-rose-900/40 transition-all active:scale-95 uppercase tracking-widest">
              Send Message to HQ
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 text-center text-slate-500">
        <div className="flex justify-center gap-6 mb-4 text-xl">
          <a href="#"><i className="fab fa-linkedin hover:text-white transition"></i></a>
          <a href="#"><i className="fab fa-instagram hover:text-white transition"></i></a>
          <a href="#"><i className="fab fa-youtube hover:text-white transition"></i></a>
        </div>
        <p className="text-xs uppercase tracking-widest font-bold">©2025 RED BARON motocorp | DETERMINED TO WIN</p>
      </footer>

      {/* Floating Chatbot UI */}
      {!showChat ? (
        <button 
          onClick={() => setShowChat(true)}
          className="fixed bottom-8 right-8 w-16 h-16 bg-rose-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-90 transition-all z-[100]"
        >
          <i className="fas fa-robot text-2xl"></i>
        </button>
      ) : (
        <div className="fixed bottom-8 right-8 w-[90vw] md:w-[400px] h-[600px] bg-slate-900 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10 flex flex-col z-[100] overflow-hidden">
          <div className="bg-rose-600 p-5 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <i className="fas fa-brain text-white"></i>
              </div>
              <div>
                <p className="font-bold text-sm text-white"> Red Baron motocorp Intelligence</p>
                <div className="flex items-center gap-1.5">
                   <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                   <span className="text-[10px] text-white/80 uppercase font-black tracking-tighter">Gemini Pro 2.5 Active</span>
                </div>
              </div>
            </div>
            <button onClick={() => setShowChat(false)} className="text-white hover:bg-white/10 p-2 rounded-full"><i className="fas fa-times"></i></button>
          </div>

          <div className="flex p-2 bg-slate-800/50 m-4 rounded-xl gap-2">
            <button 
              onClick={() => setActiveTab('support')}
              className={`flex-1 py-2 text-[10px] font-black uppercase rounded-lg transition-all ${activeTab === 'support' ? 'bg-rose-600 text-white' : 'text-slate-500'}`}
            >
              Post-Sales Support
            </button>
            <button 
              onClick={() => setActiveTab('risk')}
              className={`flex-1 py-2 text-[10px] font-black uppercase rounded-lg transition-all ${activeTab === 'risk' ? 'bg-rose-600 text-white' : 'text-slate-500'}`}
            >
              Risk Analysis
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-4 py-3 text-sm leading-relaxed ${m.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'}`}>
                  {m.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="chat-bubble-ai px-4 py-3 flex gap-1">
                  <div className="w-1 h-1 bg-slate-500 rounded-full animate-bounce"></div>
                  <div className="w-1 h-1 bg-slate-500 rounded-full animate-bounce delay-100"></div>
                  <div className="w-1 h-1 bg-slate-500 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="p-4 border-t border-white/5 flex gap-2">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={activeTab === 'support' ? "Ask about your ATV build..." : "Analyze logistics risk..."}
              className="flex-1 bg-slate-800 border-none rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-rose-500 outline-none"
            />
            <button type="submit" disabled={isLoading} className="bg-rose-600 w-12 h-12 rounded-xl flex items-center justify-center disabled:opacity-50">
              <i className="fas fa-paper-plane"></i>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);