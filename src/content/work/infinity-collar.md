---
title: Infinity Collar
startDate: 2021-09-01T00:00:00Z
img: /assets/infinity_collar_kicad.png
img_alt: Infinity mirror LED collar
description: |
  A custom board designed and manufactured with a custom housing. The final product is a captivating esthetic of a wearable infinity mirror.
tags:
  - Microcontroller
  - LED Art
  - EE Prototyping & Manufacturing
---

Was originally prototyped by hand. But after some usage the hand soldering joints proved unreliable. It was the perfect excuse to have my first custom board made.

The final board design was on flexible PCB to allow for seamless wearable usage without any solder joints to worry about.

The schematic match the components used in the prototype verbatim. The trickiest part was flashing the NRF52's firmware over serial. The microcontroller I used for the prototyped had this handled for me. Getting the right hardware to then go over arm-gdb to upload the necessary hex file was fun savager hunt of minimal documentation and trial and error.

### 2025 Updates

The latest v2.0 design is two separate boards: with the microcontroller and power circuitry on 1mm standard PCB and the only the LEDs on a flexible PCB. The electronics are much more reliable now than the previous two all-flex designs. I am happy to report that all 5 prototypes have been flashed and are operating flawlessly. This is stark comparison to the 40% success of the previous all-flex prototypes.

_This project deserves way more than these few words... to be continued._
