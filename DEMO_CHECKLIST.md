# SIH Demo Checklist — KALA LINK AI

Prepare before demo:
- Ensure `.env.local` exists and `MOCK_AI_MODE=true`.
- Run `npm install` and `npm run dev`.

3-minute demo flow:
1. Open landing page: `/kala`.
2. Click `Try Thedal` to open Thedal demo: `/kala/thedal`.
3. Run `Run AI Demo` to show image analysis and generated catalogue JSON.
4. In Thedal, ask: "Who should I sell this product to?" — observe canned market-match reply.
5. Open `Add Product`: `/kala/products/new`.
6. Upload any image (or skip) and click `✨ Generate with AI` to call mock catalogue generation.
7. Edit any field in the generated editor and click `Publish Product` — product will be saved to demo data.
8. Open `Marketplace`: `/kala/marketplace` to view the published demo products (including newly published one).
9. (Optional) Admin: `/kala/admin` to view totals and approve/reject (mock buttons).

Notes:
- All AI features are mocked when `MOCK_AI_MODE=true`. To enable real AI, set `OPENAI_API_KEY` in `.env.local` and implement OpenAI calls in `lib/ai/client.ts`.
- Firebase is not connected in this demo; `lib/firebase/mock.ts` contains helpers for local demo identity.
