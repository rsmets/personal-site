---
title: The Plugin That Walked Into the Room Before I Did
publishDate: 2026-05-31
img:
img_alt:
category: technology
description: |
  A few months ago I argued that organizations should package their knowledge as something agents can actually consume. The AWS dev toolkit plugin was the proof. Here is what happened since.
tags:
  - Claude Code
  - DevEx Tooling
---

## When the Customer Brings It Up First

The moment I knew the [AWS dev toolkit](https://claude.com/plugins/aws-dev-toolkit) plugin had legs was not a download counter. It was a conversation. I was on a call with a startup, ready to walk them through some AWS tooling, and before I could get there they told me *they were already using it*. They had installed the plugin, wired it into their workflow, and formed opinions, all without me ever mentioning it. There is no better signal than your work showing up in the room ahead of you.

## Back Up: Why I Built This

In April I wrote a piece for the AWS Builder Center, [From Scattered AWS Knowledge to One Installable Plugin](https://builder.aws.com/content/3BpPrp2IVHRRKREGzqwgtQcOt1w/from-scattered-aws-knowledge-to-one-installable-plugin). The thesis was simple and, I think, still under-appreciated: most organizations sit on enormous reservoirs of hard-won knowledge that are completely inaccessible to the agents now doing the work. The knowledge lives in wikis, runbooks, tribal memory, and the heads of a few senior engineers. An agent cannot consume any of that.

The fix is to stop treating organizational knowledge as documentation for humans and start packaging it as something that is versioned, shared, and that an agent can install and reason over. Skills, sub-agents, and MCP servers, bundled into a single installable unit. The [aws-dev-toolkit](https://github.com/aws-samples/sample-claude-code-plugins-for-startups) plugin was me putting it into practice: 34 skills, 11 sub-agents, and 1 remote MCP server interface for building, migrating, and running architecture reviews on AWS, all installable in one command.

The goal was to distill the internal AWS tribal knowledge that is buried in internal Technical FAQs and siloed in internal Slack conversations into a digestible format for customers to leverage. Since becoming an AWS Solutions Architect, I really wanted AWS customers to have access to the same rich and actionable knowledge I have now and wish I had for the decade prior building on AWS. I also wanted to build a tool that could replace me a majority of the time. A semantic tool that has your full project context is already meetings ahead of a human who has to ask discovery questions to get the same understanding.

## What Happened Since April

It got published to the official Claude Code marketplace, and the adoption curve has been the fun part to watch. It crossed 550 installs, then a thousand, and it now sits north of **1,300 installs**, climbing steadily without a marketing push behind it. For a focused, opinionated developer tool aimed at startups building on AWS, that kind of organic pickup is exactly the validation the original thesis needed. People do not keep installing a thing that does not earn its place in their workflow.

If you want to try it:

```bash
claude plugin install aws-dev-toolkit@claude-plugins-official
```

## The Part I Did Not Expect

It turns out the plugin beat AWS product teams to the punch. It ultimately heavily influenced two Amazon products that launched this month: [AWS Startup Advisor](https://aws.amazon.com/aws-startups/advisor/) and the [AWS Startups Migrate](https://aws.amazon.com/startups/migrate/) experience. Both are motions the plugin directly supports, now in a much easier to maintain package.

Startup Advisor lets founders scaffold their architecture and deploy local code to AWS right from their IDE, with guidance tailored to what they are building. The Migrate experience takes a team from another cloud, GCP or an OpenAI or Gemini stack, and generates a personalized migration plan: service mapping, cost comparisons, Terraform templates, architecture diagrams, and step-by-step runbooks, with the option to execute it via an AI agent. Both of them ship the same core conviction the plugin was built on, that an organization's expertise should be packaged so an agent can act on it directly, and both meet developers inside Claude Code where the work actually happens.

Watching a side project's core idea ripple out into shipped, official products is a strange and gratifying thing. It turned into something customers reach for unprompted, and then into a pattern that larger products adopted. That progression, from idea to artifact to influence, is the whole reason I write these down.
