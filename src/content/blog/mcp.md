---
title: MCP is the Agentic Unlock
publishDate: 2025-05-28
img:
img_alt:
category: technology
description: |
  Stuffing an LLM's context window is the current state of the art for agentic applications, now the community has settled on a ubiquitous and interoperable way to do it.
tags:
  - AI Development
  - Agentic AI
  - LLM Tooling
---

## Model Context Protocol: The New Standard

The Model Context Protocol (MCP) was open-sourced by Anthropic in November 2024, and in just six short months, it has established itself as the dominant standard for context enrichment for LLM interactions. It has rapidly evolved into the backbone of nearly every serious agentic AI application on the market.

### What is MCP?

At its core, MCP defines a structured way for LLMs to interact with external tools, data sources, and services. Before MCP, every AI company had their own proprietary methods for extending model capabilities:

- OpenAI had function calling
- Anthropic had tool use
- Google had extensions

This fragmentation created significant challenges for developers building cross-platform applications. MCP solves this by providing a standardized interface that works across different models and platforms.

### Why MCP Matters

MCP's significance extends far beyond simple standardization. It fundamentally changes how we build AI applications by:

1. **Enabling true composability** - Tools built for one LLM can be used with any MCP-compatible model
2. **Simplifying integration** - Developers can write a single integration that works across models
3. **Providing a consistent approach to tool use** - No more juggling different formats for different models

As someone who's leverage modern agentic development frameworks, i.e. [Eliza](https://github.com/ai16z/eliza) and AWS Bedrock to name a couple, the way that context enrichment took place was always a bit bespoke. Now MCP standardizes this process through a simple protocol with a handful of primitives: resources, tools, prompts, and sampling. _And a handful more on the way: inputs, outputs, and more._

### The Technical Implementation

MCP uses a JSON-based protocol with several key components:

- **Server Discovery** - How LLMs find available tools
- **Tool Registration** - How tools advertise their capabilities
- **Request Format** - Standardized structure for tool invocation
- **Response Format** - Consistent way to return results

The protocol is designed to be lightweight and extensible, making it easy to implement in any language or framework. Most importantly, it's stateless, allowing tools to be distributed across different services or even organizations.

```json
// Example MCP tool registration
{
  "tool_name": "search_web",
  "description": "Searches the web for information",
  "parameters": {
    "query": "string",
    "max_results": "integer"
  },
  "returns": {
    "results": "array",
    "total_found": "integer"
  }
}
```

### Adoption Across the Industry

The rapid adoption of MCP has been nothing short of remarkable. In just six months, we've seen:

- **Clients** implementing native MCP support
- **Tool developers** standardizing on MCP interfaces
- **Open-source frameworks** building MCP compatibility layers

Even companies that previously invested heavily in proprietary protocols are now offering MCP compatibility layers. This convergence on a single standard has accelerated innovation in the space, as developers can focus on building capabilities rather than adapting to different interfaces.

### Real-world Impact

The most visible impact of MCP has been in the explosion of agentic applications. Before MCP, building agents that could reliably interact with external systems required significant custom development. Now, with MCP:

- **Tool ecosystems** are flourishing
- **Complex workflows** involving multiple tools are much more reliable, _somewhat_

### The Future of MCP

As we look ahead, several exciting developments are on the horizon for MCP:

1. **Enhanced security models** - More granular permissions and access controls via OAuth 2.1 - currently in [draft](https://modelcontextprotocol.io/specification/draft/basic/authorization)
2. **Streaming capabilities** - Now supporting Streamable HTTP instead of just SSE
3. **Richer semantic descriptions** - Allowing models to better understand tool capabilities via new primitives

The community is also working on extensions to support more complex interactions, such as multi-step planning and tool composition. These advancements will further cement MCP's position as the foundation for agentic AI.

### Development Tools

Some of my favorite tools in the space to date:

- [Smithery](https://smithery.ai/) - An MCP server registry with secret handling
- [Composio](https://composio.dev/) - A collection of MCP servers with baked in OAuth scope and token handling
- [Mastra](https://mastra.ai/en/examples/agents/deploying-mcp-server) - My favorite Agentic Typescript framework, with MCP server support as of May 2025.
- [Postman MCP Server Generator](https://www.postman.com/explore/agent-generator) - A tool to generate MCP servers from Postman's public APIs and OpenAPI specifications
- [Vincent](https://docs.heyvincent.ai/documents/AI_Integration.html) - An agentic interface into the Web3 ecosystem

## How to Keep Up

It was while listening to Software Engineering Daily's [interview](https://softwareengineeringdaily.com/2025/05/13/anthropic-and-the-model-context-protocol-with-david-soria-parra/) with the MCP co-create David Soria Parra on May 13th, 2025, that I realized just how nascent this pivotal ecosystem is. Living in San Francisco, I immediately dropped everything I was doing and look for in person MCP meetups and was attending my first one at Github's HQ downtown later that day. Since then I have attended a handful of different events of the last two weeks. The most engaging one was the [MCP Dev Summit](https://mcpdevsummit.ai/), where I got to talk with David and other's on the MCP steering committee about the future of MCP. I'll be attending another meet up later today.

## Conclusion

The Model Context Protocol represents a pivotal moment in AI development. By providing a unified standard for model-tool interaction, it has eliminated one of the major bottlenecks in building sophisticated AI applications.

As we continue to push the boundaries of what's possible with LLMs, MCP will likely evolve to address new challenges and use cases. But its core promise – interoperability and standardization – has already transformed how we approach AI development. For developers looking to build the next generation of intelligent applications, MCP isn't just a helpful standard – it's becoming an essential foundation.

I think clearly there is work to be done around authorization but having this a standard emerge as a constant in an ecosystem that is been in constant flux is very positive. Another positive sign the emerging prevalence of SDK and frameworks in languages other than Python. I think this is clear signal that this sort of technology is out the data scientist's hands and is being adopted by the professional software development community.
