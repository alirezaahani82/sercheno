"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Advertisement = {
  id: number;
  title: string;
  description: string | null;
  image_url: string;
  mobile_image_url: string | null;
  target_url: string;
};

type Props = {
  advertisements: Advertisement[];
};

export default function HomeAdvertisingSlider({
  advertisements,
}: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const total = advertisements.length;

  const nextSlide = useCallback(() => {
    if (total <= 1) return;

    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const previousSlide = useCallback(() => {
    if (total <= 1) return;

    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    if (total <= 1) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [nextSlide, total]);

  if (total === 0) {
    return null;
  }

  const current = advertisements[currentIndex];

  const handleTouchStart = (event: React.TouchEvent) => {
    touchStartX.current = event.changedTouches[0].clientX;
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    touchEndX.current = event.changedTouches[0].clientX;

    if (
      touchStartX.current === null ||
      touchEndX.current === null
    ) {
      return;
    }

    const distance =
      touchStartX.current - touchEndX.current;

    const minimumSwipeDistance = 50;

    if (Math.abs(distance) >= minimumSwipeDistance) {
      if (distance > 0) {
        nextSlide();
      } else {
        previousSlide();
      }
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section
      className="relative w-full overflow-hidden rounded-2xl"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="تبلیغات سرچنو"
    >
      <Link
        href={current.target_url}
        className="block relative aspect-[16/5] w-full"
      >
        {/* Desktop */}
        <Image
          src={current.image_url}
          alt={current.title}
          fill
          priority
          sizes="(max-width: 768px) 0vw, 100vw"
          className="hidden object-cover md:block"
        />

        {/* Mobile */}
        <Image
          src={current.mobile_image_url || current.image_url}
          alt={current.title}
          fill
          sizes="(max-width: 768px) 100vw, 0vw"
          className="block object-cover md:hidden"
        />
      </Link>

      {total > 1 && (
        <>
          {/* Previous */}
          <button
            type="button"
            onClick={previousSlide}
            aria-label="تبلیغ قبلی"
            className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-xl text-white backdrop-blur-sm transition hover:bg-black/60"
          >
            ‹
          </button>

          {/* Next */}
          <button
            type="button"
            onClick={nextSlide}
            aria-label="تبلیغ بعدی"
            className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-xl text-white backdrop-blur-sm transition hover:bg-black/60"
          >
            ›
          </button>

          {/* Dots */}
          <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
            {advertisements.map((advertisement, index) => (
              <button
                key={advertisement.id}
                type="button"
                onClick={() => setCurrentIndex(index)}
                aria-label={`رفتن به تبلیغ ${index + 1}`}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "w-6 bg-white"
                    : "w-2 bg-white/60"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
