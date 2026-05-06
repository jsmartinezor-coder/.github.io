import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from(cardRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 0.8,
      })
        .from(
          labelRef.current,
          { opacity: 0, y: 20, duration: 0.5 },
          0.3
        )
        .from(
          titleRef.current?.querySelectorAll('.word') || [],
          { opacity: 0, y: 30, duration: 0.6, stagger: 0.05 },
          0.4
        )
        .from(
          subtitleRef.current,
          { opacity: 0, y: 20, duration: 0.5 },
          0.7
        )
        .from(
          ctaRef.current,
          { opacity: 0, y: 20, duration: 0.5 },
          0.9
        )
        .from(
          scrollRef.current,
          { opacity: 0, duration: 0.5 },
          1.1
        );

      gsap.to(imageRef.current, {
        yPercent: 10,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollTo = (id: string) => {
    const target = document.querySelector(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const titleWords = 'Creamos contenido que conecta marcas con audiencias reales'.split(' ');

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        ref={imageRef}
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
      >
        <img
          src="/assets/hero-poster.jpg"
          alt="Hero background"
          className="w-full h-full object-cover opacity-60"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(10,14,26,0.3) 0%, rgba(10,14,26,0.7) 60%, #0A0E1A 100%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
        <div
          ref={cardRef}
          className="glass-card-strong p-8 md:p-14"
        >
          <div className="flex flex-col items-center gap-2 mb-6">
            <div className="w-10 h-[1px] bg-accent" />
            <p
              ref={labelRef}
              className="text-xs font-medium uppercase tracking-[0.15em] text-accent"
            >
              CONTENIDO QUE CONECTA
            </p>
          </div>

          <h1
            ref={titleRef}
            className="font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.02em] text-white"
          >
            {titleWords.map((word, i) => (
              <span key={i} className="word inline-block mr-[0.3em]">
                {word === 'conecta' || word === 'reales' ? (
                  <span className="text-glow">{word}</span>
                ) : (
                  word
                )}
              </span>
            ))}
          </h1>

          <p
            ref={subtitleRef}
            className="mt-6 text-base md:text-lg text-text-secondary max-w-[560px] mx-auto leading-relaxed"
          >
            Especialistas en contenido para Instagram y TikTok · Enfoque en
            crecimiento personal y lifestyle
          </p>

          <div ref={ctaRef} className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollTo('#contacto')}
              className="glass-btn px-8 py-4 text-base font-semibold"
            >
              Trabajemos juntos
            </button>
            <button
              onClick={() => scrollTo('#portafolio')}
              className="glass-btn-outline px-8 py-4 text-base font-semibold"
            >
              Ver portafolio
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="animate-bounce-subtle">
          <ChevronDown className="w-6 h-6 text-text-muted" />
        </div>
      </div>
    </section>
  );
}
