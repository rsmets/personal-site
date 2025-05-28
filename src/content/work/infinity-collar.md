---
title: Infinity Collar
startDate: 2021-09-01T00:00:00Z
img: /assets/infinity_collar_kicad.png
img_alt: Infinity mirror LED collar
description: |
  A custom board designed and manufactured with a custom housing. The final product is a captivating esthetic of a wearable infinity mirror.
tags:
  - Microcontroller Development
  - LED Art
  - EE Prototyping & Manufacturing
---

Was originally prototyped by hand. But after some usage the hand soldering joints proved unreliable. It was the perfect excuse to have my first custom board made.

The final board design was on flexible PCB to allow for seamless wearable usage without any solder joints to worry about.

The schematic match the components used in the prototype verbatim. The trickiest part was flashing the NRF52's firmware over serial. The microcontroller I used for the prototyped had this handle for me. Getting the right hardware to then go over arm-gdb to upload the necessary hex file was fun savager hunt of minimal documentation and trial and error.
