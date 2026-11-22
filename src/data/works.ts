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
  mk({ slug: 'mconnect-circulo', title: 'MConnect — Pantalla de lanzamiento', type: 'Lanzamientos de apps', client: 'Proyecto propio', role: 'Dirección de motion y código', tools: ['Canvas 2D', 'Faux-3D con capas', 'Profundidad de campo'], description: 'La app como objeto, a gran escala: un teléfono que ocupa casi todo el encuadre gira en 3D, se enciende, compone su interfaz por capas (cabecera, mapa con presencias, chat) y las separa en vista explotada con profundidad de campo antes de plegarse en el ícono de MConnect. Aproximación de marca; concepto visual, no es una pantalla de producción.', ratio: '16:9', color: '#151326' }),
  mk({ slug: 'havren-horario', title: 'Havren — Intro de app', type: 'Lanzamientos de apps', client: 'Proyecto propio', role: 'Dirección de motion y código', tools: ['Canvas 2D', 'Grid generativo', 'JavaScript'], description: 'Una cuadrícula de bloques de horario, ahora con volumen y sombra, aparece en ola diagonal con la cámara en leve push; al ordenarse deja la H de Havren con un golpe de luz y un bloque dorado que marca el «ahora». Colegio de ejemplo ficticio: Monteclaro.', ratio: '16:9', color: '#0c2420' }),
  // — Motion web —
  mk({ slug: 'scroll-apertura', title: 'Abrir — Hero editorial guiado por scroll', type: 'Motion web', client: 'Concepto', role: 'Diseño y código', tools: ['CSS scroll-timeline', 'clip-path', 'Tipografía autoalojada'], description: 'Hero oscuro y editorial donde el scroll lo gobierna todo: la palabra «Abrir» sube enmascarada letra a letra, se descompone y un iris de luz cálida revela «adentro». Solo CSS animation-timeline, serif autoalojada y grano. En la demo, un piloto automático recorre el scroll hasta que lo tocas.', ratio: '16:9', color: '#ff4b2b' }),
  mk({ slug: 'cuerda-resorte', title: 'Tirador — Interruptor de tema con cuerda', type: 'Motion web', client: 'Concepto', role: 'Diseño de interacción y código', tools: ['Canvas 2D', 'Verlet', 'Pointer Events'], description: 'Componente para incrustar: un interruptor de día/noche que se acciona tirando de una cuerda con física de verlet. Tiene estados (reposo, hover, tensión hasta el umbral, activado), sombra proyectada y paralaje por capas, y el tema cambia con un iris que nace en la cuenta. Funciona con ratón y táctil; sin interacción, un piloto automático lo acciona.', ratio: '16:9', color: '#efe9dd' }),
  mk({ slug: 'loader-morph', title: 'Morph — Loader editorial', type: 'Motion web', client: 'Concepto', role: 'Diseño y código', tools: ['SVG path morph', 'clip-path anidado', 'Easing a medida'], description: 'Una silueta que muta —círculo, cuadrado redondeado, triángulo, flor— se llena como un líquido con pausas de carga real, y la cifra serif gigante invierte su color dentro del líquido. Al 100 % golpea (shake + anillo) y se vacía para reiniciar.', ratio: '16:9', color: '#ff4b2b' }),
  // — Anuncios —
  mk({ slug: 'spot-gustello-169', hoverFit: 'contain', title: 'Gustello — Del pedido a la mesa', type: 'Anuncios', client: 'Proyecto propio', role: 'Dirección, motion y código', tools: ['Canvas 2D', 'Tipografía cinética', 'Cortes a pulso'], description: 'Spot de 12 s en 16:9, editorial y a pulso (100 BPM): tres palabras serif —Pedido, Cocina, Mesa— con cortes secos, destello y micro-shake, y cierre con el logotipo oficial y su lema «Tu mesa, a tu ritmo».', ratio: '16:9', color: '#e05a00' }),
  mk({ slug: 'spot-mconnect-916', hoverFit: 'contain', title: 'MConnect — Tu círculo cercano', type: 'Anuncios', client: 'Proyecto propio', role: 'Dirección, motion y código', tools: ['Canvas 2D', 'Bokeh', 'Física de resorte'], description: 'Spot vertical de 10 s: «Lejos.» se vuelve «Cerca.» cuando seis luces desenfocadas viajan, se enfocan y forman el círculo; latido, la M y «Tu círculo cercano.». Concepto visual.', ratio: '9:16', color: '#151326' }),
  mk({ slug: 'spot-alyron-11', title: 'Alyron — Del caos, sistema', type: 'Anuncios', client: 'Proyecto propio', role: 'Dirección, motion y código', tools: ['Canvas 2D', 'Grid generativo', 'Ruido'], description: 'Spot cuadrado de 8 s: 225 puntos a la deriva se ordenan en una retícula con una onda de brillo y solo el triángulo queda encendido antes del logotipo.', ratio: '1:1', color: '#0a1424' }),
  // — Extras —
  mk({ slug: 'logo-orbe-tinta', title: 'Orbe — Logo reveal de maison', type: 'Extras', client: 'Concepto', role: 'Diseño de marca y motion', tools: ['SVG filters', 'feTurbulence', 'feSpecularLighting', 'Tipografía autoalojada'], description: 'Identidad de lujo ficticia en loop: monograma de anillo con contraste de plumilla y logotipo ORBE en serif con tracking de maison, en tinta que sangra sobre papel de fibra con luz rasante. La tinta se condensa con brillo húmedo que se seca; un sello carmesí cae, late y, al final, la tinta se disuelve y el sello sale de cuadro para renacer.', ratio: '16:9', color: '#f1ede4' }),
  mk({ slug: 'social-rumbo', title: 'Rumbo — Bumper para redes', type: 'Extras', client: 'Concepto', role: 'Diseño y código', tools: ['Canvas 2D', 'Squash & stretch', 'Onda de choque'], description: 'Bumper 1:1 de marca ficticia: una pelota con estela rebota sobre las letras de «rumbo» y cada impacto aplasta la letra (≈44 % de squash), lanza una onda de choque por la palabra, destello y micro-shake a 120 BPM; ida y vuelta con remate, loop sin corte.', ratio: '1:1', color: '#f4efe6' }),
  mk({ slug: 'gustello-plato', title: 'Gustello — Emplatado', type: 'Extras', client: 'Proyecto propio', role: 'Diseño y código', tools: ['Canvas 2D', 'Iluminación y materiales', 'Grano'], description: 'Pieza 1:1 sobria: un plato de porcelana con una salsa trazada, una pieza sellada y dos puntos de hierba, bajo luz principal cálida con luz de contorno. Una cloche metálica baja con impacto, un reflejo especular la barre, sube un hilo de vapor y cierra el logotipo oficial de Gustello.', ratio: '1:1', color: '#e05a00' }),
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
