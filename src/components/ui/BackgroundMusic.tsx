"use client";

import { useEffect, useRef, useState } from "react";

export function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // 자동 재생 시도
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          setHasInteracted(true);
        })
        .catch(() => {
          // 자동 재생 차단됨 - 사용자 상호작용 대기
          setIsPlaying(false);
        });
    }

    // 첫 클릭/터치 시 재생 시도
    const handleFirstInteraction = () => {
      if (!hasInteracted && audio.paused) {
        audio.play().then(() => {
          setIsPlaying(true);
          setHasInteracted(true);
        }).catch(() => {});
      }
    };

    document.addEventListener("click", handleFirstInteraction, { once: true });
    document.addEventListener("touchstart", handleFirstInteraction, { once: true });
    document.addEventListener("scroll", handleFirstInteraction, { once: true });

    return () => {
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("touchstart", handleFirstInteraction);
      document.removeEventListener("scroll", handleFirstInteraction);
    };
  }, [hasInteracted]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
        setHasInteracted(true);
      }).catch(() => {});
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/music/Polly.mp3" loop preload="auto" />
      
      {/* 재생/일시정지 버튼 */}
      <button
        onClick={togglePlay}
        className="fixed top-6 right-6 z-40 w-[30px] h-[30px] rounded-full bg-white shadow-lg border border-[#3E8676] flex items-center justify-center transition-all hover:scale-110 active:scale-95"
        aria-label={isPlaying ? "음악 일시정지" : "음악 재생"}
      >
        {isPlaying ? (
          // 일시정지 아이콘
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#3E8676"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="7" y="4" width="2" height="16" fill="#3E8676" />
            <rect x="15" y="4" width="2" height="16" fill="#3E8676" />
          </svg>
        ) : (
          // 재생 아이콘
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="#3E8676"
            stroke="#3E8676"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="9 6 18 12 9 18" />
          </svg>
        )}
      </button>
    </>
  );
}

