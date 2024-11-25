---
title: Found Audio
publishDate: 2022-03-02 00:00:00
img: /assets/found-audio.png
img_alt: Found audio homepage screenshot
description: |
  Found Audio is a lossless audio streaming service for all, but especially your inner audiophile.
tags:
  - System Design
  - Infrastructure Management
  - Media
---

Experience the lossless audio soundscapes at of Found Audio at https://www.foundaudio.club. Streaming at 1411kb/s, 10x better than Soundcloud's 128kb/s.

## Inception

> I was fed up with the poor streaming quality of Soundcloud and couldn't find an alternative long format audio streaming site that would stream at lossless bitrates.

Like many great projects, they came out of solving an issue for oneself. This is very much one of those cases. I wanted to stream my long format, multiple Gigabyte recorded audio files at the same bitrate they were recorded at. However I could not find a platform that offered such a service.

### Existing Solutions

The leading platforms, Mixcloud and Soundcloud, both stream at an abismal 128kb/s. That did not work for audio that was recorded at 1411kb/s.

The streaming bit rate was analyzed with `ffprobe` for the exact same audio file between Mixcloud and Found Audio's backend object store, S3.

![Mixcloud's bitrate](/assets/found-audio-ffprobe-mixcloud.png)
_Mixcloud's 128kb/s birate_

![Found Audio bitrate](/assets/found-audio-ffprobe.png)
_Found Audio's 1411kb/s birate_

### Website

With the proof of concept put together I was pleased to have a way to stream my recorded audio files at lossless bit rates. However as I was sharing the streaming links with friends they wanted to be have access to the same streaming improvements for their audio files. It was clear a web interface was the next step.

Not being a front end web developer, opted to go with Svelte for the framework thanks to its simplicity.

### Final Touches

Throwing a Cloudfront in front of S3, the object store, was a trivial as typing this sentence but made a tangible difference to the media's loading speed.
