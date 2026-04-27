# Professional Trading Analytics Dashboard

A fully-featured, production-ready frontend for ECN trader performance analytics, built specifically for deep analytical insight and high-end visual aesthetics.

## Tech Stack
- **Framework:** Next.js 15 (App Router, strict TypeScript)
- **Styling:** Tailwind CSS v4 with bespoke custom design tokens
- **Component Library:** Shadcn UI + Radix UI primitives
- **Client State:** Zustand
- **Server State & Data Fetching:** TanStack Query v5
- **Data Tables:** TanStack Table v8
- **Data Visualization:** Recharts
- **Typing & Validation:** Zod
- **Date Handling:** date-fns

## Project Overview
This project strictly enforces a "Dark Trading Terminal" UI paradigm. The core navigation includes:
- **`Dashboard`** (`app/page.tsx`): High-level executive overview tracking live equity mapping, asset class distribution, and KPI strips.
- **`Behavior Analysis`** (`app/behavior/page.tsx`): Deep psychological performance tracking using scatter plots for hold-durations vs P&L, tilt-indicators, and win-rate heatmaps.
- **`Risk & Attribution`** (`app/risk/page.tsx`): Margin utilization gauges, P&L waterfalls, and strict market-regime correlation matrices.
- **`Trade Log`** (`app/trades/page.tsx`): Granular historical execution data driven by TanStack definitions allowing robust client-side filtering.

## Getting Started

1. **Install dependencies:**
   This project highly utilizes Bun. Ensure you've installed it by following official documentation.
   ```bash
   bun install
   ```

2. **Run the development server:**
   ```bash
   bun dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser.

## Architectural Notes
- The project implements a strongly typed API fetch layer in `lib/api.ts` connecting strictly to standard REST formats (`NEXT_PUBLIC_API_URL`).
- Store actions and client components reside strictly inside the `app/` folder, while universal types export from `types/trading.ts`.

Please consult `/docs/developer-guide.md` for full implementation logic and contribution guidelines.
