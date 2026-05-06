import { useEffect, useRef } from 'react';

export default function AmbientCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    resize();
    window.addEventListener('resize', resize);

    function draw() {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const w = canvas.width;
      const h = canvas.height;

      // Blob A - deep blue-violet
      const x1 = w * 0.5 + Math.cos(time * 0.015) * w * 0.3;
      const y1 = h * 0.5 + Math.sin(time * 0.012) * h * 0.3;
      const r1 = Math.min(w, h) * 0.45;

      const gradient1 = ctx.createRadialGradient(x1, y1, 0, x1, y1, r1);
      gradient1.addColorStop(0, 'rgba(76, 29, 149, 0.15)');
      gradient1.addColorStop(1, 'rgba(76, 29, 149, 0)');

      ctx.fillStyle = gradient1;
      ctx.fillRect(0, 0, w, h);

      // Blob B - muted coral
      const x2 = w * 0.5 + Math.cos(time * 0.01 + Math.PI) * w * 0.35;
      const y2 = h * 0.5 + Math.sin(time * 0.008 + Math.PI * 0.5) * h * 0.35;
      const r2 = Math.min(w, h) * 0.4;

      const gradient2 = ctx.createRadialGradient(x2, y2, 0, x2, y2, r2);
      gradient2.addColorStop(0, 'rgba(244, 63, 94, 0.08)');
      gradient2.addColorStop(1, 'rgba(244, 63, 94, 0)');

      ctx.fillStyle = gradient2;
      ctx.fillRect(0, 0, w, h);

      time += 1;
      animationId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
