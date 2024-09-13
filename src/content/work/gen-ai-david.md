---
title: Generative AI David Attenborough
publishDate: 2019-10-02 00:00:00
img: /assets/stock-4.jpg
img_alt: Soft pink and baby blue water ripples together in a subtle texture.
description: |
  David Attenborough narrating your life as if it a nature documentary
tags:
  - Generative AI
  - Humorous
  - Inspired
---

David Attenborough narrates your life. Thanks to being able to string together AI capabilities through APIs. OpenAI's GPT and vision API along with ElevenLabs for text to speech with a custom trained David Attenborough voice. This project was created immediately after the vision api was available. This projects we greatly inspired by a tweeter post of someone doing something similar. I took the idea and ran with it as I have always been facinated by potential for "opportunistic" ai photography. This is how the project works in sense, taking still images every second then feeding it to GPT via the vision api for the output to be fed into Elevelabs for speech.

Socket.io is used to Stream the audio to the client using Socket.io. How it works is that the client uses the webcam and captures it, after which it converts the image to base64 and sends it to the server. The server receives the image and sends it to the ChatGPT Vision API to get a description of the image based on the prompt. After that, it sends the description to the ElevenLabs API to get the audio file of the description, and finally, the server sends the audio file to the client using Socket.io.
