---
title: Agentic AI Tooling
publishDate: 2024-11-27
img:
img_alt:
category: side-project
description: |
  Putting together a functional agentic AI app has never been easier. With a host of models to choose from and frameworks to assist, all it takes is a little imagination.
tags:
  - AI
  - Tooling
---

## Agent Frameworks

Some of the most popular AI frameworks:

- [CrewAI](https://www.crewai.com/open-source)
- [Autogen](https://github.com/microsoft/autogen)
- [AgentStack](https://github.com/AgentOps-AI/AgentStack) - built on top of the previous two frameworks.

Personal favorite:

- [Eliza](https://github.com/ai16z/eliza) - primarily made for social media and community management, but has generic capabilities as well with built-in RAG, Retrieval-Augmented Generation, and vector DB interface.

Why? It is all in TypeScript. A language I much prefer to the predominantly popular Python among the data crowd. _I have a dream that Python disappears one day, with all the “coders” and data folks that use it being replaced by AI agents who rewrite themselves into a more sensible language._

### Models

LLM models accessible via the API are no longer cutting edge. They have been available for many years now. Some popular cloud-accessible models are:

- GPT-4o
- Claude 3.5
- Llama Cloud
- Llama Local
- RedPill

### Supporting Tools

In addition to frameworks that leverage prebuilt models, the bells and whistles products, aka supporting toolchains, are now surprisingly extensive as well. They support countless bits of functionality, but my favorites are custom voice and video avatar solutions.

#### Voice

My favorite custom voice service is offered by [ElevenLabs](https://elevenlabs.io/). The leading open source alternative is [F5-TTS](https://github.com/SWivid/F5-TTS), which I have yet to be hands on with. The convenience of ElevenLabs offering is undeniable.

I would be remiss not to mention the [RealTime](https://openai.com/index/introducing-the-realtime-api/) API by OpenAI that is currently in beta. The natural conversational ability that the API serves is spectacular. It even supports ["prompting for voices"](https://platform.openai.com/docs/guides/realtime/overview?text-generation-quickstart-example=audio#prompting-for-voices) which allows you to dictate a prompt simply by the inflections in your voice. Once they allow using custom [voice](https://platform.openai.com/docs/guides/realtime/overview?text-generation-quickstart-example=audio#voices) models it will be the best offering on the market.

#### Avatar

[Simli](https://www.simli.com/)'s offering is the one I'm most familiar with, however, I'm not terribly impressed by it. I would like to get hands-on experience with the OSS project [EchoMic](https://github.com/antgroup/echomimic) to allow for more customizability.

### Demo

The best way to keep on top of these tools is to use them! So, using Eliza, I cloned myself, my mother-in-law, and Santa into an AI agent with knowledge, memories, and uniquely styled communication patterns. They were powered by OpenAI's GPT-4o, and I used ElevenLabs and Simili for the voices and avatars. Putting it all together, I had AI agents that my family could converse with this Thanksgiving. [Check it out](https://www.raysmets.me/work/agentic-ai-video-chat).
