"use client";

import { useState, useEffect, useRef } from "react";

const MEDITATION_TRACKS = [
  {
    title: "Healing Meditation",
    url: "https://cdn.pixabay.com/audio/2022/03/10/audio_2b3dab4e61.mp3",
  },
  {
    title: "Calm Ambience",
    url: "https://cdn.pixabay.com/audio/2022/08/23/audio_d16737c73f.mp3",
  },
  {
    title: "Peaceful Harmony",
    url: "https://cdn.pixabay.com/audio/2022/10/25/audio_946bc8e76b.mp3",
  },
];

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [volume, setVolume] = useState(0.35);
  const [trackIdx, setTrackIdx] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const hasTriedAutoplay = useRef(false);

  // Try autoplay on mount
  useEffect(() => {
    if (hasTriedAutoplay.current) return;
    hasTriedAutoplay.current = true;

    const tryPlay = async () => {
      const audio = audioRef.current;
      if (!audio) return;
      audio.volume = volume;
      try {
        await audio.play();
        setIsPlaying(true);
        setShowPrompt(false);
      } catch {
        // Autoplay blocked — show prompt
        setShowPrompt(true);
      }
    };

    // Small delay to let page settle
    const t = setTimeout(tryPlay, 1500);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // On first user interaction anywhere, try to play
  useEffect(() => {
    if (!showPrompt) return;
    const handler = () => {
      const audio = audioRef.current;
      if (!audio || isPlaying) return;
      audio.volume = volume;
      audio.play().then(() => {
        setIsPlaying(true);
        setShowPrompt(false);
      }).catch(() => {});
    };
    document.addEventListener("click", handler, { once: true });
    return () => document.removeEventListener("click", handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showPrompt]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.volume = volume;
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const nextTrack = () => {
    const next = (trackIdx + 1) % MEDITATION_TRACKS.length;
    setTrackIdx(next);
    setIsPlaying(false);
    setTimeout(() => {
      const audio = audioRef.current;
      if (audio) {
        audio.volume = volume;
        audio.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    }, 100);
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    if (audioRef.current) audioRef.current.volume = v;
  };

  const track = MEDITATION_TRACKS[trackIdx];

  return (
    <>
      <audio
        ref={audioRef}
        src={track.url}
        loop
        preload="auto"
        onCanPlay={() => setIsReady(true)}
      />

      {/* Floating Music Button Prompt */}
      {showPrompt && !isPlaying && (
        <div
          className="fixed bottom-24 right-6 z-[9998] animate-bounce"
          style={{ pointerEvents: "none" }}
        >
          <div
            className="text-[10px] font-bold tracking-widest uppercase text-white px-4 py-2 rounded-full"
            style={{
              background: "rgba(201,168,76,0.9)",
              boxShadow: "0 4px 20px rgba(201,168,76,0.4)",
            }}
          >
            🎵 Klik untuk Musik Meditasi
          </div>
        </div>
      )}

      {/* Floating Player */}
      <div
        className="fixed bottom-6 right-6 z-[9998]"
        style={{ userSelect: "none" }}
      >
        {/* Expanded Panel */}
        {isExpanded && (
          <div
            className="mb-3 rounded-xl p-4 w-64"
            style={{
              background: "rgba(15, 10, 6, 0.88)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(201,168,76,0.25)",
              boxShadow: "0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,168,76,0.1)",
            }}
          >
            {/* Track info */}
            <div className="mb-4">
              <p
                className="text-[9px] font-bold tracking-[0.3em] uppercase mb-1"
                style={{ color: "rgba(201,168,76,0.7)" }}
              >
                Sedang Diputar
              </p>
              <p className="text-white text-sm font-semibold truncate">{track.title}</p>
              {/* Equalizer animation */}
              {isPlaying && (
                <div className="flex items-end gap-0.5 mt-2 h-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="w-1 rounded-sm"
                      style={{
                        background: "rgba(201,168,76,0.8)",
                        height: `${Math.random() * 100}%`,
                        animation: `eq-bar ${0.4 + i * 0.15}s ease-in-out infinite alternate`,
                        animationDelay: `${i * 0.1}s`,
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3 mb-4">
              {/* Play/Pause */}
              <button
                onClick={togglePlay}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
                style={{
                  background: "rgba(201,168,76,0.9)",
                  boxShadow: isPlaying ? "0 0 16px rgba(201,168,76,0.5)" : "none",
                }}
              >
                {isPlaying ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                    <rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/>
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                    <polygon points="5,3 19,12 5,21"/>
                  </svg>
                )}
              </button>

              {/* Next track */}
              <button
                onClick={nextTrack}
                className="opacity-60 hover:opacity-100 transition-opacity"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                  <polygon points="5,4 15,12 5,20"/><rect x="16" y="4" width="3" height="16" rx="1" fill="white"/>
                </svg>
              </button>

              {/* Track number */}
              <span className="text-white/40 text-[10px] ml-auto">
                {trackIdx + 1}/{MEDITATION_TRACKS.length}
              </span>
            </div>

            {/* Volume */}
            <div className="flex items-center gap-2">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(201,168,76,0.6)" strokeWidth="2">
                <polygon points="11,5 6,9 2,9 2,15 6,15 11,19 11,5"/>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
              </svg>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolume}
                className="flex-1 h-1 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, rgba(201,168,76,0.9) ${volume * 100}%, rgba(255,255,255,0.1) ${volume * 100}%)`,
                  outline: "none",
                }}
              />
            </div>
          </div>
        )}

        {/* Main toggle button */}
        <div className="flex justify-end">
          <button
            onClick={() => setIsExpanded((v) => !v)}
            className="relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
            title="Musik Meditasi"
            style={{
              background: isPlaying
                ? "linear-gradient(135deg, rgba(201,168,76,0.95), rgba(180,120,40,0.95))"
                : "rgba(15,10,6,0.85)",
              border: "1px solid rgba(201,168,76,0.4)",
              backdropFilter: "blur(12px)",
              boxShadow: isPlaying
                ? "0 0 24px rgba(201,168,76,0.5), 0 4px 20px rgba(0,0,0,0.4)"
                : "0 4px 20px rgba(0,0,0,0.4)",
            }}
          >
            {/* Pulse ring when playing */}
            {isPlaying && (
              <span
                className="absolute inset-0 rounded-full"
                style={{
                  border: "2px solid rgba(201,168,76,0.4)",
                  animation: "ping 2s cubic-bezier(0,0,0.2,1) infinite",
                }}
              />
            )}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
              <path d="M9 18V5l12-2v13"/>
              <circle cx="6" cy="18" r="3"/>
              <circle cx="18" cy="16" r="3"/>
            </svg>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes eq-bar {
          from { height: 20%; }
          to { height: 100%; }
        }
        @keyframes ping {
          75%, 100% { transform: scale(1.5); opacity: 0; }
        }
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(201,168,76,0.95);
          cursor: pointer;
        }
      `}</style>
    </>
  );
}
