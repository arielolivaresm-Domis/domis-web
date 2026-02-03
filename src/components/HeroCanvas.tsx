"use client";
import { useEffect, useRef, useState } from "react";
import { MotionValue, useMotionValueEvent } from "framer-motion";

interface HeroCanvasProps {
  progress: MotionValue<number>;
}

export default function HeroCanvas({ progress }: HeroCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Ajustado a 40 para coincidir con tu carpeta "frame"
  const TOTAL_FRAMES = 40; 

  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameIndex = i.toString().padStart(3, "0");
      img.src = `/frame/ezgif-frame-${frameIndex}.jpg`;
      
      img.onload = () => {
        loadedCount++;
        if (loadedCount === TOTAL_FRAMES) {
          setImages(loadedImages);
          setIsLoaded(true);
        }
      };
      loadedImages[i - 1] = img; 
    }
  }, []);

  const renderFrame = (index: number) => {
    const canvas = canvasRef.current;
    const img = images[index];
    if (!canvas || !img) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.scale(dpr, dpr);

    // --- NUEVA LÓGICA DE RECORTE PARA QUITAR MARCA DE AGUA "VEO" ---
    // Definimos qué parte de la imagen original queremos usar.
    const sourceX = 0;
    const sourceY = 0;
    const sourceWidth = img.width;
    // Recortamos el 6% inferior de la imagen original para eliminar el texto.
    // Usamos el 94% superior. Puedes ajustar este 0.94 si necesitas cortar más o menos.
    const sourceHeight = img.height * 0.94;

    // Lógica para llenar la pantalla (Object Cover) usando las nuevas dimensiones recortadas
    const canvasRatio = window.innerWidth / window.innerHeight;
    // Usamos el ratio de la imagen YA RECORTADA
    const imgRatio = sourceWidth / sourceHeight; 

    let drawWidth, drawHeight, offsetX, offsetY;

    if (canvasRatio > imgRatio) {
      drawWidth = window.innerWidth;
      drawHeight = window.innerWidth / imgRatio;
      offsetX = 0;
      offsetY = (window.innerHeight - drawHeight) / 2;
    } else {
      drawWidth = window.innerHeight * imgRatio;
      drawHeight = window.innerHeight;
      offsetX = (window.innerWidth - drawWidth) / 2;
      offsetY = 0;
    }

    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    // Usamos la versión avanzada de drawImage para recortar y escalar al mismo tiempo
    // drawImage(imagen, inicioX_recorte, inicioY_recorte, ancho_recorte, alto_recorte, destinoX, destinoY, ancho_destino, alto_destino)
    ctx.drawImage(
      img,
      sourceX,
      sourceY,
      sourceWidth,
      sourceHeight, // <--- Aquí es donde se aplica el recorte del fondo
      offsetX,
      offsetY,
      drawWidth,
      drawHeight
    );
  };

  useMotionValueEvent(progress, "change", (latest) => {
    if (!isLoaded || images.length === 0) return;
    const frameIndex = Math.min(images.length - 1, Math.floor(latest * images.length));
    requestAnimationFrame(() => renderFrame(frameIndex));
  });

  useEffect(() => {
    if (isLoaded) renderFrame(0);
  }, [isLoaded]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full object-cover z-0 pointer-events-none bg-slate-950"
    />
  );
}