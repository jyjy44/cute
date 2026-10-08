import React, { useEffect, useRef } from 'react';

interface StarParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  vRot: number;
  alpha: number;
  life: number;
  maxLife: number;
  color: string;
  points: number;
  sparkleType: 'star' | 'fourPoint' | 'sparkle';
}

const STAR_COLORS = [
  '#fbbf24', // Amber
  '#f59e0b', // Warm Amber
  '#f472b6', // Pink
  '#ec4899', // Rose Pink
  '#c084fc', // Purple
  '#38bdf8', // Sky Blue
  '#34d399', // Emerald
  '#ffffff', // Pure White Glow
];

export function triggerStarBurst(x?: number, y?: number, count = 18) {
  const eventX = x ?? window.innerWidth / 2;
  const eventY = y ?? window.innerHeight / 2;
  window.dispatchEvent(
    new CustomEvent('star-burst', {
      detail: { x: eventX, y: eventY, count },
    })
  );
}

export const FlyingStarsCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<StarParticle[]>([]);
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const spawnStars = (originX: number, originY: number, count = 6) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 4.5 + 2.0; // Fly outward
        const color = STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)];
        const types: ('star' | 'fourPoint' | 'sparkle')[] = ['star', 'fourPoint', 'sparkle'];
        const sparkleType = types[Math.floor(Math.random() * types.length)];

        particlesRef.current.push({
          x: originX,
          y: originY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - (Math.random() * 2.5 + 1.0), // Floating upwards
          size: Math.random() * 12 + 8,
          rotation: Math.random() * Math.PI * 2,
          vRot: (Math.random() - 0.5) * 0.25,
          alpha: 1,
          life: 0,
          maxLife: Math.random() * 30 + 40, // 40-70 frames (about 0.7s to 1.1s)
          color,
          points: Math.random() > 0.4 ? 5 : 4,
          sparkleType,
        });
      }
    };

    // Global tap/click listener anywhere on the screen
    const handlePointerDown = (e: PointerEvent) => {
      spawnStars(e.clientX, e.clientY, 6);
    };

    // Custom star burst listener (for answers or rewards)
    const handleStarBurst = (e: Event) => {
      const customEvent = e as CustomEvent<{ x: number; y: number; count?: number }>;
      if (customEvent.detail) {
        spawnStars(customEvent.detail.x, customEvent.detail.y, customEvent.detail.count || 18);
      }
    };

    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('star-burst', handleStarBurst);

    // Draw multi-pointed star helper
    const drawStarShape = (
      context: CanvasRenderingContext2D,
      cx: number,
      cy: number,
      spikes: number,
      outerRadius: number,
      innerRadius: number
    ) => {
      let rot = (Math.PI / 2) * 3;
      let x = cx;
      let y = cy;
      const step = Math.PI / spikes;

      context.beginPath();
      context.moveTo(cx, cy - outerRadius);
      for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        context.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        context.lineTo(x, y);
        rot += step;
      }
      context.lineTo(cx, cy - outerRadius);
      context.closePath();
    };

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.08; // Gentle gravity
        p.vx *= 0.98; // Friction
        p.rotation += p.vRot;

        // Fade out
        const progress = p.life / p.maxLife;
        p.alpha = Math.max(0, 1 - progress);

        // Twinkle factor
        const twinkle = Math.sin(p.life * 0.4) * 0.2 + 0.8;
        const currentSize = p.size * (1 - progress * 0.4) * twinkle;

        if (p.alpha <= 0.02 || p.life >= p.maxLife) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        // Outer glow
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;

        ctx.fillStyle = p.color;

        if (p.sparkleType === 'fourPoint') {
          drawStarShape(ctx, 0, 0, 4, currentSize, currentSize * 0.35);
        } else if (p.sparkleType === 'star') {
          drawStarShape(ctx, 0, 0, p.points, currentSize, currentSize * 0.45);
        } else {
          // Sparkle cross with center circle
          ctx.beginPath();
          ctx.arc(0, 0, currentSize * 0.5, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillRect(-currentSize * 0.9, -currentSize * 0.15, currentSize * 1.8, currentSize * 0.3);
          ctx.fillRect(-currentSize * 0.15, -currentSize * 0.9, currentSize * 0.3, currentSize * 1.8);
        }

        ctx.fill();

        // Little white core highlight
        ctx.shadowBlur = 4;
        ctx.shadowColor = '#ffffff';
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(0, 0, currentSize * 0.22, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('star-burst', handleStarBurst);
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999] w-full h-full"
    />
  );
};
