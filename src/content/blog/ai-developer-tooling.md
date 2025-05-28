---
title: State-of-the-Art AI Development Tools
publishDate: 2024-12-23
img:
img_alt:
category: technology
description: |
  AI-powered development tools have revolutionized how we build software. From intelligent code editors to full-stack development agents, the landscape is changing rapidly.
tags:
  - Development Tools
---

## Intelligent Code Editors

Augmented software development experience with AI-powered code editors.

### [Cursor](https://www.cursor.com)

Cursor marked the beginning of the AI-first code editor era. Built as a fork of Visual Studio Code, it introduced features like:

- Multi-line edits.
- Smart rewrites.
- Natural language commands.

It gained popularity for its seamless integration with developer workflows making it considerably better than Github's [Copilot](https://github.com/features/copilot) VS Code functionality. However, **it pales in comparison to Windsurf**.

### [Windsurf](https://codeium.com/windsurf)

Released in November 2024, Windsurf advanced the concept of agentic AI in code editing. Key capabilities include:

- Running CLI commands on behalf of developers.
- Full codebase context-awareness.
- Ability to change the underlying LLM model used for code completion.

After using Windsurf in professional and personal project settings for the last few weeks, I can say without a doubt that **it is the most impressive developer tool I have used in all of 2024**.

Its ability to automatically run CLI commands with all of the context of the project's source code is the next-level aspect of this tool.

An example of this that blew me away was setting up a high availability Redis Sentinel Helm deployment that had Redis Stack modules but used Bitnami's [Redis chart](https://github.com/bitnami/charts/tree/main/bitnami/redis) (which does not support [Redis Stack](https://redis.io/docs/latest/operate/oss_and_stack/install/install-stack/) modules natively). It was doing things like looking at the Kubernetes state via `kubectl` to figure out what needed to be updated in the deployment configs and then verifying it by pulling the image locally and going through the file structure to verify its suggestion would work. The solution it arrived at was simple yet not obvious, however it saved me hours of researching industry practices and syntax for using an init container and then volume mounting files between the [Redis Stack image](https://hub.docker.com/repository/docker/redis/redis-stack-server/) and the vanilla Redis image. This was after presenting two complex solutions and getting input from me for which path to pursue. It felt like I got to speak with an absolute developer ninja who knew precisely what to do and then took the keyboard from me and did it while I looked over their shoulder.

**Recommendation**: Treat it like the principal engineer that sits next to you in the office - it can help with anything source code related and sometimes you can just fork over your keyboard and watch magic happen.

## Full-Stack Development Tools

These tools allow one to author software in a purely prompt-driven fashion.

#### Honorable Mentions

- [Replit](https://replit.com/)
- [bolt.new](https://bolt.new/)

### [Vercel v0](https://vercel.com/)

A year ago, Vercel's v0 was the pinnacle of AI-driven development for deploying and scaling front-end web applications. However, its prominence has waned as new tools emerged. However, most recently, a deeper Vercel integration allows for deploying created apps - which I imagine is a major benefit for some, but for this audience, this is likely already trivial.

### [Lovable.dev](https://www.lovable.dev/)

This tool has set a new standard by offering:

- Agentic development capabilities for full-stack applications.
- An integrated persistence and use management layer via Supabase.
- An opinionated Typescript stack perfect for prototyping web applications.

Lovable.dev eliminates the need for extensive full-stack knowledge, empowering developers to focus on prototyping and creating software purely through prompts. It has a lot more to offer than any other agentic I have used thanks to having the full spectrum of features necessary to build a The downside to this tool currently is not being able to have it manipulate existing projects.\_

**Recommendation**: Think of it as rockstar intern code monkey. Very talented and very useful but requires a far amount of direction.

## The Rise of Open-Source Agentic AI Frameworks

The past two months have seen open-source agentic AI frameworks take off, democratizing access to advanced platform level AI capabilities. I talked about my favorite, Eliza, in a previous blog post, [Agentic AI Tooling](https://www.raysmets.me/blog/agentic-ai-tooling). It's frameworks and developer experience strides like Eliza that really feels like a Linux moment for the Agentic AI powered application developers.

## Conclusion

From Windsurf's intelligent fully contextual code editing to Lovable.dev's full-stack agentic development convenience, these tools enable applications to be authored with the need for a seasoned developer at the helm.

Soon, I plan to relaunch [Found Audio](https://www.raysmets.me/work/found-audio) with the core app source code created with Lovable.dev and higher level feature augmented and authored in Windsurf. Definitely, will be documenting that process! _I'll leave you to compare final outputs implementations - for sure the UI will have a leg up, but also my postgres service provider is sunset end of January 2025 so Supabase is looking more and more enticing..._

_Updated 2025-01-08: The new site is coming along swimmingly. I have about 5x the original functionality with 80% less effort to build. You can read more about this effort [here](/work/found-audio)._
