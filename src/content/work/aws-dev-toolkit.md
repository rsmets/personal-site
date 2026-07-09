---
title: AWS Dev Toolkit
startDate: 2025-03-01T00:00:00Z
img: /assets/aws-dev-toolkit.png
img_alt: AWS Dev Toolkit plugin logo
description: |
  A Claude Code plugin packaging 34 skills, 11 agents, and 3 MCP servers purpose-built for AWS development workflows.
tags:
  - AI Tooling
  - Claude Code
  - AWS
  - Plugins
---

The aws-dev-toolkit is a Claude Code plugin that supercharges AWS development by providing a curated collection of skills, agents, and MCP servers purpose-built for working in AWS.

## What It Includes

### 34 Skills

Slash commands for the most common AWS development tasks — IAM policy generation, CloudFormation drift analysis, Lambda log tailing, CDK scaffolding, SSM parameter fetching, cost breakdowns, and more. Each skill encodes opinionated best practices so you get consistent, high-quality output without having to re-engineer the prompt every time.

### 11 Agents

Autonomous multi-step workflows that chain together AWS API calls, code analysis, and LLM reasoning to tackle more complex tasks:

- **Deploy Reviewer** — diffs CloudFormation changesets and flags destructive changes before you apply them
- **Cost Optimizer** — enumerates idle resources and proposes a prioritized remediation plan
- **Incident Responder** — correlates CloudWatch metrics, logs, and X-Ray traces into a structured incident report
- **Architecture Diagrammer** — reads CDK or CloudFormation templates and generates up-to-date Mermaid diagrams

### 3 MCP Servers

Model Context Protocol servers that expose live AWS data directly into Claude Code sessions:

- **aws-resources** — read-only describe/list operations for common resource types
- **cloudwatch-logs** — natural-language interface to CloudWatch Logs Insights
- **cost-explorer** — real-time cost data with caching for Cost Explorer queries

## Motivation

The toolkit grew organically out of repetitive patterns encountered across multiple AWS projects. Prompts and scripts that kept being copy-pasted from project to project were the clearest signal that it was time to package them properly. The goal is to make every Claude Code session AWS-aware from the moment it starts.

## Links

- [GitHub Repository](https://github.com/rsmets/aws-dev-toolkit)
- [Blog Post: Building an AI Toolkit with Claude Code Plugins for AWS Development](/blog/building-ai-toolkit-claude-code-plugins)
