import { Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.08] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <span className="font-display text-lg font-bold tracking-[0.05em] text-white/50">
            ELAN CREATOR
          </span>

          {/* Copyright */}
          <p className="text-xs text-text-muted">
            © 2025 Elan Creator. Todos los derechos reservados.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com/elancreator"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-accent transition-colors duration-300"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://tiktok.com/@elancreator"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-accent transition-colors duration-300"
              aria-label="TikTok"
            >
              <TikTokIcon className="w-5 h-5" />
            </a>
            <a
              href="https://youtube.com/@elancreator"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-accent transition-colors duration-300"
              aria-label="YouTube"
            >
              <Youtube className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
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
