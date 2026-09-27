export const motionTokens = {
  duration: { micro: 0.18, fast: 0.3, base: 0.55, slow: 0.85, cinematic: 1.15 },
  ease: {
    standard: [0.22, 1, 0.36, 1],
    soft: [0.25, 0.1, 0.25, 1],
    exit: [0.4, 0, 1, 1],
  },
  stagger: { fast: 0.025, base: 0.045, slow: 0.07 },
} as const;
