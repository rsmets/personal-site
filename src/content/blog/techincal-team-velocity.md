---
title: Engineering Leadership Hot Take - Technical Team Velocity
publishDate: 2025-07-01
# img: /assets/project-management.jpeg
# img_alt: Project management workflow diagram showing team velocity concepts
category: leadership
description: |
  Engineering organizations are required to introduce development velocity speed bumps... but I feel one in particular can be acutely detrimental.
tags:
  - Operations
  - Workplace Culture
  - Leadership
---

### Ticketing Systems and Project Management

I have spent the majority of my career in startup environments where developer velocity is paramount. Through my experience contributing source code and leading engineering teams, I have gained appreciation for many practices that I initially found overbearing when trying to write and ship software. These practices include:

- Authoring RFCs (Request for Comments)
- Code reviews
- Test-driven development
- End-to-end testing
- Ticket tracking

I have concluded that the most detrimental of these practices is team-wide ticket tracking at the technical task level. The overhead of maintaining up-to-date tickets not only demands significant time and effort but, more critically, hampers the development of a culture where technical staff take ownership of the complete lifecycle of their work.

Regarding software development, the organizational segment that benefits most from accurate ticket tracking is the product team, not the engineering team. Product team members, who don't work directly within source code management systems, lack the same visibility into development progress. In larger organizations, additional layers of reporting and management are even further removed from the software development process. This disconnect led to the emergence of various project management methodologies and certifications designed to manage software development via various forms of ticketing: Kanban, Scrum, Agile, and others.

### Side Step Middle Management

One of the most memorable aspects of Paul Graham's famous "Revenge of the Nerds" essay [1] was his critique of "pointy-haired middle management." While the spiky hair of the early 2000s has fortunately disappeared, the bureaucratic inefficiency associated with middle management and the operational practices that sustain it should remain a concern for those of us who write software professionally.

In my most recent professional experience, I had the opportunity to implement my beliefs by eliminating formal ticketing and the Kanban/Scrum management system that was in use. This required fostering a culture of ownership and hiring experienced developers who not only appreciated task-level ambiguity but thrived when given the autonomy to make their own implementation decisions and manage their work methods.

### I'm Not Alone?

However, even within my developer-centric communities, I felt my stance was not the norm. To my surprise and delight, I discovered other voices sharing similar sentiments.

![Project management slide at a LinearB industry leaders dinner](/assets/project-management.jpeg) A photo I took of a slide at a LinearB industry leaders dinner in San Francisco, December 2024. _I wish I could credit the speaker and find the rest of their presentation, but unfortunately had no luck._

Of course, developer velocity, while crucial in startup environments, is not the only characteristic that should be optimized. Reliability is often positioned as opposing velocity, but I argue this shouldn't be the case with proper organizational practices and tactics. I believe the biggest casualty of poor project hygiene is the non-technical project manager—which, at a developer conference, we were comfortable overlooking.

### Concessions

I concede that loose tracking will likely break down if the engineering team size exceeds the mythical number of five—which Jeff Bezos indirectly supports with his "two-pizza team" rule of thumb. I also acknowledge that some form of initiative tracking is necessary for organizational clarity and often for compliance purposes.

The product roadmap and the routes to achieve it are typically the responsibility of the product team. I understand why non-technical individuals, who don't maintain version history of their personal notes or task lists in Git, gravitate toward ticketing systems.

### Final Thoughts

For individuals who interface with version control systems daily and employ associated best practices, I believe the overhead of ticketing systems should be actively avoided when the following circumstances are met:

- Establishment of a clear and transparent product roadmap (quarterly, monthly, or weekly)
- An engineering culture that takes pride in ownership throughout the entire development lifecycle
- An organizational culture that leverages the best tools for each specific task

Tooling that facilitates ticketing based on Git workflows is an evolving area that I hope continues to improve. I am confident that as foundation models advance, these service offerings will mature, allowing product teams to gain visibility they're accustomed to without requiring development teams to invest their time in ticket maintenance.

In conclusion, my experience has taught me that the cornerstone practice of always seeking the "why" has led me to conclusions that are not popular. Fortunately, I have been positioned to implement some of my engineering leadership practices with considerable success. While tactics that work in one context may not work in another, I hope to always find myself on a team (or building one) that is equally eager to remove the guardrails of excessive technical project management and ticketing.

[1] Graham, Paul. [Revenge of the Nerds](https://paulgraham.com/icad.html). May 2002.
