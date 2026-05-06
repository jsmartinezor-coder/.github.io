import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, BarChart3, PenTool } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Play,
    label: 'Contenido audiovisual',
  },
  {
    icon: BarChart3,
    label: 'Estrategia de redes',
  },
  {
    icon: PenTool,
    label: 'Storytelling con propósito',
  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(imageRef.current, {
        x: -40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      gsap.from(textRef.current, {
        x: 40,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      gsap.from(badgesRef.current?.children || [], {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: badgesRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      const imgEl = imageRef.current?.querySelector('img');
      if (imgEl) {
        gsap.to(imgEl, {
          y: 40,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="sobre-nosotros"
      className="relative py-24 md:py-32"
    >
      {/* Background glow */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at center, rgba(244,63,94,0.08) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Column */}
          <div ref={imageRef} className="relative">
            <div className="glass-card p-2 md:p-3 rounded-[20px]">
              <img
                src="/assets/creator-photo.jpg"
                alt="Creadora de contenido profesional en su espacio de trabajo"
                className="w-full h-auto rounded-[12px] object-cover"
                loading="lazy"
              />
            </div>
          </div>

          {/* Text Column */}
          <div ref={textRef}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-[1px] bg-accent" />
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-accent">
                SOBRE NOSOTROS
              </p>
            </div>

            <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-bold leading-[1.1] tracking-[-0.01em] text-white mb-6">
              Contenido con propósito, creado con pasión
            </h2>

            <p className="text-base text-text-secondary leading-relaxed mb-4">
              Ayudamos a marcas a conectar con audiencias de 18 a 30 años que
              buscan libertad financiera y geográfica. Creemos en el poder del
              storytelling auténtico para construir comunidades reales, no solo
              seguidores.
            </p>

            <p className="text-base text-text-secondary leading-relaxed mb-8">
              Cada pieza de contenido que creamos está pensada para inspirar,
              conectar y convertir. Nuestro enfoque combina creatividad visual con
              estrategia de crecimiento para entregar resultados medibles.
            </p>

            {/* Feature Badges */}
            <div
              ref={badgesRef}
              className="flex flex-wrap gap-4"
            >
              {features.map((feature) => (
                <div
                  key={feature.label}
                  className="glass-card flex items-center gap-3 px-4 py-3"
                >
                  <feature.icon className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-sm font-semibold text-white">
                    {feature.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
