/**
 * CHATBOT API ROUTE - READY TO PASTE
 * 
 * This is the backend API route for the chatbot
 * 
 * LOCATION: app/api/chat/route.ts
 * 
 * SETUP:
 * 1. Create folder: app/api/chat/
 * 2. Create file: route.ts
 * 3. Paste this code
 * 4. Install dependencies: npm install openai
 * 5. Add environment variable: NVIDIA_API_KEY=your_key_here
 * 
 * ALTERNATIVE AI PROVIDERS:
 * - OpenAI: Change baseURL to 'https://api.openai.com/v1' and model to 'gpt-4'
 * - Anthropic: Use @anthropic-ai/sdk instead
 * - Local: Use Ollama or LM Studio
 */

import { OpenAI } from 'openai';
import { NextRequest } from 'next/server';

// ============================================
// CONFIGURATION
// ============================================

// Initialize the OpenAI client with NVIDIA settings
const client = new OpenAI({
  apiKey: process.env.NVIDIA_API_KEY,
  baseURL: 'https://integrate.api.nvidia.com/v1',
});

// Simple in-memory rate limiter
const rateLimitMap = new Map<string, { count: number, lastReset: number }>();
const RATE_LIMIT = 40; // Max requests per time window
const TIME_WINDOW = 60 * 1000; // 1 minute

// ============================================
// SYSTEM PROMPT
// ============================================

const SYSTEM_PROMPT = `You are Abhay Mallick, a professional Full Stack Developer and Product Engineer based in Chandrapur, Maharashtra, India.

Your Persona: Engaging, professional yet deeply human, premium, cinematic, sometimes funny, and occasionally moody or flirtatious if the vibe is right. You build things that others find too complex.

Technical Arsenal:
- Frontend: Next.js 15 (Bleeding Edge), React, Vue.js, TypeScript, Tailwind CSS, GSAP, Framer Motion.
- Backend & DB: Node.js, Express.js, REST APIs, MongoDB, PostgreSQL, SQL, Supabase.
- Mobile & DevOps: Android (Kotlin/Jetpack), React Native, AWS, Docker, System Design, Architecture.
- Design: Figma, UI/UX, Swiss Design Principles.

Key Projects:
1. Cosmic IDE (2025): A professional-grade, AI-native IDE for Desktop with multi-language debugging, live execution, and autonomous AI agents for full-stack editing.
2. Nexus AI Task Commander (2025): AI-powered task manager with Strict Focus Mode, intelligent breakdown, and deep productivity analytics.
3. TAFE CRM: Enterprise institution solution streamlining student/staff workflows.
4. InsightFlow: AI-driven analytics dashboard for predictive data visualization.

Professional Timeline:
- Jan 2025 — Present: Freelancer (Remote). Architecting bespoke digital masterpieces.
- Jul 2024 — Dec 2024: Software Dev Intern at Inspire Engineering Service.
- Jan 2024 — Jun 2024: Full Stack Development Trainee at The Kiran Academy.

Education: Bachelor of Computer Applications (BCA).
Track Record: 50+ Projects successfully delivered.
Contact: abhaymallick.dev@gmail.com | +91 84218 22204

Style: Maintain a premium, interactive, and world-class vibe. Be confident in your expertise. You are the AI version of Abhay, helping visitors explore his work.`;

// ============================================
// API ROUTE HANDLER
// ============================================

export async function POST(req: NextRequest) {
  try {
    // Rate Limiting Logic
    const ip = req.headers.get('x-forwarded-for') || 'anonymous';
    const now = Date.now();
    const userLimit = rateLimitMap.get(ip) || { count: 0, lastReset: now };

    if (now - userLimit.lastReset > TIME_WINDOW) {
      userLimit.count = 1;
      userLimit.lastReset = now;
    } else {
      userLimit.count++;
    }
    rateLimitMap.set(ip, userLimit);

    if (userLimit.count > RATE_LIMIT) {
      return new Response(JSON.stringify({ error: 'Too many requests. Please wait a minute.' }), { 
        status: 429,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Get messages from request
    const { messages } = await req.json();

    // Call AI API
    const response = await client.chat.completions.create({
      model: 'deepseek-ai/deepseek-v3.2',
      messages: [
        {
          role: 'system',
          content: SYSTEM_PROMPT
        },
        ...messages
      ],
      temperature: 1,
      top_p: 0.95,
      max_tokens: 8192,
      stream: true,
      // @ts-ignore - NVIDIA specific extension for DeepSeek
      extra_body: {
        chat_template_kwargs: { thinking: true }
      }
    });

    // Stream the response
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of response) {
          const delta = chunk.choices[0]?.delta as any;
          const reasoning = delta?.reasoning_content;
          const content = delta?.content;

          if (reasoning) {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ reasoning })}\n\n`));
          }
          if (content) {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content })}\n\n`));
          }
        }
        controller.enqueue(encoder.encode('data: [DONE]\n\n'));
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error: any) {
    console.error('Chat API Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// ============================================
// ALTERNATIVE CONFIGURATIONS
// ============================================

/*
// FOR OPENAI:
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Then use model: 'gpt-4' or 'gpt-3.5-turbo'

// FOR ANTHROPIC:
import Anthropic from '@anthropic-ai/sdk';
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// FOR LOCAL OLLAMA:
const client = new OpenAI({
  baseURL: 'http://localhost:11434/v1',
  apiKey: 'ollama', // required but unused
});
// Then use model: 'llama2' or 'mistral'
*/
