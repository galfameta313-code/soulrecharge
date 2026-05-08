"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

const TRACKS = [
  { id: "lFcSrYw-ARY", title: "Tibetan Healing Sounds" },
  { id: "77ZozI0rw7w", title: "Relaxing Meditation" },
  { id: "GglU_lNH87A", title: "Peaceful Harmony" },
];

export function MusicPlayer() {
  const playerRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [trackIdx, setTrackIdx] = useState(0);
  const [volume, setVolume] = useState(40);
  const [isExpanded, setIsExpanded] = useState(false);

  const createPlayer = () => {
    if (playerRef.current || !window.YT?.Player) return;
    playerRef.current = new window.YT.Player("yt-meditation-player", {
      height: "1",
      width: "1",
      videoId: TRACKS[0].id,
      playerVars: {
        autoplay: 0,
        controls: 0,
        loop: 1,
        playlist: TRACKS[0].id,
        modestbranding: 1,
        rel: 0,
      },
      events: {
        onReady: (e: any) => {
          e.target.setVolume(40);
          setIsReady(true);
        },
        onStateChange: (e: any) => {
          if (window.YT?.PlayerState) {
            setIsPlaying(e.data === window.YT.PlayerState.PLAYING);
          }
        },
      },
    });
  };

  useEffect(() => {
    if (document.getElementById("yt-api-script")) {
      if (window.YT?.Player) createPlayer();
      else window.onYouTubeIframeAPIReady = createPlayer;
      return;
    }
    const script = document.createElement("script");
    script.id = "yt-api-script";
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;
    document.body.appendChild(script);
    window.onYouTubeIframeAPIReady = createPlayer;
    return () => {
      if (playerRef.current?.destroy) playerRef.current.destroy();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const togglePlay = () => {
    if (!playerRef.current || !isReady) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.unMute?.();
      playerRef.current.setVolume(volume);
      playerRef.current.playVideo();
    }
  };

  const nextTrack = () => {
    const next = (trackIdx + 1) % TRACKS.length;
    setTrackIdx(next);
    if (playerRef.current?.loadVideoById) {
      playerRef.current.loadVideoById({ videoId: TRACKS[next].id });
      playerRef.current.setVolume(volume);
    }
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseInt(e.target.value);
    setVolume(v);
    if (playerRef.current?.setVolume) playerRef.current.setVolume(v);
  };

  const track = TRACKS[trackIdx];

  return (
    <>
      {/* Hidden YouTube player container */}
      <div
        style={{
          position: "fixed", width: "1px", height: "1px",
          top: "-1px", left: "-1px", overflow: "hidden", opacity: 0, pointerEvents: "none",
        }}
      >
        <div id="yt-meditation-player" />
      </div>

      {/* Floating player */}
      <div className="fixed bottom-6 right-6 z-[9998]" style={{ userSelect: "none" }}>

        {/* Expanded panel */}
        {isExpanded && (
          <div
            className="mb-3 rounded-2xl p-5 w-64"
            style={{
              background: "rgba(10, 6, 3, 0.92)",
              backdropFilter: "blur(24px)",
              border: "1px solid rgba(201,168,76,0.3)",
              boxShadow: "0 8px 40px rgba(0,0,0,0.6)",
            }}
          >
            {/* Track info */}
            <p className="text-[9px] font-bold tracking-[0.35em] uppercase mb-1" style={{ color: "rgba(201,168,76,0.7)" }}>
              Musik Meditasi
            </p>
            <p className="text-white text-sm font-semibold mb-3">{track.title}</p>

            {/* Equalizer bars */}
            <div className="flex items-end gap-0.5 mb-4" style={{ height: "20px" }}>
              {[1,2,3,4,5,6,7].map((i) => (
                <div
                  key={i}
                  className="flex-1 rounded-sm"
                  style={{
                    background: `rgba(201,168,76,${isPlaying ? 0.85 : 0.2})`,
                    height: isPlaying ? "100%" : "20%",
                    animation: isPlaying ? `eq ${0.5 + i * 0.1}s ease-in-out infinite alternate` : "none",
                    animationDelay: `${i * 0.07}s`,
                    transition: "background 0.3s ease",
                  }}
                />
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2 mb-4">
              <button
                onClick={togglePlay}
                disabled={!isReady}
                className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 disabled:opacity-40"
                style={{
                  background: "linear-gradient(135deg, rgba(201,168,76,0.95), rgba(160,110,30,0.95))",
                  boxShadow: isPlaying ? "0 0 20px rgba(201,168,76,0.5)" : "0 2px 8px rgba(0,0,0,0.4)",
                }}
              >
                {isPlaying ? (
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="white">
                    <rect x="6" y="4" width="4" height="16" rx="1.5"/>
                    <rect x="14" y="4" width="4" height="16" rx="1.5"/>
                  </svg>
                ) : (
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="white">
                    <polygon points="6,3 20,12 6,21"/>
                  </svg>
                )}
              </button>

              <button
                onClick={nextTrack}
                disabled={!isReady}
                className="w-9 h-9 rounded-full flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity disabled:opacity-20"
                style={{ background: "rgba(255,255,255,0.07)" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                  <polygon points="5,4 15,12 5,20"/>
                  <rect x="16" y="4" width="3" height="16" rx="1" fill="white"/>
                </svg>
              </button>

              <span className="ml-auto text-white/30 text-[9px] tracking-widest">
                {!isReady ? "Memuat..." : `${trackIdx + 1}/${TRACKS.length}`}
              </span>
            </div>

            {/* Volume */}
            <div className="flex items-center gap-2">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="rgba(201,168,76,0.6)" strokeWidth="2">
                <polygon points="11,5 6,9 2,9 2,15 6,15 11,19"/>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
              </svg>
              <input
                type="range" min="0" max="100" step="1"
                value={volume}
                onChange={handleVolume}
                className="flex-1 h-1 appearance-none cursor-pointer rounded-full"
                style={{
                  background: `linear-gradient(to right, rgba(201,168,76,0.9) ${volume}%, rgba(255,255,255,0.1) ${volume}%)`,
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
            style={{
              width: "52px", height: "52px",
              borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              position: "relative",
              background: isPlaying
                ? "linear-gradient(135deg, rgba(201,168,76,0.95), rgba(160,110,30,0.95))"
                : "rgba(10, 7, 4, 0.88)",
              border: `1.5px solid rgba(201,168,76,${isPlaying ? 0.7 : 0.4})`,
              backdropFilter: "blur(16px)",
              boxShadow: isPlaying
                ? "0 0 28px rgba(201,168,76,0.45), 0 4px 24px rgba(0,0,0,0.5)"
                : "0 4px 24px rgba(0,0,0,0.45)",
              transition: "all 0.4s ease",
              cursor: "pointer",
            }}
          >
            {isPlaying && (
              <>
                <span className="absolute inset-0 rounded-full" style={{ border: "2px solid rgba(201,168,76,0.35)", animation: "ring 2s ease-out infinite" }} />
                <span className="absolute inset-0 rounded-full" style={{ border: "2px solid rgba(201,168,76,0.2)", animation: "ring 2s ease-out infinite 0.7s" }} />
              </>
            )}
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18V5l12-2v13"/>
              <circle cx="6" cy="18" r="3"/>
              <circle cx="18" cy="16" r="3"/>
            </svg>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes eq {
          from { transform: scaleY(0.2); }
          to { transform: scaleY(1); }
        }
        @keyframes ring {
          0% { transform: scale(1); opacity: 0.7; }
          100% { transform: scale(1.8); opacity: 0; }
        }
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 14px; height: 14px;
          border-radius: 50%;
          background: rgba(201,168,76,0.95);
          cursor: pointer;
        }
      `}</style>
    </>
  );
}
