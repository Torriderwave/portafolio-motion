// Reemplaza estos ejemplos por tu trabajo real.
// - Video propio: pon el archivo en public/media/ y usa  video: 'archivo.mp4'
// - Vimeo / YouTube: usa  embed: 'https://player.vimeo.com/video/ID'  o  'https://www.youtube.com/embed/ID'
// - Miniatura: public/media/<archivo>  →  thumb: 'archivo.jpg'
export type Work = {
  slug: string;
  title: string;
  type: 'Motion' | 'Branding' | 'UI / Web' | 'Ilustración';
  year: number;
  client?: string;
  role: string;
  tools: string[];
  description: string;
  thumb?: string;
  video?: string;   // archivo en public/media/ (también se usa como vista previa al pasar el mouse)
  embed?: string;
  color: string; // color de respaldo si no hay miniatura
};

export const works: Work[] = [
  { slug: 'ejemplo-1', title: 'Título del proyecto 1', type: 'Motion', year: 2026, role: 'Animación y dirección', tools: ['After Effects', 'Blender'], description: 'Describe aquí el concepto, el reto y el resultado.', color: '#e5252a' },
  { slug: 'ejemplo-2', title: 'Título del proyecto 2', type: 'Branding', year: 2026, role: 'Identidad visual', tools: ['Illustrator', 'Figma'], description: 'Logo, paleta, tipografía y aplicaciones.', color: '#1d3fff' },
  { slug: 'ejemplo-3', title: 'Título del proyecto 3', type: 'Motion', year: 2025, role: 'Motion design', tools: ['After Effects'], description: 'Pieza animada para redes o producto.', color: '#121212' },
  { slug: 'ejemplo-4', title: 'Título del proyecto 4', type: 'UI / Web', year: 2025, role: 'Diseño de interfaz', tools: ['Figma'], description: 'Diseño de pantallas y sistema de componentes.', color: '#0c8f5c' },
  { slug: 'ejemplo-5', title: 'Título del proyecto 5', type: 'Ilustración', year: 2025, role: 'Ilustración', tools: ['Procreate', 'Photoshop'], description: 'Serie de ilustraciones.', color: '#e9a400' },
  { slug: 'ejemplo-6', title: 'Título del proyecto 6', type: 'Motion', year: 2024, role: 'Animación 2D', tools: ['After Effects', 'Premiere'], description: 'Explainer o intro animada.', color: '#8a2be2' },
];

export const services = [
  { name: 'Motion graphics', text: 'Animación 2D/3D, explainers, intros y piezas para redes.', tools: 'After Effects · Blender' },
  { name: 'Identidad visual', text: 'Logo, paleta, tipografía y sistema de marca.', tools: 'Illustrator · Figma' },
  { name: 'UI / Web', text: 'Interfaces y sistemas de componentes listos para desarrollo.', tools: 'Figma' },
  { name: 'Ilustración', text: 'Series, personajes y piezas editoriales.', tools: 'Procreate · Photoshop' },
];

export const profile = {
  name: 'Pablo',
  tagline: 'Motion graphics & diseño',
  availability: 'Disponible para proyectos y colaboraciones',
  location: '', // tu ciudad o país (opcional)
  bio: 'Animo y diseño identidades, interfaces y piezas en movimiento para marcas y productos digitales.',
  github: 'https://github.com/Torriderwave',
  dev: 'https://torriderwave.github.io/portafolio-dev/',
  email: '',        // tu correo público (opcional)
  showreel: { embed: '', video: '' }, // pega tu showreel aquí
};
