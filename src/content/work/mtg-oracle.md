---
title: MTG Oracle
startDate: 2026-05-08T00:00:00Z
img: /assets/mtg-oracle/cover.png
img_alt: MTG Oracle deck-building agent interface
description: |
  A Magic: The Gathering deck-building AI agent for the Standard format, built as a state-of-the-art RAG system with a multi-model agent loop. A perfectly bounded data landscape for pressure-testing prompt versioning, robust evals, and supervised fine-tuning for classification.
tags:
  - Agentic AI
  - RAG
  - LLM Evals
  - Fine-Tuning
  - AWS Bedrock
---

[MTG Oracle](https://github.com/rsmets/mtg-oracle) is a Magic: The Gathering deck-building agent and card retrieval stack. On the surface it takes a plain-language brief, like "an aggressive red-white deck that can beat the current control meta," and returns a legal, tournament-aware 60-card deck with its reasoning shown. Underneath, it was my attempt to build a genuinely state-of-the-art retrieval-augmented agent the way I would want a production system built: prompts treated as versioned software, and quality treated as something you measure rather than assume.

It is [live](https://themtgoracle.com), deployed on Railway, with a React SPA front end, and the all the inference runs on AWS Bedrock.

### Why Magic, of All Things

Magic: The Gathering has been a data scientist's playground since long before "data science" was a job title. It is a thirty-year-old competitive game with more than 27,000 unique cards, a rules engine complex enough to be formally proven Turing-complete, and a professional tournament circuit that generates a continuous stream of structured results. Serious players have always treated deck-building as an optimization problem: win-rate spreadsheets, mana-curve math, metagame share, expected-value calculations on every mulligan. The community publishes thousands of tournament decklists with placements attached. There is, in other words, an enormous corpus of labeled, outcome-tagged, expert-generated data sitting in the open.

The aha moment for me was realizing that Magic is a **perfectly bounded data landscape** for testing cutting-edge agentic RAG. That phrase is doing a lot of work, so let me unpack it. The card pool is large but finite and authoritatively defined; Scryfall publishes every card as clean structured data. Legality is a closed, deterministic rule set, so correctness is checkable in code rather than a matter of opinion. The Standard format rotates, which means the "right" answer genuinely shifts over time, so a model leaning on stale training data is provably wrong and retrieval earns its keep. And ground truth is obtainable: decks can actually be played out to a win or a loss. You rarely get all four of those properties at once. Most real-world RAG problems are unbounded, fuzzy, and impossible to score objectively. Magic gives you a hard, knowable correctness signal and a moving target in the same domain, which makes it close to an ideal proving ground for the techniques I actually wanted to pressure-test.

### The RAG Core

Magic has thousands of Standard-legal cards and a constantly shifting competitive metagame. No model has that memorized accurately, and asking one to recall card text from training data is how you get hallucinated cards and illegal decks. So the entire system is retrieval-first.

I ingest Scryfall's full `oracle_cards` set, filter to Standard-legal, and store it two ways: a **DuckDB** structured store as the source of truth for legality, color identity, and prices, and a **LanceDB** vector index for semantic search. Retrieval is hybrid: a DuckDB pre-filter narrows the candidate set, then BM25 lexical search and dense vector search run in parallel, their results merged with Reciprocal Rank Fusion, and a final **Cohere Rerank 3.5** pass sharpens the top results. A Sonnet enrichment pass tags every card with archetype and synergy hints so the retrieval understands not just what a card says but how it is actually played.

A second retrieval index holds roughly a thousand community-popular decks ingested across six sources (Archidekt, Moxfield, mtgdecks, mtggoldfish, mtgtop8, and MTGO), deduplicated by mainboard hash. When you ask for a deck, the agent consults real, recent, tournament-proven exemplars before it builds, and cites them.

### Encoding Expert Judgment, Not Just Data

Card text and decklists tell you *what* exists and *what* is popular. They do not tell you *how a pro thinks about building a deck*, and that judgment is the part that separates a legal 60-card pile from a coherent deck. So I built a third knowledge layer: a distilled technical FAQ of professional deck-building doctrine that lives inside the agent's system prompt.

It started as a seven-agent parallel research pass, each agent targeting one domain, closers and win conditions, mana curve, card roles, meta-positioning, anti-patterns, sideboarding, and consistency, and each writing a sourced report with every claim traced back to a primary source. I synthesized those into roughly fifty reasoning-shaped rules drawn from the named canon of the game: Mike Flores's "Who's the Beatdown?" and "Philosophy of Fire," Reid Duke's "Level One" series, Gavin Verhey's "every deck needs a one-sentence mission statement." Seven independent research threads converged on the same underlying principle, that a deck has a *plan* and every card slot must earn its place by advancing that plan, which became the spine of the build prompt.

This is the deck-building guide the agent reasons with, and it matters as much as the RAG. It is what lets the system reject a card that is locally powerful but role-wrong, insist on an honest win condition, and treat a sideboard as the output of matchup planning rather than fifteen loose slots. Encoding hard-won expert heuristics as auditable, sourced rules is, I think, an underrated form of RAG: you are retrieving *judgment*, not just facts.

### A Multi-Model Agent Loop

The agent runs a Bedrock Converse tool-use loop with a deliberately tiered model strategy, because not every step deserves a frontier model. **Haiku 4.5** acts as a cheap, fast router: it classifies each brief into `open`, `archetype`, `budget`, `mechanic`, or `contrarian`, which gates whether community exemplars help or hurt (my evals showed they actively hurt on open-ended briefs, so the gate turns them off there). **Sonnet 4.6** does the analytical heavy lifting, deck summarization and judging. **Opus 4.7** is reserved as an explicit alias for the highest-stakes reasoning. The cards, validator, and exemplar tools are all exposed over an **MCP server**, so the same capabilities back the CLI, the web app, and any MCP client.

Crucially, the model does not get the final word on legality. A pure-TypeScript validator enforces deck arithmetic, the 60-card and 4-of rules, mana curve sanity, and color sources deterministically. A layer of guardrails catches the failure modes LLMs are prone to: fabricated card citations, orphaned braces, and dishonest exemplar references. The non-deterministic part proposes; the deterministic part disposes.

### Prompts as Versioned Software

This is the practice I most want to highlight, because it is the one most teams skip. A system prompt is software. Flip a word in one rule and every build from that moment behaves differently, except there is no commit SHA stamped on the decks you saved last week.

So prompts are versioned, monotonically, `v1` through `v17` and counting. Old versions are never deleted; they are load-bearing for retrospective evals. Every saved deck records the exact prompt version that produced it, which buys three things: reproducibility (regenerate or explain any past build), clean A/B comparison (run the old prompt against the new one over the same fixed brief set), and safe iteration (you are never one `git blame` away from losing the predecessor). Each version bump changes exactly one behavioral hypothesis so the delta is attributable. The results of each experiment get written down as their own decision record. Most of my candidate prompts regressed, and the discipline is what let me know that instead of shipping a confident downgrade.

### Quality You Can Actually Measure

Evals are the backbone, not an afterthought. Gold sets live as JSONL in the repo, and every harness run writes timestamped artifacts I can diff later. The headline harness is a **dual-judge rubric**: Sonnet and Opus independently score decks across a five-dimension rubric, run as an A/B across twenty fixed briefs so I can tell whether a change to the prompt or the retrieval actually helped.

But I was uncomfortable stopping at LLM-as-judge, because a rubric score is an opinion about a deck, not evidence the deck wins games. So the eval ladder climbs toward ground truth. A **tournament-proximity scorer** measures how close a generated deck sits to real tournament lists on card overlap, mana base, and core-card presence. And the top rung plugs into **Forge**, an open-source rules-complete MTG engine, to run fifty headless simulated matches per deck for actual win-loss-draw records. That last one is a slow nightly job, not a dev-loop check, but it closes the gap between "a judge model liked this deck" and "this deck actually performs."

### The Right-Sized Target for Fine-Tuning

That bounded-data property paid off in an unexpected place. The brief classifier, the Haiku 4.5 router that sorts each request into `open`, `archetype`, `budget`, `mechanic`, or `contrarian`, turned out to be the perfect candidate for supervised fine-tuning. Closed label set, a gold set I could generate for almost nothing, and a task narrow enough that a small model could plausibly learn it. So I ran a distillation pilot: teach a fine-tuned **Amazon Nova Micro** to imitate the Haiku teacher, end to end through Bedrock model customization, entirely in TypeScript with no Python.

The results were a genuinely instructive surprise. The distilled student matched the teacher on **98.5%** of a held-out set (194 of 197), ran about **1.8× faster** at the median, and cost roughly **28× less per call**. But the more valuable lessons were the ones the documentation does not lead with:

- **The misses were signal, not noise.** All three divergences fell on the genuinely ambiguous category borders, the briefs that name both a color identity and a mechanic, for instance. Distillation faithfully inherits the teacher's decision boundaries, including the blurry ones. The lesson: to push past 98–99% you fix the category _definitions_, not the training-data volume. The ceiling was conceptual, not quantitative.
- **Validation loss rose after the first epoch.** The model had essentially learned the teacher's decision function within one pass; epochs two and three just fit noise. For a small closed-label distillation, one or two epochs would likely have beaten three at lower cost.
- **The economics only work at the right scale.** A 28× per-call multiple sounds decisive until you account for the fixed monthly cost of keeping a custom model deployed. The break-even sat around 5,000 calls a month; below that, the off-the-shelf model is cheaper all-in. Distillation to a small model pays off only when the call is high-volume, the task is narrow, and latency matters, all three, not just cost.

The counter-experiment was just as informative: fine-tuning a small model for the _deck builder_ would have been a mistake. When I tested a base Nova Pro as the builder, it produced 174-card decks, ran twelve copies of cards capped at four, and hallucinated card names outright. That is not a style gap a fine-tune can close cheaply; it is a rules-competence gap that would demand teaching deck construction from scratch. The classifier was the right-sized target precisely because the task was bounded. The builder was the wrong one for exactly the same reason in reverse. Knowing which is which is most of the skill.

### Why It Matters

MTG was the domain, but the architecture is the point. This is a template for any high-stakes RAG agent: retrieval-grounded so it cannot hallucinate its facts, multi-model so cost tracks the difficulty of each step, deterministically guardrailed so the LLM never has the final say on correctness, prompt-versioned so changes are reproducible and reversible, and eval-driven all the way up to ground truth so improvement is measured rather than vibed. The hardest and most valuable part was never getting a model to produce a deck. It was building the scaffolding that tells me, with evidence, whether each deck is any good.
