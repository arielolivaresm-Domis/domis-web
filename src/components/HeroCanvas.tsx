import { useEffect, useRef, useState } from 'react';

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  // Definimos los 120 cuadros que ya tienes en public/frame2/
  const frameCount = 120; 

  // 1. CARGA TÉCNICA DE IMÁGENES
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      // Ajuste al nombre exacto de tus archivos: ezgif-frame-001.jpg
      const frameIndex = i.toString().padStart(3, '0');
      img.src = `/frame2/ezgif-frame-${frameIndex}.jpg`;
      
      img.onload = () => {
        loadedCount++;
        if (loadedCount === frameCount) {
          // Solo actualizamos el estado cuando la secuencia de 120 está completa
          setImages([...loadedImages]);
        }
      };
      // Aseguramos el orden en el array (índice 0 a 119)
      loadedImages[i - 1] = img;
    }
  }, []);

  // 2. RENDERIZADO DE ALTA PRECISIÓN (120 FPS FEEL)
  useEffect(() => {
    if (images.length < frameCount || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d', { alpha: false }); // Optimización de rendimiento
    if (!context) return;

    const renderFrame = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      
      // Cálculo del progreso de scroll (0 a 1)
      const scrollFraction = Math.max(0, Math.min(1, scrollTop / maxScroll));
      // Mapeamos a los 120 frames (0 a 119)
      const frameIndex = Math.floor(scrollFraction * (frameCount - 1));

      const img = images[frameIndex];
      if (img && img.complete) {
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const imgWidth = img.width;
        const imgHeight = img.height;
        
        // Lógica de "Cover" para que la imagen siempre llene el fondo sin deformarse
        const ratio = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
        const drawWidth = imgWidth * ratio;
        const drawHeight = imgHeight * ratio;
        const drawX = (canvasWidth - drawWidth) / 2;
        const drawY = (canvasHeight - drawHeight) / 2;

        context.drawImage(img, drawX, drawY, drawWidth, drawHeight);
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
    
    // Dibujo inicial
    handleResize(); 
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', renderFrame);
    };
  }, [images]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 bg-slate-950"
      style={{ 
        filter: 'brightness(0.4) contrast(1.1)',
        pointerEvents: 'none'
      }}
    />
  );
}