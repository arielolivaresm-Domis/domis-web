import os
from PIL import Image

# Configuración de archivos
input_path = "original_domis.jpg" 
output_path = "DOMIS_Final_Optimized.webp"

def procesar_imagen_domis(entrada, salida):
    if not os.path.exists(entrada):
        print(f"Error: No encuentro el archivo {entrada} en esta carpeta.")
        return

    with Image.open(entrada) as img:
        # Redimensionar a 2000px de ancho para nitidez web
        width_ratio = 2000 / float(img.size[0])
        new_height = int(float(img.size[1]) * float(width_ratio))
        img = img.resize((2000, new_height), Image.Resampling.LANCZOS)
        
        # Ajuste dinámico de calidad para llegar a ~500KB
        calidad = 85
        img.save(salida, "WEBP", quality=calidad, method=6)
        
        # Verificación y ajuste fino de peso
        while os.path.getsize(salida) < 480000 and calidad < 99:
            calidad += 1
            img.save(salida, "WEBP", quality=calidad, method=6)
            
        print(f"--- PROCESO COMPLETADO ---")
        print(f"Imagen guardada como: {salida}")
        print(f"Peso final: {os.path.getsize(salida) / 1024:.2f} KB")

procesar_imagen_domis(input_path, output_path)