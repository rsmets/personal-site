---
title: Agentic AI Tooling
publishDate: 2024-11-27
img:
img_alt:
category: side-project
description: |
  Putting together a functional AI agent as never been easier. So many tools available. Let's dive in.
tags:
  - AI
  - Tooling
---

Putting together a functional agentic AI app as never been easier. With a host of models to choice from and frameworks to assist all it takes a little the drive.

## Agent Frameworks

Some of the most popular AI frameworks:

- [CrewAI](https://www.crewai.com/open-source)
- [Autogen](https://github.com/microsoft/autogen)
- [AgentStack](https://github.com/AgentOps-AI/AgentStack) - built on top of the previous two frameworks.

Personal favorite:

- [Eliza](https://github.com/ai16z/eliza) - primarily made for social media and community management, but has generic capabilities as well with a built in RAG and vector DB interface.

Why? It is simply all in Typescript. I language I much prefer to the predominantly popular Python, amongst the data crowd. _I have a dream that python disappears one day, with all the “coders” and data folks that use it being replaced by ai agents who rewrite themselves into a more sensible language._

### Models

LLM models accessible via the API is no longer cutting edge. They have been available for many years now. Some popular cloud accessible models are:

- GPT-4o
- Claude 3.5
- Llama
- RedPill

### Supporting Tools

In addition to frameworks that leverage prebuilt models, the bells whistles products aka supporting toolchains, are not surprisingly extensive as well. They support a countless bits of functionality but my favorites are custom voice and video avatar solutions.

#### Voice

My favorite custom voice service is offered by [ElevenLabs](https://elevenlabs.io/).

However, I would be remiss to not mention the [RealTime](https://openai.com/index/introducing-the-realtime-api/) API by OpenAI that is currently in beta. The natural conversational ability that the API supports is spectacular. Even supporting, ["prompting for voices"](https://platform.openai.com/docs/guides/realtime/overview?text-generation-quickstart-example=audio#prompting-for-voices) which allows you to dictate a prompt simply by the inflections in your voice. I can not wait until they allow you to use your own [voice](https://platform.openai.com/docs/guides/realtime/overview?text-generation-quickstart-example=audio#voices) model.

#### Avatar

[Simli](https://www.simli.com/)'s offering is the one I'm most familiar with, however I'm not terribly impressed by it. I would like to get hands on experience the OSS project [EchoMic](https://github.com/antgroup/echomimic) to allow for more customizability.

### Demo

The best way to keep on top of these tools is to use them! So, using Eliza, I clone myself, my mother-in-law and Santa into an AI agent with knowledge, memories, and uniquely styled communication patterns. They were powered by OpenAI's GPT-4o and I used ElevenLabs and Simili for the avatars. Putting it all together, I had AI agents that my family could converse with this thanksgiving. Please check out final outcome in on the project page.
