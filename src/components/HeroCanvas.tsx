import { useEffect, useRef, useState } from 'react';
import { MotionValue, useMotionValueEvent } from 'framer-motion';

const TOTAL_FRAMES = 120;

interface HeroCanvasProps {
  progress: MotionValue<number>;
}

export default function HeroCanvas({ progress }: HeroCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameIndex = i.toString().padStart(3, '0');
      img.src = `/frame2/ezgif-frame-${frameIndex}.jpg`;
      
      img.onload = () => {
        loadedCount++;
        if (loadedCount === TOTAL_FRAMES) {
          setImages([...loadedImages]);
          setIsReady(true);
        }
      };
      loadedImages[i - 1] = img;
    }
  }, []);

  const drawFrame = (latestProgress: number) => {
    if (!canvasRef.current || images.length < TOTAL_FRAMES) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d', { alpha: false });
    if (!context) return;

    const frameIndex = Math.floor(latestProgress * (TOTAL_FRAMES - 1));
    const img = images[frameIndex];

    if (img && img.complete) {
      const cw = canvas.width;
      const ch = canvas.height;
      const ratio = Math.max(cw / img.width, ch / img.height);
      const dw = img.width * ratio;
      const dh = img.height * ratio;
      const dx = (cw - dw) / 2;
      const dy = (ch - dh) / 2;

      context.drawImage(img, dx, dy, dw, dh);
    }
  };

  useMotionValueEvent(progress, "change", (latest) => {
    drawFrame(latest);
  });

  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current) return;
      const dpr = window.devicePixelRatio || 1;
      canvasRef.current.width = window.innerWidth * dpr;
      canvasRef.current.height = window.innerHeight * dpr;
      drawFrame(progress.get());
    };

    window.addEventListener('resize', handleResize);
    handleResize(); 
    
    return () => window.removeEventListener('resize', handleResize);
  }, [isReady, images, progress]);

  return (
    <div className="fixed inset-0 -z-10 bg-slate-950">
      <canvas
        ref={canvasRef}
        className={`w-full h-full transition-opacity duration-1000 ${isReady ? 'opacity-100' : 'opacity-0'}`}
        style={{ 
          // HÁGASE LA LUZ: Brillo al 100% para máxima visibilidad de la casa
          filter: 'brightness(0.9) contrast(1.05)',
          pointerEvents: 'none'
        }}
      />
      
      {/* CORTAFUEGOS INFERIOR: Solo tapa la base (logo y luces) sin oscurecer la casa */}
      <div className="absolute inset-x-0 bottom-0 h-[25vh] bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent opacity-100" />
      
      {/* VELO SUPERIOR SUTIL: Para que el menú respire */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-slate-950/60 to-transparent" />
    </div>
  );
}