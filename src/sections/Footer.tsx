import { useEffect, useRef } from 'react';
import { footerConfig } from '../config';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Footer() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const triggers: ScrollTrigger[] = [];

      // Content animation
      const contentTrigger = ScrollTrigger.create({
        trigger: contentRef.current,
        start: 'top 90%',
        onEnter: () => {
          gsap.fromTo(
            contentRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
          );
        },
        once: true,
      });
      triggers.push(contentTrigger);

      return () => {
        triggers.forEach((trigger) => trigger.kill());
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={sectionRef}
      className="relative py-16 lg:py-20 bg-[#0a0a0a] overflow-hidden border-t border-white/10"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={contentRef}>
          {/* Main Footer Content */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10 lg:gap-16 mb-12 lg:mb-16">
            {/* Brand */}
            <div className="text-center lg:text-left">
              <h3 className="text-3xl lg:text-4xl font-bold text-white tracking-tight mb-2">
                {footerConfig.brandName}
              </h3>
              <p className="text-white/40 text-sm">{footerConfig.tagline}</p>
            </div>

            {/* Navigation */}
            <nav className="flex flex-wrap justify-center gap-6 lg:gap-8">
              {footerConfig.navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-white/50 hover:text-white text-sm font-medium transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/10 text-center">
            <p className="text-white/30 text-sm">
              {footerConfig.copyright}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
