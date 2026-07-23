// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build
export default defineConfig({ 
  site: 'https://github.io',
  i18n: {
    defaultLocale: 'es', // Idioma base en la raíz de la web
    locales: ['es', 'en'], // Los dos idiomas soportados
    routing: {
      prefixDefaultLocale: false, // El español no llevará prefijo /es/
      redirectToDefaultLocale: false // 🟢 CAMBIADO A FALSE: Evita bucles infinitos en el servidor
    }
  }
});
