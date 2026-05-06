import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Compass, Target, Camera, TrendingUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: '01',
    title: 'Descubrimiento',
    description: 'Nos sumergimos en tu marca, audiencia y objetivos. Entendemos tu voz antes de crear.',
    icon: Compass,
  },
  {
    num: '02',
    title: 'Estrategia',
    description: 'Diseñamos un plan de contenido alineado con tu funnel de conversión y calendario editorial.',
    icon: Target,
  },
  {
    num: '03',
    title: 'Creación',
    description: 'Producimos videos, fotos y copy que capturan la esencia de tu marca con calidad premium.',
    icon: Camera,
  },
  {
    num: '04',
    title: 'Resultados',
    description: 'Medimos, optimizamos y escalamos. Entregamos reportes claros y crecimiento real.',
    icon: TrendingUp,
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline line draw
      gsap.from(lineRef.current, {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 1.2,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      });

      // Cards stagger in
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.from(card, {
          y: 30,
          opacity: 0,
          duration: 0.7,
          delay: 0.2 + i * 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        });
      });

      // Dots pulse
      dotsRef.current.forEach((dot, i) => {
        if (!dot) return;
        gsap.from(dot, {
          scale: 0,
          duration: 0.4,
          delay: 0.3 + i * 0.2,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="proceso"
      className="relative py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-[720px] mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-[1px] bg-accent" />
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-accent">
              PROCESO
            </p>
            <div className="w-10 h-[1px] bg-accent" />
          </div>

          <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-bold leading-[1.1] tracking-[-0.01em] text-white">
            Así convertimos ideas en resultados
          </h2>
        </div>

        {/* Desktop Timeline */}
        <div className="hidden lg:block relative">
          {/* Horizontal Line */}
          <div
            ref={lineRef}
            className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/15 -translate-y-1/2"
          />

          {/* Cards */}
          <div className="relative grid grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div key={step.num} className="relative flex flex-col items-center">
                {/* Card - alternating up/down */}
                <div
                  ref={(el) => { cardsRef.current[i] = el; }}
                  className={`glass-card p-6 w-full max-w-[260px] ${
                    i % 2 === 0 ? 'mb-16' : 'mt-16 order-2'
                  }`}
                >
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-full glass-card flex items-center justify-center mb-4">
                    <step.icon className="w-5 h-5 text-accent" />
                  </div>

                  <p className="text-xs font-bold tracking-[0.1em] text-accent mb-2">
                    {step.num}
                  </p>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Dot on timeline */}
                <div
                  ref={(el) => { dotsRef.current[i] = el; }}
                  className={`absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-accent border-2 border-bg-base z-10 ${
                    i % 2 === 0 ? 'bottom-14' : 'top-14'
                  }`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Vertical Timeline */}
        <div className="lg:hidden relative">
          {/* Vertical Line */}
          <div className="absolute left-8 top-0 bottom-0 w-[1px] bg-white/15" />

          <div className="space-y-8">
            {steps.map((step) => (
              <div key={step.num} className="relative flex gap-6 items-start">
                {/* Dot */}
                <div className="relative z-10 w-16 flex justify-center flex-shrink-0">
                  <div className="w-4 h-4 rounded-full bg-accent border-2 border-bg-base mt-6" />
                </div>

                {/* Card */}
                <div className="glass-card p-5 flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full glass-card flex items-center justify-center">
                      <step.icon className="w-4 h-4 text-accent" />
                    </div>
                    <p className="text-xs font-bold tracking-[0.1em] text-accent">
                      {step.num}
                    </p>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
