# NeuroScout

Premium AI Chatbot SaaS Starter

---

## 🧠 Overview
NeuroScout is a modern, full-stack AI chatbot platform designed for SaaS-level polish, extensibility, and a beautiful, accessible user experience. Built with React, Vite, Tailwind CSS, and shadcn/ui, it supports multi-provider AI chat, animated UI, and premium branding out of the box.

---

## 🚀 Features
- Responsive, glassmorphic UI with animated gradients
- Collapsible sidebar with chat history and API key management
- Premium chat bubbles with avatars, provider badges, and smooth animations
- Sticky, glassy input bar and floating "New Chat" button
- LocalStorage support for chat history
- Dark/light mode toggle with smooth transitions
- Accessibility: ARIA roles, keyboard navigation, focus states
- Branded loading indicator, error handling, and export/delete confirmation modals
- Easily extensible for backend, authentication, and more

---

## 🏗️ Tech Stack
- **Frontend:** React (TypeScript), Vite
- **Styling:** Tailwind CSS, shadcn/ui (Radix UI)
- **State:** React hooks, localStorage
- **Icons:** lucide-react
- **Forms & Validation:** react-hook-form, zod
- **Other:** Framer Motion, sonner, date-fns, embla-carousel-react

---

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm (v9+ recommended)

## 🔑 How to Use Neuroscout & API Keys
To access real-time AI responses, you’ll need to provide API keys for supported AI providers (e.g., OpenAI, Perplexity, or others). Here’s how:
- Go to Settings:
- Click the settings or API key icon in the sidebar.
- Get Your API Key:
- Choose your preferred provider (e.g., OpenAI, Perplexity, Travily, etc.).
- Click the “Get Key” link.
- Sign up or log in on the provider’s website.
- Follow their instructions to generate an API key.
- Add the API Key to NeuroScout:
- Copy your API key from the provider’s dashboard.
- Paste it into the API key input field in NeuroScout.
- Click “Submit” to save.
- Start Chatting:
- Once your key is saved, you can chat with the bot and get real-time, AI-powered answers.
> Tip: Your API keys are stored securely in your browser (localStorage) and are never sent to any third-party server by NeuroScout.

## Live Checkout :
https://neuroscout-ai.netlify.app/

### Setup
```sh
# Clone the repository
git clone https://github.com/Ajay-Bommidi/NeuroScout.git
cd NeuroScout

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Build for Production
```sh
npm run build
```

### Preview Production Build
```sh
npm run preview
```

---

## 🌐 Deployment
- Deploy to Vercel, Netlify, or any static host.
- For custom domains, follow your host's instructions.

---

## 🧩 Extending NeuroScout
- Add a backend (Node.js, Express, Fastify, etc.) for authentication, analytics, or custom logic.
- Integrate a database (PostgreSQL, MongoDB, etc.) for persistent chat history.
- Implement OAuth/JWT for multi-user SaaS support.
- Add billing/subscriptions for a true SaaS product.

---

## 🏆 What Makes NeuroScout Stand Out
- SaaS-level polish: modern design, accessibility, micro-interactions
- Extensible: easily add backend, database, or more providers
- Production-ready: fast builds, type safety, robust tooling
- Brandable: easily swap logos, colors, and meta for your own SaaS

---

## 📄 License
MIT
