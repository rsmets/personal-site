---
title: Engineering Leadership Hot Take - Ditch Your Ticketing System
publishDate: 2025-07-02
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

I have spent the majority of my career in startup environments where developer velocity is paramount. Through my experience contributing source code and leading engineering teams, I have gained appreciation for many practices that I initially found overbearing when trying to write and ship software professionally. These practices include:

- Authoring RFCs (Request for Comments)
- Code reviews
- Test-driven development
- End-to-end testing
- Ticket tracking

While this list appears to be high-level overview software authoring best practices, I feel the practice of team-wide ticket tracking at the technical task level is, in fact, detrimental. The overhead of maintaining up-to-date tickets not only demands significant time and effort but, more critically, hampers the development of a culture where technical staff take ownership of the complete lifecycle of their work.

Regarding software development, the organizational segment that benefits most from accurate ticket tracking is the product team, not the engineering team. Product team members, who don't work directly within source code management systems, lack the same visibility into development progress. In larger organizations, additional layers of reporting and management are even further removed from the software development process. This disconnect led to the emergence of various project management methodologies designed to manage software development: Kanban, Scrum, Agile, and others. While I acknowledge these methodologies can be effective frameworks for organizing work, I argue that implementing them through granular ticket tracking is an inefficient tactic that undermines their intended benefits.

### Side Step Tactics Employed by Middle Management

One of the most memorable aspects of Paul Graham's collection of essays published in "Hackers and Painters" [1] was his critique of "pointy-haired middle management." While the spiky hair of the early 2000s has fortunately disappeared, the bureaucratic inefficiency associated with middle management and the operational practices that sustain it should remain a concern for those of us who write software professionally. Driven home in his famous essay, "Revenge of the Nerds" [2], one of the traits of such individuals is the desire for "industry best practices" that shields them from the burden of responsibility upon failure. I feel mindlessly using ticketing systems for technical teams is a tactical by-product of such thinking.

In a more recent publication, No Rules Rules [3], which examines the origins of Netflix’s radically unconventional organizational culture, a similar theme emerges: organizations often undermine their own speed and creativity by enforcing overly standardized processes. By obsessively ensuring clear context—from the organizational level down to individual contributors—and fostering a culture of trust and openness, many traditional “table stakes” processes become unnecessary. Reading this alongside Hackers & Painters, a decade apart, I was struck by the resonance between them—both argue that enabling talented individuals through clarity and autonomy is far more effective than rigid management structures.

In my most recent professional experience, I had the opportunity to implement my own beliefs, influenced by the literature and galvanized by my experience, and eliminate formal ticketing via the Kanban/Agile management system that was in use. This required fostering a culture of ownership and hiring experienced developers who not only appreciated task-level ambiguity but thrived when given the autonomy to make their own implementation decisions and manage their own time and efforts.

### I'm Not Alone?

Within my developer-centric communities, my stance is not the norm. Even in a progressively minded technical leadership program I completed in 2023, my views were considered a bit radical. However, to my surprise and delight, I discovered other voices sharing similar sentiments that I could converse with in a way the pages of literature do not allow.

![Project management slide at a LinearB industry leaders dinner](/assets/project-management.jpeg) A photo I took of a slide at a LinearB industry leaders dinner in San Francisco, December 2024. _I wish I could credit the speaker and find the rest of their presentation, but unfortunately had no luck - yet._

Of course, developer velocity, while crucial in startup environments, is not the only characteristic that should be optimized. Reliability is often positioned as opposing velocity, but I argue this shouldn't be the case with proper organizational practices, tools and tactics. _A whole other post about the exact recipe I have had success with for balancing project management hygiene and velocity will be authored..._

### Concessions

I concede that a lack of ticketing, or more broadly strict project management hygiene, will likely break down if the engineering team size exceeds the mythical number of five. Mr. Bezos indirectly agrees as interpreted by his widely known "two-pizza team" rule of thumb. I also acknowledge that some form of initiative tracking is necessary for organizational clarity and often for compliance purposes. This burden of a product roadmap and the routes to achieve it typically the responsibility of the product team - adjacent but outside of the purview of the technical development team. I understand why non-technical individuals, who don't maintain version history of their personal notes or task lists in Git, gravitate toward ticketing systems. Such ticketing systems are likely appropriate for those individuals, but should remain loosely directional, leaving technical teams the discretion to accomplish tasks as they deem most efficient.

### Final Thoughts

For individuals who interface with version control systems daily and employ associated best practices, I believe the overhead of ticketing systems for technical team management should be actively avoided when the following circumstances are met:

- Context is clear via transparent product roadmap (quarterly, monthly, or weekly)
- An engineering culture that takes pride in ownership throughout the entire development lifecycle
- An organizational culture that leverages the best tools for each specific task

Tooling that facilitates ticketing based on Git workflows is an evolving area that I hope continues to improve. I am confident that as foundation models advance, these service offerings will also mature, allowing product teams to gain visibility more naturally (via natural language) into them without requiring development teams to invest their time in ticket maintenance.

In conclusion, my experience has taught me that the cornerstone practice of always seeking the "why" has led me to conclusions that are not popular. Fortunately, I have been positioned to implement some of my engineering leadership practices with considerable success. I acknowledge that introducing "development speedbumps" often come with scale and stability, but they should be introduced with caution and only after careful consideration of the context - not compulsively. While tactics that work in one context may not work in another, I hope to always find myself on a team (or building one) that is equally eager to remove the guardrails of traditional technical project management and ticketing. I also look forward to embracing and leveraging new ways of organization-wide enablement as tooling continues to evolve.

citation:

[1] Graham, Paul. [Hackers & Painters](https://paulgraham.com/hackpaint.html). 2004.

[2] Graham, Paul. [Revenge of the Nerds](https://paulgraham.com/icad.html). May 2002.

[3] Hastings, Reed, and Meyer, Erin. [No Rules Rules: Netflix and the Culture of Reinvention](https://www.norulesrules.com/). 2020.
