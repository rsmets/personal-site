---
title: MTG Oracle
startDate: 2026-05-08T00:00:00Z
img: /assets/mtg-oracle/cover.png
img_alt: MTG Oracle deck-building agent interface
description: |
  A Magic: The Gathering deck-building AI agent for the Standard format, built as a state-of-the-art RAG system with a multi-model agent loop, treating prompts as versioned software and quality as something you measure rather than assume.
tags:
  - Agentic AI
  - RAG
  - LLM Evals
  - AWS Bedrock
---

[MTG Oracle](https://github.com/rsmets/mtg-oracle) is a Magic: The Gathering deck-building agent for the Standard format. On the surface it takes a plain-language brief, like "an aggressive red-white deck that can beat the current control meta," and returns a legal, tournament-aware 60-card deck with its reasoning shown. Underneath, it was my attempt to build a genuinely state-of-the-art retrieval-augmented agent the way I would want a production system built: prompts treated as versioned software, and quality treated as something you measure rather than assume.

It is [live on Railway](https://web-production-26b47.up.railway.app) with a React SPA front end, and the whole core runs on AWS Bedrock.

### The RAG Core

Magic has thousands of Standard-legal cards and a constantly shifting competitive metagame. No model has that memorized accurately, and asking one to recall card text from training data is how you get hallucinated cards and illegal decks. So the entire system is retrieval-first.

I ingest Scryfall's full `oracle_cards` set, filter to Standard-legal, and store it two ways: a **DuckDB** structured store as the source of truth for legality, color identity, and prices, and a **LanceDB** vector index for semantic search. Retrieval is hybrid: a DuckDB pre-filter narrows the candidate set, then BM25 lexical search and dense vector search run in parallel, their results merged with Reciprocal Rank Fusion, and a final **Cohere Rerank 3.5** pass sharpens the top results. A Sonnet enrichment pass tags every card with archetype and synergy hints so the retrieval understands not just what a card says but how it is actually played.

A second retrieval index holds roughly a thousand community-popular decks ingested across six sources (Archidekt, Moxfield, mtgdecks, mtggoldfish, mtgtop8, and MTGO), deduplicated by mainboard hash. When you ask for a deck, the agent consults real, recent, tournament-proven exemplars before it builds, and cites them.

### A Multi-Model Agent Loop

The agent runs a Bedrock Converse tool-use loop with a deliberately tiered model strategy, because not every step deserves a frontier model. **Haiku 4.5** acts as a cheap, fast router: it classifies each brief into `open`, `archetype`, `budget`, `mechanic`, or `contrarian`, which gates whether community exemplars help or hurt (my evals showed they actively hurt on open-ended briefs, so the gate turns them off there). **Sonnet 4.6** does the analytical heavy lifting, deck summarization and judging. **Opus 4.7** is reserved as an explicit alias for the highest-stakes reasoning. The cards, validator, and exemplar tools are all exposed over an **MCP server**, so the same capabilities back the CLI, the web app, and any MCP client.

Crucially, the model does not get the final word on legality. A pure-TypeScript validator enforces deck arithmetic, the 60-card and 4-of rules, mana curve sanity, and color sources deterministically. A layer of guardrails catches the failure modes LLMs are prone to: fabricated card citations, orphaned braces, and dishonest exemplar references. The non-deterministic part proposes; the deterministic part disposes.

### Prompts as Versioned Software

This is the practice I most want to highlight, because it is the one most teams skip. A system prompt is software. Flip a word in one rule and every build from that moment behaves differently, except there is no commit SHA stamped on the decks you saved last week.

So prompts are versioned, monotonically, `v1` through `v17` and counting. Old versions are never deleted; they are load-bearing for retrospective evals. Every saved deck records the exact prompt version that produced it, which buys three things: reproducibility (regenerate or explain any past build), clean A/B comparison (run the old prompt against the new one over the same fixed brief set), and safe iteration (you are never one `git blame` away from losing the predecessor). Each version bump changes exactly one behavioral hypothesis so the delta is attributable. The results of each experiment get written down as their own decision record. Most of my candidate prompts regressed, and the discipline is what let me know that instead of shipping a confident downgrade.

### Quality You Can Actually Measure

Evals are the backbone, not an afterthought. Gold sets live as JSONL in the repo, and every harness run writes timestamped artifacts I can diff later. The headline harness is a **dual-judge rubric**: Sonnet and Opus independently score decks across a five-dimension rubric, run as an A/B across twenty fixed briefs so I can tell whether a change to the prompt or the retrieval actually helped.

But I was uncomfortable stopping at LLM-as-judge, because a rubric score is an opinion about a deck, not evidence the deck wins games. So the eval ladder climbs toward ground truth. A **tournament-proximity scorer** measures how close a generated deck sits to real tournament lists on card overlap, mana base, and core-card presence. And the top rung plugs into **Forge**, an open-source rules-complete MTG engine, to run fifty headless simulated matches per deck for actual win-loss-draw records. That last one is a slow nightly job, not a dev-loop check, but it closes the gap between "a judge model liked this deck" and "this deck actually performs."

### Why It Matters

MTG was the domain, but the architecture is the point. This is a template for any high-stakes RAG agent: retrieval-grounded so it cannot hallucinate its facts, multi-model so cost tracks the difficulty of each step, deterministically guardrailed so the LLM never has the final say on correctness, prompt-versioned so changes are reproducible and reversible, and eval-driven all the way up to ground truth so improvement is measured rather than vibed. The hardest and most valuable part was never getting a model to produce a deck. It was building the scaffolding that tells me, with evidence, whether each deck is any good.
