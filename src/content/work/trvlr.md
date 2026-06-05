---
title: TRVLR — An Agentic Travel Companion
startDate: 2025-07-01T00:00:00Z
img: /assets/trvlr-hero.jpg
img_alt: Overwater bungalows on a turquoise lagoon, the kind of place TRVLR helps you find and book
description: |
  An AI travel agent that plans and books trips through natural language—made free to users by routing the economics through affiliate booking partners.
tags:
  - Agentic AI
  - AI Tooling
  - Business Strategy
  - Startup
---

[TRVLR](https://trvlr.live) is an agentic travel companion: it plans flights, stays, and activities through a natural-language conversation, remembers who you are across trips, and—critically—aims to complete the booking instead of leaving you to copy-paste an itinerary into a dozen other tabs. It is the most "product-shaped" of my projects, sitting at the intersection of state-of-the-art agent tooling and a deliberate business model that lets me offer it to users for free.

### Inception

> Existing tools only _suggest_. They don't book, and they don't really know _you_.

The idea was born on the road. While traveling around Thailand last summer, I kept wanting a recommendation engine that understood my actual interests rather than a generic "top 10 things to do in Bangkok" listicle. The closest thing on the market, [mindtrip.ai](https://mindtrip.ai), would surface flights, activities, and accommodations—but stopped short of booking and had no durable sense of personal taste. I wanted the experience of texting a sharp human travel agent who already knew my preferences, not a search box with extra steps.

So I built it for myself, then for a handful of friends, and the gaps in the existing landscape made it clear there was room for a better interface to a $1.4T industry.

### The Personalization Problem (and the Social Insight)

The hard part of personalization isn't the model—it's the _data_. An agent is only as good as the signals it can pull from. A cold-start chatbot has to interrogate you with a tedious onboarding quiz before it can say anything useful, and people abandon those flows.

My insight was to make the act of generating those signals _fun_ rather than a chore. TRVLR has a social layer—a travel journal/log where you post places you've been, react to friends' trips, and discover destinations through people whose taste you trust. That social graph does double duty:

- **For the user**, it's a genuinely enjoyable travel diary worth keeping.
- **For the agent**, every post, like, and comment is an organic, low-friction data point about real interests—the kind of preference signal you can't extract from a settings page.

The result is an agent that grows more tailored the more you use the surrounding app, without ever feeling like it's mining you for a form.

### Architecture & Tooling

I kept the project TypeScript end-to-end—a deliberate constraint that makes the agent, the web app, and the self-hosted integration glue share one language and toolchain.

#### The Agent Engine

The conversational core runs on [Mastra](https://mastra.ai) (a YC W25 agent framework), which I chose because it's TypeScript-native and treats memory as a first-class concern. The agent uses GPT-4o for responses and a LibSQL-backed memory layer that combines:

- **Working memory** — a persistent, structured user travel profile (style, budget, dietary needs, favorite kinds of places) that survives across every session.
- **Semantic recall** — vector search over past conversations so the agent surfaces relevant history instead of re-asking what it already knows.

For real-time grounding (current events, fresh place data) the agent reaches out via [Exa](https://exa.ai) search, and extracted locations are piped into an interactive [Mapbox](https://www.mapbox.com/) map so plans are spatial, not just textual.

#### The Agent UI

The chat experience is built on [CopilotKit](https://www.copilotkit.ai/)'s CoAgents, which bridges the React front-end to the Mastra agent and handles the streaming, human-in-the-loop, and generative-UI plumbing that an agentic interface needs. Keeping the agent server-side also means sensitive keys (OpenAI, Exa, booking partners) never touch the client.

#### The App & Social Layer

The web app is React 19 + Vite with a [shadcn/ui](https://ui.shadcn.com/) + Tailwind design system, initially scaffolded with [Lovable](https://lovable.dev) and then extended with agentic dev tooling in Cursor and Zed. The social features—profiles, posts, comments, follows, and the travel journal—are backed by [Supabase](https://supabase.com/) for auth and persistence.

#### Booking via Self-Hosted MCP

The booking integrations are wrapped as my own [MCP](https://modelcontextprotocol.io/) servers around the travel/affiliate APIs I have access to. Because each is single-tenant, I host them myself, which keeps deterministic booking logic cleanly separated from the stochastic foundation-model reasoning—exactly the boundary you want when real money and reservations are on the line.

### The Business Model: Free for Users, Paid by the Funnel

The most interesting design decision wasn't technical—it was economic. A travel agent that charges a subscription fights an uphill battle against free incumbents. So instead of putting the product behind a paywall, I structured it around the same mechanism that has paid travel agents for decades: **affiliate commissions**.

By cutting a deal with an affiliate flight-deal partner, the booking that the agent helps complete generates a commission (typically 1–4% of transaction value). That revenue underwrites the product, which means I can offer the planning-and-booking experience to end users for **free**. The user gets a sharper, more personal travel agent at no cost; the economics are funded by bookings they were going to make anyway.

This alignment is the whole game:

- **Users** pay nothing and have no reason to churn to a free alternative.
- **Affiliate partners** get qualified, high-intent bookings routed through a delightful interface.
- **The product** earns on the transaction it actually facilitates, with subscription tiers (inbox/calendar integration, reservation management) available later for power users.

A modest base of avid travelers booking multiple legs per trip pushes lifetime value into the hundreds of dollars per user—without ever asking them for a credit card to use the app itself.

### Where It Stands

TRVLR is live at [trvlr.live](https://trvlr.live) with the social journaling experience deployed and the Mastra-powered agent engine maturing alongside the affiliate partnerships that make the free model work. It's an ongoing build, and the one I'm most excited about—both for what it does today and for the privacy-preserving inference work it opens the door to down the line.
