---
title: Generative AI David Attenborough Narration
publishDate: 2019-10-02 00:00:00
img: /assets/image.png
img_alt: Soft pink and baby blue water ripples together in a subtle texture.
description: |
  David Attenborough narrating your life as if it a nature documentary
tags:
  - Generative AI
  - Humorous
  - Inspired
---

David Attenborough narrates your life. Thanks to being able to string together AI capabilities through APIs. OpenAI's GPT and vision API along with ElevenLabs for text to speech with a custom trained David Attenborough voice. This project was created immediately after the OpenAPI Vision API was available. This projects we greatly inspired by a tweeter post of someone doing something similar. I took the idea and ran with it as I have always been fascinated by potential for "opportunistic" ai photography. This is how the project works in sense, taking still images every second then feeding it to GPT via the Vision API for the output to be fed into Elevelabs for speech.

### Implementation

#### App

https://github.com/rsmets/ai-narrator

I originally forked the project that would run as a local python app that would take continues images and contiously feed them to the Vision API. I made significant improvements to the original open source project and contributed many of them back to the original project. My favorite addition was creating more photobooth like experience option where you could have groups of individuals pose, capture an image, then have David Attenborough narrate it for you. It made for a fun party photobooth!

_An instance of Photobooth mode fun._

![Group photobooth picture](/public/assets/Dev+Group/image.jpg)

<audio controls>
  <source src="/public/assets/Dev+Group/audio.wav" type="audio/wav">
  Your browser does not support the audio element.
</audio>

_A photo of 2023's Christmas Dinner where the photo was taken in the app's long running mode._

![Group photobooth picture](/public/assets/dinner/image.jpg)

<audio controls>
  <source src="/public/assets/dinner/audio.wav" type="audio/wav">
  Your browser does not support the audio element.
</audio>

#### Web App

https://github.com/rsmets/ai-narrator-simple-webapp

A cool worker than decided to port the application to Javascript so it could be deployed as a web app. His implementation realied on Socket.io to Stream the audio to the client while the webcam and captures images, after which it converts the image to base64 and sends it to the server. Then the same process as the local python app would take place on the node backend.

Unfortunately due to cost associated with the Open API usage, the web app is no longer deployed for anyone to use.

### Inspiration

While this notion of AI power "moments" capturer was an idea I had been dreaming about, here is the original project post by Charlie Holtz, Is open source project was the basis of this app, https://twitter.com/charliebholtz/status/1724815159590293764.
