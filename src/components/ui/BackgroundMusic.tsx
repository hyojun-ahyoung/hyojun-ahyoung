"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

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
      {isPlaying ? (
        <Image
          src="/pause.svg"
          alt="Pause"
          width={48}
          height={48}
          onClick={togglePlay}
          className="fixed bottom-6 right-6 z-40 cursor-pointer transition-all hover:scale-110 active:scale-95"
        />
      ) : (
        <Image
          src="/play.svg"
          alt="Play"
          width={48}
          height={48}
          onClick={togglePlay}
          className="fixed bottom-6 right-6 z-40 cursor-pointer transition-all hover:scale-110 active:scale-95"
        />
      )}
    </>
  );
}

