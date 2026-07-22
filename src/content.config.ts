//Version: Astro V6
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders'; // Cargador oficial para la versión actual

const proyectosCollection = defineCollection({
  // Le decimos a Astro que busque todos los archivos .json dentro de la carpeta proyectos
  loader: glob({ pattern: '**/[^_]*.json', base: "./src/content/proyectos" }),
  schema: z.object({
    id: z.string(),
    titulo: z.string(),
    descripcion: z.string(),
    fase: z.number(),
    estado: z.enum(['Completado', 'En Progreso', 'Próximamente']),
    icono: z.string(),
    tecnologias: z.array(z.string()),
    url: z.string()
  })
});

// Exportamos la constante con el nombre exacto que exige Astro
export const collections = {
  proyectos: proyectosCollection,
};
