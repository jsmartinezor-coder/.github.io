import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Instagram } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const contactMethods = [
  {
    icon: Mail,
    label: 'hola@elancreator.com',
    href: 'mailto:hola@elancreator.com',
  },
  {
    icon: Instagram,
    label: '@elancreator',
    href: 'https://instagram.com/elancreator',
  },
  {
    icon: TikTokIcon,
    label: '@elancreator',
    href: 'https://tiktok.com/@elancreator',
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    empresa: '',
    mensaje: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(formRef.current, {
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

      gsap.from(infoRef.current, {
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section
      ref={sectionRef}
      id="contacto"
      className="relative py-24 md:py-32"
    >
      {/* Background glow */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at center, rgba(244,63,94,0.1) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-[720px] mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-[1px] bg-accent" />
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-accent">
              CONTACTO
            </p>
            <div className="w-10 h-[1px] bg-accent" />
          </div>

          <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-bold leading-[1.1] tracking-[-0.01em] text-white mb-4">
            ¿Listo para crear algo increíble juntos?
          </h2>

          <p className="text-base text-text-secondary">
            Cuéntanos sobre tu proyecto y te responderemos en menos de 24 horas.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Form Column */}
          <div ref={formRef} className="lg:col-span-3">
            <div className="glass-card p-6 md:p-8">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full glass-card-strong flex items-center justify-center mx-auto mb-4">
                    <CheckIcon className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    ¡Mensaje enviado!
                  </h3>
                  <p className="text-text-secondary">
                    Te contactaremos pronto.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Nombre
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.nombre}
                      onChange={(e) =>
                        setFormData({ ...formData, nombre: e.target.value })
                      }
                      className="glass-input w-full"
                      placeholder="Tu nombre"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="glass-input w-full"
                      placeholder="tu@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Marca / Empresa
                    </label>
                    <input
                      type="text"
                      value={formData.empresa}
                      onChange={(e) =>
                        setFormData({ ...formData, empresa: e.target.value })
                      }
                      className="glass-input w-full"
                      placeholder="Nombre de tu marca"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Mensaje
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.mensaje}
                      onChange={(e) =>
                        setFormData({ ...formData, mensaje: e.target.value })
                      }
                      className="glass-input w-full resize-none"
                      placeholder="Cuéntanos sobre tu proyecto..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="glass-btn w-full py-4 text-base font-semibold"
                  >
                    Enviar mensaje
                  </button>
                </form>
              )}
            </div>

            <p className="mt-4 text-xs text-text-muted text-center">
              Tus datos están seguros. No compartimos información con terceros.
            </p>
          </div>

          {/* Info Column */}
          <div ref={infoRef} className="lg:col-span-2 flex flex-col gap-6">
            {contactMethods.map((method) => (
              <a
                key={method.label}
                href={method.href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card p-4 flex items-center gap-4 hover:translate-y-[-4px] transition-transform duration-300"
              >
                <div className="w-10 h-10 rounded-full glass-card flex items-center justify-center flex-shrink-0">
                  <method.icon className="w-5 h-5 text-accent" />
                </div>
                <span className="text-base font-medium text-white">
                  {method.label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.88-2.89 2.89 2.89 0 0 1 2.88-2.89c.26 0 .51.04.75.1V9.66a6.33 6.33 0 0 0-.75-.05A6.34 6.34 0 0 0 3.64 16a6.34 6.34 0 0 0 6.35 6.34c3.5 0 6.35-2.84 6.35-6.34V8.47a8.53 8.53 0 0 0 4.96 1.58V6.82a4.92 4.92 0 0 1-1.71-.13z" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}
