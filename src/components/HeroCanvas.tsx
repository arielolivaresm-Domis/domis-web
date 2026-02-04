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

  // 1. CARGA TÉCNICA (Carpeta frame2)
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

  // 2. RENDERIZADO CON ZOOM ANTILOGO Y RESPONSIVIDAD
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
      
      // AJUSTE TÉCNICO: Zoom del 5% para ocultar el logo 'Veo' 
      // Esto NO baja la calidad, solo expande el renderizado en el navegador.
      const SAFE_ZOOM = 1.05; 
      
      const ratio = Math.max(cw / img.width, ch / img.height) * SAFE_ZOOM;
      const dw = img.width * ratio;
      const dh = img.height * ratio;
      
      // Centrado perfecto para que el recorte sea uniforme
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
      // Usamos el ancho real de la ventana para evitar el "marco estrecho"
      canvasRef.current.width = window.innerWidth * (window.devicePixelRatio || 1);
      canvasRef.current.height = window.innerHeight * (window.devicePixelRatio || 1);
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
        filter: 'brightness(0.35) contrast(1.1)', // Ajuste de contraste para resaltar el texto
        pointerEvents: 'none'
      }}
    />
  );
}