// 1. Importamos las herramientas nativas de Astro para gestionar el Content Layer y la validación
import { defineCollection, z } from 'astro:content';
// 2. Importamos el cargador oficial 'glob' para escanear y leer archivos físicos en el sistema
import { glob } from 'astro/loaders';

/**
 * CONFIGURACIÓN DE LA COLECCIÓN DE PROYECTOS (BILINGÜE)
 * Definimos las reglas estrictas de validación para los datos de nuestro portafolio.
 */
const proyectosCollection = defineCollection({
  // El 'loader' le indica a Astro con precisión milimétrica dónde y qué archivos buscar.
  // El patrón '**/*.json' busca de forma recursiva cualquier archivo JSON dentro de las subcarpetas /es y /en
  loader: glob({ 
    pattern: '**/*.json', 
    base: "./src/content/proyectos" 
  }),
  
  // El 'schema' de Zod actúa como un contrato estricto de tipado para evitar datos corruptos
  schema: z.object({
    id: z.string(),          // El identificador único debe ser un texto obligatorio
    titulo: z.string(),      // El nombre del proyecto debe ser un texto puro
    descripcion: z.string(), // La descripción técnica debe ser texto largo
    fase: z.number(),        // La fase del plan de aprendizaje debe ser un número entero
    
    // El validador enum restringe las opciones del estado. Solo se permiten estos 3 valores exactos:
    estado: z.enum(['Completado', 'En Progreso', 'Próximamente']),
    
    icono: z.string(),       // El emoji o icono visual debe declararse como texto
    tecnologias: z.array(z.string()), // El stack tecnológico debe ser una lista/arreglo de textos
    url: z.string()          // La ruta de redirección del proyecto debe ser un enlace de texto
  })
});

/**
 * EXPORTACIÓN GLOBAL DE LAS COLECCIONES
 * Astro exige exportar un objeto llamado exactamente 'collections' en minúsculas.
 * Al asignarle la clave 'proyectos', el framework sincroniza las rutas automáticas.
 */
export const collections = {
  proyectos: proyectosCollection,
};
