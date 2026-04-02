import React, { useState, useEffect, useRef } from 'react';
import { Camera, Code, ArrowUpRight, Mail, Linkedin, Instagram, GraduationCap, ChevronDown, ArrowLeft, Github } from 'lucide-react';

/* ======================================================================================
   STYLES GLOBAUX & ANIMATIONS
   ====================================================================================== */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap');

    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    .animate-fade-in-up {
      animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: #F5F2EE; }
    ::-webkit-scrollbar-thumb { background: #C4B8A8; border-radius: 3px; }

    body {
      background-color: #F5F2EE;
      color: #1A1815;
      font-family: 'Inter', sans-serif;
      overflow-x: hidden;
      cursor: none;
    }
  `}</style>
);

/* ======================================================================================
   DONNÉES DES PROJETS
   ====================================================================================== */
const projectsData = [
  { 
    id: 0,
    title: "Motoria", 
    category: "Dev Web", 
    type: "dev", 
    year: "2025",
    image: "/Images/projetdev1.png", 
    size: "normal",
    description: "Conception d'une plateforme de suivi pédagogique pour auto-écoles. Développement Fullstack reposant sur une architecture REST robuste (API PHP/MySQL) et une interface dynamique en Angular pour gérer la progression des élèves en temps réel.",
    stack: ["Angular", "Tailwind CSS", "PHP", "Methode REST", "SQL/XXAMP"],
    link: "https://github.com/IbtissamCTI",
    features: ["Navigation Immersive & Contextuelle (SPA)", "Architecture REST", "Gestion complexe de BDD relationnelle (SQL/MySQL)"],
    gallery: [
      "https://images.unsplash.com/photo-1580273916550-e323be2ed5d6?q=80&w=1000&auto=format&fit=crop", 
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1000&auto=format&fit=crop"
    ]
  },
 { 
    id: 1,
    title: "Projet HARIBIO",
    category: "Data Viz & Gestion", 
    type: "dev", 
    year: "2024",
    image: "/Images/dev2.png", 
    size: "normal",
    description: "Site web de datavisualisation sur les biocontrôles agricoles. En tant que Cheffe d'équipe, j'ai piloté la transformation de données brutes (Excel/CSV) en graphiques interactifs pour sensibiliser aux alternatives écologiques.",
    stack: ["JavaScript", "Chart.js", "D3.js", "Bootstrap"],
    link: "https://github.com/IbtissamCTI/HARIBIO.git",
    features: [
      "Visualisation interactive de données (Graphes dynamiques)",
      "Traitement et parsing de fichiers de données (CSV/Excel)",
      "Pilotage d'équipe (4 pers.) et méthode Agile (Trello)"
    ],
    gallery: [
      "/Images/dev22.png", 
      "/Images/dev222.png"
    ]
  },
  { 
    id: 2,
    title: "Soda", 
    category: "Packaging & Branding", 
    type: "design", 
    year: "2024",
    image: "/Images/soda.png", 
    size: "normal", 
    description: "Exercice de création d'une identité visuelle complète pour une marque de soda. Réalisation de l'affiche publicitaire et conception du mockup packaging.",
    stack: ["InDesign", "Illustrator", "Photoshop"],
    challenge: "Créer un visuel impactant et un mockup réaliste pour un produit de grande consommation.",
    colors: ["#6c1721", "#356867", "#e2d85c"],
    typo: "Display IBM PLEX / Sans Condensed",
    gallery: [
      "/Images/soda1.png",
      "/Images/soda1.png"
    ]
  },
  { 
    id: 3,
    title: "guitar.exe", 
    category: "Art Numérique", 
    type: "design", 
    year: "2023",
    image: "/Images/exe.png", 
    size: "normal", 
    description: "Composition artistique réalisée à partir d'une photographie personnelle, éditée pour reprendre l'esthétique nostalgique d'une fenêtre Windows XP.",
    stack: ["Photoshop", "Photographie"],
    challenge: "Intégration réaliste d'éléments photographiques dans une interface graphique rétro.",
    colors: ["#000080", "#C0C0C0", "#000000"],
    typo: "Pixel Art / System",
    gallery: [
      "/Images/exe.png"
    ]
  },
  { 
    id: 4,
    title: "Cloone", 
    category: "Publicité & Social Media", 
    type: "design", 
    year: "2023",
    image: "/Images/cloone.png", 
    size: "large", 
    description: "Projet SAE de 2ème année : Conception d'une affiche promotionnelle au format post Instagram pour une agence fictive de clonage.",
    stack: ["Suite Adobe"],
    challenge: "Créer un visuel accrocheur pour les réseaux sociaux autour d'un concept futuriste.",
    colors: ["#b8351b", "#85a79b", "#FFFFFF"],
    typo: "Futuristic / Experimental",
    gallery: [
      "/Images/POSTINSTA.png",
      "/Images/POSTINSTA.png"
    ]
  },
  { 
    id: 5,
    title: "Models", 
    category: "Photographie", 
    type: "photo", 
    year: "2023",
    image: "/Images/photo.JPG", 
    size: "normal",
    description: "Photos de models pour certaines occasions.",
    gallery: [
      "/Images/photo1.jpg",
      "/Images/last.png",
      "/Images/photoig.jpg",
      "/Images/photo2.JPG",
      "/Images/last1.jpg",
      "/Images/photomodel.jpg",
      "/Images/pic.jpg",
    ],
    camera: "Lumix hybrid/Canon 500D"
  },
  { 
    id: 6,
    title: "A travers la lens", 
    category: "Photographie", 
    type: "photo", 
    year: "2022-2025",
    image: "/Images/lens1.JPG", 
    size: "large",
    description: "À travers l'objectif, les géométries et formes qui nous entourent.",
    gallery: [
      "/Images/lens3.JPG",
      "/Images/lens2.JPG",
      "/Images/lens4.JPG",
      "/Images/lens5.JPG",
      "/Images/lens1.JPG",
    ],
    camera: "Lumix hybrid/Canon 500D"
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
      <div ref={cursorRef} className="fixed top-0 left-0 w-2 h-2 bg-stone-900 rounded-full pointer-events-none z-[100] -mt-1 -ml-1 hidden md:block" />
      <div ref={followerRef} className="fixed top-0 left-0 w-8 h-8 border border-stone-400/50 rounded-full pointer-events-none z-[99] -mt-4 -ml-4 transition-transform duration-100 ease-out hidden md:block" />
    </>
  );
};

/* ======================================================================================
   BARRE DE NAVIGATION
   ====================================================================================== */
const Navbar = ({ onHomeClick, isProjectOpen }) => (
  <nav className="fixed top-0 w-full p-8 flex justify-between items-center z-40 bg-[#F5F2EE]/80 backdrop-blur-sm border-b border-stone-200/60">
    <div 
      className="text-xl font-serif italic font-bold tracking-wider cursor-pointer text-stone-900 hover:text-stone-500 transition-colors"
      onClick={onHomeClick}
    >
      Ibtissem Chtioui.
    </div>
    
    <div className="flex items-center gap-8">
      {!isProjectOpen && (
        <div className="hidden md:flex gap-8 text-sm font-light tracking-widest uppercase text-stone-600">
          <a href="#work" className="hover:text-stone-900 transition-colors">Projets</a>
          <a href="#about" className="hover:text-stone-900 transition-colors">A Propos</a>
          <a href="#contact" className="hover:text-stone-900 transition-colors">Contact</a>
        </div>
      )}
      
      {isProjectOpen && (
         <button onClick={onHomeClick} className="flex items-center gap-2 text-sm uppercase tracking-widest text-stone-600 hover:text-stone-900 transition-colors">
           <ArrowLeft className="w-4 h-4" /> Retour
         </button>
      )}

      <a 
        href="mailto:Ibtissem.chti@hotmail.com"
        className="flex items-center gap-2 px-5 py-2 rounded-full border border-stone-300 bg-white hover:bg-stone-50 hover:border-stone-400 transition-all text-sm uppercase tracking-wider text-stone-700 group"
      >
        <Mail className="w-4 h-4 text-stone-500 group-hover:text-stone-800 transition-colors" />
        <span className="hidden md:inline">Me contacter</span>
      </a>
    </div>
  </nav>
);


/* ======================================================================================
   LAYOUTS PROJETS
   ====================================================================================== */

const DesignLayout = ({ project }) => (
  <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto animate-fade-in-up">
    <div className="grid md:grid-cols-2 gap-16 mb-24">
      <div className="space-y-8">
        <span className="text-xs font-light tracking-[0.2em] text-stone-500 uppercase">Case Study Design</span>
        <h1 className="text-6xl md:text-8xl font-serif italic leading-none text-stone-900">{project.title}</h1>
        <div className="h-px w-24 bg-stone-300"></div>
        <p className="text-xl text-stone-600 font-light leading-relaxed">{project.description}</p>
        
        <div className="pt-8">
            <h3 className="text-sm uppercase tracking-widest text-stone-400 mb-4 font-serif">Le Challenge</h3>
            <p className="text-stone-500 font-light">{project.challenge}</p>
        </div>
      </div>
      <div className="relative aspect-[3/4] md:aspect-auto">
         <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
         <div className="absolute -bottom-6 -left-6 bg-[#F5F2EE] border border-stone-200 p-6 max-w-xs">
            <h4 className="font-serif text-xl italic mb-2 text-stone-800">Outils</h4>
            <div className="flex flex-wrap gap-2 text-xs text-stone-500">
               {project.stack?.map((tool, i) => (
                 <span key={i} className="border border-stone-300 px-2 py-1">{tool}</span>
               ))}
            </div>
         </div>
      </div>
    </div>

    <div className="grid md:grid-cols-2 gap-8 mb-24 bg-stone-100 p-12">
        <div>
            <h3 className="text-2xl font-serif italic mb-6 text-stone-800">Système Visuel</h3>
            <div className="space-y-6">
                <div>
                    <span className="text-xs uppercase tracking-widest text-stone-400 block mb-2">Couleurs</span>
                    <div className="flex gap-4">
                        {project.colors?.map((c, i) => (
                            <div key={i} className="w-12 h-12 rounded-full border border-stone-200 shadow-sm" style={{backgroundColor: c}}></div>
                        ))}
                    </div>
                </div>
                <div>
                    <span className="text-xs uppercase tracking-widest text-stone-400 block mb-2">Typographie</span>
                    <div className="text-3xl font-serif border-l-2 border-stone-300 pl-4 text-stone-700">{project.typo}</div>
                </div>
            </div>
        </div>
        <div className="flex items-center justify-center border border-dashed border-stone-300 text-stone-400 font-light italic overflow-hidden relative group">
            {project.gallery && project.gallery[0] ? (
              <img src={project.gallery[0]} alt="Aperçu" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
            ) : (
              <span>[ Aperçu des maquettes UI ]</span>
            )}
        </div>
    </div>
  </div>
);

const DevLayout = ({ project }) => (
  <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto animate-fade-in-up">
    <header className="mb-16 border-b border-stone-200 pb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
                <div className="flex items-center gap-2 text-stone-500 mb-4 text-xs font-mono uppercase tracking-widest">
                    <Code className="w-4 h-4" /> Développement
                </div>
                <h1 className="text-5xl md:text-7xl font-serif font-bold mb-4 text-stone-900">{project.title}</h1>
                <p className="text-stone-500 max-w-2xl text-lg">{project.description}</p>
            </div>
            <a href={project.link} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-stone-900 text-white px-6 py-3 text-sm font-medium hover:bg-stone-700 transition-colors">
                <Github className="w-4 h-4" /> Voir le Code
            </a>
        </div>
    </header>

    <div className="grid md:grid-cols-3 gap-12">
        <div className="md:col-span-1 space-y-12">
            <div>
                <h3 className="font-serif text-2xl italic mb-6 text-stone-800">Stack Technique</h3>
                <div className="flex flex-wrap gap-2">
                    {project.stack?.map((tech, i) => (
                        <span key={i} className="text-xs font-mono text-stone-700 bg-stone-100 border border-stone-200 px-3 py-1 rounded">
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
            
            <div>
                <h3 className="font-serif text-2xl italic mb-6 text-stone-800">Fonctionnalités</h3>
                <ul className="space-y-3">
                    {project.features?.map((feat, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-stone-500">
                            <ArrowUpRight className="w-4 h-4 text-stone-300 mt-1 flex-shrink-0" />
                            {feat}
                        </li>
                    ))}
                </ul>
            </div>
        </div>

        <div className="md:col-span-2 space-y-8">
            <div className="bg-stone-100 border border-stone-200 p-2 rounded-lg">
                <div className="flex gap-2 mb-2 px-2">
                    <div className="w-3 h-3 rounded-full bg-stone-300"></div>
                    <div className="w-3 h-3 rounded-full bg-stone-300"></div>
                    <div className="w-3 h-3 rounded-full bg-stone-300"></div>
                </div>
                <img src={project.image} alt="Interface" className="w-full rounded border border-stone-200 opacity-90" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
                 <div className="bg-stone-100 border border-stone-200 p-2 rounded-lg h-64 relative overflow-hidden group">
                    <img 
                        src={project.gallery && project.gallery[0] ? project.gallery[0] : project.image} 
                        alt="Detail 1" 
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" 
                    />
                 </div>
                 <div className="bg-stone-100 border border-stone-200 p-2 rounded-lg h-64 relative overflow-hidden group">
                    <img 
                        src={project.gallery && project.gallery[1] ? project.gallery[1] : project.image} 
                        alt="Detail 2" 
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" 
                    />
                 </div>
            </div>
        </div>
    </div>
  </div>
);

const PhotoLayout = ({ project }) => (
  <div className="min-h-screen bg-[#F5F2EE] animate-fade-in-up">
    <div className="h-[70vh] w-full relative">
        <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F5F2EE] via-transparent to-transparent"></div>
        <div className="absolute bottom-12 left-6 md:left-12">
            <span className="text-xs tracking-[0.3em] uppercase text-stone-500 mb-2 block">Série Photographique</span>
            <h1 className="text-6xl md:text-9xl font-serif italic text-stone-900 mix-blend-multiply">{project.title}</h1>
            <div className="flex items-center gap-4 mt-6 text-sm text-stone-500 font-light">
                <span className="flex items-center gap-2"><Camera className="w-4 h-4" /> {project.camera}</span>
                <span className="w-px h-4 bg-stone-300"></span>
                <span>{project.year}</span>
            </div>
        </div>
    </div>

    <div className="max-w-7xl mx-auto px-6 py-24">
        <p className="text-2xl font-light text-stone-600 max-w-2xl mb-24 leading-relaxed mx-auto text-center font-serif italic">
            "{project.description}"
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {project.gallery?.map((img, i) => (
                <div key={i} className={`relative group overflow-hidden ${
                    project.title === "Models" 
                    ? 'aspect-[3/4]'
                    : (i % 3 === 0 ? 'md:col-span-2 aspect-[21/9]' : 'aspect-[4/5]')
                }`}>
                    <img 
                        src={img} 
                        alt="" 
                        className={`w-full h-full transition-transform duration-1000 group-hover:scale-105 grayscale hover:grayscale-0 ${
                            project.title === "Models" ? 'object-contain bg-stone-100' : 'object-cover'
                        }`} 
                    />
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
  <header className="relative h-screen flex flex-col justify-center items-center px-6 overflow-hidden bg-[#F5F2EE]">
    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#F5F2EE]/80 z-10" />
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-stone-300/30 rounded-full blur-[100px]" />
    <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-stone-200/40 rounded-full blur-[80px]" />
    <div className="z-20 text-center space-y-6 max-w-4xl">
      <h1 className="text-5xl md:text-8xl lg:text-9xl font-light font-serif leading-tight text-stone-900 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
        <span className="italic block text-stone-400 text-4xl md:text-6xl mb-2"></span>
        PORTFOLIO 
      </h1>
      <p className="max-w-xl mx-auto text-stone-500 font-light text-lg md:text-xl leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
        Étudiante créative naviguant à la frontière du <span className="text-stone-900 font-normal">Design</span>, du <span className="text-stone-900 font-normal">Développement</span> et de la <span className="text-stone-900 font-normal">Photographie</span>. En recherche active de stage.
      </p>
    </div>
    <div className="absolute bottom-10 z-20 animate-bounce animate-fade-in-up" style={{ animationDelay: '1s' }}>
      <ChevronDown className="w-6 h-6 text-stone-400" />
    </div>
  </header>
);

const ProjectCard = ({ project, onClick }) => (
  <div 
    onClick={() => onClick(project)}
    className={`group relative bg-stone-200/50 overflow-hidden border border-stone-200 ${project.size === 'large' ? 'md:col-span-2 md:row-span-2' : 'md:col-span-1 md:row-span-1'} aspect-[4/3] md:aspect-auto cursor-pointer`}
  >
    <img 
      src={project.image} 
      alt={project.title} 
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-70 group-hover:opacity-50 grayscale group-hover:grayscale-0"
    />
    <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
      <div className="flex justify-between items-start">
        <span className="text-xs font-light tracking-widest uppercase border border-stone-900/20 px-2 py-1 rounded-full backdrop-blur-sm bg-white/30 text-stone-800">
          {project.category}
        </span>
        <span className="text-xs font-serif italic text-stone-600">{project.year}</span>
      </div>
      
      <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
        <h3 className="text-2xl md:text-3xl font-serif italic mb-2 text-stone-900 group-hover:text-stone-700 transition-colors">
          {project.title}
        </h3>
        <div className="flex items-center gap-2 text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-stone-600">
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
          <h2 className="text-4xl md:text-5xl font-serif mb-4 text-stone-900">Œuvres Sélectionnées</h2>
          <p className="text-stone-500 font-light max-w-md">Une collection d'expérimentations visuelles et techniques.</p>
        </div>
        <div className="flex gap-4 text-sm font-light">
          {['all', 'dev', 'design', 'photo'].map((cat) => (
            <button 
              key={cat}
              onClick={() => setFilter(cat)}
              className={`uppercase tracking-widest pb-1 border-b transition-all ${filter === cat ? 'border-stone-900 text-stone-900' : 'border-transparent text-stone-400 hover:text-stone-600'}`}
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
  <div className="relative pl-8 md:pl-0 md:grid md:grid-cols-12 gap-8 py-8 border-b border-stone-200 group hover:bg-stone-50 transition-colors">
    <div className="absolute left-0 top-10 w-2 h-2 bg-stone-300 rounded-full md:hidden"></div>
    <div className="md:col-span-3 text-stone-400 font-light tracking-widest">{year}</div>
    <div className="md:col-span-4 mb-2 md:mb-0">
      <h4 className="text-xl font-serif text-stone-900">{title}</h4>
      <span className="text-sm text-stone-400 uppercase tracking-wider">{school}</span>
    </div>
    <div className="md:col-span-5 text-stone-500 font-light text-sm leading-relaxed">
      {description}
    </div>
  </div>
);

const AboutSection = () => (
  <section id="about" className="py-24 bg-[#EDEAE4]">
    <div className="max-w-6xl mx-auto px-6 md:px-12">
      <div className="grid md:grid-cols-2 gap-16 items-start">
        <div className="space-y-8 sticky top-24">
          <h2 className="text-4xl md:text-5xl font-serif leading-tight text-stone-900">
            Étudiante MMI,<br/> 
            <span className="italic text-stone-400">Passionnée du détail.</span>
          </h2>
          <p className="text-stone-600 font-light leading-relaxed text-lg">
            Actuellement en 3ème année de BUT Métiers du Multimédia et de l'Internet. Mon approche est hybride : je code avec l'œil d'un designer et je design avec la logique d'un développeur.
          </p>
          <div className="grid grid-cols-2 gap-6 pt-8">
            <div>
              <h3 className="text-stone-700 border-b border-stone-300 pb-2 mb-4 uppercase tracking-widest text-xs font-serif">Design</h3>
              <ul className="space-y-2 text-stone-500 font-light text-sm">
                <li>UI/UX Design</li>
                <li>Direction Artistique</li>
                <li>Photographie</li>
                <li>Suite Adobe - Figma</li>
              </ul>
            </div>
            <div>
              <h3 className="text-stone-700 border-b border-stone-300 pb-2 mb-4 uppercase tracking-widest text-xs font-serif">Tech</h3>
              <ul className="space-y-2 text-stone-500 font-light text-sm">
                <li>HTML/CSS - React.js - Angular - PHP - ChartJS - SpringBoot</li>
                <li>Tailwind CSS</li>
                <li>Creative Coding</li>
              </ul>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-xs uppercase tracking-widest text-stone-400 mb-8 flex items-center gap-2">
            <GraduationCap className="w-4 h-4" /> Parcours Académique
          </h3>
          <div className="border-l border-stone-200 md:border-none pl-4 md:pl-0">
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
  <footer id="contact" className="py-32 px-6 border-t border-stone-200 relative overflow-hidden bg-[#F5F2EE]">
    <div className="max-w-4xl mx-auto text-center relative z-10">
      <h2 className="text-5xl md:text-7xl font-serif italic mb-8 text-stone-900 hover:text-stone-500 transition-colors cursor-pointer">
        Collaborons.
      </h2>
      <p className="text-stone-500 font-light mb-12 text-lg">
        Toujours ouvert aux stages et aux projets freelance audacieux.
      </p>
      <a href="mailto:hello@monportfolio.fr" className="inline-flex items-center gap-3 border border-stone-300 bg-white px-8 py-4 rounded-full text-sm uppercase tracking-widest text-stone-700 hover:bg-stone-900 hover:text-white hover:border-stone-900 transition-all duration-300 group">
        <Mail className="w-4 h-4" /> Me contacter
        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
      </a>
      <div className="flex justify-center gap-8 mt-20">
        <a href="https://www.linkedin.com/in/ibtissam-chtioui" className="text-stone-400 hover:text-stone-900 transition-colors"><Linkedin className="w-5 h-5" /></a>
        <a href="https://www.instagram.com/ibbt.c/" className="text-stone-400 hover:text-stone-900 transition-colors"><Instagram className="w-5 h-5" /></a>
        <a href="https://github.com/IbtissamCTI" className="text-stone-400 hover:text-stone-900 transition-colors"><Code className="w-5 h-5" /></a>
      </div>
    </div>
  </footer>
);


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
    <div className="bg-[#F5F2EE] min-h-screen text-stone-900 selection:bg-stone-900 selection:text-white font-sans cursor-none overflow-x-hidden">
      <GlobalStyles />
      
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