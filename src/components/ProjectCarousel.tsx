"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";

interface ProjectCarouselProps {
  images: { src: string; alt: string }[];
  interval?: number;
}

export default function ProjectCarousel({
  images,
  interval = 4000,
}: ProjectCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback((index: number) => {
    setCurrent(index);
  }, []);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  // Auto-scroll
  useEffect(() => {
    if (isPaused) return;

    timeoutRef.current = setTimeout(next, interval);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [current, isPaused, next, interval]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Image container */}
      <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-gray-100 shadow-lg">
        {/* Render all images stacked, use opacity for crossfade */}
        {images.map((image, i) => (
          <div
            key={image.src}
            className="absolute inset-0"
            style={{
              opacity: i === current ? 1 : 0,
              transition: "opacity 0.7s ease-in-out",
              zIndex: i === current ? 1 : 0,
            }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={i === 0}
            />
          </div>
        ))}

        {/* Prev / Next arrows */}
        <button
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 h-9 w-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-md hover:bg-white transition-colors"
          aria-label="Previous screenshot"
        >
          <svg
            className="h-4 w-4"
            style={{ color: "#1a365d" }}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <button
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 h-9 w-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-md hover:bg-white transition-colors"
          aria-label="Next screenshot"
        >
          <svg
            className="h-4 w-4"
            style={{ color: "#1a365d" }}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>

      {/* Dots with progress indicator */}
      <div className="flex justify-center gap-2 mt-4">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="relative h-2 rounded-full overflow-hidden transition-all duration-500"
            style={{
              width: i === current ? 24 : 8,
              backgroundColor: i === current ? "transparent" : "#d1d5db",
            }}
            aria-label={`Go to screenshot ${i + 1}`}
          >
            {i === current && (
              <>
                <div
                  className="absolute inset-0 rounded-full"
                  style={{ backgroundColor: "#FF6B2B33" }}
                />
                <div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{
                    backgroundColor: "#FF6B2B",
                    animation: isPaused
                      ? "none"
                      : `progress ${interval}ms linear`,
                    animationFillMode: "forwards",
                  }}
                />
              </>
            )}
          </button>
        ))}
      </div>

      {/* Caption */}
      <p
        className="text-center text-sm font-medium mt-2 transition-opacity duration-500"
        style={{ color: "#1a365d99" }}
      >
        {images[current].alt}
      </p>

      <style jsx>{`
        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
