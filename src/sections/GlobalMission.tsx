import { useEffect, useRef } from 'react';
import { globalMissionConfig } from '../config';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Globe } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function GlobalMission() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const triggers: ScrollTrigger[] = [];

      // Icon animation
      const iconTrigger = ScrollTrigger.create({
        trigger: iconRef.current,
        start: 'top 85%',
        onEnter: () => {
          gsap.fromTo(
            iconRef.current,
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' }
          );
        },
        once: true,
      });
      triggers.push(iconTrigger);

      // Title animation
      const titleTrigger = ScrollTrigger.create({
        trigger: titleRef.current,
        start: 'top 85%',
        onEnter: () => {
          gsap.fromTo(
            titleRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.1 }
          );
        },
        once: true,
      });
      triggers.push(titleTrigger);

      // Description animation
      const descTrigger = ScrollTrigger.create({
        trigger: descRef.current,
        start: 'top 85%',
        onEnter: () => {
          gsap.fromTo(
            descRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: 0.2 }
          );
        },
        once: true,
      });
      triggers.push(descTrigger);

      return () => {
        triggers.forEach((trigger) => trigger.kill());
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-[#0a0a0a] overflow-hidden"
    >
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0d0d0d] to-[#0a0a0a]" />

      {/* Decorative elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-3xl" />

      <div
        ref={contentRef}
        className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center"
      >
        {/* Icon */}
        <div
          ref={iconRef}
          className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-8"
        >
          <Globe className="w-10 h-10 text-white/70" />
        </div>

        {/* Title */}
        <h2
          ref={titleRef}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6"
        >
          {globalMissionConfig.title}
        </h2>

        {/* Description */}
        <p
          ref={descRef}
          className="text-lg sm:text-xl text-white/50 leading-relaxed max-w-2xl mx-auto"
        >
          {globalMissionConfig.description}
        </p>
      </div>
    </section>
  );
}
