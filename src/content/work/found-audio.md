---
title: Found Audio
startDate: 2022-03-02T00:00:00Z
img: /assets/found-audio.png
img_alt: Found Audio homepage screenshot
description: |
  Found Audio is a lossless audio streaming service for all, but especially your inner audiophile.
tags:
  - Design
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

### Web App

With the proof of concept in place, I was pleased to have a way to stream my recorded audio files at lossless bitrates. However, as I shared the streaming links with friends, they expressed interest in being able to upload their own audio files and stream them at lossless bitrates. It became clear that a web interface was the next logical step.

Not being a front-end web developer, I chose Svelte for the framework due to its simplicity and ease of use. For the backend I choose to use a NodeJS and Typescript via [FeathersJS](https://feathersjs.com/) for the application logic, S3 for the object store, and Postgres for metadata persistence. For deployment, I used Netlify for the front-end, Render for the backend, and ElephantSQL for the database service.

### Final Touches

Adding CloudFront in front of S3, the object store, was as trivial as typing this sentence but made a tangible difference in the medianrd's loading speed.

### 2025 Updates

This project was originally created in 2023 and was updated at the start of 2025. The refactor was completed exclusively with the state of the art [AI developer tools](/blog/ai-developer-tooling) I mentioned in various end of 2024 blog posts.

The refactor was initially lead by lovable.dev which has a tightly knit integration with Supabase for the backend while creating a React app for the front-end. For deployment, I opted to use Vercel for the front-end and thanks to using Supabase on the backend and persistence there was no deployment needed on that half anymore. Once the refactor PoC was in place, I augmented further feature work (user management, authentication, media searching etc.) via Windsurf agentic development interface. These tools allowed me to reach and exceed original feature parity in a fraction of the time of the original implementation, "5x more functionality with 80% less effort".

#### Before & After Comparison

The transformation from the original site to the new version demonstrates not only a significant UI/UX improvement but also a substantial enhancement in functionality including profiles, playlists, favorites, user comments, etc.

##### Original Site (2023)

![Original Found Audio site](/assets/found-audio-old.png)
_The original Svelte-based interface with basic streaming functionality_

##### New Site (2025)

![New Found Audio site](/assets/found-audio-account.png)
_The redesigned React-based interface with enhanced user management, discovery features, and playlist capabilities_

The new interface offers a more polished user experience with improved navigation, search functionality, personalized recommendations, and social features that weren't possible in the original implementation. The transition to Supabase also provided more robust authentication and data management capabilities, while also consolidating the interface for handful of managed services: database, object store, backend application functionality.
