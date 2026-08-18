// 1. Importamos las herramientas nativas de Astro para gestionar el Content Layer y la validación
import { defineCollection, z } from 'astro:content';
// 2. Importamos el cargador oficial 'glob' para escanear y leer archivos físicos en el sistema
import { glob } from 'astro/loaders';

/**
 * CONFIGURACIÓN DE LA COLECCIÓN DE PROYECTOS (BILINGÜE)
 * Definimos las reglas estrictas de validación para los datos de nuestro portafolio.
 */
/**
 * COLECCIÓN 1: : Proyectos Principales (Bento de la Home)
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
 * COLECCIÓN 2: BLOG AUTÓNOMO (MARKDOWN)
 * Configuración nativa para escanear y validar artículos escritos en texto plano (.md)
 */
const blogCollection = defineCollection({
  // El patrón '**/*.md' le ordena a Astro buscar de forma recursiva todos los archivos Markdown
  loader: glob({ pattern: '**/*.md', base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),       // Título del artículo
    pubDate: z.date(),       // Fecha de publicación (Zod validará que sea un formato de fecha real YYYY-MM-DD)
    description: z.string(), // Resumen corto para SEO y tarjetas
    author: z.string(),      // Nombre del escritor
    tags: z.array(z.string()) // Etiquetas o categorías del post
  })
});

// 🟢 Colección 3: Sub-Bento de Simulaciones de Forage (Nueva)
const simulacionesCollection = defineCollection({
  loader: glob({ pattern: '**/*.json', base: "./src/content/simulaciones" }),
  schema: z.object({
    id: z.string(),
    titulo: z.string(),
    empresa: z.string(),
    descripcion: z.string(),
    estado: z.enum(['Completado', 'En Progreso']),
    icono: z.string(),
    tecnologias: z.array(z.string()),
    url: z.string() // Aquí irá tu repo: ://github.com...
  })
});
/**
 * EXPORTACIÓN GLOBAL DE LAS COLECCIONES
 * Astro exige exportar un objeto llamado exactamente 'collections' en minúsculas.
 * Al asignarle la clave 'proyectos', el framework sincroniza las rutas automáticas.
 */
export const collections = {
  proyectos: proyectosCollection, // Registro de la colección de proyectos
  blog: blogCollection, // 🟢 Registramos la nueva colección del blog
  simulaciones: simulacionesCollection, // Registrada con éxito
};
