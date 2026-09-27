export interface Project {
  id: string;
  title: string;
  category: 'Coding Arts' | 'Game' | 'AIGC'; // 严格对应你的大分类
  tags: string[];
  year: string;
  thumbnail: string;       // 首页卡片封面图
  hoverVideo?: string;     // 鼠标悬停预览短视频（选填）
  description: string;     // 简介文字
  externalUrl?: string;    // 跳转网址
  externalUrlText?: string;// 按钮文本
  mainMedia: {
    type: 'image' | 'video';
    url: string;
  }[];                     // 详情页多媒体流
}

export const projectsData: Project[] = [
  {
    id: "the-cosmic-courier",
    title: "The Cosmic Courier",
    category: "Game",
    tags: ["Unity 3D", "Space Exploration", "Sci-Fi"],
    year: "2026",
    thumbnail: "/images/scene1.png", 
    description: "A VR balance and exploration game built in Unity, focusing on spatial perception and gaze control in a weightless cosmic environment.",
    mainMedia: [
      { type: 'video', url: '/videos/cosmic-gameplay.mp4' },
      { type: 'image', url: '/images/scene1.png' }
    ]
  },
  // 🔗 注意看这两个大括号之间的这个逗号！红线就是因为漏了它！
 {
    id: "film-soup",
    title: "FILM SOUP",
    category: "Coding Arts",
    tags: ["TouchDesigner", "Creative Coding", "Digital Archive", "Memory Reconstruction"],
    year: "2025",
    thumbnail: "/images/filmsoup-thumb.png",
    description: "An evolving field of digital film soup, where the smallest fragments of memory are dissolved, accumulated, and continuously reconfigured.",
    mainMedia: [
      // 🎬 🚀 重新加入这一行，确保视频流能够被组件正确读取！
      { type: 'video', url: '/videos/filmsoup-video.mp4' }, 
      
      // 🖼️ 背景大图
      { type: 'image', url: '/images/filmsoup-bg.jpg' }, 
      
      // 🚀 组 1：物理胶片汤扫描件 (Fig 1-4)
      { type: 'image', url: '/images/filmsoup-1.jpg' },
      { type: 'image', url: '/images/filmsoup-2.jpg' },
      { type: 'image', url: '/images/filmsoup-3.jpg' },
      { type: 'image', url: '/images/filmsoup-4.jpg' },
      
      // 🚀 组 2：TouchDesigner 实时生成 (Fig 5-7)
      { type: 'image', url: '/images/filmsoup-thumb.png' },
      { type: 'image', url: '/images/filmsoup-5.png' },
      { type: 'image', url: '/images/filmsoup-6.png' }
    ]
  },
  // 🔗 记得在 film-soup 的大括号后面加个逗号 ，然后再粘贴下面这段：
  {
    id: "fake-human-manufacturing-factory",
    title: "Fake Human Manufacturing Factory",
    category: "Game",
    tags: ["Unity 3D", "Dystopian Simulation", "Narrative Design", "Interactive Art"],
    year: "2026",
    thumbnail: "/images/fake1.jpg", // 🎯 遵照你的要求：使用 fake1 作为首页卡片封面图
    description: "The player will act as a \"pseudo-human creator\", working under the orders of the factory manager. The manager constantly emphasizes the importance of efficiency and \"integration into society\", but never explains where the pseudo-humans will be sent or what roles they will undertake. The manufacturing process is presented step by step, and each step is rationalized as a \"necessary procedure\". As the production process unfolds, the players come to understand that what they are involved in is not merely production, but rather a role akin to that of a executioner. The artificial humans manufactured are constantly sent out of the factory, and more and more of their kind are killed to obtain benefits that surpass those of ordinary humans.",
    mainMedia: [
      { type: 'image', url: '/images/fake1.jpg' },
      { type: 'image', url: '/images/fake2.jpg' },
      { type: 'image', url: '/images/fake3.jpg' },
      { type: 'image', url: '/images/fake4.jpg' },
      { type: 'image', url: '/images/fake5.jpg' }
    ]
  },
  // 🔗 别忘了在 fake-human 的大括号后面加个逗号 ，然后再粘贴下面这段：
  {
    id: "gossip-garden",
    title: "Gossip Garden",
    category: "Coding Arts",
    tags: ["p5.js", "Node.js", "Generative Art", "Algorithmic Critique"],
    year: "2026",
    thumbnail: "/images/gossip-thumb.png", // 首页缩略图
    description: "A Living Index of Algorithmic Amplification.\n\nGossip Garden visualises the economic logic of online scandal. On social media, gossip is not casual conversation — it is a measurable, monetised asset optimized by platforms. By extracting live public data of toxic keywords, the system computes a real-time 'Gossip Index' that feeds a generative ASCII botanical ecosystem. As toxicity accumulates, the plants grow sharper and mutate, questioning whether digital toxicity is a human failure or a systemic optimization strategy.",
    mainMedia: [
      { type: 'video', url: '/videos/gossip-garden.mp4' }, // 🚀 优先渲染视频
      { type: 'image', url: '/images/gossip-thumb.png' }
    ]
},

  // =====================================================
  // RESIDUAL SIGNAL
  // =====================================================
  {
    id: "residual-signal",
    title: "Residual Signal",
    category: "Coding Arts",
    tags: ["Creative Coding", "Interactive Art", "Digital Media"],
    year: "2026",

    // 把封面图放到 public/images/residual-signal.jpg
    thumbnail: "/images/residual-signal.jpg",

    description:
      "An experimental digital project exploring residual signals, fragmented information, and the traces left behind within computational environments.",

    externalUrl: "https://github.com/ruiqixiong7/Residual-Signal",
    externalUrlText: "VIEW ON GITHUB",

    mainMedia: [
      { type: "image", url: "/images/residual-signal.jpg" }
    ]
  },

  // =====================================================
  // TIPPING POINT
  // =====================================================
  {
    id: "tipping-point",
    title: "Tipping Point",
    category: "Coding Arts",
    tags: ["Creative Coding", "Interactive Media", "Generative Art"],
    year: "2026",

    // 把封面图放到 public/images/tipping-point.jpg
    thumbnail: "/images/tipping-point.jpg",

    description:
      "An interactive digital experiment investigating moments of instability, transformation, and the threshold at which a system shifts from one state into another.",

    externalUrl: "https://github.com/ruiqixiong7/Tipping-Point",
    externalUrlText: "VIEW ON GITHUB",

    mainMedia: [
      { type: "image", url: "/images/tipping-point.jpg" }
    ]
  },

  // =====================================================
  // NAMELESS CURRENT
  // =====================================================
  {
    id: "nameless-current",
    title: "Nameless Current",
    category: "Coding Arts",
    tags: ["Creative Coding", "Generative Art", "Digital Experience"],
    year: "2026",

    // 把封面图放到 public/images/nameless-current.jpg
    thumbnail: "/images/nameless-current.jpg",

    description:
      "A generative digital experience exploring invisible flows, unstable identities, and continuously shifting relationships within computational space.",

    externalUrl: "https://github.com/ruiqixiong7/Nameless-Current",
    externalUrlText: "VIEW ON GITHUB",

    mainMedia: [
      { type: "image", url: "/images/nameless-current.jpg" }
    ]
  }
];