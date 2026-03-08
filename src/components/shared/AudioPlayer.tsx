"use client";

import { useRef, useState } from "react";

interface AudioPlayerProps {
  src: string;
  title?: string;
}

function formatTime(s: number) {
  if (isNaN(s)) return "0:00";
  const m = Math.floor(s / 60);
  return m + ":" + String(Math.floor(s % 60)).padStart(2, "0");
}

export default function AudioPlayer({ src, title }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState(false);

  const progress = duration ? (current / duration) * 100 : 0;

  function toggle() {
    if (!audioRef.current) {
      const audio = new Audio(src);
      audio.crossOrigin = "anonymous";
      audio.addEventListener("loadedmetadata", () => setDuration(audio.duration));
      audio.addEventListener("timeupdate", () => setCurrent(audio.currentTime));
      audio.addEventListener("ended", () => {
        setPlaying(false);
        setCurrent(0);
      });
      audio.addEventListener("error", () => setError(true));
      audioRef.current = audio;
    }
    if (audioRef.current.paused) {
      audioRef.current.play();
      setPlaying(true);
    } else {
      audioRef.current.pause();
      setPlaying(false);
    }
  }

  function seek(e: React.MouseEvent<HTMLDivElement>) {
    if (!audioRef.current?.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = pct * audioRef.current.duration;
  }

  if (error) {
    return (
      <div className="audio-player">
        <p style={{ fontSize: "0.8rem", color: "#c0392b" }}>
          Audio unavailable —{" "}
          <a href={src} target="_blank" rel="noopener" style={{ color: "var(--saffron)" }}>
            open externally
          </a>
        </p>
      </div>
    );
  }

  return (
    <div className="audio-player">
      <button
        className="play-btn"
        onClick={toggle}
        aria-label={playing ? "Pause" : "Play"}
      >
        {playing ? "❚❚" : "▶"}
      </button>
      {title && (
        <span style={{ fontSize: "0.85rem", color: "var(--text-medium)", fontWeight: 500, flex: 1 }}>
          {title}
        </span>
      )}
      <div className="audio-progress-container" style={{ flex: 2, minWidth: 100 }}>
        <div className="audio-progress-bar" onClick={seek} role="progressbar" aria-valuenow={progress}>
          <div className="audio-progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <div className="audio-time">
          <span>{formatTime(current)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
}
