import { useEffect, useRef, useState } from 'react';

// Constante técnica fuera del componente para evitar errores de compilación
const TOTAL_FRAMES = 120;

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isReady, setIsReady] = useState(false);

  // 1. CARGA TÉCNICA DE IMÁGENES (Carpeta frame2)
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameIndex = i.toString().padStart(3, '0');
      // Ruta verificada según estructura de archivos
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

  // 2. RENDERIZADO DE PRECISIÓN
  useEffect(() => {
    if (!isReady || images.length < TOTAL_FRAMES || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d', { alpha: false });
    if (!context) return;

    const renderFrame = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      
      const scrollFraction = Math.max(0, Math.min(1, scrollTop / maxScroll));
      const frameIndex = Math.floor(scrollFraction * (TOTAL_FRAMES - 1));

      const img = images[frameIndex];
      if (img && img.complete) {
        const { width: cw, height: ch } = canvas;
        const ratio = Math.max(cw / img.width, ch / img.height);
        const dw = img.width * ratio;
        const dh = img.height * ratio;
        const dx = (cw - dw) / 2;
        const dy = (ch - dh) / 2;

        context.drawImage(img, dx, dy, dw, dh);
      }
    };

    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        renderFrame();
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', renderFrame, { passive: true });
    
    handleResize(); 
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', renderFrame);
    };
  }, [isReady, images]);

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