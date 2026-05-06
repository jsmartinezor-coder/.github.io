import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const brands = [
  { name: 'NexTravel', logo: '/assets/brand-logo-1.png' },
  { name: 'Vida Wellness', logo: '/assets/brand-logo-2.png' },
  { name: 'GrowApp', logo: '/assets/brand-logo-3.png' },
  { name: 'EcoModa', logo: '/assets/brand-logo-4.png' },
  { name: 'TaskFlow', logo: '/assets/brand-logo-5.png' },
  { name: 'Colab Studio', logo: '/assets/brand-logo-6.png' },
];

const testimonials = [
  {
    quote: 'Elan transformó completamente nuestra presencia en redes. El engagement subió un 40% en el primer mes.',
    name: 'María González',
    role: 'Marketing Director',
    company: 'NexTravel',
    avatar: '/assets/testimonial-avatar-1.jpg',
  },
  {
    quote: 'Profesionalismo creativo y entregas puntuales. Son nuestro equipo de contenido de confianza.',
    name: 'Carlos Ruiz',
    role: 'Founder',
    company: 'GrowApp',
    avatar: '/assets/testimonial-avatar-2.jpg',
  },
  {
    quote: 'Entendieron nuestra marca desde el día uno. El contenido superó todas nuestras expectativas.',
    name: 'Ana Martínez',
    role: 'Brand Manager',
    company: 'Vida Wellness',
    avatar: '/assets/testimonial-avatar-3.jpg',
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardsRef.current?.children || [], {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Duplicate brands for infinite marquee
  const marqueeBrands = [...brands, ...brands];

  return (
    <section
      ref={sectionRef}
      id="marcas"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background glow */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at center, rgba(76,29,149,0.1) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Brands Marquee */}
        <div className="text-center mb-12">
          <h2 className="font-display text-[clamp(1.5rem,2.5vw,2rem)] font-semibold text-white mb-8">
            Marcas que confían en nosotros
          </h2>
        </div>

        <div className="relative overflow-hidden mb-20">
          <div className="flex animate-marquee">
            {marqueeBrands.map((brand, i) => (
              <div
                key={`${brand.name}-${i}`}
                className="flex-shrink-0 mx-3"
              >
                <div className="glass-card w-[140px] h-[80px] flex items-center justify-center px-4 hover:bg-white/10 transition-all duration-300 group">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="max-w-full max-h-12 object-contain opacity-50 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-300"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="text-center mb-10">
          <h2 className="font-display text-[clamp(1.5rem,2.5vw,2rem)] font-semibold text-white">
            Lo que dicen nuestros clientes
          </h2>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {testimonials.map((t) => (
            <div key={t.name} className="glass-card p-6 text-left">
              <Quote className="w-6 h-6 text-accent/30 mb-4" />

              <p className="text-base text-white leading-relaxed italic mb-6">
                "{t.quote}"
              </p>

              <div className="h-[1px] bg-white/10 mb-4" />

              <div className="flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-white/15"
                  loading="lazy"
                />
                <div>
                  <p className="text-sm font-semibold text-white">
                    {t.name}
                  </p>
                  <p className="text-xs text-text-muted">
                    {t.role}, {t.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
