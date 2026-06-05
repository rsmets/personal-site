---
title: TRVLR, An Agentic Travel Companion
startDate: 2025-07-01T00:00:00Z
endDate: 2025-10-01T00:00:00Z
img: /assets/trvlr-landing.png
img_alt: TRVLR landing page showing the AI-powered travel agent hero
description: |
  An AI travel agent that plans and books trips through natural language, made free to users by routing the economics through affiliate booking partners.
tags:
  - Agentic AI
  - AI Tooling
  - Business Strategy
  - Startup
---

[TRVLR](https://trvlr.live) is an agentic travel companion: it plans flights, stays, and activities through natural language, remembers who you are across trips, and (the part everyone else punts on) aims to actually complete the booking rather than handing you an itinerary to go re-enter somewhere else. This project sits squarely at the intersection of the [agentic tooling](/blog/agentic-ai-tooling) I keep writing about and a business model deliberately designed so I can give it away for free.

## Inception

> Existing tools only _suggest_. They don't book, and they don't actually know _you_.

Like most things I build, this one started as a personal itch. While traveling around Thailand last summer I kept wishing for a recommendation engine that understood my actual taste instead of regurgitating the same "top 10 things to do in Bangkok" listicle. The closest thing on the market, [mindtrip.ai](https://mindtrip.ai), would surface flights, activities, and stays, but stopped short of booking and had no durable sense of who I was. I wanted the experience of texting a sharp human travel agent who already knew my preferences, not a search box wearing a chatbot costume.

So I built it for myself, then for a few friends. The gaps in the landscape were obvious enough, and the prize (a slice of a $1.4T industry) large enough, that it was worth taking seriously.

## The Real Problem Is Data, Not the Model

The hard part of personalization was never the model. It's the _signal_. An agent is only as good as the data it can pull from, and a cold-start chatbot has to drag you through a tedious onboarding quiz before it can say anything useful. Nobody finishes those.

My way around this was to make generating that signal _fun_ instead of a chore. TRVLR has a social layer, a travel journal where you log places you've been, react to friends' trips, and discover destinations through people whose taste you trust. That social graph pulls double duty:

- **For you**, it's a genuinely enjoyable travel diary worth keeping for its own sake.
- **For the agent**, every post, like, and comment is an organic, low-friction data point about real interests, the kind of preference you'd never bother typing into a settings page.

The upshot is an agent that gets sharper the more you enjoy the app around it, without ever feeling like it's interrogating you.

## Architecture & Tooling

I kept the whole thing TypeScript end-to-end. That's a deliberate constraint (_I have a [standing dream](/blog/agentic-ai-tooling) that Python quietly disappears_), and it means the agent, the web app, and the integration glue all share one language and toolchain.

### The Agent Engine

The conversational core runs on [Mastra](https://mastra.ai/), my favorite TypeScript agentic framework and a [recurring](/blog/mcp) recommendation of mine. Sam and co are crushing it. I picked it because it's TS-native and treats memory as a first-class citizen rather than an afterthought. The agent runs on GPT-4o with a LibSQL-backed memory layer that combines:

- **Working memory**: a persistent, structured travel profile (style, budget, dietary needs, the kinds of places that make you light up) that survives across every session.
- **Semantic recall**: vector search over past conversations, so the agent surfaces what it already knows instead of asking twice.

For real-time grounding it reaches out via [Exa](https://exa.ai/) search, and any place it mentions gets piped onto an interactive [Mapbox](https://www.mapbox.com/) map, because travel planning should be spatial, not just a wall of text.

### The Agent UI

The chat experience is built on [CopilotKit](https://www.copilotkit.ai/)'s CoAgents, which bridges the React front-end to the Mastra agent and handles the streaming, human-in-the-loop, and generative-UI plumbing that an honest agentic interface actually needs. Keeping the agent server-side has the nice side effect of keeping the sensitive keys (OpenAI, Exa, booking partners) far away from the client.

### The App & Social Layer

The web app is React 19 + Vite on a [shadcn/ui](https://ui.shadcn.com/) + Tailwind design system. As with the [Found Audio relaunch](/work/found-audio), I scaffolded the front-end with [Lovable](https://www.lovable.dev/) and then took over the higher-level feature work in Cursor and Zed, the same prototype-with-an-agent then fork-the-keyboard-to-a-real-editor workflow I described in my [AI dev tooling](/blog/ai-developer-tooling) post. The social features (profiles, posts, comments, follows, and the travel journal) lean on [Supabase](https://supabase.com/) for auth and persistence.

### Booking via Self-Hosted MCP

The booking integrations are wrapped as my own [MCP](/blog/mcp) servers around the travel and affiliate APIs I have access to. Since each is single-tenant, I host them myself, which keeps the _deterministic_ booking logic cleanly walled off from the _stochastic_ foundation-model reasoning. That boundary matters a great deal once real money and real reservations are on the line.

## The Business Model: Free for Users, Paid by the Funnel

The most interesting decision here wasn't technical. It was economic. A travel agent that charges a subscription is fighting uphill against a wall of free incumbents. So instead of hiding the product behind a paywall, I built it around the same mechanism that has paid travel agents for a century: **affiliate commissions**.

By cutting a deal with an affiliate flight-deal partner, the booking the agent helps complete throws off a commission, typically 1 to 4% of transaction value. That revenue funds the product, which means I can hand the planning-and-booking experience to users for **free**. They get a sharper, more personal travel agent at zero cost; the economics ride on bookings they were going to make anyway.

The alignment is the whole point:

- **Users** pay nothing, and have no reason to defect to a free alternative.
- **Affiliate partners** get high-intent, qualified bookings funneled through an interface people actually enjoy.
- **The product** earns on the transaction it genuinely facilitates, with subscription tiers (inbox and calendar integration, reservation management) waiting in the wings for power users.

A modest base of avid travelers booking multiple legs per trip pushes lifetime value into the hundreds of dollars per user, without ever asking for a credit card just to _use_ the thing.

## Where It Stands

TRVLR is live at [trvlr.live](https://trvlr.live), with the social journaling experience deployed and the Mastra-powered engine maturing alongside the affiliate partnerships that make the free model work. It's an ongoing build, and frankly the one I'm most excited about, both for what it does today and for where it points: a privacy-preserving inference layer so the personalization I care about never has to mean handing plaintext PII to a service operator or model vendor. _But that's a story for another post._
