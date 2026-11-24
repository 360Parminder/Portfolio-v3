"use client";

import { useEffect } from "react";

let penAudioCtx: AudioContext | null = null;

/**
 * Synthesizes an authentic mechanical drafting/ballpoint pen click
 * using Web Audio API (zero network latency, pure client-side synthesis).
 */
export function playPenClickSound() {
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    if (!penAudioCtx || penAudioCtx.state === "closed") {
      penAudioCtx = new AudioContextClass();
    }
    if (penAudioCtx.state === "suspended") {
      penAudioCtx.resume();
    }

    const now = penAudioCtx.currentTime;

    // 1. Initial mechanical transient snap (sharp plunger click)
    const osc1 = penAudioCtx.createOscillator();
    const gain1 = penAudioCtx.createGain();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(3400, now);
    osc1.frequency.exponentialRampToValueAtTime(700, now + 0.012);
    gain1.gain.setValueAtTime(0.16, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.012);
    osc1.connect(gain1);
    gain1.connect(penAudioCtx.destination);
    osc1.start(now);
    osc1.stop(now + 0.014);

    // 2. Body resonance & internal spring latch ("thock" of pen mechanism)
    const osc2 = penAudioCtx.createOscillator();
    const gain2 = penAudioCtx.createGain();
    osc2.type = "triangle";
    osc2.frequency.setValueAtTime(1250, now + 0.002);
    osc2.frequency.exponentialRampToValueAtTime(300, now + 0.032);
    gain2.gain.setValueAtTime(0.11, now + 0.002);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.032);
    osc2.connect(gain2);
    gain2.connect(penAudioCtx.destination);
    osc2.start(now + 0.002);
    osc2.stop(now + 0.035);

    // 3. Crisp noise burst for realistic mechanical friction
    const bufferSize = Math.floor(penAudioCtx.sampleRate * 0.008);
    const buffer = penAudioCtx.createBuffer(1, bufferSize, penAudioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.25));
    }
    const noise = penAudioCtx.createBufferSource();
    noise.buffer = buffer;
    const filter = penAudioCtx.createBiquadFilter();
    filter.type = "highpass";
    filter.frequency.value = 2400;
    const noiseGain = penAudioCtx.createGain();
    noiseGain.gain.setValueAtTime(0.07, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.008);
    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(penAudioCtx.destination);
    noise.start(now);
    noise.stop(now + 0.009);
  } catch {
    // silently ignore browser audio policy restrictions
  }
}

/**
 * Global component that captures click events anywhere on the page
 * and triggers the tactile mechanical pen click sound.
 */
export function PenClickSound() {
  useEffect(() => {
    const handleGlobalClick = () => {
      playPenClickSound();
    };

    window.addEventListener("click", handleGlobalClick, { capture: true, passive: true });
    return () => {
      window.removeEventListener("click", handleGlobalClick, { capture: true });
    };
  }, []);

  return null;
}
