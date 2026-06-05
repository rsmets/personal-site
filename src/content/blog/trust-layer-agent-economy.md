---
title: "x402: When Your Customer Is an Agent, Who Do You Trust?"
publishDate: 2026-06-05
img:
img_alt:
category: technology
description: |
  Autonomous agents are starting to pay each other on-chain. The protocols are mostly solved. The hard part, knowing who is worth transacting with, is the trust layer nobody has built yet.
tags:
  - Agent Identity
  - Agent Payments
  - Trust Infrastructure
---

## The Plumbing Is Done. The Trust Isn't.

For the last year the conversation around agentic commerce has been about plumbing. How do agents pay each other? [x402](https://www.x402.org/) resurrected the dormant HTTP 402 status code into a stablecoin payment protocol, won itself a Linux Foundation home, and pulled in basically everyone who matters: Visa, Mastercard, Stripe, Google, AWS, Coinbase, Circle. Google's AP2 adopted x402 as its crypto rail rather than competing with it. The standards war is effectively over.

So we can now make an agent pay another agent for an API call without a human in the loop. Great. Here is the question almost nobody is answering: **how does the buyer agent know the seller is any good?**

That sounds small. It is the entire game.

## A Decade of Watching Identity Marketplaces Die

I have a particular allergy to this problem because I have watched its cousin fail repeatedly. Years ago, during my graduate work in information security, I wrote a [white paper on decentralized access control](/work/decentralized-access-control), arguing that users should own their identities outright rather than renting trust from whoever happens to operate the service. The motivating realization was uncomfortable: while running the platform for an access control startup, I could impersonate any user in our system, grant access, and quietly rewrite their audit trail. The whole edifice rested on trusting the operator.

The decentralized-identity world's answer was Verifiable Credentials and DIDs, cryptographically signed claims that you carry and present yourself. Beautiful primitives. And for human identity, they mostly died on the vine. Not because the cryptography was wrong, but because of **cold-start**. Nobody issues credentials before anybody verifies them, verifiers won't pay for coverage that doesn't exist yet, and everyone stalls in a standoff waiting for the other side to move first.

I bring this up because the agent economy quietly breaks that standoff, and most people haven't noticed why.

## The Chain Is a Free, Tamper-Evident Behavioral Record

Here is the thing that makes agent reputation genuinely different from human reputation: **agents can easily settle on-chain.** Every payment, every counterparty, every success and failure is publicly observable. You don't need a two-sided marketplace where issuers and verifiers politely wait for each other. The behavioral substrate already exists, it's free, and it's tamper-evident by construction.

For the first time, you can bootstrap a reputation graph by _mining what already happened_ instead of begging a network into existence. That is a structural escape hatch from the cold-start trap that buried a decade of identity ventures. It genuinely excites me.

But the chain only sees half of what matters, and this is where I want to be the person who tells you the unsexy truth.

## The Quantity/Quality Gap Nobody Wants to Talk About

On-chain data tells you _quantity_. How much did this endpoint settle? With how many distinct counterparties? How old is the wallet? What's the refund rate? Real signal, all of it.

What the chain cannot tell you is _quality_. **Did the API actually return good data?** Was the response correct, or was it confidently wrong? The settlement event fires the moment money moves. The protocol is "settle-and-done" by design, and the chain can't roll back a delivered HTTP response. So the single most important question, _was this service any good?_, lives entirely off-chain.

This matters because the easy, seductive version of agent reputation is "count the transactions and rank them." And counting transactions is _exactly_ what an adversary optimizes against. At its peak, something like half of all x402 volume was wash-trading: wallets paying themselves to manufacture the appearance of activity. The adversary isn't hypothetical and arriving later. **The adversary is already here, and it showed up before the legitimate customers did.**

Any reputation system that scores volume is scoring the precise thing fraud is best at faking. The hard, valuable work is everything the chain doesn't give you for free: clustering sybil wallets, fingerprinting spam farms, and the part that costs real money, actually probing services to see if they deliver. Quality measurement is adversarial security operations, not a database query. Anyone who tells you on-chain data alone solves agent trust is selling the easy half.

## Reputation You Own vs. Reputation You Rent

Now the part that pulls my two careers together. Suppose you do build a credible trust signal. Where does it live?

Today the most sophisticated scorer in the space is Coinbase's Bazaar, and its reputation score is _walled_. It's computed internally, never exposed to the caller, applied only to traffic that routes through Coinbase. That is reputation you rent. It works inside one castle and evaporates the moment you step outside it.

This is the same mistake the centralized identity world made, and it's exactly the failure mode my white paper was reacting to. A trust score that a single rail owner controls is a trust score that serves the rail owner. The instant an agent transacts across a different rail, x402 here, AP2 there, something not yet invented next year, a vendor-locked score is worthless.

The version that actually matters is **portable**: a signed attestation the agent carries with it across rails and platforms, verifiable by anyone, owned by no one. This is, after a decade, finally the _right_ application for Verifiable Credentials and DIDs. Not because the buzzwords aged well, but because the agent economy produces the one thing human identity never could, an objective behavioral history worth attaching to a portable, self-controlled identifier. The primitive was waiting for the right substrate the whole time.

And notably, no single rail owner can credibly build this, because neutrality is the product. Coinbase won't trust Google's scores and Google won't trust Coinbase's. Cross-rail trust has to come from someone who isn't a rail.

## The Chicken-and-Egg That Defines the Whole Opportunity

I want to close honestly, because thought leadership that only sells the upside isn't leadership.

Real, non-synthetic agent commerce is still _tiny_, on the order of tens of thousands of dollars a day, with average payments around twenty cents. Reputation matters in proportion to value-at-risk, and right now the value at risk per decision is pocket change. Nobody underwrites a twenty-cent loan.

So we have a genuine chicken-and-egg: **high-value autonomous commerce won't happen until trust infrastructure exists, and trust infrastructure can't sustain itself until high-value commerce exists.** That tension is the most important fact in the entire space, and it cuts both ways. It's the reason this is hard. It's also the reason it's interesting: whoever builds the trust layer isn't just serving the market, they're a precondition for it existing at all. The catalyst and the customer are the same thing.

The plumbing question, _how do agents pay?_, is solved. The question that decides whether any of it amounts to a real economy is older than blockchains, older than the internet: _when a stranger offers to transact, how do you know they're worth trusting?_ We just have to answer it for counterparties that spin up in milliseconds, settle irreversibly, and lie about half the time.

This the layer that my I can't help but think my years of building identity systems makes me uniquely tailored to tackle. Is this space viability ready to build a business in?
