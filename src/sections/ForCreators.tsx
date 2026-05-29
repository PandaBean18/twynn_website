import { useEffect, useRef } from 'react';
import { forCreatorsConfig } from '../config';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ForCreatorsProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ForCreators({setIsModalOpen}: ForCreatorsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const featuresRef = useRef<HTMLUListElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const triggers: ScrollTrigger[] = [];

      // Title animation
      const titleTrigger = ScrollTrigger.create({
        trigger: titleRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(
            titleRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
          );
        },
        once: true,
      });
      triggers.push(titleTrigger);

      // Subtitle animation
      const subtitleTrigger = ScrollTrigger.create({
        trigger: subtitleRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(
            subtitleRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.1 }
          );
        },
        once: true,
      });
      triggers.push(subtitleTrigger);

      // Description animation
      const descTrigger = ScrollTrigger.create({
        trigger: descRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(
            descRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.2 }
          );
        },
        once: true,
      });
      triggers.push(descTrigger);

      // Features animation
      if (featuresRef.current) {
        const featureItems = featuresRef.current.querySelectorAll('li');
        const featuresTrigger = ScrollTrigger.create({
          trigger: featuresRef.current,
          start: 'top 80%',
          onEnter: () => {
            gsap.fromTo(
              featureItems,
              { opacity: 0, x: 20 },
              {
                opacity: 1,
                x: 0,
                duration: 0.6,
                stagger: 0.08,
                ease: 'power3.out',
                delay: 0.3,
              }
            );
          },
          once: true,
        });
        triggers.push(featuresTrigger);
      }

      // CTA animation
      const ctaTrigger = ScrollTrigger.create({
        trigger: ctaRef.current,
        start: 'top 85%',
        onEnter: () => {
          gsap.fromTo(
            ctaRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.5 }
          );
        },
        once: true,
      });
      triggers.push(ctaTrigger);

      return () => {
        triggers.forEach((trigger) => trigger.kill());
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="for-creators"
      className="relative py-24 lg:py-32 bg-[#0a0a0a] overflow-hidden"
    >
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: 'url(/bg-1.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-l from-[#0a0a0a] via-[#0a0a0a]/90 to-[#0a0a0a]/70" />

      <div
        ref={contentRef}
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8"
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content - Features List (reversed order for creators) */}
          <div className="lg:pr-8 order-2 lg:order-1">
            <ul ref={featuresRef} className="space-y-4">
              {forCreatorsConfig.features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors duration-300"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center mt-0.5">
                    <Check className="w-3.5 h-3.5 text-white/70" />
                  </div>
                  <span className="text-white/80 text-sm leading-relaxed">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Content */}
          <div className="order-1 lg:order-2">
            {/* Subtitle */}
            <p
              ref={subtitleRef}
              className="text-sm uppercase tracking-widest text-white/40 mb-4"
            >
              {forCreatorsConfig.subtitle}
            </p>

            {/* Title */}
            <h2
              ref={titleRef}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6"
            >
              {forCreatorsConfig.title}
            </h2>

            {/* Description */}
            <p
              ref={descRef}
              className="text-lg text-white/60 leading-relaxed mb-8"
            >
              {forCreatorsConfig.description}
            </p>

            {/* CTA Button */}
            <a
              ref={ctaRef}
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#0a0a0a] text-sm font-medium rounded-full hover:bg-white/90 transition-all duration-300 hover:scale-105 group hover:cursor-pointer"
            >
              {forCreatorsConfig.ctaText}
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
