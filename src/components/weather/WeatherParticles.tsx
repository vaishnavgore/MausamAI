import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, Eye, EyeOff } from 'lucide-react';

interface WeatherParticlesProps {
  condition: string;
  rainProbability: number;
  isStorm?: boolean;
}

export const WeatherParticles: React.FC<WeatherParticlesProps> = ({
  condition,
  rainProbability,
  isStorm = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [enabled, setEnabled] = useState(true);
  const [lightningFlash, setLightningFlash] = useState(false);

  const isRaining = rainProbability > 40 || condition.toLowerCase().includes('rain') || condition.toLowerCase().includes('downpour');
  const isHeavy = rainProbability > 75 || isStorm || condition.toLowerCase().includes('thunderstorm') || condition.toLowerCase().includes('heavy');

  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle pool
    const dropCount = isHeavy ? 90 : isRaining ? 45 : 12;
    const drops: Array<{
      x: number;
      y: number;
      length: number;
      speed: number;
      opacity: number;
    }> = [];

    for (let i = 0; i < dropCount; i++) {
      drops.push({
        x: Math.random() * width,
        y: Math.random() * height,
        length: isHeavy ? Math.random() * 18 + 12 : Math.random() * 10 + 6,
        speed: isHeavy ? Math.random() * 8 + 10 : Math.random() * 4 + 5,
        opacity: Math.random() * 0.4 + 0.2,
      });
    }

    // Clouds drifting
    const clouds: Array<{ x: number; y: number; radius: number; speed: number; alpha: number }> = [
      { x: 30, y: 25, radius: 45, speed: 0.25, alpha: 0.08 },
      { x: 120, y: 35, radius: 60, speed: 0.18, alpha: 0.06 },
      { x: 260, y: 20, radius: 50, speed: 0.22, alpha: 0.07 },
    ];

    let lightningTimer = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render drifting cloud puffs
      clouds.forEach((cloud) => {
        cloud.x += cloud.speed;
        if (cloud.x - cloud.radius > width) {
          cloud.x = -cloud.radius;
        }
        const grad = ctx.createRadialGradient(cloud.x, cloud.y, 0, cloud.x, cloud.y, cloud.radius);
        grad.addColorStop(0, `rgba(59, 130, 246, ${cloud.alpha})`);
        grad.addColorStop(1, 'rgba(59, 130, 246, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cloud.x, cloud.y, cloud.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Render raindrops
      if (isRaining) {
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = isHeavy ? 1.5 : 1.0;
        ctx.lineCap = 'round';

        drops.forEach((drop) => {
          ctx.beginPath();
          ctx.globalAlpha = drop.opacity;
          ctx.moveTo(drop.x, drop.y);
          ctx.lineTo(drop.x - 1.5, drop.y + drop.length);
          ctx.stroke();

          drop.y += drop.speed;
          drop.x -= 0.8; // wind slant

          if (drop.y > height) {
            drop.y = -10;
            drop.x = Math.random() * (width + 50);
          }
        });
        ctx.globalAlpha = 1.0;
      }

      // Random lightning flash if storm condition is active
      if (isHeavy || isStorm) {
        lightningTimer++;
        if (lightningTimer > 280 && Math.random() > 0.985) {
          setLightningFlash(true);
          setTimeout(() => setLightningFlash(false), 90);
          lightningTimer = 0;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [enabled, isRaining, isHeavy, isStorm]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
      {/* Lightning Flash Overlay */}
      {lightningFlash && (
        <div className="absolute inset-0 bg-blue-400/20 backdrop-brightness-125 z-10 transition-opacity duration-75"></div>
      )}

      {/* Canvas */}
      {enabled && (
        <canvas
          ref={canvasRef}
          className="w-full h-full opacity-70"
        />
      )}

      {/* Small subtle particle toggle button on top-right */}
      <button
        onClick={() => setEnabled(!enabled)}
        className="pointer-events-auto absolute bottom-2 right-2 p-1 rounded-md bg-white/70 hover:bg-white text-slate-500 hover:text-slate-800 border border-slate-200 text-[10px] font-medium flex items-center gap-1 shadow-xs transition"
        title="Toggle atmospheric weather particle animation"
      >
        <Sparkles className="w-3 h-3 text-blue-600" />
        <span className="hidden sm:inline">{enabled ? 'Live FX On' : 'FX Paused'}</span>
      </button>
    </div>
  );
};
