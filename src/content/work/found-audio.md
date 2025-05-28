---
title: Found Audio
startDate: 2022-03-02 00:00:00
img: /assets/found-audio.png
img_alt: Found Audio homepage screenshot
description: |
  Found Audio is a lossless audio streaming service for all, but especially your inner audiophile.
tags:
  - System Design
  - Cloud Architecture
  - Media
---

Experience the lossless audio soundscapes of Found Audio at [foundaudio.club](https://www.foundaudio.club). Streaming at 1411kb/s—10x better than Soundcloud's 128kb/s.

## Inception

> The poor streaming quality of Soundcloud wasn't cutting it for me and couldn't find an alternative long-format audio streaming site that would stream at lossless bitrates.

Like many great projects, Found Audio was born out of solving a personal issue. I wanted to stream my long-format, multi-gigabyte recorded audio files at the same bitrate they were recorded at. However, I could not find a platform that offered such a service.

### Existing Solutions

The leading platforms, Mixcloud and Soundcloud, both stream at an abysmal 128kb/s. That was inadequate for audio recorded at 1411kb/s.

The streaming bitrate was analyzed using `ffprobe` for the exact same audio file between Mixcloud and Found Audio's backend object store, S3.

![Mixcloud's bitrate](/assets/found-audio-ffprobe-mixcloud.png)  
_Mixcloud's 128kb/s bitrate_

![Found Audio bitrate](/assets/found-audio-ffprobe.png)  
_Found Audio's 1411kb/s bitrate_

### Website

With the proof of concept in place, I was pleased to have a way to stream my recorded audio files at lossless bitrates. However, as I shared the streaming links with friends, they expressed interest in accessing the same streaming improvements for their own audio files. It became clear that a web interface was the next logical step.

Not being a front-end web developer, I chose Svelte for the framework due to its simplicity and ease of use.

### Final Touches

Adding CloudFront in front of S3, the object store, was as trivial as typing this sentence but made a tangible difference in the media's loading speed.

### 2025 Updates

This project was originally created in 2023 and is now being updated for 2025. Please enjoy [this](https://found-audio-groove.vercel.app/discover) preview! It was made nearly exclusively with the latest AI developer tools I mentioned in various end of 2024 blog posts.
