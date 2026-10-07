'use client';

import Link from 'next/link';
import { projectsData } from '../../data/projects';
import { useEffect, useState } from 'react';

const categories = [['全部', 'All'], ['编程艺术', 'Coding Arts'], ['游戏', 'Game'], ['AIGC', 'AIGC'], ['UIUX', 'UIUX'], ['品牌设计', 'Brand Design']] as const;

// Same grid and filters supplied by the user; only the relative data import is corrected.
export default function WorkPage() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get('category');
    if (requested) setActiveCategory(requested);
  }, []);
  const filteredProjects = activeCategory === 'All' ? projectsData : projectsData.filter(project => project.category === activeCategory);
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-zinc-700">
      <nav className="p-8 flex justify-between items-center max-w-7xl mx-auto border-b border-zinc-900">
        <Link href="/" className="font-mono text-lg tracking-wider font-bold hover:text-zinc-400 transition">RUIQI XIONG / PORTFOLIO</Link>
        <div className="space-x-8 font-mono text-sm tracking-wide">
          <Link href="/work" className="text-zinc-50 underline decoration-zinc-50 underline-offset-4">作品</Link>
          <Link href="/info" className="text-zinc-400 hover:text-zinc-50 transition">关于</Link>
          <Link href="/contact" className="text-zinc-400 hover:text-zinc-50 transition">联系</Link>
        </div>
      </nav>
      <div className="max-w-7xl mx-auto px-8 pt-12 flex flex-wrap gap-4 font-mono text-xs tracking-widest">
        {categories.map(([label, value]) => <button key={value} onClick={() => setActiveCategory(value)} className={`px-4 py-2 rounded-full border transition-all duration-300 ${activeCategory === value ? 'bg-zinc-100 text-zinc-950 border-zinc-100 font-bold' : 'bg-zinc-900/50 text-zinc-400 border-zinc-800/80 hover:text-zinc-100 hover:border-zinc-700'}`}>{label}</button>)}
      </div>
      <main className="max-w-7xl mx-auto p-8 py-8">
        {filteredProjects.length > 0 ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map(project => <Link href={`/work/${project.id}`} key={project.id} className="group block relative overflow-hidden bg-zinc-900 rounded-lg border border-zinc-800/50 hover:border-zinc-700 transition-all duration-500" onMouseEnter={() => setHoveredId(project.id)} onMouseLeave={() => setHoveredId(null)}>
            <div className="aspect-square w-full relative overflow-hidden bg-black">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={project.thumbnail} alt={project.title} className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${project.hoverVideo && hoveredId === project.id ? 'opacity-0' : 'opacity-100'}`} />
              {project.hoverVideo && <video src={project.hoverVideo} loop muted playsInline autoPlay className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${hoveredId === project.id ? 'opacity-100' : 'opacity-0'}`} />}
            </div>
            <div className="p-5 flex justify-between items-start"><div><h3 className="text-base font-medium tracking-wide group-hover:text-zinc-300 transition">{project.title}</h3><p className="text-xs text-zinc-500 mt-1 font-mono">{project.category}</p></div><span className="text-xs font-mono text-zinc-600 group-hover:text-zinc-400 transition">{project.year}</span></div>
          </Link>)}
        </div> : <div className="py-24 text-zinc-500 font-mono text-sm">该分类的项目将在这里展示。</div>}
      </main>
    </div>
  );
}
