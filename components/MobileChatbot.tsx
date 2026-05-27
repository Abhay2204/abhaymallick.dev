'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ============================================
// CONFIGURATION
// ============================================

// Optimized to only load the smallest essential videos for mobile
const AVATAR_ASSETS = {
  idle: '/mobile/commo image.png',
  typing: ['/mobile/typing2.mp4'],
  speaker: '/mobile/speaker up.mp4',
};

const RESPONSES = {
  me: {
    normal: [
      { text: "I am **Abhay Mallick**, a *Full Stack Developer* and *Product Engineer* specializing in high-performance digital solutions. My expertise lies in building seamless, full-scale applications using **Next.js**, **React**, and **Vue.js**, backed by robust **Node.js/Express** architectures." },
      { text: "I build the things others find too complex. My work is defined by a deep understanding of **Modern Web Stacks** — specifically **Next.js 15**, **TypeScript**, and **Cloud Scalability (AWS)**. I engineer products that handle real-world scale with optimized **MongoDB/SQL** backends." }
    ],
    funny: [
      { text: "Besides being a dev, I'm also really good at making coffee disappear and turning bugs into 'features'. If you're looking for someone who can code and keep the vibes high, you've found him. Maybe we should stop talking about code for a second? 😉" }
    ],
    annoyed: [
      { text: "Still checking who I am? I haven't changed! I'm **Abhay Mallick**, a developer who builds things that don't break. Now, pick a different button." },
      { text: "Are you trying to find a secret bio? I specialize in **Next.js and Node.js**. That's the bio. Now explore my **Works**." },
      { text: "Okay, you're either a fan of my name or you're stuck. Check out my **Tech Stack** to see how I actually build things." }
    ]
  },

  experience: {
    normal: [
      { text: "My professional journey covers everything from **Enterprise CRMs** to **E-commerce platforms**. I've mastered the development lifecycle, ensuring architectural integrity and high availability on **AWS**." },
      { text: "Successfully delivered over **50+ projects**, utilizing **Modern DevOps** and **Cloud Workflows**. I specialize in moving fast using **Node.js** and **React** without compromising on quality." }
    ],
    funny: [
      { text: "My experience includes surviving 2,000+ merge conflicts and only crying twice. I'm basically a veteran in the 'JavaScript fatigue' wars. 😉" }
    ],
    annoyed: [
      { text: "My experience isn't going to grow just because you keep clicking. I've built 50+ projects, interned at Inspire, and now I'm here." },
      { text: "I can't add an internship mid-conversation! **Jul-Dec 2024 at Inspire**, **Jan-Jun 2024 trainee**. That's it." },
      { text: "Is my timeline not impressive enough? I've been grinding in the **MERN** stack for 2+ years. Pressing this won't make it 3 years yet!" }
    ]
  },

  projects: {
    normal: [
      { text: "My flagship project is **Cosmic IDE**, a powerful tool with **full debugging**, **native execution**, and an **extension ecosystem**. It even features **AI-native file creation**." },
      { text: "I've also built **TAFE CRM**, **Nexus AI**, and **InsightFlow**. I prioritize **PostgreSQL/MongoDB** and **AWS** for global scaling and security." }
    ],
    funny: [
      { text: "I build so many projects that my keyboard is starting to file for a restraining order. But hey, at least the code is clean! 😉" }
    ],
    annoyed: [
      { text: "Cosmic IDE is still my flagship. Maybe it's time to stop clicking and actually **Reach Out**?" },
      { text: "Still looking for **The One Project**? They're all good! **TAFE CRM**, **Nexus AI**, **Cosmic IDE**... they demonstrate everything I do." },
      { text: "Spamming my projects won't manifest a new one. I'm currently working on something big, but it's not ready yet!" }
    ]
  },

  tech: {
    normal: [
      { text: "My stack: **Next.js**, **React**, **Vue.js**, **Node.js**, and **Express.js**. I handle both **MongoDB** and **SQL** database designs." },
      { text: "I leverage **AWS** for infrastructure, focusing on **Serverless**, **SSR**, and **Real-time systems**. My frontend is powered by **Framer Motion** and **GSAP**." }
    ],
    funny: [
      { text: "I speak fluent JavaScript, but my true talent is making a white screen turn into a functional app without using 'important!' in CSS... mostly. 😉" }
    ],
    annoyed: [
      { text: "Next.js, React, Node, AWS... the list is the same. I promise my stack didn't suddenly include COBOL." },
      { text: "TypeScript, MongoDB, Postgres... I haven't switched to PHP in the last 5 seconds. Now, click **Who is Abhay?**." },
      { text: "I'm a modern developer. My stack is **Next.js 15**. That's the bleeding edge. There's nothing newer to show right now!" }
    ]
  },

  contact: {
    normal: [
      { text: "Ready to build something superior? Connect at **abhaymallick.dev@gmail.com** or call me at **+91 84218 22204**." },
      { text: "Explore my work on **GitHub (@Abhay2204)** or connect on **LinkedIn**. I'm always open to high-impact collaborations." }
    ],
    funny: [
      { text: "I'm great at replying to emails, but I'm even better at helping you win that 'who has the coolest app' competition. Call me? 😉" }
    ],
    annoyed: [
      { text: "If you want to talk to me, just send the email! **abhaymallick.dev@gmail.com** — it's right there!" },
      { text: "Are you testing the hover state or do you actually want to collaborate? Email is **abhaymallick.dev@gmail.com**." },
      { text: "You've found my contact info 4 times now. What's the hold up? **Reach Out** properly!" }
    ]
  }
};

// ============================================
// TYPES
// ============================================

interface Message {
  id: number;
  sender: 'abhay' | 'user';
  text: string;
  reasoning?: string;
}

// ============================================
// MAIN COMPONENT
// ============================================

export default function MobileChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: 'abhay', text: "I am **Abhay Mallick**. I engineer scalable systems and high-end digital experiences. What would you like to verify?" }
  ]);
  const [currentVideo, setCurrentVideo] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [buttonCount, setButtonCount] = useState<Record<string, number>>({});
  const [input, setInput] = useState("");
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const playVideo = (type: keyof typeof AVATAR_ASSETS) => {
    const asset = AVATAR_ASSETS[type];
    const source = Array.isArray(asset) ? asset[Math.floor(Math.random() * asset.length)] : asset;
    setCurrentVideo(source as string);
  };

  const handleAction = async (category: keyof typeof RESPONSES) => {
    if (isTyping) return;

    const newCounts = { ...buttonCount, [category]: (buttonCount[category] || 0) + 1 };
    setButtonCount(newCounts);

    const count = newCounts[category];
    const catPool = RESPONSES[category as keyof typeof RESPONSES];
    let selectedText = "";

    if (count <= 2) {
      selectedText = catPool.normal[count - 1]?.text || catPool.normal[0].text;
    } else if (count === 3) {
      selectedText = catPool.funny[0].text;
    } else {
      const idx = Math.floor(Math.random() * catPool.annoyed.length);
      selectedText = catPool.annoyed[idx].text;
    }

    const userLabel = category === 'me' ? "Who is Abhay?" :
      category === 'projects' ? "Recent Projects" :
      category === 'tech' ? "Your Tech Stack" :
      category === 'experience' ? "Work Experience" : "Get in Touch";

    const promptId = Date.now();
    setMessages(prev => [...prev, { id: promptId, sender: 'user', text: userLabel }]);
    
    setIsTyping(true);
    playVideo('typing');

    const responseId = Date.now() + 1;
    const fullText = selectedText;
    const totalDuration = 6000;
    const interval = 50;
    const steps = totalDuration / interval;
    const charsPerStep = Math.ceil(fullText.length / steps);
    
    setMessages(prev => [...prev, { id: responseId, sender: 'abhay', text: "" }]);

    for (let i = 1; i <= steps; i++) {
      const currentPos = Math.min(i * charsPerStep, fullText.length);
      const visibleText = fullText.slice(0, currentPos);
      
      setMessages(prev => {
        return prev.map(m => m.id === responseId ? { ...m, text: visibleText } : m);
      });

      if (currentPos >= fullText.length) break;
      await new Promise(r => setTimeout(r, interval));
    }

    setIsTyping(false);
    playVideo('speaker');
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userText = input;
    const userMsg: Message = { id: Date.now(), sender: 'user', text: userText };
    
    setInput("");
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);
    playVideo('typing');

    const responseId = Date.now() + 1;
    setMessages(prev => [...prev, { id: responseId, sender: 'abhay', text: "", reasoning: "" }]);

    try {
      const chatHistory = messages.map(m => ({
        role: m.sender === 'abhay' ? 'assistant' : 'user',
        content: m.text
      }));
      chatHistory.push({ role: 'user', content: userText });

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: chatHistory }),
      });

      if (response.status === 503) {
        setMessages(prev => prev.map(m => m.id === responseId ? { ...m, text: "Our AI service is temporarily unavailable. Please try again in a moment! 🔄" } : m));
        setIsTyping(false);
        return;
      }

      if (!response.ok) {
        let errorMsg = "Something went wrong on my end.";
        try {
          const errData = await response.json();
          errorMsg = errData.error || errorMsg;
        } catch (_) {}
        setMessages(prev => prev.map(m => m.id === responseId ? { ...m, text: errorMsg } : m));
        setIsTyping(false);
        return;
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No reader available');

      const decoder = new TextDecoder();
      let fullText = "";
      let fullReasoning = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6).trim();
            if (data === '[DONE]') break;
            try {
              const parsed = JSON.parse(data);
              const delta = parsed.choices?.[0]?.delta;
              
              if (delta) {
                if (delta.reasoning_content) {
                  fullReasoning += delta.reasoning_content;
                  setMessages(prev => prev.map(m => m.id === responseId ? { ...m, reasoning: fullReasoning } : m));
                }
                if (delta.content) {
                  fullText += delta.content;
                  setMessages(prev => prev.map(m => m.id === responseId ? { ...m, text: fullText } : m));
                }
              }
            } catch (e) {}
          }
        }
      }
    } catch (error) {
      console.error('Chat Error:', error);
      setMessages(prev => prev.map(m => m.id === responseId ? { ...m, text: "I'm having some trouble connecting right now." } : m));
    } finally {
      setIsTyping(false);
      playVideo('speaker');
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] bg-white flex flex-col md:hidden overflow-hidden font-sans select-none">

      <div className="flex-1 overflow-y-auto px-5 pt-6 pb-2 space-y-4 bg-white scroll-smooth">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex flex-col ${msg.sender === 'abhay' ? 'items-start' : 'items-end'}`}
            >
              {msg.text && (
                  <div
                    className={`max-w-[85%] px-4 py-3 rounded-2xl text-[12px] leading-relaxed shadow-sm ${msg.sender === 'abhay'
                        ? 'bg-gray-50 text-[#2b2b2b] border border-gray-100 rounded-tl-none'
                        : 'bg-[#4a7c7e] text-white rounded-tr-none font-bold'
                      }`}
                    dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>').replace(/\*(.*?)\*/g, '<i>$1</i>') }}
                  />
              )}
            </motion.div>
          ))}
          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
              <div className="bg-gray-50 px-4 py-2 rounded-xl flex gap-1 items-center">
                <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={chatEndRef} className="h-6" />
      </div>

      <div className="relative w-full h-[20vh] bg-white flex items-center justify-center border-y border-gray-50">
        <div className="relative w-full h-full">
          <img src={AVATAR_ASSETS.idle} className="absolute inset-0 w-full h-full object-contain" alt="Avatar" />
          <video
            key={currentVideo || 'none'}
            src={currentVideo ? currentVideo : undefined}
            className={`absolute inset-0 w-full h-full object-contain bg-white transition-opacity duration-200 ${currentVideo ? 'opacity-100' : 'opacity-0'}`}
            autoPlay muted playsInline onEnded={() => setCurrentVideo(null)}
          />
        </div>
      </div>

      <div className="px-4 py-4 bg-white border-t border-gray-100 space-y-3">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[13px] focus:outline-none"
            disabled={isTyping}
          />
          <button
            type="submit"
            disabled={isTyping || !input.trim()}
            className="bg-[#2b2b2b] text-white px-4 rounded-xl active:scale-95 transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          </button>
        </form>
        <div className="grid grid-cols-2 gap-2 opacity-50">
          <button onClick={() => handleAction('me')} className="px-2 py-2 bg-gray-50 rounded-lg text-[9px] font-black uppercase text-[#2b2b2b] border border-gray-200">
            🧔 BIO
          </button>
          <button onClick={() => handleAction('experience')} className="px-2 py-2 bg-gray-50 rounded-lg text-[9px] font-black uppercase text-[#2b2b2b] border border-gray-200">
            💼 EXP
          </button>
        </div>
      </div>

    </div>
  );
}
