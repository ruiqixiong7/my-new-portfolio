'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { projectsData } from '../../../data/projects';

export default function ProjectContent() {
  const params = useParams();

  const currentId = typeof params?.id === 'string' ? params.id : '';
  const project = projectsData.find((p) => p.id === currentId);

  // 灯箱状态
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!project) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center font-mono relative z-[100]">
        <p>Project not found.</p>
        <Link href="/" className="mt-4 text-zinc-400 hover:text-white underline relative z-[101]">Back to home</Link>
      </div>
    );
  }

  // 🎯 四大核心路由 ID 精准判断
  const isFilmSoup = project.id === 'film-soup';
  const isCosmic = project.id === 'the-cosmic-courier';
  const isFakeHuman = project.id === 'fake-human-manufacturing-factory';
  const isGossip = project.id === 'gossip-garden';

  // 🆕 是否是定制项目（有专属排版）
  const isCustom = isFilmSoup || isCosmic || isFakeHuman || isGossip;

  // 自动化大底图与视频提取
  const bgImage = project.mainMedia.find(m => m.type === 'image')?.url || "/images/scene1.png";
  const introVideo = project.mainMedia.find(m => m.type === 'video');

  // 🖼 通用图片渲染函数：自动读取 mainMedia 里所有 image
  const renderImages = (gridClass = "grid grid-cols-1 md:grid-cols-2 gap-4") => (
    <div className={gridClass}>
      {project.mainMedia
        .filter((m) => m.type === 'image')
        .map((media, i) => (
          <div
            key={i}
            className="rounded-lg overflow-hidden border border-zinc-900 cursor-zoom-in"
            onClick={() => setSelectedImage(media.url)}
          >
            <img
              src={media.url}
              alt={`Image ${i + 1}`}
              className="w-full h-auto object-cover hover:scale-105 transition duration-700"
            />
          </div>
        ))}
    </div>
  );

  return (
    <div className={`min-h-screen bg-[#0d0f0e] text-zinc-100 font-sans selection:bg-zinc-800 relative ${selectedImage ? 'overflow-hidden' : ''}`}>

      {/* 🏛 "IM Fell French Canon" 艺术字体（仅限 Film Soup） */}
      {isFilmSoup && (
        <link href="https://fonts.googleapis.com/css2?family=IM+Fell+French+Canon&display=swap" rel="stylesheet" />
      )}

      {/* 🖼 高清艺术背景定制 */}
      <div
        className="fixed inset-0 pointer-events-none z-0 bg-cover bg-center bg-no-repeat transition-all duration-1000"
        style={{
          backgroundImage: `url(${bgImage})`,
          opacity: isFilmSoup ? 0.15 : isGossip ? 0.04 : isFakeHuman ? 0.08 : 0.05,
          filter: isGossip ? 'contrast(100%) brightness(60%) saturate(50%)' : 'none'
        }}
      />

      {/* 胶片噪点层 */}
      {isFilmSoup && (
        <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03] bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=10')] mix-blend-overlay overflow-x-hidden" />
      )}

      {/* 🌟 全屏高清灯箱系统 */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-[#0d0f0e]/95 backdrop-blur-md z-[200] flex items-center justify-center p-4 md:p-12 cursor-zoom-out animate-fadeIn"
          onClick={() => setSelectedImage(null)}
        >
          <img src={selectedImage} alt="Expanded Media" className="max-w-full max-h-full rounded shadow-2xl object-contain" />
        </div>
      )}

      {/* 网页主体流 */}
      <div className="relative z-10">
        <nav className="p-8 flex justify-between items-center max-w-5xl mx-auto">
          <Link
            href="/"
            className={`font-mono text-sm tracking-widest transition duration-300 ${
              isFilmSoup ? 'text-emerald-500 hover:text-[#00FF66]' : 'text-zinc-400 hover:text-white'
            }`}
          >
            ← BACK TO WORK
          </Link>
          <span className="font-mono text-xs text-zinc-600">{project.year}</span>
        </nav>

        <main className="max-w-5xl mx-auto px-8 py-4 space-y-12">

          {/* ================= 标题区域 ================= */}
          <div className="space-y-4">
            <h1
              className={`tracking-wide transition-colors ${
                isFilmSoup
                  ? 'text-6xl md:text-8xl text-[#00FF66] uppercase font-bold'
                  : isGossip
                    ? 'text-4xl md:text-6xl font-light text-zinc-100 uppercase tracking-wide'
                    : 'text-4xl md:text-5xl font-light text-zinc-50'
              }`}
              style={isFilmSoup ? { fontFamily: "'IM Fell French Canon', serif" } : {}}
            >
              {project.title}
            </h1>

            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-xs font-mono text-zinc-400">
                {project.category}
              </span>
              {project.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-zinc-900/50 rounded-full text-xs font-mono text-zinc-500">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* 🎬 顶部大视频播放区 */}
          {introVideo && (
            <div className="w-full aspect-video bg-black rounded-lg overflow-hidden border border-zinc-900 shadow-2xl relative z-10">
              <video src={introVideo.url} controls autoPlay muted loop className="w-full h-full object-cover" />
            </div>
          )}

          {/* 📋 主体栏目双栏排版 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-4">

            {/* ⬅️ 左栏：About 核心描述与各个跳转按钮 */}
            <div className="lg:col-span-1 space-y-6">
              <div className="sticky top-8 space-y-6">
                <div className="space-y-4">
                  <h2 className="text-sm font-mono tracking-wider text-zinc-400 uppercase">
                    ABOUT THE PROJECT
                  </h2>
                  <p className="text-zinc-400 leading-relaxed text-sm tracking-wide whitespace-pre-line">
                    {project.description}
                  </p>
                </div>

                {/* 🚀 跳转1：Film Soup GitHub */}
                {isFilmSoup && (
                  <div className="pt-4">
                    <a href="https://github.com/ruiqixiong7/Film-Soup.git" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-full md:w-auto px-6 py-3 bg-zinc-100 hover:bg-zinc-200 text-zinc-950 font-mono text-xs font-bold tracking-widest uppercase rounded transition-all duration-300 transform hover:-translate-y-0.5">
                      Connect to GitHub →
                    </a>
                  </div>
                )}

                {/* 🚀 跳转2：Fake Human Itch.io */}
                {isFakeHuman && (
                  <div className="pt-4">
                    <a href="https://ruiqi-xiong.itch.io/fake-human-manufacturing-factory" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-full text-center px-6 py-4 bg-[#ff5544] hover:bg-[#ff3322] text-white font-mono text-xs font-bold tracking-widest uppercase rounded shadow-[0_4px_25px_rgba(255,85,68,0.25)] transition-all duration-300 transform hover:-translate-y-0.5">
                      PLAY ON ITCH.IO ↗
                    </a>
                  </div>
                )}

                {/* 🚀 跳转3：Gossip Garden 线上 Render 体验按钮 */}
                {isGossip && (
                  <div className="pt-4">
                    <a
                      href="https://gossip-garden-new-1.onrender.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-full text-center px-6 py-4 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border border-zinc-700 font-mono text-xs font-bold tracking-widest uppercase rounded shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                    >
                      LAUNCH PROJECT ↗
                    </a>
                  </div>
                )}

                {/* 🆕 通用 GitHub 按钮（非定制项目自动显示） */}
                {!isCustom && project.githubUrl && (
                  <div className="pt-2">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-full md:w-auto px-6 py-3 bg-zinc-100 hover:bg-zinc-200 text-zinc-950 font-mono text-xs font-bold tracking-widest uppercase rounded transition-all duration-300 transform hover:-translate-y-0.5"
                    >
                      Connect to GitHub →
                    </a>
                  </div>
                )}

                {/* 🆕 通用 Render 按钮（非定制项目自动显示） */}
                {!isCustom && project.externalUrl && (
                  <div className="pt-2">
                    <a
                      href={project.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-full text-center px-6 py-4 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border border-zinc-700 font-mono text-xs font-bold tracking-widest uppercase rounded shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                    >
                      {project.externalUrlText || 'LAUNCH PROJECT'} ↗
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* ➡️ 右栏：多媒体作品详情流 */}
            <div className="lg:col-span-2 space-y-16">

              {/* ------------ 情况 A：GOSSIP GARDEN ------------ */}
              {isGossip && (
                <div className="space-y-12">
                  <section className="space-y-4 bg-zinc-900/20 p-6 rounded-lg border border-zinc-900/80 backdrop-blur-sm">
                    <h2 className="text-sm font-mono tracking-widest text-zinc-400 uppercase font-semibold">Critical Framing</h2>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      Inspired by Platform Capitalism and data literacy research, Gossip Garden critiques the commodification of emotion. In digital spaces, toxicity is not an isolated social failure — it is a calculated optimization strategy. Platforms reward intensity; a garden implies cultivation. If toxicity grows faster than care, we must inevitably ask: <span className="text-zinc-200 border-b border-zinc-700 pb-0.5">Who is watering it?</span>
                    </p>
                    <div className="pt-2 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-zinc-500">
                      <span>• Anonymized Metrics</span>
                      <span>• Zero Raw Text Storage</span>
                      <span>• GDPR Compliant Architecture</span>
                    </div>
                  </section>

                  <section className="space-y-3">
                    <h3 className="text-xs font-mono tracking-wider text-zinc-500 uppercase">Algorithmic Index Calculation</h3>
                    <div className="p-5 bg-black rounded border border-zinc-900 font-mono text-xs text-zinc-300 space-y-2 overflow-x-auto shadow-inner">
                      <div className="text-zinc-500">// Real-time Dynamic Gossip Index Formula</div>
                      <div className="text-sm text-zinc-100 font-bold py-1">
                        Gossip Index = (Negative Sentiment × Interaction Volume × Post Frequency) / Time Window
                      </div>
                      <div className="text-zinc-500 text-[11px] pt-1">* Aggregated metrics updated periodically via Node.js server. No user metadata retained.</div>
                    </div>
                  </section>

                  <section className="space-y-3">
                    <h3 className="text-xs font-mono tracking-wider text-zinc-500 uppercase">Data-to-Botany Translation Matrix</h3>
                    <div className="border border-zinc-900 rounded-lg overflow-hidden text-sm">
                      <table className="w-full text-left font-mono text-xs text-zinc-400">
                        <thead className="bg-zinc-900/50 text-zinc-500 border-b border-zinc-900">
                          <tr>
                            <th className="p-3">Data Input</th>
                            <th className="p-3">Generative Visual Behaviour</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-900/40">
                          <tr><td className="p-3 font-semibold text-zinc-300">Post Volume</td><td className="p-3">Trunk height accumulation</td></tr>
                          <tr><td className="p-3 font-semibold text-zinc-300">Engagement Rate</td><td className="p-3">Branching density & complexity</td></tr>
                          <tr><td className="p-3 font-semibold text-zinc-300">Negativity Level</td><td className="p-3">Sharpness of structural growth</td></tr>
                          <tr><td className="p-3 font-semibold text-zinc-300">Toxicity Score</td><td className="p-3">Thorn formation & structural defense</td></tr>
                          <tr><td className="p-3 font-semibold text-zinc-300">Sudden Data Spikes</td><td className="p-3">Bloom / glowing burst events</td></tr>
                          <tr><td className="p-3 font-semibold text-zinc-300">Sustained High Metric</td><td className="p-3">Root system ecological expansion</td></tr>
                        </tbody>
                      </table>
                    </div>
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-xs font-mono tracking-wider text-zinc-500 uppercase">Iterative Evolution Phases</h3>
                    <div className="space-y-3 border-l border-zinc-900 pl-4 ml-2 font-mono text-xs">
                      <div className="relative"><span className="absolute -left-[21px] top-1 w-2 h-2 rounded-full bg-zinc-700"/>
                        <span className="text-zinc-300 font-bold">Phase 1 – Perlin-Noise Branched Roots</span>
                        <p className="text-zinc-500 mt-0.5">Initial linear branch system driven by basic Perlin-noise mapped to engagement weight.</p>
                      </div>
                      <div className="relative"><span className="absolute -left-[21px] top-1 w-2 h-2 rounded-full bg-zinc-700"/>
                        <span className="text-zinc-300 font-bold">Phase 2 – Organic Volumetric Glow</span>
                        <p className="text-zinc-500 mt-0.5">Replaced basic line strokes with vector filled-forms and canvas shadow-blur glow profiles.</p>
                      </div>
                      <div className="relative"><span className="absolute -left-[21px] top-1 w-2 h-2 rounded-full bg-zinc-700"/>
                        <span className="text-zinc-300 font-bold">Phase 3 – Material Canvas Texture</span>
                        <p className="text-zinc-500 mt-0.5">Introduced multi-layer watercolor blur diffusions, saturation nodes, and granular fiber paper noise textures.</p>
                      </div>
                      <div className="relative"><span className="absolute -left-[21px] top-1 w-2 h-2 rounded-full bg-zinc-700"/>
                        <span className="text-zinc-300 font-bold">Phase 4 – Ecological Persistence Mechanism</span>
                        <p className="text-zinc-500 mt-0.5">Plants no longer reset on keyword changes. Growth accumulates to layer digital attention memory.</p>
                      </div>
                      <div className="relative"><span className="absolute -left-[21px] top-1 w-2 h-2 rounded-full bg-zinc-400"/>
                        <span className="text-zinc-100 font-bold">Phase 5 – Typographic ASCII Dot-Matrix Texture</span>
                        <p className="text-zinc-400 mt-0.5">Surfaces transformed into an organic typographic matrix, referencing computational infrastructure and raw data materiality.</p>
                      </div>
                    </div>
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-xs font-mono tracking-wider text-zinc-500 uppercase">Visual Archive</h3>
                    {renderImages()}
                  </section>
                </div>
              )}

              {/* ------------ 情况 B：FILM SOUP ------------ */}
              {isFilmSoup && (
                <div className="space-y-14">
                  <section className="space-y-4 bg-zinc-900/20 p-6 rounded-lg border border-zinc-900/80 backdrop-blur-sm">
                    <h2 className="text-md font-mono tracking-widest text-[#00FF66] uppercase font-semibold">Inspiration & Concept</h2>
                    <p className="text-zinc-400 text-sm leading-relaxed">In my research, I examined a range of artistic practices that explore time and memory through image layering, geometric structures...</p>
                  </section>
                  {renderImages("grid grid-cols-2 md:grid-cols-4 gap-3")}
                </div>
              )}

              {/* ------------ 情况 C：FAKE HUMAN ------------ */}
              {isFakeHuman && (
                <div className="space-y-12">
                  <section className="space-y-4 bg-zinc-900/10 p-6 rounded-lg border border-zinc-900/60">
                    <h2 className="text-sm font-mono tracking-widest text-red-400 uppercase font-bold">FACTORY DIRECTIVE</h2>
                  </section>
                  {renderImages()}
                </div>
              )}

              {/* ------------ 情况 D：THE COSMIC COURIER ------------ */}
              {isCosmic && (
                <div className="space-y-12">
                  <section className="space-y-4">
                    <h2 className="text-lg font-mono tracking-wider text-zinc-200 border-b border-zinc-900 pb-2 uppercase">WORLD SETTING</h2>
                  </section>
                  {renderImages()}
                </div>
              )}

              {/* ------------ 情况 E：通用模板（其余所有项目） ------------ */}
              {!isCustom && (
                <div className="space-y-12">
                  <section className="space-y-4">
                    <h2 className="text-sm font-mono tracking-wider text-zinc-400 uppercase border-b border-zinc-900 pb-2">
                      PROJECT MEDIA
                    </h2>
                  </section>

                  {project.mainMedia.length > 0 ? (
                    renderImages()
                  ) : (
                    <p className="text-zinc-500 font-mono text-sm italic">
                      Media coming soon...
                    </p>
                  )}
                </div>
              )}

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}