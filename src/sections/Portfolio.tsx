import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play } from 'lucide-react';
import ProjectModal from '../components/ProjectModal';

gsap.registerPlugin(ScrollTrigger);

const categories = ['Todos', 'Reels', 'Campañas', 'Branding', 'Casos de éxito'];

const projects = [
  {
    id: 1,
    title: 'Vlog de Crecimiento',
    category: 'Reels',
    description: 'Lifestyle content for a productivity brand focusing on morning routines and habit building.',
    results: '+120K vistas · +35% engagement',
    thumbnail: '/assets/project-1-thumb.jpg',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
  {
    id: 2,
    title: 'Lanzamiento Verano',
    category: 'Campañas',
    description: 'Seasonal campaign for a travel startup capturing the essence of summer adventures.',
    results: '+85K vistas · 2M impresiones',
    thumbnail: '/assets/project-2-thumb.jpg',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
  {
    id: 3,
    title: 'Identidad Visual',
    category: 'Branding',
    description: 'Complete visual identity and content system for a modern wellness brand.',
    results: '+40% reconocimiento',
    thumbnail: '/assets/project-3-thumb.jpg',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
  {
    id: 4,
    title: 'Storytelling Financiero',
    category: 'Casos de éxito',
    description: 'Finance education series that demystifies investing for young audiences.',
    results: '+200K vistas · +50K seguidores',
    thumbnail: '/assets/project-4-thumb.jpg',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
  {
    id: 5,
    title: 'Día en la Vida',
    category: 'Reels',
    description: 'Day-in-the-life content for a wellness brand showcasing authentic routines.',
    results: '+95K vistas · +28% engagement',
    thumbnail: '/assets/project-5-thumb.jpg',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
  {
    id: 6,
    title: 'Colaboración Europa',
    category: 'Campañas',
    description: 'European travel collaboration featuring hidden gems and local experiences.',
    results: '+150K vistas · 3M alcance',
    thumbnail: '/assets/project-6-thumb.jpg',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
];

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(gridRef.current?.children || [], {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
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

  const handleFilterChange = (category: string) => {
    setActiveFilter(category);
  };

  return (
    <section
      ref={sectionRef}
      id="portafolio"
      className="relative py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-[720px] mx-auto mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-[1px] bg-accent" />
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-accent">
              PORTAFOLIO
            </p>
            <div className="w-10 h-[1px] bg-accent" />
          </div>

          <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-bold leading-[1.1] tracking-[-0.01em] text-white mb-8">
            Trabajos que hablan por sí solos
          </h2>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleFilterChange(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === cat
                    ? 'bg-accent/10 text-accent border border-accent/30'
                    : 'bg-transparent text-text-secondary border border-white/15 hover:bg-white/5 hover:border-white/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project) => {
            const isVisible =
              activeFilter === 'Todos' || project.category === activeFilter;

            return (
              <div
                key={project.id}
                className={`glass-card overflow-hidden cursor-pointer group ${
                  isVisible ? 'block' : 'hidden'
                }`}
                onClick={() => setSelectedProject(project)}
              >
                {/* Thumbnail */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Play Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 rounded-full glass-card-strong flex items-center justify-center">
                      <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <p className="text-xs font-medium uppercase tracking-[0.1em] text-text-muted mb-2">
                    {project.category}
                  </p>
                  <h3 className="text-lg font-semibold text-white mb-2 line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-sm text-text-secondary line-clamp-2 mb-3">
                    {project.description}
                  </p>
                  <p className="text-xs font-medium text-accent">
                    {project.results}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
