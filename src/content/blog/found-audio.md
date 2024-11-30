---
title: Agentic AI
publishDate: 2024-11-30 00:00:00
img: /assets/found-audio.png
img_alt: Found Audio homepage screenshot
category: side-project
description: |
  Found Audio is a lossless audio streaming service for all, but especially your inner audiophile.
tags:
  - System Design
  - Infrastructure Management
  - Media
---

Experience the lossless audio soundscapes of Found Audio at [foundaudio.club](https://www.foundaudio.club). Streaming at 1411kb/s—10x better than Soundcloud's 128kb/s.

## Inception

> I was fed up with the poor streaming quality of Soundcloud and couldn't find an alternative long-format audio streaming site that would stream at lossless bitrates.

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
