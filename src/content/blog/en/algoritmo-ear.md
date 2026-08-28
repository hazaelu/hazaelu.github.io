---
title: "Real-Time Biometrics: The EAR Algorithm"
pubDate: 2026-08-28
description: "Mathematical analysis and Python development with Google MediaPipe for eye strain tracking utilizing the Eye Aspect Ratio."
author: "Hazael Urriola"
tags: ["Python", "Computer Vision", "MediaPipe", "EAR"]
---

# Tracking Eye Strain Through Artificial Intelligence

Within digital occupational health software, passive fatigue detection is a critical challenge. It is not enough to know if a user is in front of the screen; we must measure their biometric state. To solve this inside my **Preventive Eye AI**, I implemented the **EAR (Eye Aspect Ratio)** algorithm.

## 🧠 The Mathematics Behind EAR

Unlike traditional rigid detectors, the EAR algorithm leverages **Facial Landmarks**. Driven by **Google MediaPipe's** facial mesh, we locate 6 specific coordinate points around the human eye: from the horizontal corners to the upper and lower eyelids.

The mathematical formula computes the vertical distance divided by the horizontal scale:

```text
       (||p2 - p6|| + ||p3 - p5||)
EAR = ─────────────────────────────
             2 * ||p1 - p4||
```

When the eye is wide open, the ratio stays at a high nominal value (between `0.28` and `0.32`). The moment the eyelids close, the vertical distance drops instantly to zero, causing the EAR to plummet below `0.22`.

## 🛠️ Optimization and Logical Segmentation

To process this stream at over 30 frames per second (FPS) without bottlenecking the CPU, the script triggers an obligatory **matrix conversion**. OpenCV transforms the raw BGR color stream into a single-dimension grayscale array via **NumPy**.

Subsequently, we evaluate a strict business rule: if the EAR remains below the threshold continuously for 15 consecutive frames (roughly 1.5 seconds of slow blinking or lethargy), the system triggers a bright red **Critical Fatigue Alert** thread, paving the way to automatically modulate monitor parameters and safeguard human vision.
