import { useEffect, useRef, useState } from 'react';
import { MotionValue, useMotionValueEvent } from 'framer-motion';

const TOTAL_FRAMES = 120;

// Definimos la "entrada" para la propiedad progress
interface HeroCanvasProps {
  progress: MotionValue<number>;
}

export default function HeroCanvas({ progress }: HeroCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isReady, setIsReady] = useState(false);

  // 1. CARGA TÉCNICA DE IMÁGENES
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

  // 2. RENDERIZADO CONTROLADO POR MOTION VALUE (Sincronía Total)
  const drawFrame = (latestProgress: number) => {
    if (!canvasRef.current || images.length < TOTAL_FRAMES) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d', { alpha: false });
    if (!context) return;

    // Usamos el progreso que viene directamente del scroll de Hero.tsx
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

  // Escuchamos el cambio de scroll de forma ultra-eficiente
  useMotionValueEvent(progress, "change", (latest) => {
    drawFrame(latest);
  });

  // Ajuste inicial y de resize
  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current) return;
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
      drawFrame(progress.get());
    };

    window.addEventListener('resize', handleResize);
    handleResize(); 
    
    return () => window.removeEventListener('resize', handleResize);
  }, [isReady, images, progress]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed top-0 left-0 w-full h-full -z-10 bg-slate-950 transition-opacity duration-1000 ${isReady ? 'opacity-100' : 'opacity-0'}`}
      style={{ 
        filter: 'brightness(0.4) contrast(1.1)',
        pointerEvents: 'none'
      }}
    />
  );
}