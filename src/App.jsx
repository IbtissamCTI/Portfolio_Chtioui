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

    ::selection { background: #1A1815; color: #F5F2EE; }

    /* ---- Palette taupe/beige/noir ---- */
    .p-bg       { background-color: #F5F2EE; }
    .p-bg-alt   { background-color: #EDEAE4; }
    .p-bg-card  { background-color: #E8E4DE; }

    .p-text-1   { color: #1A1815; }
    .p-text-2   { color: #6B6560; }
    .p-text-3   { color: #9C9490; }
    .p-text-4   { color: #B8B2AC; }

    .p-border   { border-color: #D4CEC8; }

    /* Navbar */
    .p-nav { background-color: rgba(245,242,238,0.85); border-color: rgba(212,206,200,0.5); }

    /* Bouton principal (noir) */
    .p-btn-dark { background-color: #1A1815; color: #F5F2EE; }
    .p-btn-dark:hover { background-color: #3A3530; }

    /* Bouton outline */
    .p-btn-outline { border-color: #D4CEC8; background-color: #ffffff; color: #4A4540; }
    .p-btn-outline:hover { background-color: #1A1815; color: #F5F2EE; border-color: #1A1815; }

    /* Badge tech */
    .p-badge { background-color: #E8E4DE; border-color: #D4CEC8; color: #4A4540; }

    /* Carte projet */
    .p-card { background-color: rgba(232,228,222,0.5); border-color: #D4CEC8; }
    .p-card-tag { background-color: rgba(255,255,255,0.35); border-color: rgba(26,24,21,0.15); color: #1A1815; }

    /* Fenêtre code */
    .p-code-win { background-color: #E8E4DE; border-color: #D4CEC8; }
    .p-code-dot { background-color: #C4BEB8; }

    /* Panel design */
    .p-panel { background-color: #E8E4DE; }

    /* Icônes sociales */
    .p-social { color: #9C9490; }
    .p-social:hover { color: #1A1815; }

    /* Filtres */
    .p-filter { color: #9C9490; border-color: transparent; border-bottom-width: 1px; border-bottom-style: solid; }
    .p-filter:hover { color: #6B6560; }
    .p-filter.active { color: #1A1815; border-color: #1A1815; }

    /* Curseur */
    .p-cursor-dot  { background-color: #1A1815; }
    .p-cursor-ring { border-color: rgba(107,101,96,0.5); }

    /* Education hover */
    .p-edu-row:hover { background-color: rgba(237,234,228,0.5); }
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
    gallery: ["/Images/dev22.png", "/Images/dev222.png"]
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
    gallery: ["/Images/soda1.png", "/Images/soda1.png"]
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
    gallery: ["/Images/exe.png"]
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
    gallery: ["/Images/POSTINSTA.png", "/Images/POSTINSTA.png"]
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
      "/Images/photo1.jpg", "/Images/last.png", "/Images/photoig.jpg",
      "/Images/photo2.JPG", "/Images/last1.jpg", "/Images/photomodel.jpg", "/Images/pic.jpg",
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
      "/Images/lens3.JPG", "/Images/lens2.JPG", "/Images/lens4.JPG",
      "/Images/lens5.JPG", "/Images/lens1.JPG",
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
      <div ref={cursorRef} className="p-cursor-dot fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[100] -mt-1 -ml-1 hidden md:block" />
      <div ref={followerRef} className="p-cursor-ring fixed top-0 left-0 w-8 h-8 border rounded-full pointer-events-none z-[99] -mt-4 -ml-4 transition-transform duration-100 ease-out hidden md:block" />
    </>
  );
};

/* ======================================================================================
   BARRE DE NAVIGATION
   ====================================================================================== */
const Navbar = ({ onHomeClick, isProjectOpen }) => (
  <nav className="p-nav fixed top-0 w-full p-8 flex justify-between items-center z-40 border-b backdrop-blur-sm">
    <div 
      className="p-text-1 text-xl font-serif italic font-bold tracking-wider cursor-pointer hover:opacity-70 transition-opacity"
      onClick={onHomeClick}
    >
      Ibtissem Chtioui.
    </div>
    
    <div className="flex items-center gap-8">
      {!isProjectOpen && (
        <div className="hidden md:flex gap-8 text-sm font-light tracking-widest uppercase">
          <a href="#work" className="p-text-2 hover:opacity-70 transition-opacity">Projets</a>
          <a href="#about" className="p-text-2 hover:opacity-70 transition-opacity">A Propos</a>
          <a href="#contact" className="p-text-2 hover:opacity-70 transition-opacity">Contact</a>
        </div>
      )}
      
      {isProjectOpen && (
        <button onClick={onHomeClick} className="p-text-2 flex items-center gap-2 text-sm uppercase tracking-widest hover:opacity-70 transition-opacity">
          <ArrowLeft className="w-4 h-4" /> Retour
        </button>
      )}

      <a 
        href="mailto:Ibtissem.chti@hotmail.com"
        className="p-btn-outline flex items-center gap-2 px-5 py-2 rounded-full border transition-all text-sm uppercase tracking-wider group"
      >
        <Mail className="w-4 h-4" />
        <span className="hidden md:inline">Me contacter</span>
      </a>
    </div>
  </nav>
);

/* ======================================================================================
   LAYOUTS PROJETS
   ====================================================================================== */

const DesignLayout = ({ project }) => (
  <div className="p-bg pt-32 pb-20 px-6 max-w-7xl mx-auto animate-fade-in-up">
    <div className="grid md:grid-cols-2 gap-16 mb-24">
      <div className="space-y-8">
        <span className="p-text-3 text-xs font-light tracking-[0.2em] uppercase">Case Study Design</span>
        <h1 className="p-text-1 text-6xl md:text-8xl font-serif italic leading-none">{project.title}</h1>
        <div className="h-1 w-24 p-border" style={{borderTopWidth:0, height:'1px', backgroundColor:'#D4CEC8'}}></div>
        <p className="p-text-2 text-xl font-light leading-relaxed">{project.description}</p>
        <div className="pt-8">
          <h3 className="p-text-3 text-sm uppercase tracking-widest mb-4 font-serif">Le Challenge</h3>
          <p className="p-text-2 font-light">{project.challenge}</p>
        </div>
      </div>
      <div className="relative aspect-[3/4] md:aspect-auto">
        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
        <div className="p-bg p-border absolute -bottom-6 -left-6 border p-6 max-w-xs">
          <h4 className="p-text-1 font-serif text-xl italic mb-2">Outils</h4>
          <div className="flex flex-wrap gap-2 text-xs p-text-2">
            {project.stack?.map((tool, i) => (
              <span key={i} className="p-border border px-2 py-1">{tool}</span>
            ))}
          </div>
        </div>
      </div>
    </div>

    <div className="p-panel grid md:grid-cols-2 gap-8 mb-24 p-12">
      <div>
        <h3 className="p-text-1 text-2xl font-serif italic mb-6">Système Visuel</h3>
        <div className="space-y-6">
          <div>
            <span className="p-text-3 text-xs uppercase tracking-widest block mb-2">Couleurs</span>
            <div className="flex gap-4">
              {project.colors?.map((c, i) => (
                <div key={i} className="p-border w-12 h-12 rounded-full border" style={{backgroundColor: c}}></div>
              ))}
            </div>
          </div>
          <div>
            <span className="p-text-3 text-xs uppercase tracking-widest block mb-2">Typographie</span>
            <div className="p-text-2 p-border text-3xl font-serif border-l-2 pl-4">{project.typo}</div>
          </div>
        </div>
      </div>
      <div className="p-border flex items-center justify-center border border-dashed p-text-3 font-light italic overflow-hidden relative group">
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
  <div className="p-bg pt-32 pb-20 px-6 max-w-6xl mx-auto animate-fade-in-up">
    <header className="p-border mb-16 border-b pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="p-text-2 flex items-center gap-2 mb-4 text-xs font-mono uppercase tracking-widest">
            <Code className="w-4 h-4" /> Développement
          </div>
          <h1 className="p-text-1 text-5xl md:text-7xl font-serif font-bold mb-4">{project.title}</h1>
          <p className="p-text-2 max-w-2xl text-lg">{project.description}</p>
        </div>
        <a href={project.link} target="_blank" rel="noreferrer" className="p-btn-dark flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors">
          <Github className="w-4 h-4" /> Voir le Code
        </a>
      </div>
    </header>

    <div className="grid md:grid-cols-3 gap-12">
      <div className="md:col-span-1 space-y-12">
        <div>
          <h3 className="p-text-1 font-serif text-2xl italic mb-6">Stack Technique</h3>
          <div className="flex flex-wrap gap-2">
            {project.stack?.map((tech, i) => (
              <span key={i} className="p-badge text-xs font-mono border px-3 py-1 rounded">{tech}</span>
            ))}
          </div>
        </div>
        <div>
          <h3 className="p-text-1 font-serif text-2xl italic mb-6">Fonctionnalités</h3>
          <ul className="space-y-3">
            {project.features?.map((feat, i) => (
              <li key={i} className="p-text-2 flex items-start gap-3 text-sm">
                <ArrowUpRight className="w-4 h-4 mt-1 flex-shrink-0 p-text-4" style={{color:'#C4BEB8'}} />
                {feat}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="md:col-span-2 space-y-8">
        <div className="p-code-win border p-2 rounded-lg">
          <div className="flex gap-2 mb-2 px-2">
            <div className="p-code-dot w-3 h-3 rounded-full"></div>
            <div className="p-code-dot w-3 h-3 rounded-full"></div>
            <div className="p-code-dot w-3 h-3 rounded-full"></div>
          </div>
          <img src={project.image} alt="Interface" className="w-full rounded border opacity-90" style={{borderColor:'#D4CEC8'}} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-code-win border p-2 rounded-lg h-64 relative overflow-hidden group">
            <img src={project.gallery?.[0] ?? project.image} alt="Detail 1" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
          <div className="p-code-win border p-2 rounded-lg h-64 relative overflow-hidden group">
            <img src={project.gallery?.[1] ?? project.image} alt="Detail 2" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

const PhotoLayout = ({ project }) => (
  <div className="p-bg min-h-screen animate-fade-in-up">
    <div className="h-[70vh] w-full relative">
      <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-90" />
      <div className="absolute inset-0" style={{background:'linear-gradient(to top, #F5F2EE, transparent)'}}></div>
      <div className="absolute bottom-12 left-6 md:left-12">
        <span className="p-text-3 text-xs tracking-[0.3em] uppercase mb-2 block">Série Photographique</span>
        <h1 className="p-text-1 text-6xl md:text-9xl font-serif italic" style={{mixBlendMode:'multiply'}}>{project.title}</h1>
        <div className="p-text-2 flex items-center gap-4 mt-6 text-sm font-light">
          <span className="flex items-center gap-2"><Camera className="w-4 h-4" /> {project.camera}</span>
          <span className="w-px h-4" style={{backgroundColor:'#D4CEC8'}}></span>
          <span>{project.year}</span>
        </div>
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-6 py-24">
      <p className="p-text-2 text-2xl font-light max-w-2xl mb-24 leading-relaxed mx-auto text-center font-serif italic">
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
                project.title === "Models" ? 'object-contain' : 'object-cover'
              }`}
              style={project.title === "Models" ? {backgroundColor:'#E8E4DE'} : {}}
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
  <header className="p-bg relative h-screen flex flex-col justify-center items-center px-6 overflow-hidden">
    <div className="absolute inset-0 z-10" style={{background:'linear-gradient(to bottom, transparent, rgba(245,242,238,0.9))'}} />
    <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full" style={{backgroundColor:'rgba(196,184,168,0.2)', filter:'blur(100px)'}} />
    <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full" style={{backgroundColor:'rgba(196,184,168,0.15)', filter:'blur(80px)'}} />
    <div className="z-20 text-center space-y-6 max-w-4xl">
      <p className="p-text-3 text-sm tracking-[0.3em] uppercase animate-fade-in-up" style={{ animationDelay: '0.1s' }}></p>
      <h1 className="p-text-1 text-5xl md:text-8xl lg:text-9xl font-light font-serif leading-tight animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
        <span className="p-text-3 italic block text-4xl md:text-6xl mb-2"></span>
        PORTFOLIO
      </h1>
      <p className="p-text-2 max-w-xl mx-auto font-light text-lg md:text-xl leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
        Étudiante créative naviguant à la frontière du <span className="p-text-1" style={{fontWeight:400}}>Design</span>, du <span className="p-text-1" style={{fontWeight:400}}>Développement</span> et de la <span className="p-text-1" style={{fontWeight:400}}>Photographie</span> En recherche active de stage.
      </p>
    </div>
    <div className="absolute bottom-10 z-20 animate-bounce animate-fade-in-up" style={{ animationDelay: '1s' }}>
      <ChevronDown className="p-text-3 w-6 h-6" />
    </div>
  </header>
);

const ProjectCard = ({ project, onClick }) => (
  <div
    onClick={() => onClick(project)}
    className={`p-card group relative overflow-hidden border ${project.size === 'large' ? 'md:col-span-2 md:row-span-2' : 'md:col-span-1 md:row-span-1'} aspect-[4/3] md:aspect-auto cursor-pointer`}
  >
    <img
      src={project.image}
      alt={project.title}
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-40 grayscale group-hover:grayscale-0"
    />
    <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
      <div className="flex justify-between items-start">
        <span className="p-card-tag text-xs font-light tracking-widest uppercase border px-2 py-1 rounded-full backdrop-blur-sm">
          {project.category}
        </span>
        <span className="p-text-2 text-xs font-serif italic">{project.year}</span>
      </div>
      <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
        <h3 className="p-text-1 text-2xl md:text-3xl font-serif italic mb-2 transition-colors">
          {project.title}
        </h3>
        <div className="p-text-2 flex items-center gap-2 text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500">
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
          <h2 className="p-text-1 text-4xl md:text-5xl font-serif mb-4">Œuvres Sélectionnées</h2>
          <p className="p-text-2 font-light max-w-md">Une collection d'expérimentations visuelles et techniques.</p>
        </div>
        <div className="flex gap-4 text-sm font-light">
          {['all', 'dev', 'design', 'photo'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`p-filter uppercase tracking-widest pb-1 transition-all ${filter === cat ? 'active' : ''}`}
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
  <div className="p-edu-row p-border relative pl-8 md:pl-0 md:grid md:grid-cols-12 gap-8 py-8 border-b transition-colors">
    <div className="absolute left-0 top-10 w-2 h-2 rounded-full md:hidden" style={{backgroundColor:'#C4BEB8'}}></div>
    <div className="p-text-3 md:col-span-3 font-light tracking-widest">{year}</div>
    <div className="md:col-span-4 mb-2 md:mb-0">
      <h4 className="p-text-1 text-xl font-serif">{title}</h4>
      <span className="p-text-4 text-sm uppercase tracking-wider">{school}</span>
    </div>
    <div className="p-text-2 md:col-span-5 font-light text-sm leading-relaxed">{description}</div>
  </div>
);

const AboutSection = () => (
  <section id="about" className="p-bg-alt py-24">
    <div className="max-w-6xl mx-auto px-6 md:px-12">
      <div className="grid md:grid-cols-2 gap-16 items-start">
        <div className="space-y-8 sticky top-24">
          <h2 className="p-text-1 text-4xl md:text-5xl font-serif leading-tight">
            Étudiante MMI,<br/>
            <span className="p-text-3 italic">Passionnée du détail.</span>
          </h2>
          <p className="p-text-2 font-light leading-relaxed text-lg">
            Actuellement en 3ème année de BUT Métiers du Multimédia et de l'Internet. Mon approche est hybride : je code avec l'œil d'un designer et je design avec la logique d'un développeur.
          </p>
          <div className="grid grid-cols-2 gap-6 pt-8">
            <div>
              <h3 className="p-text-1 p-border border-b pb-2 mb-4 uppercase tracking-widest text-xs font-serif">Design</h3>
              <ul className="space-y-2 p-text-2 font-light text-sm">
                <li>UI/UX Design</li>
                <li>Direction Artistique</li>
                <li>Photographie</li>
                <li>Suite Adobe - Figma</li>
              </ul>
            </div>
            <div>
              <h3 className="p-text-1 p-border border-b pb-2 mb-4 uppercase tracking-widest text-xs font-serif">Tech</h3>
              <ul className="space-y-2 p-text-2 font-light text-sm">
                <li>HTML/CSS - React.js - Angular - PHP - ChartJS - SpringBoot</li>
                <li>Tailwind CSS</li>
                <li>Creative Coding</li>
              </ul>
            </div>
          </div>
        </div>
        <div>
          <h3 className="p-text-3 text-xs uppercase tracking-widest mb-8 flex items-center gap-2">
            <GraduationCap className="w-4 h-4" /> Parcours Académique
          </h3>
          <div className="p-border border-l md:border-none pl-4 md:pl-0">
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
  <footer id="contact" className="p-bg p-border py-32 px-6 border-t relative overflow-hidden">
    <div className="max-w-4xl mx-auto text-center relative z-10">
      <h2 className="p-text-1 text-5xl md:text-7xl font-serif italic mb-8 hover:opacity-60 transition-opacity cursor-pointer">
        Collaborons.
      </h2>
      <p className="p-text-2 font-light mb-12 text-lg">
        Toujours ouvert aux stages et aux projets freelance audacieux.
      </p>
      <a href="mailto:hello@monportfolio.fr" className="p-btn-outline inline-flex items-center gap-3 border px-8 py-4 rounded-full text-sm uppercase tracking-widest transition-all duration-300 group">
        <Mail className="w-4 h-4" /> Me contacter
        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
      </a>
      <div className="flex justify-center gap-8 mt-20">
        <a href="https://www.linkedin.com/in/ibtissam-chtioui" className="p-social transition-colors"><Linkedin className="w-5 h-5" /></a>
        <a href="https://www.instagram.com/ibbt.c/" className="p-social transition-colors"><Instagram className="w-5 h-5" /></a>
        <a href="https://github.com/IbtissamCTI" className="p-social transition-colors"><Code className="w-5 h-5" /></a>
      </div>
      <div className="p-text-4 mt-20 text-xs uppercase tracking-widest"></div>
    </div>
  </footer>
);

/* ======================================================================================
   APP
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
    <div className="p-bg min-h-screen p-text-1 font-sans cursor-none overflow-x-hidden">
      <GlobalStyles />

      {/* Texture de bruit */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-50 opacity-[0.03] bg-[url('data:image/svg+xml,%3Csvg%20viewBox%3D%270%200%20200%20200%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Cfilter%20id%3D%27noiseFilter%27%3E%3CfeTurbulence%20type%3D%27fractalNoise%27%20baseFrequency%3D%270.65%27%20numOctaves%3D%273%27%20stitchTiles%3D%27stitch%27%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%27100%25%27%20height%3D%27100%25%27%20filter%3D%27url%28%23noiseFilter%29%27%2F%3E%3C%2Fsvg%3E')]"></div>

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