import React, { useState, useEffect, useRef } from 'react';
import { Camera, Code, ArrowUpRight, Mail, Linkedin, Instagram, GraduationCap, ChevronDown, ArrowLeft, Github } from 'lucide-react';

/* ======================================================================================
   STYLES GLOBAUX & ANIMATIONS
   (Tout le CSS nécessaire est ici pour que ça marche direct)
   ====================================================================================== */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap');

    /* Animation d'apparition vers le haut */
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    .animate-fade-in-up {
      animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    
    /* Scrollbar personnalisée */
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: #050A19; }
    ::-webkit-scrollbar-thumb { background: #334155; border-radius: 3px; }

    /* Configuration de base */
    body {
      background-color: #050A19;
      color: #F1F5F9;
      font-family: 'Inter', sans-serif;
      overflow-x: hidden;
      cursor: none; /* On cache le curseur windows pour mettre le nôtre */
    }
  `}</style>
);

/* ======================================================================================
   DONNÉES DES PROJETS
   ====================================================================================== */
const projectsData = [
  { 
    id: 0,
    title: "RestoFlow OS", 
    category: "SaaS B2B", 
    type: "dev", 
    year: "2025",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=1000&auto=format&fit=crop", 
    size: "normal",
    description: "Une interface de gestion de commandes (KDS) pour les cuisines de restaurants. Le défi était de créer une UI dense mais lisible, capable d'afficher des dizaines de commandes en temps réel sans lag.",
    stack: ["Vue.js", "Tailwind CSS", "Supabase", "WebSockets"],
    link: "#",
    features: ["Tableau de bord temps réel", "Drag & Drop (Kanban)", "Système de notifications sonores"]
  },
  { 
    id: 1, 
    title: "Dashboard Analytics", 
    category: "Fullstack App", 
    type: "dev", 
    year: "2025",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop", 
    size: "large",
    description: "Une interface d'administration moderne conçue entièrement avec les utilitaires Tailwind CSS. Ce projet démontre la puissance de Flexbox et Grid pour créer des mises en page réactives complexes sans CSS personnalisé.",
    stack: ["React", "Tailwind CSS", "Vite", "Recharts"],
    link: "#",
    features: ["Mode Sombre/Clair", "Layout Grid Responsive", "Composants UI réutilisables"]
  },
  { 
    id: 2,
    title: "Lumina Gallery", 
    category: "Dev & Design", 
    type: "dev", 
    year: "2024",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop", 
    size: "normal", 
    description: "Une galerie d'art virtuelle développée pour permettre aux artistes numériques d'exposer leurs œuvres dans un environnement 3D interactif. L'accent a été mis sur la performance WebGL et l'accessibilité.",
    stack: ["React", "Three.js", "WebGL", "Tailwind"],
    link: "https://github.com/user/lumina",
    features: ["Navigation 3D fluide", "Backend CMS Strapi", "Mode VR expérimental"]
  },
  { 
    id: 3,
    title: "Neon Souls", 
    category: "Photographie", 
    type: "photo", 
    year: "2023",
    image: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=1000&auto=format&fit=crop", 
    size: "normal",
    description: "Une série nocturne capturant la solitude urbaine à travers les reflets des néons de Tokyo. Travail sur la colorimétrie et les contrastes forts.",
    gallery: [
      "https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1565454695028-19e0b82f144d?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534234828563-0279bc300c59?q=80&w=1000&auto=format&fit=crop"
    ],
    camera: "Sony A7III + 35mm f/1.4"
  },
  { 
    id: 4,
    title: "Type Master", 
    category: "Design UI/UX", 
    type: "design", 
    year: "2023",
    image: "https://images.unsplash.com/photo-1558655146-d09347e0b7a9?q=80&w=1000&auto=format&fit=crop", 
    size: "normal",
    description: "Refonte complète de l'identité visuelle d'une fonderie typographique indépendante. Création d'un système de design modulaire et d'une interface de test de police en temps réel.",
    colors: ["#1a1a1a", "#e2e8f0", "#3b82f6"],
    typo: "Inter / Playfair",
    challenge: "Rendre l'achat de licences de polices intuitif tout en gardant une esthétique avant-gardiste."
  },
  { 
    id: 5,
    title: "Ethereal Web", 
    category: "Développement React", 
    type: "dev", 
    year: "2024",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop", 
    size: "normal",
    description: "Site vitrine expérimental utilisant des transitions de pages fluides et du scrolling asynchrone.",
    stack: ["Next.js", "Framer Motion", "GSAP"],
    link: "#",
    features: ["Transitions FLIP", "Lazy Loading avancé", "SEO Optimisé"]
  },
  { 
    id: 6,
    title: "Urban Silence", 
    category: "Photographie", 
    type: "photo", 
    year: "2022",
    image: "https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?q=80&w=1000&auto=format&fit=crop", 
    size: "large",
    description: "Exploration des espaces brutalistes abandonnés en banlieue parisienne.",
    gallery: [
      "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=1000&auto=format&fit=crop"
    ],
    camera: "Fujifilm X-T4"
  },
];

/* ======================================================================================
   COMPOSANT CURSEUR PERSONNALISÉ
   ====================================================================================== */
const CustomCursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);

  useEffect(() => {
    const moveCursor = (e) => {
      if (cursorRef.current && followerRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        followerRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <>
      <div ref={cursorRef} className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[100] mix-blend-difference -mt-1 -ml-1 hidden md:block" />
      <div ref={followerRef} className="fixed top-0 left-0 w-8 h-8 border border-white/30 rounded-full pointer-events-none z-[99] mix-blend-difference -mt-4 -ml-4 transition-transform duration-100 ease-out hidden md:block" />
    </>
  );
};

/* ======================================================================================
   BARRE DE NAVIGATION
   ====================================================================================== */
const Navbar = ({ onHomeClick, isProjectOpen }) => (
  <nav className="fixed top-0 w-full p-8 flex justify-between items-center z-40 mix-blend-exclusion text-white">
    <div 
      className="text-xl font-serif italic font-bold tracking-wider cursor-pointer hover:opacity-70 transition-opacity"
      onClick={onHomeClick}
    >
      Ibtissem Chtioui.
    </div>
    
    <div className="flex items-center gap-8">
      {!isProjectOpen && (
        <div className="hidden md:flex gap-8 text-sm font-light tracking-widest uppercase">
          <a href="#work" className="hover:text-slate-400 transition-colors">Projets</a>
          <a href="#about" className="hover:text-slate-400 transition-colors">A Propos</a>
          <a href="#contact" className="hover:text-slate-400 transition-colors">Contact</a>
        </div>
      )}
      
      {isProjectOpen && (
         <button onClick={onHomeClick} className="flex items-center gap-2 text-sm uppercase tracking-widest hover:text-slate-400 transition-colors">
           <ArrowLeft className="w-4 h-4" /> Retour
         </button>
      )}

      <a 
        href="mailto:mon.email@etudiant.mmi.fr"
        className="flex items-center gap-2 px-5 py-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/40 transition-all text-sm uppercase tracking-wider group backdrop-blur-sm"
      >
        <Mail className="w-4 h-4 text-blue-300 group-hover:text-white transition-colors" />
        <span className="hidden md:inline">Me contacter</span>
      </a>
    </div>
  </nav>
);

/* ======================================================================================
   LAYOUTS DES DÉTAILS DE PROJET
   ====================================================================================== */

// --- Layout DESIGN ---
const DesignLayout = ({ project }) => (
  <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto animate-fade-in-up">
    <div className="grid md:grid-cols-2 gap-16 mb-24">
      <div className="space-y-8">
        <span className="text-xs font-light tracking-[0.2em] text-blue-300 uppercase">Case Study Design</span>
        <h1 className="text-6xl md:text-8xl font-serif italic leading-none">{project.title}</h1>
        <div className="h-1 w-24 bg-white/20"></div>
        <p className="text-xl text-slate-300 font-light leading-relaxed">{project.description}</p>
        
        <div className="pt-8">
            <h3 className="text-sm uppercase tracking-widest text-slate-500 mb-4 font-serif">Le Challenge</h3>
            <p className="text-slate-400 font-light">{project.challenge}</p>
        </div>
      </div>
      <div className="relative aspect-[3/4] md:aspect-auto">
         <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
         <div className="absolute -bottom-6 -left-6 bg-[#050A19] border border-white/10 p-6 max-w-xs">
            <h4 className="font-serif text-xl italic mb-2">Outils</h4>
            <div className="flex flex-wrap gap-2 text-xs text-slate-400">
               <span className="border border-white/20 px-2 py-1">Figma</span>
               <span className="border border-white/20 px-2 py-1">Illustrator</span>
               <span className="border border-white/20 px-2 py-1">Protopie</span>
            </div>
         </div>
      </div>
    </div>

    <div className="grid md:grid-cols-2 gap-8 mb-24 bg-white/5 p-12">
        <div>
            <h3 className="text-2xl font-serif italic mb-6">Système Visuel</h3>
            <div className="space-y-6">
                <div>
                    <span className="text-xs uppercase tracking-widest text-slate-500 block mb-2">Couleurs</span>
                    <div className="flex gap-4">
                        {project.colors?.map((c, i) => (
                            <div key={i} className="w-12 h-12 rounded-full border border-white/10 shadow-xl" style={{backgroundColor: c}}></div>
                        ))}
                    </div>
                </div>
                <div>
                    <span className="text-xs uppercase tracking-widest text-slate-500 block mb-2">Typographie</span>
                    <div className="text-3xl font-serif border-l-2 border-white/20 pl-4">{project.typo}</div>
                </div>
            </div>
        </div>
        <div className="flex items-center justify-center border border-dashed border-white/20 text-slate-500 font-light italic">
            [ Aperçu des maquettes UI ]
        </div>
    </div>
  </div>
);

// --- Layout DEVELOPPEMENT ---
const DevLayout = ({ project }) => (
  <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto animate-fade-in-up">
    <header className="mb-16 border-b border-white/10 pb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
                <div className="flex items-center gap-2 text-green-400 mb-4 text-xs font-mono uppercase tracking-widest">
                    <Code className="w-4 h-4" /> Développement
                </div>
                <h1 className="text-5xl md:text-7xl font-serif font-bold mb-4">{project.title}</h1>
                <p className="text-slate-400 max-w-2xl text-lg">{project.description}</p>
            </div>
            <a href={project.link} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-white text-black px-6 py-3 text-sm font-medium hover:bg-slate-200 transition-colors">
                <Github className="w-4 h-4" /> Voir le Code
            </a>
        </div>
    </header>

    <div className="grid md:grid-cols-3 gap-12">
        <div className="md:col-span-1 space-y-12">
            <div>
                <h3 className="font-serif text-2xl italic mb-6">Stack Technique</h3>
                <div className="flex flex-wrap gap-2">
                    {project.stack?.map((tech, i) => (
                        <span key={i} className="text-xs font-mono text-blue-300 bg-blue-900/20 border border-blue-900 px-3 py-1 rounded">
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
            
            <div>
                <h3 className="font-serif text-2xl italic mb-6">Fonctionnalités</h3>
                <ul className="space-y-3">
                    {project.features?.map((feat, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-slate-400">
                            <ArrowUpRight className="w-4 h-4 text-slate-600 mt-1 flex-shrink-0" />
                            {feat}
                        </li>
                    ))}
                </ul>
            </div>
        </div>

        <div className="md:col-span-2 space-y-8">
            <div className="bg-slate-900 border border-white/10 p-2 rounded-lg">
                <div className="flex gap-2 mb-2 px-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                </div>
                <img src={project.image} alt="Interface" className="w-full rounded border border-white/5 opacity-80" />
            </div>
            <div className="grid grid-cols-2 gap-4">
                 <div className="bg-slate-800/50 h-40 flex items-center justify-center border border-white/5 text-xs text-slate-500 font-mono">
                    Snippet de code
                 </div>
                 <div className="bg-slate-800/50 h-40 flex items-center justify-center border border-white/5 text-xs text-slate-500 font-mono">
                    Architecture DB
                 </div>
            </div>
        </div>
    </div>
  </div>
);

// --- Layout PHOTOGRAPHIE ---
const PhotoLayout = ({ project }) => (
  <div className="min-h-screen bg-black animate-fade-in-up">
    <div className="h-[70vh] w-full relative">
        <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        <div className="absolute bottom-12 left-6 md:left-12">
            <span className="text-xs tracking-[0.3em] uppercase text-slate-400 mb-2 block">Série Photographique</span>
            <h1 className="text-6xl md:text-9xl font-serif italic text-white mix-blend-overlay">{project.title}</h1>
            <div className="flex items-center gap-4 mt-6 text-sm text-slate-400 font-light">
                <span className="flex items-center gap-2"><Camera className="w-4 h-4" /> {project.camera}</span>
                <span className="w-px h-4 bg-white/20"></span>
                <span>{project.year}</span>
            </div>
        </div>
    </div>

    <div className="max-w-7xl mx-auto px-6 py-24">
        <p className="text-2xl font-light text-slate-300 max-w-2xl mb-24 leading-relaxed mx-auto text-center font-serif italic">
            "{project.description}"
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {project.gallery?.map((img, i) => (
                <div key={i} className={`relative group overflow-hidden ${i % 3 === 0 ? 'md:col-span-2 aspect-[21/9]' : 'aspect-[4/5]'}`}>
                    <img src={img} alt="" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 grayscale hover:grayscale-0" />
                </div>
            ))}
        </div>
    </div>
  </div>
);

/* ======================================================================================
   SECTIONS DE LA PAGE D'ACCUEIL
   ====================================================================================== */

const Hero = () => (
  <header className="relative h-screen flex flex-col justify-center items-center px-6 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#050A19]/90 z-10" />
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-900/10 rounded-full blur-[100px] animate-pulse" />
    <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-indigo-900/10 rounded-full blur-[80px]" />
    <div className="z-20 text-center space-y-6 max-w-4xl">
      <p className="text-slate-400 text-sm tracking-[0.3em] uppercase animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
      </p>
      <h1 className="text-5xl md:text-8xl lg:text-9xl font-light font-serif leading-tight animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
        <span className="italic block text-slate-500 text-4xl md:text-6xl mb-2">Recherche active de stage</span>
        PORTFOLIO 
      </h1>
      <p className="max-w-xl mx-auto text-slate-300 font-light text-lg md:text-xl leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
        Étudiante créative naviguant à la frontière du <span className="text-white font-normal">Design</span>, du <span className="text-white font-normal">Développement</span> et de la <span className="text-white font-normal">Photographie</span>.
      </p>
    </div>
    <div className="absolute bottom-10 z-20 animate-bounce animate-fade-in-up" style={{ animationDelay: '1s' }}>
      <ChevronDown className="w-6 h-6 text-slate-500" />
    </div>
  </header>
);

const ProjectCard = ({ project, onClick }) => (
  <div 
    onClick={() => onClick(project)}
    className={`group relative bg-slate-900/50 overflow-hidden border border-white/5 ${project.size === 'large' ? 'md:col-span-2 md:row-span-2' : 'md:col-span-1 md:row-span-1'} aspect-[4/3] md:aspect-auto cursor-pointer`}
  >
    <img 
      src={project.image} 
      alt={project.title} 
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-40 grayscale group-hover:grayscale-0"
    />
    <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
      <div className="flex justify-between items-start">
        <span className="text-xs font-light tracking-widest uppercase border border-white/20 px-2 py-1 rounded-full backdrop-blur-sm bg-black/20">
          {project.category}
        </span>
        <span className="text-xs font-serif italic text-slate-400">{project.year}</span>
      </div>
      
      <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
        <h3 className="text-2xl md:text-3xl font-serif italic mb-2 text-white group-hover:text-blue-100 transition-colors">
          {project.title}
        </h3>
        <div className="flex items-center gap-2 text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-slate-300">
          Voir le projet <ArrowUpRight className="w-3 h-3" />
        </div>
      </div>
    </div>
  </div>
);

const WorkSection = ({ onProjectClick }) => {
  const [filter, setFilter] = useState('all');
  const filteredProjects = filter === 'all' ? projectsData : projectsData.filter(p => p.type === filter);

  return (
    <section id="work" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div>
          <h2 className="text-4xl md:text-5xl font-serif mb-4">Œuvres Sélectionnées</h2>
          <p className="text-slate-400 font-light max-w-md">Une collection d'expérimentations visuelles et techniques.</p>
        </div>
        <div className="flex gap-4 text-sm font-light">
          {['all', 'dev', 'design', 'photo'].map((cat) => (
            <button 
              key={cat}
              onClick={() => setFilter(cat)}
              className={`uppercase tracking-widest pb-1 border-b transition-all ${filter === cat ? 'border-white text-white' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
            >
              {cat === 'all' ? 'Tout' : cat}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[300px]">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} onClick={onProjectClick} />
        ))}
      </div>
    </section>
  );
};

const EducationItem = ({ year, title, school, description }) => (
  <div className="relative pl-8 md:pl-0 md:grid md:grid-cols-12 gap-8 py-8 border-b border-white/5 group hover:bg-white/[0.02] transition-colors">
    <div className="absolute left-0 top-10 w-2 h-2 bg-slate-700 rounded-full md:hidden"></div>
    <div className="md:col-span-3 text-slate-400 font-light tracking-widest">{year}</div>
    <div className="md:col-span-4 mb-2 md:mb-0">
      <h4 className="text-xl font-serif text-white">{title}</h4>
      <span className="text-sm text-slate-500 uppercase tracking-wider">{school}</span>
    </div>
    <div className="md:col-span-5 text-slate-400 font-light text-sm leading-relaxed">
      {description}
    </div>
  </div>
);

const AboutSection = () => (
  <section id="about" className="py-24 bg-[#030610]">
    <div className="max-w-6xl mx-auto px-6 md:px-12">
      <div className="grid md:grid-cols-2 gap-16 items-start">
        <div className="space-y-8 sticky top-24">
          <h2 className="text-4xl md:text-5xl font-serif leading-tight">
            Étudiante MMI,<br/> 
            <span className="italic text-slate-500">Passionnée du détail.</span>
          </h2>
          <p className="text-slate-300 font-light leading-relaxed text-lg">
            Actuellement en 3ème année de BUT Métiers du Multimédia et de l'Internet. Mon approche est hybride : je code avec l'œil d'un designer et je design avec la logique d'un développeur.
          </p>
          <div className="grid grid-cols-2 gap-6 pt-8">
            <div>
              <h3 className="text-white border-b border-white/10 pb-2 mb-4 uppercase tracking-widest text-xs font-serif">Design</h3>
              <ul className="space-y-2 text-slate-400 font-light text-sm">
                <li>UI/UX Design</li>
                <li>Direction Artistique</li>
                <li>Photographie</li>
                <li>Suite Adobe - Figma</li>

              </ul>
            </div>
            <div>
              <h3 className="text-white border-b border-white/10 pb-2 mb-4 uppercase tracking-widest text-xs font-serif">Tech</h3>
              <ul className="space-y-2 text-slate-400 font-light text-sm">
                <li>HTML/CSS - React.js - Angular - PHP - ChartJS - SpringBoot </li>
                <li>Tailwind CSS</li>
                <li>Creative Coding</li>
              </ul>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-xs uppercase tracking-widest text-slate-500 mb-8 flex items-center gap-2">
            <GraduationCap className="w-4 h-4" /> Parcours Académique
          </h3>
          <div className="border-l border-white/10 md:border-none pl-4 md:pl-0">
            <EducationItem 
              year="2025 - PRÉSENT"
              title="BUT MMI (3ème Année)"
              school="IUT de Marne la Vallée (Antenne de MEAUX)"
              description="Spécialisation Développement Web & Design. Gestion de projets agile, UX Research avancée et développement Fullstack."
            />
            <EducationItem 
              year="2023 - 2025"
              title="BUT MMI (1ère & 2ème Année)"
              school="IUT de Marne la Vallée (Antenne de MEAUX)"
              description="Apprentissage des fondamentaux : Intégration web, design graphique, communication numérique et audiovisuel."
            />
            <EducationItem 
              year="2023"
              title="Baccalauréat Général"
              school="Lycée Général Léonard de Vinci Branly"
              description="Mention Bien. Spécialités Sciences de l'ingénieur et Numérique & Sciences Informatiques."
            />
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Contact = () => (
  <footer id="contact" className="py-32 px-6 border-t border-white/5 relative overflow-hidden">
    <div className="max-w-4xl mx-auto text-center relative z-10">
      <h2 className="text-5xl md:text-7xl font-serif italic mb-8 hover:text-slate-300 transition-colors cursor-pointer">
        Collaborons.
      </h2>
      <p className="text-slate-400 font-light mb-12 text-lg">
        Toujours ouvert aux stages et aux projets freelance audacieux.
      </p>
      <a href="mailto:hello@monportfolio.fr" className="inline-flex items-center gap-3 border border-white/20 px-8 py-4 rounded-full text-sm uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-all duration-300 group">
        <Mail className="w-4 h-4" /> Me contacter
        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
      </a>
      <div className="flex justify-center gap-8 mt-20">
        <a href="#" className="text-slate-500 hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
        <a href="#" className="text-slate-500 hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
        <a href="#" className="text-slate-500 hover:text-white transition-colors"><Code className="w-5 h-5" /></a>
      </div>
      <div className="mt-20 text-xs text-slate-700 uppercase tracking-widest">
      </div>
    </div>
  </footer>
);

/* ======================================================================================
   APP PRINCIPALE
   ====================================================================================== */
const App = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedProject]);

  const renderProjectDetail = () => {
    if (!selectedProject) return null;
    switch(selectedProject.type) {
      case 'dev': return <DevLayout project={selectedProject} />;
      case 'design': return <DesignLayout project={selectedProject} />;
      case 'photo': return <PhotoLayout project={selectedProject} />;
      default: return <DevLayout project={selectedProject} />;
    }
  };

  return (
    <div className="bg-[#050A19] min-h-screen text-slate-50 selection:bg-white selection:text-slate-900 font-sans cursor-none overflow-x-hidden">
      <GlobalStyles />
      {/* Texture de Bruit */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-50 opacity-[0.04] bg-[url('data:image/svg+xml,%3Csvg%20viewBox%3D%270%200%20200%20200%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Cfilter%20id%3D%27noiseFilter%27%3E%3CfeTurbulence%20type%3D%27fractalNoise%27%20baseFrequency%3D%270.65%27%20numOctaves%3D%273%27%20stitchTiles%3D%27stitch%27%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%27100%25%27%20height%3D%27100%25%27%20filter%3D%27url%28%23noiseFilter%29%27%2F%3E%3C%2Fsvg%3E')]"></div>
      
      <CustomCursor />
      
      <Navbar 
        onHomeClick={() => setSelectedProject(null)} 
        isProjectOpen={!!selectedProject} 
      />

      <main>
        {selectedProject ? (
          renderProjectDetail()
        ) : (
          <div className="animate-fade-in-up">
            <Hero />
            <AboutSection />
            <WorkSection onProjectClick={setSelectedProject} />
            <Contact />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;

