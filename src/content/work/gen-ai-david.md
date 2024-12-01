---
title: Generative AI David Attenborough Narration
publishDate: 2023-11-17 00:00:00
img: /assets/gen_david_a.png
img_alt: Soft pink and baby blue water ripples together in a subtle texture.
description: |
  David Attenborough narrating your life as if it were a nature documentary
tags:
  - Generative AI
  - Humorous
  - Inspired
---

David Attenborough narrates your life, thanks to the ability to string together AI capabilities through APIs. This project combines OpenAI's GPT and Vision API with ElevenLabs for text-to-speech using a custom-trained David Attenborough voice. It was created immediately after the OpenAI Vision API became available. The project was heavily inspired by a Twitter post, but I expanded on the idea, driven by my fascination with the potential for "opportunistic" AI photography. The system works by capturing still images every second, feeding them to GPT via the Vision API, and then generating narration through ElevenLabs for speech.

### Implementation

#### App

https://github.com/rsmets/ai-narrator

The project began as a fork of an existing open-source Python application that continuously captured images and processed them through the Vision API. I made significant improvements to the original codebase and contributed many of these enhancements back to the community. My favorite addition was creating a photobooth-like experience, where groups of individuals could pose, capture an image, and hear David Attenborough narrate it. This feature added a fun, interactive element, making it a hit at parties!

_An instance of Photobooth mode fun._

![Group photobooth picture](/assets/Dev+Group/image.jpg)

<audio controls>
  <source src="/assets/Dev+Group/audio.wav" type="audio/wav">
  Your browser does not support the audio element.
</audio>

_A photo from 2023's Christmas Dinner, taken in the app's long-running mode._

![Group photobooth picture](/assets/dinner/image.jpg)

<audio controls>
  <source src="/assets/dinner/audio.wav" type="audio/wav">
  Your browser does not support the audio element.
</audio>

#### Web App

https://github.com/rsmets/ai-narrator-simple-webapp

A talented coworker decided to port the application to JavaScript, enabling it to be deployed as a web app. This implementation relied on Socket.io to stream the audio to the client while the webcam captured images. The images were converted to Base64 and sent to the server, where the same processing pipeline as the Python app was executed on the Node.js backend. Just as I normally do in professional settings, I then took the app and deployed it, opting to use Vercel for this project.

Unfortunately, due to the costs associated with OpenAI API usage, the web app is no longer publicly deployed.

### Inspiration

While the concept of an AI-powered "moments" capturer had been a long-standing dream of mine, the original inspiration came from Charlie Holtz's project. His open-source work served as the foundation for this app. You can find the original post here: [Charlie Holtz's Twitter Post](https://twitter.com/charliebholtz/status/1724815159590293764).
