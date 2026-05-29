import { useEffect, useRef } from 'react';
import { whoItIsForConfig } from '../config';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { User, Building2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ElementType> = {
  'Creators': User,
  'Brands and Agencies': Building2,
};

export function WhoItIsFor() {
  const sectionRef = useRef<HTMLElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const triggers: ScrollTrigger[] = [];

      // Subtitle animation
      const subtitleTrigger = ScrollTrigger.create({
        trigger: subtitleRef.current,
        start: 'top 85%',
        onEnter: () => {
          gsap.fromTo(
            subtitleRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
          );
        },
        once: true,
      });
      triggers.push(subtitleTrigger);

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

      // Cards animation
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.audience-card');
        const cardsTrigger = ScrollTrigger.create({
          trigger: cardsRef.current,
          start: 'top 80%',
          onEnter: () => {
            gsap.fromTo(
              cards,
              { opacity: 0, y: 40 },
              {
                opacity: 1,
                y: 0,
                duration: 0.7,
                stagger: 0.15,
                ease: 'power3.out',
                delay: 0.2,
              }
            );
          },
          once: true,
        });
        triggers.push(cardsTrigger);
      }

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
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0d0d0d] to-[#0a0a0a]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-20">
          <p
            ref={subtitleRef}
            className="text-sm uppercase tracking-widest text-white/40 mb-4"
          >
            {whoItIsForConfig.subtitle}
          </p>
          <h2
            ref={titleRef}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight"
          >
            {whoItIsForConfig.title}
          </h2>
        </div>

        {/* Audience Cards */}
        <div
          ref={cardsRef}
          className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto"
        >
          {whoItIsForConfig.audiences.map((audience, index) => {
            const Icon = iconMap[audience.title] || User;
            return (
              <div
                key={index}
                className="audience-card p-8 lg:p-10 rounded-2xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300 text-center"
              >
                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-6">
                  <Icon className="w-8 h-8 text-white/70" />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-semibold text-white mb-4 tracking-tight">
                  {audience.title}
                </h3>

                {/* Description */}
                <p className="text-white/50 text-sm leading-relaxed">
                  {audience.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
