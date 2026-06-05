---
title: The Plugin That Walked Into the Room Before I Did
publishDate: 2026-06-05
img:
img_alt:
category: technology
description: |
  A few months ago I argued that organizations should package their knowledge as something agents can actually consume. The AWS dev toolkit plugin was the proof. Here is what happened since.
tags:
  - AI Development
  - Claude Code
  - AWS Tooling
  - Agentic AI
---

## When the Customer Brings It Up First

The moment I knew the [AWS dev toolkit](https://claude.com/plugins/aws-dev-toolkit) plugin had legs was not a download counter. It was a conversation. I was on a call with a startup, ready to walk them through some AWS tooling, and before I could get there they told me *they were already using it*. They had installed the plugin, wired it into their workflow, and formed opinions, all without me ever mentioning it. There is no better signal than your work showing up in the room ahead of you.

That has happened more than once now, and it still surprises me every time.

## Back Up: Why I Built This

In April I wrote a piece for the AWS Builder Center, [From Scattered AWS Knowledge to One Installable Plugin](https://builder.aws.com/content/3BpPrp2IVHRRKREGzqwgtQcOt1w/from-scattered-aws-knowledge-to-one-installable-plugin). The thesis was simple and, I think, still under-appreciated: most organizations sit on enormous reservoirs of hard-won knowledge that are completely inaccessible to the agents now doing the work. The knowledge lives in wikis, runbooks, tribal memory, and the heads of a few senior engineers. An agent cannot consume any of that.

The fix is to stop treating organizational knowledge as documentation for humans and start packaging it as something an agent can install and reason over. Skills, sub-agents, and MCP servers, bundled into a single installable unit. That was the bet. The [aws-dev-toolkit](https://github.com/aws-samples/sample-claude-code-plugins-for-startups) plugin was me putting it into practice: 34 skills, 11 sub-agents, and 3 MCP servers for building, migrating, and running architecture reviews on AWS, all installable in one command.

## What Happened Since April

It got published to the official Claude Code marketplace, and the adoption curve has been the fun part to watch. It crossed 588 installs, then 800, then a thousand, and it now sits north of **1,356 installs**, climbing steadily without a marketing push behind it. For a focused, opinionated developer tool aimed at startups building on AWS, that kind of organic pickup is exactly the validation the original thesis needed. People do not keep installing a thing that does not earn its place in their workflow.

If you want to try it, it is two commands:

```bash
/plugin marketplace add aws-samples/sample-claude-code-plugins-for-startups
/plugin install aws-dev-toolkit@aws-samples
```

## The Part I Did Not Expect

Here is the development that genuinely caught me off guard. The ideas in this plugin heavily influenced two Amazon products that launched this month: [AWS Startup Advisor](https://aws.amazon.com/startups/) and the [AWS Startups Migrate](https://aws.amazon.com/startups/migrate/) experience.

Startup Advisor lets founders scaffold their architecture and deploy local code to AWS right from their IDE, with guidance tailored to what they are building. The Migrate experience takes a team from another cloud, GCP or an OpenAI or Gemini stack, and generates a personalized migration plan: service mapping, cost comparisons, Terraform templates, architecture diagrams, and step-by-step runbooks, with the option to execute it via an AI agent. Both of them ship the same core conviction the plugin was built on, that an organization's expertise should be packaged so an agent can act on it directly, and both meet developers inside Claude Code where the work actually happens.

Watching a side project's core idea ripple out into shipped, official products is a strange and gratifying thing. The plugin started as an argument about how teams should think about their knowledge. It turned into something customers reach for unprompted, and then into a pattern that larger products adopted. That progression, from idea to artifact to influence, is the whole reason I write these down.

The protocols and the plumbing were always going to get solved. The interesting question was always whether anyone would package their knowledge in a way agents could use. It turns out the answer is yes, and faster than I expected.
