const Navbar = ({ onHomeClick, isProjectOpen }) => (
  <nav className="fixed top-0 w-full p-8 flex justify-between items-center z-40 mix-blend-exclusion text-white">
    <div 
      className="text-xl font-['Playfair_Display'] italic font-bold tracking-wider cursor-pointer hover:opacity-70 transition-opacity"
      onClick={onHomeClick}
    >
      M.
    </div>
    
    <div className="flex items-center gap-8">
      {!isProjectOpen && (
        <div className="hidden md:flex gap-8 text-sm font-light tracking-widest uppercase font-['Inter']">
          <a href="#work" className="hover:text-slate-400 transition-colors">Projets</a>
          <a href="#about" className="hover:text-slate-400 transition-colors">A Propos</a>
          <a href="#contact" className="hover:text-slate-400 transition-colors">Contact</a>
        </div>
      )}
      
      {isProjectOpen && (
         <button onClick={onHomeClick} className="flex items-center gap-2 text-sm uppercase tracking-widest hover:text-slate-400 transition-colors font-['Inter']">
           <ArrowLeft className="w-4 h-4" /> Retour
         </button>
      )}

      {/* BOUTON CONTACT (Remplacement IA) */}
      <a 
        href="mailto:mon.email@etudiant.mmi.fr"
        className="flex items-center gap-2 px-5 py-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/40 transition-all text-sm uppercase tracking-wider group font-['Inter'] backdrop-blur-sm"
      >
        <Mail className="w-4 h-4 text-blue-300 group-hover:text-white transition-colors" />
        <span className="hidden md:inline">Me contacter</span>
      </a>
    </div>
  </nav>
);
