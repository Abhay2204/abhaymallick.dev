# 🤖 Complete Chatbot Package - Ready to Paste

A premium, AI-powered chatbot with animated avatar for both desktop and mobile screens.

---

## 📦 What's Included

1. **Chatbot-Desktop-Standalone.tsx** - Desktop floating chatbot widget
2. **Chatbot-Mobile-Standalone.tsx** - Full-screen mobile chatbot
3. **Chatbot-API-Route.ts** - Backend API route for AI responses
4. **This README** - Complete setup instructions

---

## 🚀 Quick Start (5 Minutes)

### Step 1: Install Dependencies

```bash
npm install framer-motion openai
```

### Step 2: Setup API Route

1. Create folder structure: `app/api/chat/`
2. Create file: `app/api/chat/route.ts`
3. Copy content from `Chatbot-API-Route.ts`

### Step 3: Add Environment Variable

Create or edit `.env.local`:

```env
NVIDIA_API_KEY=your_nvidia_api_key_here
```

**Get your free NVIDIA API key:**
- Visit: https://build.nvidia.com/
- Sign up for free
- Get API key for DeepSeek model

### Step 4: Add Avatar Assets

Create folder: `public/mobile/`

Add these files:
- `commo image.png` - Idle avatar image
- `typing1.mp4` - Typing animation video
- `typing2.mp4` - Alternative typing animation
- `body strech.mp4` - Stretch animation
- `yawing.mp4` - Yawn animation
- `speaker up.mp4` - Speaking animation

**For Desktop only:**
- `public/chatbot.gif` - Floating button icon

### Step 5: Use the Components

**For Desktop:**
```tsx
import ChatWidget from './Chatbot-Desktop-Standalone'

export default function Page() {
  return (
    <>
      <ChatWidget />
      {/* Your other content */}
    </>
  )
}
```

**For Mobile:**
```tsx
import MobileChatbot from './Chatbot-Mobile-Standalone'

export default function Page() {
  return <MobileChatbot />
}
```

**For Both (Responsive):**
```tsx
'use client';
import { useState, useEffect } from 'react';
import ChatWidget from './Chatbot-Desktop-Standalone'
import MobileChatbot from './Chatbot-Mobile-Standalone'

export default function Page() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile ? <MobileChatbot /> : <ChatWidget />;
}
```

---

## 🎨 Customization Guide

### Change the Bot's Personality

Edit `SYSTEM_PROMPT` in `Chatbot-API-Route.ts`:

```typescript
const SYSTEM_PROMPT = `You are [Your Name], a [Your Role]...`;
```

### Change Quick Response Buttons

Edit `RESPONSES` object in the chatbot components:

```typescript
const RESPONSES = {
  me: {
    normal: [
      { text: "Your custom response here..." }
    ],
    // ... more responses
  }
}
```

### Change Colors

**Desktop Chatbot:**
- Background: Search for `bg-[#2b2b2b]` and replace with your color
- Accent: Search for `bg-teal-` and replace

**Mobile Chatbot:**
- Same as desktop

### Add More Quick Action Buttons

In the footer section, add more buttons:

```tsx
<button onClick={() => handleAction('yourCategory')} className="...">
  🎯 YOUR LABEL
</button>
```

Then add the category to `RESPONSES` object.

---

## 🔧 Alternative AI Providers

### Use OpenAI Instead

In `Chatbot-API-Route.ts`:

```typescript
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// In the API call:
model: 'gpt-4' // or 'gpt-3.5-turbo'
```

### Use Anthropic Claude

```bash
npm install @anthropic-ai/sdk
```

```typescript
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});
```

### Use Local Ollama

```typescript
const client = new OpenAI({
  baseURL: 'http://localhost:11434/v1',
  apiKey: 'ollama',
});

// Use model: 'llama2' or 'mistral'
```

---

## 📱 Features

### Desktop Chatbot
- ✅ Floating button in bottom-right corner
- ✅ Animated avatar with video responses
- ✅ Full-screen modal overlay
- ✅ Quick action buttons
- ✅ Real-time AI streaming responses
- ✅ Thinking process display
- ✅ Rate limiting protection
- ✅ Smooth animations

### Mobile Chatbot
- ✅ Full-screen immersive experience
- ✅ Animated avatar at center
- ✅ Touch-optimized interface
- ✅ Auto-scroll to latest message
- ✅ Quick action buttons
- ✅ Real-time AI streaming
- ✅ Idle animations (stretch, yawn)

---

## 🎭 Avatar Animation System

The chatbot uses different animations based on state:

- **Idle**: Static image when not active
- **Typing**: Plays when bot is generating response
- **Speaking**: Plays after response is complete
- **Stretch/Yawn**: Random idle animations (mobile only)

**How it works:**
1. User sends message
2. Bot plays "typing" animation
3. Response streams in real-time
4. Bot plays "speaking" animation
5. Returns to idle state

---

## 🛡️ Rate Limiting

Built-in rate limiting prevents abuse:
- **40 requests per minute** per IP address
- Automatically resets after 1 minute
- Returns 429 status when exceeded

**To adjust:**
```typescript
const RATE_LIMIT = 40; // Change this number
const TIME_WINDOW = 60 * 1000; // Change time window
```

---

## 🐛 Troubleshooting

### "Module not found: framer-motion"
```bash
npm install framer-motion
```

### "Module not found: openai"
```bash
npm install openai
```

### API returns 401 Unauthorized
- Check your `.env.local` file
- Verify `NVIDIA_API_KEY` is set correctly
- Restart your dev server

### Avatar videos not playing
- Check file paths in `AVATAR_ASSETS`
- Ensure videos are in `public/mobile/` folder
- Check browser console for errors

### Chatbot not appearing on mobile
- The desktop version uses `hidden md:block`
- The mobile version uses `md:hidden`
- Make sure you're using the correct component

### Streaming not working
- Check your API route is at `app/api/chat/route.ts`
- Verify the fetch URL is `/api/chat`
- Check browser network tab for errors

---

## 📊 File Structure

```
your-project/
├── app/
│   └── api/
│       └── chat/
│           └── route.ts          (API Route)
├── components/
│   ├── Chatbot-Desktop-Standalone.tsx
│   └── Chatbot-Mobile-Standalone.tsx
├── public/
│   ├── chatbot.gif
│   └── mobile/
│       ├── commo image.png
│       ├── typing1.mp4
│       ├── typing2.mp4
│       ├── body strech.mp4
│       ├── yawing.mp4
│       └── speaker up.mp4
└── .env.local
```

---

## 💡 Pro Tips

1. **Optimize Videos**: Compress your avatar videos to reduce load time
2. **Lazy Load**: Only load chatbot when user clicks the button
3. **Analytics**: Add tracking to see which questions users ask most
4. **Fallback**: Add a fallback response if AI fails
5. **Accessibility**: Add ARIA labels for screen readers

---

## 🎯 Next Steps

1. **Customize the personality** to match your brand
2. **Add more quick actions** for common questions
3. **Style the colors** to match your design system
4. **Add analytics** to track user interactions
5. **Optimize assets** for faster loading

---

## 📄 License

Free to use in personal and commercial projects.

---

## 🤝 Support

If you encounter issues:
1. Check this README thoroughly
2. Verify all dependencies are installed
3. Check browser console for errors
4. Ensure API key is valid
5. Restart your dev server

---

## 🎉 You're Done!

Your chatbot is ready to use! Customize it to match your needs and enjoy the premium AI-powered experience.

**Questions?** Check the code comments for detailed explanations.
