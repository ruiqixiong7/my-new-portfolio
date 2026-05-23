export interface Project {
  id: string;
  title: string;
  // 1. 对应你要求的三个大分类：Coding Arts / Game / AIGC
  category: 'Coding Arts' | 'Game' | 'AIGC';
  tags: string[];
  year: string;
  thumbnail: string;       // 首页卡片封面图
  hoverVideo?: string;     // 首页鼠标悬停时自动播放的短视频（选填）
  description: string;     // 简介文字
  externalUrl?: string;    // 简介中想嵌入的跳转网址（比如你的线上托管地址或参考网站）
  externalUrlText?: string;// 网址按钮显示的文本
  mainMedia: {             // 详情页里的多媒体（视频/图片）瀑布流
    type: 'image' | 'video';
    url: string;
  }[];
}

export const projectsData: Project[] = [
  {
    id: "the-cosmic-courier",
    title: "The Cosmic Courier",
    category: "Game",
    tags: ["Unity 3D", "Space Exploration", "Sci-Fi"],
    year: "2026",
    thumbnail: "/images/scene1.png", // ✨ 修正：让《The Cosmic Courier》使用这张宇航员的精美截图作为封面
    hoverVideo: "", 
    description: "《The Cosmic Courier》是一款富有沉浸感的宇宙探索游戏。\n\n在浩瀚的星际之间，玩家将扮演一名穿梭于未知星域的宇宙快递员。这里是你可以在浏览器里游玩或查看项目进展的线上托管完整版本：",
    externalUrl: "https://your-game-hosting-url.com", 
    externalUrlText: "Play The Cosmic Courier Online ↗",
    mainMedia: [
      { type: 'video', url: '/videos/cosmic-gameplay.mp4' }, // 详情页最上方的演示视频
      { type: 'image', url: '/images/scene1.png' }          // 详情页里也展示这张图
    ]
  },
  {
    id: "p5js-demo",
    title: "Interactive Particle Art",
    category: "Coding Arts",
    tags: ["p5.js", "Creative Coding"],
    year: "2026",
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500", // 修正：让创意编程用回临时的抽象网图（后续可以换成你自己的 p5 截图）
    description: "创意编程作品占位符...",
    mainMedia: []
  }
];