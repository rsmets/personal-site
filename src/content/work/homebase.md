---
title: HomeBase, An Inbox That Thinks For You
startDate: 2025-10-04T00:00:00Z
endDate: 2026-06-01T00:00:00Z
img: /assets/homebase.svg
img_alt: HomeBase app logo
description: |
  An AI-native email client that started as iMessage-for-email and became a generative-UI dashboard that summarizes, structures, and reasons over the noisy 95% of your inbox.
tags:
  - Agentic AI
  - Generative UI
  - RAG
  - Privacy
  - Startup
---

HomeBase was an attempt to fix the inbox, the single most neglected and most valuable surface in your digital life. It began as an iMessage-style email client and ended as something stranger and, I think, more interesting: a generative-UI dashboard that reads the noisy, non-personal 95% of your mail and renders it back to you as charts, timelines, and structured views you never had to build. This sits at the same intersection as my [agentic AI tooling](/blog/agentic-ai-tooling) writing and the [trust-layer thesis](/blog/trust-layer-agent-economy) I keep circling back to: the inbox is where digital identity actually lives.

As of June 2026 the project is shelved while I focus on other initiatives. The codebase and infrastructure remain, and I'm still happy to add curious individuals to the allow list, so if any of the below resonates, reach out.

## Inception: iMessage for Email

> Email threading is a relic. Why does talking to a human feel like filing a legal brief?

The first version of HomeBase took the premise literally: make email feel like texting. A three-pane, iMessage-style client where conversations are bubbles, replies are instant, and the cognitive overhead of "composing an email" disappears. It was a clean Next.js 14 + Fastify + TanStack Query monorepo, type-safe end to end with Zod contracts shared across the wire, real Gmail sync over OAuth and Pub/Sub push notifications.

It was genuinely nicer than Gmail for person-to-person mail. But person-to-person mail is a rounding error. The overwhelming majority of what lands in an inbox isn't conversation at all, it's receipts, flight itineraries, shipping updates, bills, job-board blasts, newsletters, statements. Making _that_ feel like iMessage solves nothing, because you don't want to chat with a shipping confirmation. You want to _know things_ from it.

## The Pivot: Summarizing the 95%

The insight that reoriented the whole project was that the most valuable thing we could do wasn't to restyle conversations, it was to understand the **non-personal** mail nobody reads carefully. So the pipeline became the product. Every inbound message runs through a [Mastra](https://mastra.ai/) workflow that classifies it (personal vs. non-personal), cleans it (strips signatures, disclaimers, and quoted reply history), tags it against a fixed taxonomy (flights, stays, receipts, orders, tax, jobs, newsletters…), extracts structured metadata per tag, and summarizes it. Historical backfill runs the same prompts through provider-native batch APIs (OpenAI Batch / Anthropic Message Batches) so a new user's last few thousand emails get processed cheaply on first connect.

Once every email is classified, tagged, and reduced to structured JSON, the inbox stops being a list and becomes a **database you can ask questions of**. That reframing is what made the next part possible.

## Generative UI Was the Most Interesting Problem

The technical idea I found most exciting, by a wide margin, was **generative UI**: letting a user describe what they want to see in natural language ("show me spending by merchant this year," "track my job applications by stage") and having the system materialize a real, interactive view for it.

We built this in two stages, and the journey taught me exactly where the bleeding edge of this idea sits today.

**Stage one was a curated catalog.** A fixed set of ~15-20 predefined views, each a hardcoded SQL query plus a component type and parameters. Safe, deterministic, boring. No model in the rendering path. It worked, but it could only ever show you what we'd anticipated.

**Stage two was true generation.** A Mastra agent (Claude Sonnet, because the SQL reasoning needs the horsepower) takes a natural-language prompt and emits a complete, validated view _specification_: a component type drawn from a richer library (ECharts time series, bar, donut, treemap, funnel, sankey, calendar heatmaps, plus kanban boards, gantt timelines, and grouped lists), a parameter object, and a parameterized SQL query against the canonical email tables. That spec is Zod-validated, the SQL is dry-run through `EXPLAIN` in a rolled-back transaction and keyword-gated to read-only before it's ever persisted, and then it renders through the same `ViewRenderer` pipeline as the predefined views. The model designs the dashboard; the runtime keeps it on rails.

That architecture, **the model emits a constrained spec, a trusted renderer draws it**, is the pragmatic, productionizable version of generative UI. Digging into it forced me to map where the actual frontier is: systems that stream component trees directly (the Vercel AI SDK's RSC generative UI), and dedicated GenUI engines like [Thesys C1](https://www.thesys.dev/) that have the model emit live, styled interfaces on the fly rather than selecting from a registry. The tradeoff is the whole story: registry-and-spec gives you safety, determinism, and SQL you can audit, at the cost of expressiveness; free-form component generation gives you unbounded UI, at the cost of trust, latency, and a much harder security surface. HomeBase deliberately lived on the safe side of that line, and getting there is what showed me precisely where the line is.

## The Retrieval Stack I'm Most Proud Of

The chat assistant ("ask your inbox anything") is backed by a retrieval pipeline I'd happily defend in any system-design conversation. It's a proper hybrid setup, not a single-vector toy:

- **Dense retrieval** via pgvector, OpenAI `text-embedding-3-small`, HNSW cosine index over chunked email content.
- **Lexical retrieval** running in parallel over the canonical rows.
- **Reciprocal Rank Fusion** (RRF, k=50) to merge the two ranked lists, the dense fusion step that lets semantic and keyword signals reinforce each other instead of competing.
- **A freshness boost** (exponential decay on `sentAt`, ~30-day half-life), because in email, recency is relevance.
- **Conversation-level dedup** so one noisy thread can't flood the context window.
- **A Voyage AI `rerank-2.5-lite` cross-encoder pass** over the top ~30 fused candidates, the quality multiplier that reorders by true query-document relevance before anything reaches the LLM. It degrades gracefully: no API key, and the path falls back to the fused order without breaking.

The part I'm proudest of isn't any single component, it's that the whole thing is measured. There's an offline A/B harness (`pnpm eval:retrieval`) that scores variants against a golden set of `(query → expected emailIds)` pairs on Recall@5/@10, MRR@10, nDCG@10, and latency p50/p95, archiving every run with the git branch and commit. Retrieval changes were data-driven, not vibes-driven.

## The Privacy Knot: Encrypting What You Want to Search

This is the part I wrestled with the most, and the part I most want to be honest about.

Asking a user for `gmail.readonly` is asking for the keys to their entire identity. I felt deeply uneasy holding that, and we did everything we technically could to **mask the contents from ourselves**. Every PII field on an email, subject, snippet, both body representations, forwarded content, is encrypted at rest with AES-256-GCM under versioned keys via a single `EmailPiiCrypto` chokepoint.

And here's the tradeoff that defines the entire design space: **the moment you encrypt the body, you lose the ability to search it.** Postgres can't run full-text or trigram search over ciphertext. So we rebuilt search on top of encryption from two directions, each with its own compromise:

- **Lexical search** came back as a *blind index*: before encryption, we derive per-field arrays of HMAC-SHA256 tokens (words plus character trigrams, normalized and accent-folded), each scoped to a per-user namespace to blunt cross-user correlation, and index those token arrays with GIN. We can match a query's tokens against a row's tokens without ever storing readable text. The cost is real: deterministic tokens leak structure to frequency analysis, and you give up the principled relevance ranking that native FTS gives you for free.
- **Semantic search** is the harder admission. To embed an email, you have to read it in the clear at ingest, and the resulting vectors are themselves a lossy-but-recoverable projection of the content (embeddings can be partially inverted). So the very capability that makes the inbox _smart_, semantic recall, is the one capability you cannot fully blind yourself to. We encrypted the bodies, but we still held the keys and still computed the embeddings.

That gap, between "we masked the PII" and "we genuinely cannot read your mail", is unbridgeable as long as the intelligence runs on our infrastructure. Honest privacy here means admitting that semantic understanding and true zero-knowledge are, with today's tooling, in tension.

## The Inbox Is the Honeypot for Personal AI

Which brings me to the belief that outlasts the project. Everyone is racing to build the personal AI assistant, the thing that actually knows you. I am as close to certain as I get that **whoever wins will mine the inbox to do it**, because there is no richer, more easily pillaged source of digital-identity context anywhere. Your purchases, travel, relationships, finances, subscriptions, employment, health, the cadence of your life, it's all sitting in plaintext behind a single OAuth scope. It's the connective tissue I keep returning to in my writing on the [agent trust layer](/blog/trust-layer-agent-economy): the behavioral record everyone wants and nobody has earned the right to read.

Building HomeBase made the stakes concrete. The same pipeline that turns your mail into a beautiful spending dashboard is the pipeline a personal assistant will use to know you better than you know yourself. That's the prize, and it's also the reason the privacy question above isn't academic.

## Why 3x Wasn't Enough

So why shelve something I clearly believe in? Honestly: HomeBase was about a **3x better** inbox experience, and I became convinced that displacing a product people have used daily for two decades requires **10x**. Gmail is free, infinitely familiar, and deeply entangled with everything. A meaningfully nicer, smarter inbox isn't enough to overcome that much habit and switching cost, you need something that makes the old way feel broken. We had a genuinely better experience and a retrieval-and-generative-UI stack I'm proud of, but not yet the order-of-magnitude leap that pries someone out of muscle memory. Combined with my own discomfort about the sensitivity of the scopes, it was the right time to redirect the energy.

## Where It Stands

HomeBase is paused as of June 2026: a working AI-native email client with a full ingestion-and-enrichment pipeline, a hybrid retrieval stack with cross-encoder reranking and an offline eval harness, generative-UI dashboards backed by a guarded SQL-generating agent, and privacy-preserving search built on encrypted bodies. The infrastructure is still standing, and the allow list is still open, so if you want to kick the tires or just compare notes on inbox intelligence, generative UI, or doing RAG honestly over sensitive data, get in touch.
