---
title: Building an AI Toolkit with Claude Code Plugins
publishDate: 2025-04-14
img:
img_alt:
category: side-project
description: |
  The aws-dev-toolkit Claude Code plugin bundles 34 skills, 11 agents, and 3 MCP servers purpose-built for AWS development, turning Claude Code into a fully equipped cloud engineering workstation.
tags:
  - AI Tooling
  - Claude Code
  - Plugins
  - AWS
---

## From Scattered Scripts to a Cohesive Toolkit

AWS development involves a lot of moving parts: infrastructure-as-code, Lambda functions, CDK stacks, IAM policies, CloudFormation templates, cost analysis, and more. Context-switching between all of these while also managing an agentic AI workflow can get noisy fast.

The [aws-dev-toolkit](https://github.com/rsmets/aws-dev-toolkit) project is a Claude Code plugin that consolidates the most common AWS development workflows into a single, composable package. The goal is simple: when you open Claude Code on an AWS project, everything you need should already be there.

## What's Inside

### 34 Skills

Skills are reusable prompt templates — slash commands that Claude Code can invoke at any point during a session. The toolkit ships 34 of them covering the full AWS development lifecycle:

- **Infrastructure** — scaffold CDK stacks, review CloudFormation templates, lint IAM policies for least-privilege violations
- **Lambda** — generate function handlers, write unit tests, package and deploy functions
- **Cost** — analyze Cost Explorer output, flag expensive resource configurations, suggest savings plans
- **Security** — audit S3 bucket policies, check security group rules, review KMS key usage
- **Observability** — generate CloudWatch dashboards, write metric filter patterns, set up structured logging

Having 34 discrete skills means each one stays focused and composable. You can chain them — scaffold a stack, then immediately audit its IAM roles, then generate a cost estimate — without any manual copy-pasting.

### 11 Agents

Agents are longer-running autonomous workflows that coordinate multiple skills and tool calls to accomplish a higher-level goal. The toolkit includes 11 agents:

- **CDK Deploy Agent** — plans, synthesizes, and deploys a CDK stack with pre- and post-deployment validation
- **Lambda Lifecycle Agent** — handles the full cycle from code generation through testing, packaging, and deployment
- **Cost Audit Agent** — pulls current spend data, identifies anomalies, and produces a prioritized savings report
- **Security Review Agent** — runs a multi-step audit across IAM, S3, VPC, and KMS resources and generates a findings report
- **Dependency Upgrade Agent** — scans Lambda runtimes and CDK library versions, proposes upgrades, and opens a draft PR

Agents are where the toolkit earns its keep. Instead of running five separate skills manually, you fire one agent and come back to a finished report or a ready-to-merge branch.

### 3 MCP Servers

[Model Context Protocol (MCP)](https://modelcontextprotocol.io) servers expose live data and actions to Claude during a session. The toolkit ships three:

1. **AWS Resource Server** — connects to your AWS account via the SDK and lets Claude query live resource state (EC2 instances, RDS clusters, S3 buckets) directly during a conversation
2. **Cost Explorer Server** — streams Cost Explorer API responses into context so agents can reason about real spend data rather than synthetic examples
3. **CloudWatch Logs Server** — gives Claude read access to log groups and log streams, enabling root-cause analysis workflows that actually look at the logs

The MCP servers are what elevate the agents from template-runners to genuinely context-aware assistants. An agent diagnosing a Lambda cold-start issue can pull the actual CloudWatch logs, not just describe what logs would look like.

## Why Claude Code Plugins?

Claude Code's plugin architecture makes it straightforward to package skills, agents, and MCP server configurations together into a single installable unit. Drop the plugin directory into your project's `.claude/` folder, and every skill and agent becomes available as a slash command. MCP servers are registered automatically via the plugin manifest.

This packaging model means the toolkit travels with the project. A new team member clones the repo, opens Claude Code, and immediately has the same AWS-aware context as everyone else on the team.

## Getting Started

```bash
# Clone the toolkit into your project's Claude plugins directory
git clone https://github.com/rsmets/aws-dev-toolkit .claude/plugins/aws-dev-toolkit
```

After cloning, restart Claude Code and the skills will appear under `/aws-*` commands. Configure the MCP servers by adding your AWS profile to the plugin's `mcp.json` and you're ready to go.

## What's Next

The toolkit is actively evolving. Upcoming additions include a dedicated ECS/Fargate agent, broader coverage of AWS Organizations and Control Tower patterns, and tighter integration with CDK Pipelines for automated deployment workflows.

If you're doing AWS development with Claude Code, give it a try and open an issue with the workflows you wish were there.
