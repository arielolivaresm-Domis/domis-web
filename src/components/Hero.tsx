"use client";
import { useRef } from "react";
import { useScroll } from "framer-motion";
import HeroCanvas from "./HeroCanvas";
import { HeroHook } from "./HeroOverlays";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-slate-950">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <HeroCanvas progress={scrollYProgress} />
        <HeroHook scrollYProgress={scrollYProgress} />
      </div>
    </section>
  );
}