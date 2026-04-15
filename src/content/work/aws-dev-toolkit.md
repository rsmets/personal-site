---
title: AWS Dev Toolkit
startDate: 2025-03-01T00:00:00Z
img: /assets/aws-dev-toolkit.png
img_alt: AWS Dev Toolkit plugin overview
description: |
  A Claude Code plugin that packages 34 skills, 11 agents, and 3 MCP servers purpose-built for AWS development workflows, from CDK deployments to cost auditing and security reviews.
tags:
  - AWS
  - Claude Code
  - AI Tooling
  - Plugins
---

## Overview

AWS Dev Toolkit is a Claude Code plugin designed to make cloud engineering faster and more context-aware. It bundles a curated set of skills, agents, and MCP servers that cover the full AWS development lifecycle — infrastructure scaffolding, Lambda management, cost analysis, security auditing, and observability — all accessible as slash commands inside Claude Code.

## Key Features

### 34 Skills

Focused, reusable prompt templates covering CDK, Lambda, IAM, S3, CloudWatch, Cost Explorer, and more. Each skill is scoped to a single task so it stays composable and predictable.

### 11 Agents

Autonomous multi-step workflows that coordinate skills and tool calls to accomplish higher-level goals — deploying a CDK stack, running a cost audit, upgrading Lambda runtimes, or producing a security findings report — without manual intervention.

### 3 MCP Servers

Live data integrations built on the [Model Context Protocol](https://modelcontextprotocol.io):

- **AWS Resource Server** — queries live resource state from your AWS account
- **Cost Explorer Server** — streams real spend data into context for cost-aware agents
- **CloudWatch Logs Server** — gives Claude read access to log groups for root-cause analysis

## Usage

```bash
git clone https://github.com/rsmets/aws-dev-toolkit .claude/plugins/aws-dev-toolkit
```

Restart Claude Code and all skills are available under `/aws-*` commands. Configure MCP servers with your AWS profile and they connect automatically.
