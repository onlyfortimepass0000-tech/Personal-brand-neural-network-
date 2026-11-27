---
tags: [design-brain, node]
ball: "03 Motion and Transitions"
---
# Opacity Short Transform Long
Part of [[03 Motion and Transitions]].

## Rules
- Never give two properties one curve: opacity on a short quad ramp, transform on a spring about 3x longer.
- Stagger compresses: delay = pow(i, 0.8) x base, with 1-2 frames of jitter. Children follow through on looser damping.

## Connects to
- [[Easing and Springs]]
- [[Word Pop Animation]]
