import { useEffect, useRef, useState } from 'react';
import { howItWorksConfig } from '../config';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { User, Building2, Lock, LayoutDashboard, Store, MessageSquare, CreditCard, CheckCircle, Search, FileCheck, BadgeDollarSign } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const creatorIcons = [Lock, LayoutDashboard, Store, MessageSquare, CreditCard];
const brandIcons = [CheckCircle, LayoutDashboard, Search, FileCheck, BadgeDollarSign];

type Perspective = 'creator' | 'brand';

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activePerspective, setActivePerspective] = useState<Perspective>('creator');

  const currentJourney = activePerspective === 'creator' 
    ? howItWorksConfig.creatorJourney 
    : howItWorksConfig.brandJourney;
  
  const currentIcons = activePerspective === 'creator' ? creatorIcons : brandIcons;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const triggers: ScrollTrigger[] = [];

      // Header animation
      const headerTrigger = ScrollTrigger.create({
        trigger: headerRef.current,
        start: 'top 85%',
        onEnter: () => {
          const items = headerRef.current?.querySelectorAll('.animate-item');
          if (items && items.length > 0) {
            gsap.fromTo(
              items,
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
            );
          }
        },
        once: true,
      });
      triggers.push(headerTrigger);

      // Tabs animation
      const tabsTrigger = ScrollTrigger.create({
        trigger: tabsRef.current,
        start: 'top 85%',
        onEnter: () => {
          gsap.fromTo(
            tabsRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
          );
        },
        once: true,
      });
      triggers.push(tabsTrigger);

      return () => {
        triggers.forEach((trigger) => trigger.kill());
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animate content when perspective changes
  useEffect(() => {
    if (contentRef.current) {
      const steps = contentRef.current.querySelectorAll('.step-card');
      gsap.fromTo(
        steps,
        { opacity: 0, x: activePerspective === 'creator' ? -30 : 30 },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out' }
      );
    }
  }, [activePerspective]);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="relative py-24 lg:py-32 bg-[#0a0a0a] overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0c0c0c] to-[#0a0a0a]" />

      {/* Subtle pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12 lg:mb-16">
          <p className="animate-item text-sm uppercase tracking-widest text-white/40 mb-4">
            {howItWorksConfig.subtitle}
          </p>
          <h2 className="animate-item text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6">
            {howItWorksConfig.title}
          </h2>
          <p className="animate-item text-lg text-white/50 max-w-2xl mx-auto">
            {howItWorksConfig.description}
          </p>
        </div>

        {/* Perspective Tabs */}
        <div ref={tabsRef} className="flex justify-center mb-12 lg:mb-16">
          <div className="inline-flex p-1.5 bg-white/5 rounded-full border border-white/10">
            <button
              onClick={() => setActivePerspective('creator')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                activePerspective === 'creator'
                  ? 'bg-white text-[#0a0a0a]'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <User className="w-4 h-4" />
              {howItWorksConfig.creatorJourney.label}
            </button>
            <button
              onClick={() => setActivePerspective('brand')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                activePerspective === 'brand'
                  ? 'bg-white text-[#0a0a0a]'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Building2 className="w-4 h-4" />
              {howItWorksConfig.brandJourney.label}
            </button>
          </div>
        </div>

        {/* Steps Content */}
        <div ref={contentRef} className="relative">
          {/* Connection Line */}
          <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-white/10 via-white/20 to-white/10 hidden md:block" />

          <div className="space-y-8 lg:space-y-12">
            {currentJourney.steps.map((step, index) => {
              const Icon = currentIcons[index];
              const isEven = index % 2 === 0;
              
              return (
                <div
                  key={`${activePerspective}-${index}`}
                  className={`step-card relative grid md:grid-cols-2 gap-6 lg:gap-12 items-center ${
                    isEven ? '' : 'md:direction-rtl'
                  }`}
                >
                  {/* Content Side */}
                  <div className={`${isEven ? 'md:text-right md:pr-12' : 'md:order-2 md:text-left md:pl-12'}`}>
                    <div className={`flex items-center gap-3 mb-4 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                      {/* Step Number */}
                      <span className="text-5xl lg:text-6xl font-bold text-white/10 tracking-tighter">
                        {step.number}
                      </span>
                    </div>
                    
                    {/* Highlight Badge */}
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white/60 text-xs font-medium mb-4">
                      <Icon className="w-3.5 h-3.5" />
                      {step.highlight}
                    </span>

                    {/* Title */}
                    <h3 className="text-xl lg:text-2xl font-semibold text-white mb-3 tracking-tight">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-white/50 text-sm lg:text-base leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Visual Side */}
                  <div className={`${isEven ? 'md:order-2 md:pl-12 md:block hidden' : 'md:order-1 md:pr-12 hidden md:block'}`}>
                    <div className="relative p-6 lg:p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.05] hover:border-white/15 transition-all duration-300">
                      {/* Icon */}
                      <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center mb-4">
                        <Icon className="w-7 h-7 text-white/70" />
                      </div>

                      {/* Step indicator */}
                      <div className="flex items-center gap-2 text-white/30 text-sm">
                        <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-medium">
                          {step.number}
                        </span>
                        <span>Step {parseInt(step.number)} of 5</span>
                      </div>

                      {/* Decorative corner */}
                      <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-white/10 rounded-tr-lg" />
                    </div>
                  </div>

                  {/* Center Dot (on the connection line) */}
                  <div className="absolute left-8 lg:left-1/2 top-1/2 -translate-y-1/2 lg:-translate-x-1/2 w-4 h-4 rounded-full bg-white/20 border-2 border-white/40 hidden md:block" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Privacy & Security Note */}
        {/* <div className="mt-16 lg:mt-20 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/[0.03] border border-white/10">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
              <BadgeDollarSign className="w-5 h-5 text-white/70" />
            </div>
            <div className="text-left">
              <p className="text-white font-medium text-sm">Privacy & Security First</p>
              <p className="text-white/40 text-xs">End-to-end encryption • Verified profiles • Secure escrow</p>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
}
