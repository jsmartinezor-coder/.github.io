import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { X } from 'lucide-react';

interface ProjectModalProps {
  project: {
    id: number;
    title: string;
    category: string;
    description: string;
    results: string;
    videoUrl: string;
    thumbnail: string;
  };
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    gsap.to(overlayRef.current, {
      opacity: 1,
      duration: 0.3,
    });

    gsap.fromTo(
      modalRef.current,
      { opacity: 0, scale: 0.92, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'power3.out', delay: 0.1 }
    );

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  const handleClose = () => {
    gsap.to(modalRef.current, {
      opacity: 0,
      scale: 0.95,
      y: 10,
      duration: 0.2,
    });

    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.2,
      delay: 0.1,
      onComplete: onClose,
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-bg-base/90 backdrop-blur-sm opacity-0"
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        ref={modalRef}
        className="relative glass-card-strong w-full max-w-4xl max-h-[90vh] overflow-y-auto p-4 md:p-8 opacity-0"
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full glass-card flex items-center justify-center hover:bg-white/10 transition-colors"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        {/* Video Player */}
        <div className="relative aspect-video bg-black rounded-xl overflow-hidden mb-6">
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full glass-card-strong flex items-center justify-center">
              <PlayIcon className="w-6 h-6 text-white fill-white ml-1" />
            </div>
          </div>
        </div>

        {/* Title & Category */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-medium uppercase tracking-[0.1em] text-accent">
            {project.category}
          </span>
        </div>

        <h3 className="font-display text-2xl font-bold text-white mb-4">
          {project.title}
        </h3>

        <p className="text-base text-text-secondary leading-relaxed mb-6">
          {project.description}
        </p>

        {/* Results */}
        <div className="flex flex-wrap gap-2">
          {project.results.split('·').map((metric, i) => (
            <span
              key={i}
              className="px-3 py-1.5 rounded-full text-sm font-medium text-accent bg-accent/10 border border-accent/20"
            >
              {metric.trim()}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M8 5.14v14.72a1 1 0 001.5.86l11-7.36a1 1 0 000-1.72l-11-7.36a1 1 0 00-1.5.86z" />
    </svg>
  );
}
