---
title: Agentic AI
publishDate: 2024-11-27 00:00:00
img: /assets/santa_ai.gif
img_alt: Santa avatar gif
description: |
  Using the latest tools and frameworks for creating an agentic AI, I made a clone of Santa, myself, and my mother-in-law.
tags:
  - Agentic AI
  - Humorous
  - AI Tooling
---

This was an incredibly fun project getting hands-on with the [AI tooling](https://www.raysmets.me/blog/agentic-ai) from my blog post.

It was my first time using an agentic AI framework, Eliza, giving this project a new element compared to the David Attenborough AI voice project from the previous year. The built-in Eliza vector database support made persisting memory across processes trivial, which allowed for much more lifelike interactions than ephemerally provided context from the David Attenborough project.

### Implementation

I forked and contributed back to a project, [LiveVideoChat](https://github.com/rsmets/LiveVideoChat), which the Eliza creator, Steve Hug, forked from Simli's older example app repo.

It requires an Eliza instance running the "Direct" client for API interfacing. It also requires a Simli AI, OpenAI, and ElevenLabs API key.

#### Voice Model

[ElevenLabs](https://elevenlabs.io/) voice API was used to call a custom trained voice model. Since using this service a year ago, they now require a "voice captcha" to prevent cloning known voices. So instead of being able to clone a well-known Santa voice, I had to use their new text-to-voice generation capability. The prompt used was:

`A warm, jolly male voice with a rich, deep timbre. Cheerful and full of life, it often carries a hearty, resonant laugh (e.g., “Ho, Ho, Ho!”). The tone is friendly, inviting, and slightly grandfatherly, exuding kindness and generosity. It’s animated but calming, with a touch of magical charm that feels timeless and comforting.`

Frankly, it turned out mediocre, but usable.

<audio controls>
  <source src="/assets/voice_preview_SantaEuro.mp3" type="audio/mp3">
  Your browser does not support the audio element.
</audio>

#### Voice Capture

OpenAI's Whisper API was used to convert the speech to text, which was then fed to Eliza via its exposed "direct client" API.

#### Avatar

Simli was used to create the avatars for the project.

_Santa's avatar._

<video width="320" height="240" controls autoplay loop muted>
  <source src="/assets/santa_ai.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

### Final Outcome

Putting all the pieces together, we have Santa with his own unique personality, diction, voice, complexion, and memories. Pretty remarkable! Enjoy the demonstration video of me talking with Santa.

### Desired Improvements

This made for a sweet hacky PoC! But I would love to be able to share the project with those not within line of sight of my computer. This, of course, would mean deploying the web app. But with costs for operation being fairly prohibitive, this was never done.

I contemplated putting Santa behind a paywall for the Christmas season but I wasn't able to bring him to my standards to ask folks for payment. All in all, I would love to have the high-level bells and whistles AI functionality but running locally. A local model, Llama-local comes to mind, a local AI voice generation, [EchoMic](https://github.com/antgroup/echomimic), and a locally running avatar with [F5-TTS](https://github.com/SWivid/F5-TTS).
