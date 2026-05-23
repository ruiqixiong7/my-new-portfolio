import Link from 'next/link';
import { projectsData } from '../../../data/projects';

// 🚀 1. 服务端：生成静态路由参数（去掉了顶部的 'use client'，它就能正常工作了）
export async function generateStaticParams() {
  return projectsData.map((project) => ({
    id: project.id,
  }));
}

// 🚀 2. 客户端内容组件：引入 useParams 负责处理页面内的动态数据交互
import { useParams } from 'next/navigation';

function ProjectContent() {
  const params = useParams();
  
  // 安全获取当前的动态 id
  const currentId = typeof params?.id === 'string' ? params.id : '';
  const project = projectsData.find((p) => p.id === currentId);

  if (!project) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center font-mono">
        <p>Project not found.</p>
        <Link href="/" className="mt-4 text-zinc-400 hover:text-white underline">Back to home</Link>
      </div>
    );
  }

  // 分离媒体流：找到第一个视频作为主视频播放
  const introVideo = project.mainMedia.find(m => m.type === 'video');
  const otherMedia = project.mainMedia.filter(m => m !== introVideo);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-zinc-700">
      {/* 极简导航栏 */}
      <nav className="p-8 flex justify-between items-center max-w-5xl mx-auto">
        <Link href="/" className="font-mono text-sm tracking-widest text-zinc-400 hover:text-white transition">
          ← BACK TO WORK
        </Link>
        <span className="font-mono text-xs text-zinc-600">{project.year}</span>
      </nav>

      <main className="max-w-5xl mx-auto px-8 py-4 space-y-8">
        {/* 作品头部标题与标签 */}
        <div className="space-y-4">
          <h1 className="text-4xl font-light tracking-wide md:text-5xl">{project.title}</h1>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-zinc-900 rounded-full text-xs font-mono text-zinc-400 border border-zinc-800">
              {project.category}
            </span>
            {project.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-zinc-900/50 rounded-full text-xs font-mono text-zinc-500">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* 🎬 主秀多媒体播放区域 */}
        {introVideo ? (
          <div className="w-full aspect-video bg-black rounded-lg overflow-hidden border border-zinc-900 shadow-2xl">
            <video src={introVideo.url} controls autoPlay muted className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="w-full aspect-video bg-zinc-900/40 rounded-lg border border-zinc-800 flex items-center justify-center text-xs font-mono text-zinc-600">
            [ Showcase Video: 请确保在 public/videos 下放了对应的 mp4 视频文件 ]
          </div>
        )}

        {/* 📋 详情介绍与截图展示瀑布流 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-4">
          {/* 左侧：文字简介与体验链接 */}
          <div className="lg:col-span-1 space-y-6">
            <h2 className="text-sm font-mono tracking-wider text-zinc-400">ABOUT THE PROJECT</h2>
            <p className="text-zinc-400 leading-relaxed text-sm tracking-wide whitespace-pre-line">
              {project.description}
            </p>
            
            {/* 线上托管链接按钮 */}
            {project.externalUrl && (
              <div className="pt-4">
                <a 
                  href={project.externalUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-block w-full text-center text-xs font-mono bg-zinc-100 text-zinc-950 font-bold py-3 px-4 rounded hover:bg-zinc-300 transition duration-300 shadow-md"
                >
                  {project.externalUrlText || "Visit Live Site ↗"}
                </a>
              </div>
            )}
          </div>

          {/* 右侧：后续图文细节瀑布流 */}
          <div className="lg:col-span-2 space-y-8">
            {otherMedia.map((media, index) => (
              <div key={index} className="w-full bg-zinc-900 rounded-lg overflow-hidden border border-zinc-900">
                <img src={media.url} alt={`${project.title} detail ${index}`} className="w-full h-auto object-cover" />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

// 🚀 3. 默认导出入口组件
export default function ProjectDetailPage() {
  return <ProjectContent />;
}