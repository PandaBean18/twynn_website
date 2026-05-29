// import { useEffect, useRef } from 'react';
// import { featuresConfig } from '../config';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { ClipboardList, Calendar, Users, MessageSquare, BarChart3, Shield } from 'lucide-react';

// gsap.registerPlugin(ScrollTrigger);

// const iconMap: Record<string, React.ElementType> = {
//   'Deal Tracker': ClipboardList,
//   'Content Calendar': Calendar,
//   'Marketplace Matching': Users,
//   'AI Assisted Messaging': MessageSquare,
//   'Analytics and Alerts': BarChart3,
//   'Secure Payments': Shield,
// };

// export function Features() {
//   const sectionRef = useRef<HTMLElement>(null);
//   const subtitleRef = useRef<HTMLParagraphElement>(null);
//   const titleRef = useRef<HTMLHeadingElement>(null);
//   const gridRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       const triggers: ScrollTrigger[] = [];

//       // Subtitle animation
//       const subtitleTrigger = ScrollTrigger.create({
//         trigger: subtitleRef.current,
//         start: 'top 85%',
//         onEnter: () => {
//           gsap.fromTo(
//             subtitleRef.current,
//             { opacity: 0, y: 20 },
//             { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
//           );
//         },
//         once: true,
//       });
//       triggers.push(subtitleTrigger);

//       // Title animation
//       const titleTrigger = ScrollTrigger.create({
//         trigger: titleRef.current,
//         start: 'top 85%',
//         onEnter: () => {
//           gsap.fromTo(
//             titleRef.current,
//             { opacity: 0, y: 30 },
//             { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.1 }
//           );
//         },
//         once: true,
//       });
//       triggers.push(titleTrigger);

//       // Grid items animation
//       if (gridRef.current) {
//         const cards = gridRef.current.querySelectorAll('.feature-card');
//         const gridTrigger = ScrollTrigger.create({
//           trigger: gridRef.current,
//           start: 'top 80%',
//           onEnter: () => {
//             gsap.fromTo(
//               cards,
//               { opacity: 0, y: 40 },
//               {
//                 opacity: 1,
//                 y: 0,
//                 duration: 0.7,
//                 stagger: 0.1,
//                 ease: 'power3.out',
//                 delay: 0.2,
//               }
//             );
//           },
//           once: true,
//         });
//         triggers.push(gridTrigger);
//       }

//       return () => {
//         triggers.forEach((trigger) => trigger.kill());
//       };
//     }, sectionRef);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <section
//       ref={sectionRef}
//       id="features"
//       className="relative py-24 lg:py-32 bg-[#0a0a0a] overflow-hidden"
//     >
//       {/* Subtle background */}
//       <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0d0d0d] to-[#0a0a0a]" />

//       <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
//         {/* Header */}
//         <div className="text-center mb-16 lg:mb-20">
//           <p
//             ref={subtitleRef}
//             className="text-sm uppercase tracking-widest text-white/40 mb-4"
//           >
//             {featuresConfig.subtitle}
//           </p>
//           <h2
//             ref={titleRef}
//             className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight"
//           >
//             {featuresConfig.title}
//           </h2>
//         </div>

//         {/* Features Grid */}
//         <div
//           ref={gridRef}
//           className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
//         >
//           {featuresConfig.features.map((feature, index) => {
//             const Icon = iconMap[feature.title] || ClipboardList;
//             return (
//               <div
//                 key={index}
//                 className="feature-card group p-6 lg:p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300"
//               >
//                 {/* Icon */}
//                 <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6 group-hover:bg-white/15 transition-colors duration-300">
//                   <Icon className="w-6 h-6 text-white/70" />
//                 </div>

//                 {/* Title */}
//                 <h3 className="text-xl font-semibold text-white mb-3 tracking-tight">
//                   {feature.title}
//                 </h3>

//                 {/* Description */}
//                 <p className="text-white/50 text-sm leading-relaxed">
//                   {feature.description}
//                 </p>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { type Feature, type ActiveTab } from '../types';

export function Features() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('all');
  const [hoveredIndex, setHoveredIndex] = useState<string | null>(null);

  const allFeatures: Feature[] = [
    {
      id: 'deal-tracker',
      index: '01',
      title: 'Deal Tracker',
      description: 'Track every active partnership with clear status updates, delivery deadlines, and key communication history in one clean viewport.',
      target: 'creators',
    },
    {
      id: 'content-calendar',
      index: '02',
      title: 'Content Calendar',
      description: 'See planned publications and brand deliverables unified in a single, seamlessly synced editorial calendar feed.',
      target: 'creators',
    },
    {
      id: 'marketplace-matching',
      index: '03',
      title: 'Marketplace Matching',
      description: 'Connect brands and creators automatically based on audience demographics, niche suitability, and engagement metrics.',
      target: 'brands',
    },
    {
      id: 'ai-assisted-messaging',
      index: '04',
      title: 'AI Assisted Messaging',
      description: 'Draft outreach messages that outline deliverables, timeline markers, and rate guides with absolute clarity.',
      target: 'brands',
    },
    {
      id: 'analytics-alerts',
      index: '05',
      title: 'Analytics and Alerts',
      description: 'Monitor long-term profile trends and receive instantaneous logs about major metric shifts and campaign updates.',
      target: 'brands',
    },
    {
      id: 'secure-payments',
      index: '06',
      title: 'Secure Payments',
      description: 'An escrow-based payment system where funds are locked securely and released instantly upon designated milestone approval.',
      target: 'both',
    },
  ];

  const filteredFeatures = allFeatures.filter((f) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'creators') return f.target === 'creators' || f.target === 'both';
    if (activeTab === 'brands') return f.target === 'brands' || f.target === 'both';
    return true;
  });

  return (
    <section id="features" className="py-24 md:py-32 border-t border-zinc-900/40 px-6 md:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Headings */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <span className="animate-item text-sm uppercase tracking-widest text-white/40 mb-4">
              Core Features
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6">
              Everything You Need
            </h2>
          </div>

          {/* Interactive Toggle tabs */}
          <div className="flex rounded-md bg-zinc-950 p-1 border border-zinc-900/60 max-w-md self-start md:self-auto">
            {(['all', 'creators', 'brands'] as ActiveTab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                id={`feature-tab-${tab}`}
                className={`relative px-4 py-1.5 font-sans text-xs font-medium tracking-wide rounded transition-colors duration-200 uppercase cursor-pointer ${
                  activeTab === tab
                    ? 'text-white font-semibold'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeFeatureBar"
                    id={`active-feature-bar-${tab}`}
                    className="absolute inset-0 bg-zinc-900 rounded"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">
                  {tab === 'all' ? 'All Workspace' : tab === 'creators' ? 'For Creators' : 'For Brands'}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Minimal Grid Layout */}
        <div id="features-list-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          <AnimatePresence mode="popLayout">
            {filteredFeatures.map((feat) => {
              const isHovered = hoveredIndex === feat.id;
              const isAnyHovered = hoveredIndex !== null;

              return (
                <motion.div
                  key={feat.id}
                  id={`feature-item-${feat.id}`}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ 
                    opacity: isAnyHovered ? (isHovered ? 1 : 0.4) : 1, 
                    y: 0 
                  }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  onMouseEnter={() => setHoveredIndex(feat.id)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="group relative flex flex-col pt-8 border-t border-zinc-900/60 cursor-default"
                >
                  {/* Subtle active line indicator to replace heavy boxes */}
                  <div
                    id={`hover-indicator-bar-${feat.id}`}
                    className={`absolute top-0 left-0 h-[2px] bg-white transition-all duration-300 ease-out ${
                      isHovered ? 'w-24' : 'w-0'
                    }`}
                  />

                  {/* Mono Index Label */}
                  <span className="font-mono text-[10px] text-zinc-500 mb-6 block tracking-widest group-hover:text-white transition-colors duration-300">
                    {feat.index} // {feat.target === 'both' ? 'Unified' : feat.target === 'creators' ? 'Creator Suite' : 'Brand Portal'}
                  </span>

                  {/* Title */}
                  <h3 className=" text-lg text-zinc-100  mb-3 group-hover:text-white transition-colors duration-300">
                    {feat.title}
                  </h3>

                  {/* Description */}
                  <p className="font-sans text-sm leading-relaxed text-zinc-400 group-hover:text-zinc-300 transition-colors duration-300">
                    {feat.description}
                  </p>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
