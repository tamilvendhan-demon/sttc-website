# THEDAL — Demo Prototype

This repository is a Smart India Hackathon (SIH26090) prototype: "THEdal — AI-Driven Market Linkage and Smart Cataloging Mobile Application for Marginalized Artisans".

Quick start (demo mode):

1. Copy environment example:

```bash
cp .env.local.example .env.local
```

2. Ensure `MOCK_AI_MODE=true` in `.env.local` to run the full demo without an OpenAI key.

3. Install and run:

```bash
npm i
npm run dev
```

4. Open the demo pages:
- Landing / KALA: http://localhost:3000/kala
- Thedal AI demo: http://localhost:3000/kala/thedal
- Add product (demo): http://localhost:3000/kala/products/new
- Marketplace: http://localhost:3000/kala/marketplace
- Admin: http://localhost:3000/kala/admin

Notes:
- All AI endpoints have mock implementations under `app/api/ai/*` when `MOCK_AI_MODE=true`.
- Real OpenAI integration should be added to `lib/ai/client.ts` and server routes updated accordingly.
- Firebase is not configured; the repo contains demo data in `data/demoData.json` used for demo flows.
- To enable real OpenAI (server-side):
	1. Set `MOCK_AI_MODE=false` in `.env.local`.
	2. Add `OPENAI_API_KEY=your_key_here` and optionally `OPENAI_MODEL`.
	3. Restart the dev server.

Streaming chat example:

```bash
curl -X POST http://localhost:3000/api/ai/chat -H "Content-Type: application/json" -d '{"message":"Hello","stream":true}'
```

The route will proxy the OpenAI event-stream when `MOCK_AI_MODE=false` and `OPENAI_API_KEY` is set.

- To enable Firebase (optional):
	Login page: `/kala/login` provides email/password and Google sign-in once Firebase is configured; when Firebase is not configured it offers a demo login.
	1. Install Firebase SDK: `npm i firebase`.
	2. Fill `NEXT_PUBLIC_FIREBASE_*` variables in `.env.local`.
	3. Replace `lib/firebase/mock.ts` usage with real auth flows and enable Firestore/Storage.

Demo checklist for a 3-minute SIH presentation: see `DEMO_CHECKLIST.md` (coming soon).
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
