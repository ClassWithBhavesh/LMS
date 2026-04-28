import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useScrollReveal(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        y: options.y ?? 40,
        x: options.x ?? 0,
        opacity: 0,
        duration: options.duration ?? 0.7,
        delay: options.delay ?? 0,
        ease: options.ease ?? "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: options.start ?? "top 88%",
          toggleActions: "play none none none",
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return ref;
}

export function useStaggerReveal(selector, options = {}) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(selector, {
        y: options.y ?? 40,
        opacity: 0,
        duration: options.duration ?? 0.6,
        stagger: options.stagger ?? 0.12,
        ease: options.ease ?? "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: options.start ?? "top 85%",
          toggleActions: "play none none none",
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, [selector]);

  return containerRef;
}
