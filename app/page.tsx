'use client';

import Link from 'next/link';
import { projectsData } from '../data/projects';
import { useState } from 'react';

export default function HomePage() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  // 当前选中的分类，默认为 'All' 显示全部
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // 根据选中的分类过滤作品列表
  const filteredProjects = activeCategory === 'All' 
    ? projectsData 
    : projectsData.filter(project => project.category === activeCategory);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-zinc-700">
      {/* 极简导航栏 */}
      <nav className="p-8 flex justify-between items-center max-w-7xl mx-auto border-b border-zinc-900">
        <Link href="/" className="font-mono text-lg tracking-wider font-bold hover:text-zinc-400 transition">
          RUiqi XIONG / PORTFOLIO
        </Link>
        <div className="space-x-8 font-mono text-sm tracking-wide">
          <Link href="/" className="text-zinc-50 underline decoration-zinc-50 underline-offset-4">Work</Link>
          <Link href="/info" className="text-zinc-400 hover:text-zinc-50 transition">Info</Link>
          <Link href="/contact" className="text-zinc-400 hover:text-zinc-50 transition">Contact</Link>
        </div>
      </nav>

      {/* 🚀 核心更新：三大分类切换标签 (Coding Arts / Game / AIGC) */}
      <div className="max-w-7xl mx-auto px-8 pt-12 flex flex-wrap gap-4 font-mono text-xs tracking-widest">
        {['All', 'Coding Arts', 'Game', 'AIGC'].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full border transition-all duration-300 ${
              activeCategory === cat
                ? 'bg-zinc-100 text-zinc-950 border-zinc-100 font-bold'
                : 'bg-zinc-900/50 text-zinc-400 border-zinc-800/80 hover:text-zinc-100 hover:border-zinc-700'
            }`}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      {/* 作品网格流 */}
      <main className="max-w-7xl mx-auto p-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <Link 
              href={`/work/${project.id}`} 
              key={project.id}
              className="group block relative overflow-hidden bg-zinc-900 rounded-lg border border-zinc-800/50 hover:border-zinc-700 transition-all duration-500"
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="aspect-square w-full relative overflow-hidden bg-black">
                <img 
                  src={project.thumbnail} 
                  alt={project.title}
                  className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                    project.hoverVideo && hoveredId === project.id ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                {project.hoverVideo && (
                  <video
                    src={project.hoverVideo}
                    loop muted playsInline autoPlay
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                      hoveredId === project.id ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                )}
              </div>
              <div className="p-5 flex justify-between items-start">
                <div>
                  <h3 className="text-base font-medium tracking-wide group-hover:text-zinc-300 transition">
                    {project.title}
                  </h3>
                  <p className="text-xs text-zinc-500 mt-1 font-mono">{project.category}</p>
                </div>
                <span className="text-xs font-mono text-zinc-600 group-hover:text-zinc-400 transition">
                  {project.year}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}