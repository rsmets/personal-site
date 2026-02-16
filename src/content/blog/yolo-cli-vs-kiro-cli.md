---
title: "Yolo CLI vs. My Bespoke Kiro CLI Setup with AWS MCP Tools"
publishDate: 2026-02-15
img:
img_alt:
category: cli
description: |
  A hands-on comparison of the Yolo CLI and my local Kiro-based setup with AWS MCP server tools, using identical prompts to query AWS resources side by side.
tags:
  - AI Development
  - AWS Tooling
  - CLI Tools
  - MCP
---

## Background

I have been running a bespoke local CLI setup built on top of Kiro with AWS MCP server tools for a while now. It lets me query and manage my AWS resources conversationally, leveraging the model of my choice and a curated set of MCP servers. When a colleague pointed me toward [Yolo CLI](https://yolo.dev), a new entrant in the agentic cloud management space, I figured the only fair way to evaluate it was to run identical prompts through both tools and compare the outputs side by side.

## Getting Started with Yolo

The Yolo team appears to be iterating quickly. When I first tried setting it up on a Thursday their OAuth was broken preventing api key creation. Then upon trying again on Friday after the OAuth bug was fixed, I hit an authentication error using temporary STS credentials. After downloading the latest version of the CLI the a couple days later, it worked without issue. At least they are trending in the right direction with their bug fixes!

## The Comparison

I ran a series of progressively detailed prompts through both tools. Here is how they stacked up.

### Prompt 1: "How many EC2 instances do I have running right now?"

Both tools returned the correct count. The notable difference was that Yolo proactively included additional context, such as the Availability Zone for each instance, without being asked. My Kiro setup returned a more minimal response, answering exactly what was asked and nothing more.

### Prompt 2: Requesting More Detail

Because Yolo had already surfaced AZ information unprompted, my follow-up to Yolo was simply: _"Can you give me more detailed info about these instances?"_ For my Kiro setup, I had to be more specific: _"Can you give me more info about these instances such as the AZ they are in?"_

Both tools delivered the requested detail. The takeaway here is that Yolo's default verbosity saved a round trip. Whether that is a feature or noise depends on your preference, but for exploratory queries it is a nice touch.

### Prompt 3: "Can you give me cost information for all my resources?"

This is where things got interesting. Yolo's output was truncated in the terminal due to length, but the full output was far more detailed. It provided a comprehensive cost breakdown even while acknowledging it did not have every specialized tool available. It was clear that Yolo's prompts are tuned to extract maximum value from the AWS CLI and related commands.

My Kiro setup, on the other hand, initially fell short here because I had not configured the internal Cost Explorer MCP server in my CLI environment. I only had it wired up in the IDE. When I ran the same prompt through my IDE instead, it executed a series of AWS CLI commands and returned a solid cost summary, though it took noticeably longer than Yolo did.

## Analysis

### Where Yolo Shines

- Out-of-the-box experience is polished. Install it and go.
- Default prompt tuning is clearly optimized for AWS resource queries. It surfaces useful context proactively.
- Response speed was consistently faster, likely due to optimized prompt chains and tool orchestration.

### Where My Bespoke Setup Has the Edge

- Model control. I can always use the latest and most capable model available. With Yolo, you are on whatever model they have selected.
- Customizability. I can add, remove, or swap MCP servers and tailor the system prompt to my exact workflow.
- Extensibility. If I set up a dedicated custom sub-agent for AWS resource management with a tuned system prompt, the outputs would be nearly identical to Yolo's. The gap is largely a matter of prompt engineering effort, not capability.

### The Underlying Tooling is the Same

It was clear from observing both tools that they rely on very similar underlying mechanisms. Both lean heavily on native AWS CLI commands, and for EKS-related queries, both reach for `kubectl`. The differentiation is not in what tools they call but in how the prompts are structured and how the outputs are formatted.

## The Bigger Picture: Powers and Skills

This comparison reinforced something I have been thinking about for a while. Kiro "Powers," or more broadly "skills," are the ideal way to package these kinds of sub-agents with tailored prompts and tools. That is essentially what Yolo is: a packaged skill with a polished prompt layer on top of ubiquitous AWS tooling.

If I invested the time to build a dedicated AWS management Power with a refined system prompt and the right MCP servers pre-configured, the experience would converge with Yolo's. But that takes effort, and effort is the trade-off. Installing a CLI tool will always be faster than building a bespoke setup, even if the ceiling of the bespoke setup is higher.

## Where Yolo Could Differentiate

If Yolo can move beyond finely tuned prompts and ubiquitous tools into proactive resource management, there is meaningful differentiation to be had. Think automated cost optimization recommendations, drift detection, or migration assistance. If they can help teams migrate off expensive AWS wrapper services like Supabase onto native AWS services, that is real value, especially given the additional tooling setup required to manage both platforms.

## Conclusion

The first-touch hands-on experience with Yolo was fairly impressive. It was slightly better than my local setup out of the box, but I suspect that gap largely comes down to prompt tuning, which I did not spend time refining on my end. For someone who wants a fast, zero-config way to query AWS resources conversationally, Yolo is a solid choice. For someone who wants full control over the model, the tools, and the prompts, a bespoke Kiro setup with MCP servers is the way to go.

The real question is not which is better today. It is whether Yolo can build meaningful differentiation beyond prompt engineering, or whether the open ecosystem of MCP servers and agentic IDEs will commoditize what they offer. I am watching closely.
