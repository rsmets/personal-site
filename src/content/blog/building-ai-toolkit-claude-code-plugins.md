---
title: Building an AI Toolkit with Claude Code Plugins for AWS Development
publishDate: 2025-04-14
img:
img_alt:
category: side-project
description: |
  A deep dive into building the aws-dev-toolkit plugin, packaging 34 skills, 11 agents, and 3 MCP servers to supercharge AWS development workflows with Claude Code.
tags:
  - AI Tooling
  - Claude Code
  - Plugins
  - AWS
---

## Background

As AI-assisted development has matured, the tooling ecosystem around it has exploded. Claude Code in particular has become a mainstay in my daily workflow — it is fast, context-aware, and remarkably good at understanding complex infrastructure code. But raw Claude Code out of the box is just the beginning. The real power comes from extending it with purpose-built plugins tailored to your domain.

I spend a lot of time working in AWS, and over the past year I have accumulated a growing collection of prompts, scripts, and patterns that I kept copy-pasting across projects. That repetition was the signal I needed: it was time to package these as a proper plugin.

The result is the **aws-dev-toolkit** — a Claude Code plugin that ships 34 skills, 11 agents, and 3 MCP servers specifically designed for AWS development.

## What Is a Claude Code Plugin?

Claude Code plugins (also called skill packs or agent packs) extend the capabilities of Claude Code sessions by injecting pre-built:

- **Skills** — slash commands that execute specific, well-defined tasks
- **Agents** — autonomous multi-step workflows that chain tools and decisions together
- **MCP Servers** — Model Context Protocol servers that expose real-time data and actions from external systems directly into the LLM context

Together, these three primitives cover the spectrum from "do this one thing quickly" to "figure out and execute an entire deployment pipeline."

## The 34 Skills

Skills are the bread and butter of the toolkit. They handle the day-to-day repetitive tasks that every AWS developer encounters:

- **Infrastructure introspection** — quickly describe running stacks, list resources by tag, summarize CloudFormation drift
- **IAM helpers** — generate least-privilege policy documents from a description of what a service needs to do
- **Cost analysis** — pull Cost Explorer data and surface the top cost drivers for a given account and time range
- **Lambda utilities** — tail logs, invoke with test payloads, compare deployed vs. local handler code
- **SSM / Secrets Manager** — fetch parameter trees and render them into environment variable blocks
- **CDK scaffolding** — bootstrap new constructs following opinionated patterns

Each skill is essentially a carefully engineered prompt template that gets rendered with the right context at invocation time. The key insight is that these prompts encode institutional knowledge — the "how we do this here" that would otherwise live only in someone's head or a wiki page that is perpetually out of date.

## The 11 Agents

Agents are where things get interesting. Unlike skills, which are one-shot, agents run multi-turn autonomous loops and can invoke tools, read files, make AWS API calls through MCP, and iterate until a goal is met.

A few highlights:

### Deploy Reviewer Agent
Before any CDK or CloudFormation deploy, this agent diffs the changeset against the current stack, assesses blast radius, flags destructive changes, and writes a human-readable summary. It has saved me from at least three accidental database replacements.

### Cost Optimization Agent
Given an AWS account and a target savings percentage, this agent enumerates idle resources — underutilized RDS instances, orphaned EBS volumes, NAT gateways in dev environments — and proposes a remediation plan with estimated monthly savings.

### Incident Response Agent
When an alarm fires, this agent pulls CloudWatch metrics, correlates log anomalies with the timeline, traces calls through X-Ray, and produces a structured incident report with hypothesized root cause and recommended next steps.

### Architecture Diagram Agent
Reads a CDK app or CloudFormation template and emits a Mermaid architecture diagram. Useful for keeping documentation in sync with reality.

## The 3 MCP Servers

MCP servers are the connective tissue between the LLM and live AWS data. The toolkit ships three:

### aws-resources MCP Server
Exposes read-only describe/list operations for the most commonly queried AWS resource types. Claude can ask "what is the current desired capacity of this Auto Scaling Group?" and get a real answer from the live account rather than having to rely on potentially stale context.

### cloudwatch-logs MCP Server
Provides a structured interface for querying CloudWatch Logs Insights. Claude can issue natural-language queries ("show me all errors in the past hour from the payment service") that get translated into Logs Insights syntax and executed, with results streamed back into context.

### cost-explorer MCP Server
Wraps the Cost Explorer API with sensible defaults and caching. Makes cost data a first-class citizen in any Claude Code session, enabling the cost analysis skill and cost optimization agent to operate on real numbers.

## Lessons Learned

### Prompt engineering at scale is software engineering
The skills and agents are essentially a prompt codebase. They need versioning, testing, and refactoring just like regular code. I ended up treating the prompts as source files with their own test harness — synthetic inputs with expected output shapes — to catch regressions as I iterated.

### MCP server design matters for latency
Early versions of the MCP servers made too many API calls eagerly. Lazy loading and caching at the right granularity made a significant difference in how snappy the agents feel.

### Specificity beats generality
The most useful skills are the hyper-specific ones, not the generic "do AWS stuff" prompts. "Generate a least-privilege IAM policy for a Lambda that reads from DynamoDB table X and writes to SQS queue Y" is dramatically more useful than a generic IAM helper.

## What Is Next

The toolkit is under active development. On the roadmap:

- **ECS / Fargate agent** — end-to-end container deployment workflow
- **Multi-account support** in the MCP servers via AWS Organizations
- **Bedrock integration skills** — scaffolding for Bedrock knowledge bases and agents
- **CI/CD integration** — GitHub Actions workflow generation tuned for AWS deployments

If you work heavily in AWS and Claude Code is part of your toolkit, I would love feedback. The project is open source — check it out at the [aws-dev-toolkit repository](https://github.com/rsmets/aws-dev-toolkit).
