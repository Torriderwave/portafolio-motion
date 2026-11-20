# Portafolio de Motion Graphics & Diseño

Sitio estático con Astro + Tailwind, desplegado en GitHub Pages.

## Agregar tu trabajo
Edita `src/data/works.ts`:
- Video propio → copia el archivo a `public/media/` y pon `video: 'archivo.mp4'`
- Vimeo/YouTube → `embed: 'https://player.vimeo.com/video/ID'`
- Miniatura → `public/media/foto.jpg` y `thumb: 'foto.jpg'`
- Showreel y correo → objeto `profile` del mismo archivo

## Comandos
```bash
npm install
npm run dev      # http://localhost:4321/portafolio-motion
npm run build
```

Se publica solo al hacer push a `main` (Settings → Pages → Source: GitHub Actions).
