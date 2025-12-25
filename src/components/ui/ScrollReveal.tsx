"use client";

import { useEffect, useRef, useState } from "react";

interface ScrollRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  animation?: "fade-up" | "fade-in" | "zoom-in" | "slide-left" | "slide-right";
  delay?: number;
  duration?: number;
  threshold?: number;
  triggerOnce?: boolean;
}

export function ScrollReveal({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 1000,
  threshold = 0.15,
  triggerOnce = true,
  className = "",
  style,
  ...props
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold: threshold,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  const getAnimationClass = () => {
    if (!isVisible) {
      switch (animation) {
        case "fade-up":
          return "opacity-0 translate-y-16";
        case "zoom-in":
          return "opacity-0 scale-90";
        case "fade-in":
          return "opacity-0";
        case "slide-left":
          return "opacity-0 -translate-x-16";
        case "slide-right":
          return "opacity-0 translate-x-16";
        default:
          return "opacity-0 translate-y-10";
      }
    }

    return "opacity-100 translate-y-0 translate-x-0 scale-100";
  };

  return (
    <div
      ref={ref}
      className={`transition-all ease-out transform ${getAnimationClass()} ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
