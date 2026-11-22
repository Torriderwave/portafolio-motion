// Catálogo de motion hecho en código (HTML/CSS/JS, canvas 2D, SVG). Cada pieza tiene:
//  - demo viva autocontenida:  public/demos/<slug>/index.html  →  demo: '<slug>/index.html'
//  - vista previa grabada:     public/media/<slug>.mp4  (video)  y  public/media/<slug>.jpg  (thumb)
// Marcas: productos propios (Alyron, Gustello, Havren, MConnect) o marcas ficticias. Nada de clientes reales.
export type WorkType = 'Lanzamientos de apps' | 'Motion web' | 'Anuncios' | 'Extras';
export type Ratio = '16:9' | '9:16' | '1:1' | '4:3';
export type Work = {
  slug: string;
  title: string;
  type: WorkType;
  year: number;
  client?: string; // «Proyecto propio» o «Concepto»; nunca un cliente inventado
  role: string;
  tools: string[];
  description: string;
  thumb?: string;
  video?: string;   // archivo en public/media/ (vista previa al pasar el mouse y respaldo de la demo)
  embed?: string;
  demo?: string;    // ruta relativa a public/demos/ (se monta en un iframe solo al abrir la ficha)
  hoverFit?: 'contain'; // vista previa al hover sin recorte (spots 16:9 y 9:16); por defecto cover
  ratio?: Ratio;    // proporción nativa de la pieza (por defecto 16:9)
  color: string; // color de respaldo si no hay miniatura
};

const mk = (w: Omit<Work, 'thumb' | 'video' | 'demo' | 'year'>): Work => ({ ...w, year: 2026, thumb: `${w.slug}.jpg`, video: `${w.slug}.mp4`, demo: `${w.slug}/index.html` });

export const works: Work[] = [
  // — Lanzamientos de apps —
  mk({ slug: 'alyron-reveal', title: 'Alyron — Reveal de lanzamiento', type: 'Lanzamientos de apps', client: 'Proyecto propio', role: 'Dirección de motion y código', tools: ['SVG', 'JavaScript', 'Línea de tiempo propia'], description: 'El isotipo se construye como un sistema: primero la red de nodos y aristas se dibuja con resorte, después el triángulo sube desde la base y la barra diagonal entra con un barrido y un destello dorado. El isotipo y el logotipo oficiales entran con un barrido que apaga la construcción animada.', ratio: '16:9', color: '#0a1424' }),
  mk({ slug: 'mconnect-circulo', title: 'MConnect — Pantalla de lanzamiento', type: 'Lanzamientos de apps', client: 'Proyecto propio', role: 'Dirección de motion y código', tools: ['SVG', 'JavaScript', 'Física de resorte'], description: 'Un nodo nace, pulsa con doble halo y de él salen los dos arcos de la M. Tres presencias entran en órbita, se asientan con rebote y un círculo se cierra a su alrededor. Concepto visual, no es una pantalla de producción.', ratio: '16:9', color: '#151326' }),
  mk({ slug: 'havren-horario', title: 'Havren — Intro de app', type: 'Lanzamientos de apps', client: 'Proyecto propio', role: 'Dirección de motion y código', tools: ['Canvas 2D', 'Grid generativo', 'JavaScript'], description: 'Una cuadrícula de bloques de horario aparece en ola diagonal, se ordena desde el centro hacia afuera y deja encendida la H de Havren; un bloque dorado marca el «ahora». Colegio de ejemplo ficticio: Monteclaro.', ratio: '16:9', color: '#0c2420' }),
  // — Motion web —
  mk({ slug: 'scroll-apertura', title: 'Apertura — Hero guiado por scroll', type: 'Motion web', client: 'Concepto', role: 'Diseño y código', tools: ['CSS scroll-timeline', 'clip-path', 'offset-path'], description: 'Hero de página donde el scroll controla todo: anillos que se expanden, una palabra que se descompone y un iris circular que revela la siguiente escena. Sin JavaScript de animación: solo animation-timeline. En la demo, un piloto automático recorre el scroll hasta que lo tocas.', ratio: '16:9', color: '#ff4b2b' }),
  mk({ slug: 'cuerda-resorte', title: 'Tirador — Interruptor de tema con cuerda', type: 'Motion web', client: 'Concepto', role: 'Diseño de interacción y código', tools: ['Canvas 2D', 'Verlet', 'Pointer Events'], description: 'Componente para incrustar: un interruptor de día/noche que se acciona tirando de una cuerda con física de verlet. Tiene estados (reposo, hover, tensión hasta el umbral, activado), sombra proyectada y paralaje por capas, y el tema cambia con un iris que nace en la cuenta. Funciona con ratón y táctil; sin interacción, un piloto automático lo acciona.', ratio: '16:9', color: '#efe9dd' }),
  mk({ slug: 'loader-morph', title: 'Morph — Loader que se llena', type: 'Motion web', client: 'Concepto', role: 'Diseño y código', tools: ['SVG path morph', 'JavaScript', 'Easing a medida'], description: 'Un indicador de carga que cambia de silueta —círculo, cuadrado redondeado, triángulo, flor— mientras un líquido sube con pausas como las de una carga real, y termina en un círculo completo.', ratio: '16:9', color: '#ff4b2b' }),
  // — Anuncios —
  mk({ slug: 'spot-gustello-169', hoverFit: 'contain', title: 'Gustello — Del pedido a la mesa', type: 'Anuncios', client: 'Proyecto propio', role: 'Dirección, motion y código', tools: ['Canvas 2D', 'Tipografía cinética', 'Máscaras'], description: 'Spot de 12 s en 16:9 con tres golpes tipográficos —Pedido, Cocina, Mesa— y tres transiciones distintas (barrido oblicuo, iris, persianas) hasta el cierre con el logotipo oficial (con su lema «Tu mesa, a tu ritmo»).', ratio: '16:9', color: '#e05a00' }),
  mk({ slug: 'spot-mconnect-916', hoverFit: 'contain', title: 'MConnect — Tu círculo cercano', type: 'Anuncios', client: 'Proyecto propio', role: 'Dirección, motion y código', tools: ['Canvas 2D', 'Partículas', 'Física de resorte'], description: 'Spot vertical de 10 s: «Lejos.» se vuelve «Cerca.» cuando seis presencias, con estela, viajan a formar un círculo; los pulsos recorren sus aristas y aparece la M. Concepto visual.', ratio: '9:16', color: '#151326' }),
  mk({ slug: 'spot-alyron-11', title: 'Alyron — Del caos, sistema', type: 'Anuncios', client: 'Proyecto propio', role: 'Dirección, motion y código', tools: ['Canvas 2D', 'Grid generativo', 'Ruido'], description: 'Spot cuadrado de 8 s: 225 puntos a la deriva se ordenan en una retícula con una onda de brillo y solo el triángulo queda encendido antes del logotipo.', ratio: '1:1', color: '#0a1424' }),
  // — Extras —
  mk({ slug: 'logo-orbe-tinta', title: 'Orbe — Logo reveal en tinta', type: 'Extras', client: 'Concepto', role: 'Diseño de marca y motion', tools: ['SVG filters', 'feTurbulence', 'JavaScript'], description: 'Logo reveal en loop de una marca ficticia: la tinta sangra desde el ruido y se condensa; el ojo mira alrededor, un destello recorre el anillo y una gota de color cae y late; después la tinta se disuelve, la gota cae fuera de cuadro y el ciclo renace.', ratio: '16:9', color: '#f1ede4' }),
  mk({ slug: 'social-rumbo', title: 'Rumbo — Bumper cilíndrico para redes', type: 'Extras', client: 'Concepto', role: 'Diseño y código', tools: ['CSS 3D', 'JavaScript', 'Loop sin corte'], description: 'Bumper de marca ficticia para redes en 1:1: un cilindro de palabras gira en pasos secos de 45° con rebote, sobre un segundo anillo que contra-gira. Loop sin corte.', ratio: '1:1', color: '#f4efe6' }),
  mk({ slug: 'gustello-plato', title: 'Gustello — Llenar el plato', type: 'Extras', client: 'Proyecto propio', role: 'Diseño y código', tools: ['Canvas 2D', 'Física de colisiones', 'Generativo'], description: 'Pieza cuadrada para redes: fichas con glifos caen en un plato con física de colisiones determinista y una cloche las cubre con rebote y vapor.', ratio: '1:1', color: '#e05a00' }),
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
