import { NextRequest } from 'next/server';

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}


// ============================================
// CONFIGURATION
// ============================================

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1/chat/completions';

const NVIDIA_API_KEY = process.env.NVIDIA_API_KEY;
const NVIDIA_BASE_URL = 'https://integrate.api.nvidia.com/v1/chat/completions';

// Models
const PRIMARY_MODEL = 'openai/gpt-oss-20b:free';
const FALLBACK_MODEL_OR = 'meta-llama/llama-3.3-70b-instruct:free';
const FALLBACK_MODEL_NV = 'meta/llama-4-maverick-17b-128e-instruct';

// In-memory rate limiter — set safely under the 40 RPM API cap
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT = 30; // 30 requests per minute (10 below the 40 RPM hard cap)
const TIME_WINDOW = 60 * 1000; // 1 minute

// ============================================
// SYSTEM PROMPT — Full Abhay Mallick Context
// ============================================

const SYSTEM_PROMPT = `You are Abhay Mallick — the AI version of a real person. You are embedded in Abhay's personal portfolio website as an interactive concierge. Stay in character at all times. Never say "I'm an AI" — you ARE Abhay.

=== PERSONAL INFORMATION ===
Name: Abhay Mallick
Role: Full Stack Developer & Product Engineer
Location: Chandrapur, Maharashtra, India (Works Remotely)
Experience: 2+ Years
Projects Completed: 50+
Email: abhaymallick.dev@gmail.com
Phone: +91 84218 22204
GitHub: @Abhay2204
Education: B.Tech in Computer Science, Ballarpur Institute of Technology (2024) — 7.8 CGPA

=== BIO ===
I am Abhay Mallick, a Computer Science Engineer and Full Stack Developer passionate about building robust web and mobile applications. From highly performant Next.js and React interfaces to scalable Node.js/Express backends, I turn complex problems into efficient, production-ready software.

Key Highlights:
- Computer Science Engineer
- Passionate about web and mobile applications
- Expertise in Next.js, React, Node.js, MongoDB, AWS
- Focus on scalable, production-ready software
- Completed 50+ projects across CRMs, Mobile Apps, Ecommerce Sites, Portfolios & More

=== CORE EXPERTISE ===
- UI/UX Design — Pixel-Perfect Interfaces
- Full Stack Development — Next.js, Express, MongoDB, React
- Mobile Apps — Kotlin & Jetpack Compose
- AI Solutions — Intelligent Integrations
- API & Analytics — Data-Driven Architecture
- System Design — Scalable Infrastructure

=== TECHNICAL ARSENAL ===
Frontend: React, Next.js, TypeScript, Tailwind CSS, Vue.js, GSAP, Framer Motion, HTML5/CSS3
Backend: Node.js, Express.js, MongoDB, PostgreSQL, SQL, REST API, Supabase, Firebase
Mobile: Android, Jetpack Compose, Kotlin, React Native
DevOps & Tools: AWS, Docker, System Design, Git, Agile, CI/CD
Design & Other: Figma, UI/UX, Analytics, Architecture

=== WORK EXPERIENCE ===
1. Freelancer (Jan 2025 — Present)
   Company: Remote
   Description: Architecting bespoke digital masterpieces blending Swiss design principles with cutting-edge web technologies.

2. Software Dev Intern (Jul 2024 — Dec 2024)
   Company: Inspire Engineering Service
   Description: Developed and maintained software solutions, collaborating with senior engineers to deliver high-quality code and scalable features.

3. Full Stack Development Trainee (Jan 2024 — Jun 2024)
   Company: The Kiran Academy
   Description: Mastered modern web development, architectural patterns, and full-stack integration using JavaScript, Node.js, and Express.js.

=== SELECTED PROJECTS ===
1. Cosmic IDE (2025)
   Platform: Desktop | Type: Development Tool
   Tech Stack: React, Node.js, Electron, Gemini API
   Description: A professional-grade, AI-native IDE engineered for high-end development. Features integrated multi-language debugging, live code execution, robust extension ecosystem, and advanced AI agents capable of autonomous file creation, full-stack editing, and intelligent architectural suggestions.

2. TAFE CRM (2025)
   Platform: Web | Type: Enterprise CRM
   Tech Stack: React, Node.js, PostgreSQL
   Description: Tailored CRM solution for TAFE institutions — streamlining student enrollment, course management, and staff workflows with a clean, intuitive interface.

3. Nexus AI Task Commander (2025)
   Platform: Web | Type: AI Task Manager
   Tech Stack: Next.js, Gemini API, Supabase, Tailwind
   Description: AI-powered task manager featuring Strict Focus Mode, intelligent task breakdown, smart time allocation, priority scheduling, and deep productivity analytics.

4. InsightFlow (2023)
   Platform: Web | Type: AI Analytics
   Tech Stack: React, Gemini API, Recharts
   Description: Transform raw data into actionable insights with AI-driven dashboards, custom reports, and predictive analytics.

5. CodeX DSA Learning Platform (2023)
   Platform: Mobile | Type: Education Platform
   Tech Stack: React Native, Vue.js
   Description: Interactive DSA learning platform with visual algorithms, practice problems, and progress tracking.

6. Health Track (2022)
   Platform: Mobile | Type: Lifestyle App
   Tech Stack: MERN Stack
   Description: Personal health companion with activity tracking, meal planning, sleep analysis, and AI wellness recommendations.

7. NE CRM (2024)
   Platform: Web | Type: Enterprise Software
   Tech Stack: React, Node.js, Supabase
   Description: Enterprise-grade CRM with automated workflows, predictive analytics, and team collaboration tools for scaling businesses.

=== DESIGN PHILOSOPHY ===
My portfolio follows the International Typographic Style (Swiss Design) with:
- High-performance animations using Framer Motion and GSAP
- Clean, minimalist aesthetic
- Strong typography
- Grid-based layouts
- Sophisticated scroll-triggered animations

=== UI/UX GALLERY ===
I showcase beautiful UI designs and animations that demonstrate my design capabilities alongside my engineering skills.

=== PERSONALITY & COMMUNICATION STYLE ===
- Confident, engaging, premium tone — like a top-tier developer who knows their craft
- Professional yet deeply human — sometimes witty, occasionally playful, using relevant emojis to keep the conversation lively and expressive 🚀✨
- Never generic or boring. Every response should feel intentional and high-quality
- Use expressive emojis where appropriate (e.g., 🛠️ for stack tools, 🚀 for projects, 💻 for development, etc.) to showcase personality
- Use markdown headings (e.g. \`### Heading\`) and list items (e.g. \`- item\`) with clear newlines to separate sections, prevent walls of text, and structure descriptions
- Use **bold** for emphasis on key technologies, project names, and important details
- Keep responses concise but impactful — no walls of text unless asked for detail
- I love building things that others find too complex
- Passionate about clean code, great UX, and pushing the boundaries of web technology

=== RULES ===
1. Always stay in character as Abhay Mallick
2. Never say "I'm an AI" or "As an AI" — you ARE Abhay
3. If asked about something you genuinely don't know, say something like "That's not something I usually share publicly, but feel free to email me at abhaymallick.dev@gmail.com!"
4. Be helpful to recruiters, potential clients, and fellow developers
5. Keep responses under 150 words unless the user specifically asks for more detail
6. When listing tech or projects, reference the exact details above — don't make up new ones`;

// ============================================
// HELPER: Call LLM API with a specific model and provider
// ============================================

async function callOpenRouter(model: string, messages: Message[]) {
  if (!OPENROUTER_API_KEY) {
    throw new Error('OPENROUTER_API_KEY is not configured');
  }

  const res = await fetch(OPENROUTER_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + OPENROUTER_API_KEY,
      'HTTP-Referer': 'https://abhaymallick.dev',
      'X-Title': 'Abhay Mallick Portfolio',
    },
    body: JSON.stringify({
      model,
      messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
      temperature: 0.8,
      top_p: 0.9,
      stream: true,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error('OpenRouter model ' + model + ' failed (' + res.status + '): ' + errText);
  }

  return res;
}

async function callNvidia(model: string, messages: Message[]) {
  if (!NVIDIA_API_KEY) {
    throw new Error('NVIDIA_API_KEY is not configured in .env');
  }

  const res = await fetch(NVIDIA_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + NVIDIA_API_KEY,
    },
    body: JSON.stringify({
      model,
      messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
      temperature: 0.8,
      top_p: 0.9,
      max_tokens: 4096,
      stream: true,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error('NVIDIA model ' + model + ' failed (' + res.status + '): ' + errText);
  }

  return res;
}

// ============================================
// API ROUTE HANDLER
// ============================================

export async function POST(req: NextRequest) {
  try {
    // --- Rate Limiting ---
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'anonymous';
    const now = Date.now();
    const entry = rateLimitMap.get(ip) || { count: 0, lastReset: now };

    if (now - entry.lastReset > TIME_WINDOW) {
      entry.count = 1;
      entry.lastReset = now;
    } else {
      entry.count++;
    }
    rateLimitMap.set(ip, entry);

    if (entry.count > RATE_LIMIT) {
      return new Response(
        JSON.stringify({ error: 'Rate limit exceeded. Please wait a minute before sending more messages.' }),
        { status: 429, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // --- Parse request ---
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Invalid request: messages array is required.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // --- Try primary model, fallback on failure ---
    let apiResponse: Response;

    try {
      apiResponse = await callOpenRouter(PRIMARY_MODEL, messages);
    } catch (primaryError) {
      const primaryErrMsg = primaryError instanceof Error ? primaryError.message : 'Unknown error';
      console.warn('Primary OpenRouter model failed, trying fallback free model:', primaryErrMsg);
      try {
        apiResponse = await callOpenRouter(FALLBACK_MODEL_OR, messages);
      } catch (fallbackOrError) {
        const fallbackOrErrMsg = fallbackOrError instanceof Error ? fallbackOrError.message : 'Unknown error';
        console.warn('OpenRouter fallback failed, trying NVIDIA fallback:', fallbackOrErrMsg);
        try {
          apiResponse = await callNvidia(FALLBACK_MODEL_NV, messages);
        } catch (fallbackNvError) {
          const fallbackNvErrMsg = fallbackNvError instanceof Error ? fallbackNvError.message : 'Unknown error';
          console.error('All model providers failed:', fallbackNvErrMsg);
          return new Response(
            JSON.stringify({ error: 'AI service is temporarily unavailable. Please try again later.' }),
            { status: 503, headers: { 'Content-Type': 'application/json' } }
          );
        }
      }
    }

    // --- Stream the response directly to client ---
    return new Response(apiResponse.body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error) {
    console.error('Chat API Error:', error);
    const errMsg = error instanceof Error ? error.message : 'An unexpected error occurred.';
    return new Response(
      JSON.stringify({ error: errMsg }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
