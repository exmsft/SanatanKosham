"use client";

import { useEffect, useRef } from "react";

interface OmVisualizerProps {
  isPlaying?: boolean;
  size?: number;
}

export default function OmVisualizer({ isPlaying = false, size = 200 }: OmVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tRef = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = size, H = size, cx = W / 2, cy = H / 2;
    const gold = (a: number) => `rgba(212,160,23,${a})`;

    function draw(playing: boolean) {
      const t = tRef.current;
      ctx!.clearRect(0, 0, W, H);
      const spd = playing ? 0.038 : 0.007;
      const pulse = playing ? Math.sin(t * 6) * 0.08 + 1 : Math.sin(t * 1.5) * 0.03 + 1;
      const alpha = playing ? 0.9 : 0.55;

      // Concentric rings
      for (let i = 5; i >= 1; i--) {
        ctx!.beginPath();
        ctx!.arc(cx, cy, i * 18 * pulse, 0, Math.PI * 2);
        ctx!.strokeStyle = gold(alpha * (i / 5) * 0.65);
        ctx!.lineWidth = playing ? 1.5 : 1;
        ctx!.stroke();
      }

      // 8 petals
      for (let p = 0; p < 8; p++) {
        const ang = (p / 8) * Math.PI * 2 + t * spd * 15;
        ctx!.save();
        ctx!.translate(cx + Math.cos(ang) * 62 * pulse, cy + Math.sin(ang) * 62 * pulse);
        ctx!.rotate(ang + Math.PI / 2);
        ctx!.beginPath();
        ctx!.ellipse(0, 0, 5, 12, 0, 0, Math.PI * 2);
        ctx!.fillStyle = gold(alpha * 0.35);
        ctx!.strokeStyle = gold(alpha * 0.65);
        ctx!.lineWidth = 0.8;
        ctx!.fill();
        ctx!.stroke();
        ctx!.restore();
      }

      // Tick marks
      for (let d = 0; d < 24; d++) {
        const da = (d / 24) * Math.PI * 2 - t * spd * 5;
        ctx!.beginPath();
        ctx!.moveTo(cx + Math.cos(da) * 94, cy + Math.sin(da) * 94);
        ctx!.lineTo(cx + Math.cos(da) * 103, cy + Math.sin(da) * 103);
        ctx!.strokeStyle = gold(alpha * 0.4);
        ctx!.lineWidth = 1;
        ctx!.stroke();
      }

      // Om symbol
      ctx!.font = playing ? "52px serif" : "42px serif";
      ctx!.fillStyle = gold(alpha * 0.92);
      ctx!.textAlign = "center";
      ctx!.textBaseline = "middle";
      if (playing) { ctx!.shadowColor = gold(0.65); ctx!.shadowBlur = 20; }
      ctx!.fillText("ॐ", cx, cy + 4);
      ctx!.shadowBlur = 0;

      tRef.current += spd;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      draw(false);
      return;
    }

    function loop() {
      draw(isPlaying);
      rafRef.current = requestAnimationFrame(loop);
    }

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isPlaying, size]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      style={{ display: "block", margin: "0 auto" }}
      aria-label="Om symbol visualizer"
    />
  );
}
