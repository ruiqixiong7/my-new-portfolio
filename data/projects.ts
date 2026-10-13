export interface Project {
  id: string;
  title: string;
  category: 'Coding Arts' | 'Game' | 'AIGC';
  tags: string[];
  year: string;

  // 封面
  thumbnail: string;
  hoverVideo?: string;

  // 项目介绍
  description: string;

  // GitHub 源代码
  githubUrl?: string;

  // 在线体验：Render / Vercel / 独立网站
  externalUrl?: string;
  externalUrlText?: string;

  // 详情页媒体
  mainMedia: {
    type: 'image' | 'video';
    url: string;
  }[];
}

export const projectsData: Project[] = [

  // =====================================================
  // THE COSMIC COURIER
  // =====================================================
  {
    id: "the-cosmic-courier",
    title: "The Cosmic Courier",
    category: "Game",
    tags: ["Unity 3D", "Space Exploration", "Sci-Fi"],
    year: "2026",

    thumbnail: "/images/scene1.png",

    description:
      "A VR balance and exploration game built in Unity, focusing on spatial perception and gaze control in a weightless cosmic environment.",

    mainMedia: [
      {
        type: "video",
        url: "/videos/cosmic-gameplay.mp4"
      },
      {
        type: "image",
        url: "/images/scene1.png"
      }
    ]
  },


  // =====================================================
  // FILM SOUP
  // =====================================================
  {
    id: "film-soup",
    title: "FILM SOUP",
    category: "Coding Arts",
    tags: [
      "TouchDesigner",
      "Creative Coding",
      "Digital Archive",
      "Memory Reconstruction"
    ],
    year: "2025",

    thumbnail: "/images/filmsoup-thumb.png",

    description:
      "An evolving field of digital film soup, where the smallest fragments of memory are dissolved, accumulated, and continuously reconfigured.",

    mainMedia: [
      {
        type: "video",
        url: "/videos/filmsoup-video.mp4"
      },

      {
        type: "image",
        url: "/images/filmsoup-bg.jpg"
      },

      {
        type: "image",
        url: "/images/filmsoup-1.jpg"
      },
      {
        type: "image",
        url: "/images/filmsoup-2.jpg"
      },
      {
        type: "image",
        url: "/images/filmsoup-3.jpg"
      },
      {
        type: "image",
        url: "/images/filmsoup-4.jpg"
      },

      {
        type: "image",
        url: "/images/filmsoup-thumb.png"
      },
      {
        type: "image",
        url: "/images/filmsoup-5.png"
      },
      {
        type: "image",
        url: "/images/filmsoup-6.png"
      }
    ]
  },


  // =====================================================
  // FAKE HUMAN MANUFACTURING FACTORY
  // =====================================================
  {
    id: "fake-human-manufacturing-factory",
    title: "Fake Human Manufacturing Factory",
    category: "Game",
    tags: [
      "Unity 3D",
      "Dystopian Simulation",
      "Narrative Design",
      "Interactive Art"
    ],
    year: "2026",

    thumbnail: "/images/fake1.jpg",

    description:
      "The player acts as a pseudo-human creator working under the orders of a factory manager. The manager constantly emphasizes efficiency and integration into society, but never explains where the pseudo-humans will be sent or what roles they will undertake. The manufacturing process is presented step by step, with each action rationalized as a necessary procedure. As production continues, the player gradually realizes that their role is not simply that of a manufacturer, but something closer to an executioner. The project explores obedience, industrialized violence, artificial identity, and the normalization of morally questionable systems.",

    mainMedia: [
      {
        type: "image",
        url: "/images/fake1.jpg"
      },
      {
        type: "image",
        url: "/images/fake2.jpg"
      },
      {
        type: "image",
        url: "/images/fake3.jpg"
      },
      {
        type: "image",
        url: "/images/fake4.jpg"
      },
      {
        type: "image",
        url: "/images/fake5.jpg"
      }
    ]
  },


  // =====================================================
  // GOSSIP GARDEN
  // =====================================================
  {
    id: "gossip-garden",
    title: "Gossip Garden",
    category: "Coding Arts",
    tags: [
      "p5.js",
      "Node.js",
      "Generative Art",
      "Algorithmic Critique"
    ],
    year: "2026",

    thumbnail: "/images/gossip-thumb.png",

    description:
      "A Living Index of Algorithmic Amplification. Gossip Garden visualises the economic logic of online scandal. On social media, gossip is not simply casual conversation — it becomes a measurable and monetised asset optimized by platforms. By extracting live public data associated with toxic keywords, the system computes a real-time Gossip Index that feeds a generative ASCII botanical ecosystem. As toxicity accumulates, the plants become sharper and begin to mutate, questioning whether digital toxicity is primarily a human failure or the result of systemic optimization.",

    mainMedia: [
      {
        type: "video",
        url: "/videos/gossip-garden.mp4"
      },
      {
        type: "image",
        url: "/images/gossip-thumb.png"
      }
    ]
  },


  // =====================================================
  // RESIDUAL SIGNAL
  // =====================================================
  {
    id: "residual-signal",
    title: "Residual Signal",
    category: "Coding Arts",
    tags: [
      "TouchDesigner",
      "Three.js",
      "WebSocket",
      "Interactive Installation"
    ],
    year: "2026",

    thumbnail: "/images/Residualsignal1.jpg",

    description:
      "Residual Signal is an interactive audiovisual installation exploring digital overstimulation, fragmented attention and cognitive overload. A webcam detects the presence of the viewer through TouchDesigner, converting physical presence into a binary signal that is transmitted to a Three.js environment through WebSocket. When a viewer enters the installation, the digital environment becomes active through animated neurons, reflective objects, video textures, spatial grids and glitch-based distortion. The work treats attention as an unstable interface between the human body and an increasingly saturated digital environment.",

    githubUrl:
      "https://github.com/ruiqixiong7/Residual-Signal",

    mainMedia: [
      {
        type: "image",
        url: "/images/Residualsignal1.jpg"
      },
      {
        type: "image",
        url: "/images/Residualsignal2.jpg"
      }
    ]
  },


  // =====================================================
  // TIPPING POINT
  // =====================================================
  {
    id: "tipping-point",
    title: "Tipping Point",
    category: "Coding Arts",
    tags: [
      "p5.js",
      "Agent Simulation",
      "Interactive Art",
      "Social Behaviour"
    ],
    year: "2026",

    thumbnail: "/images/tippingpoint1.png",

    description:
      "Tipping Point is an interactive web-based artwork investigating how subtle social cues, peer expectations and environmental contexts influence individual behaviour over time. Rather than presenting peer pressure as an immediate external force, the project visualises it as a process of hidden accumulation. Autonomous agents gradually respond to social feedback and move toward collective formations. When accumulated pressure reaches a critical threshold, the system collapses into high-frequency movement, spatial distortion and glitch, transforming an apparently stable social environment into an unstable collective state.",

    githubUrl:
      "https://github.com/ruiqixiong7/Tipping-Point",

    mainMedia: [
      {
        type: "image",
        url: "/images/tippingpoint1.png"
      }
    ]
  },


  // =====================================================
  // NAMELESS CURRENT
  // =====================================================
  {
    id: "nameless-current",
    title: "Nameless Current",
    category: "Coding Arts",
    tags: [
      "p5.js",
      "Node.js",
      "Socket.IO",
      "Networked Art"
    ],
    year: "2026",

    thumbnail: "/images/namelesscurrent1.png",

    description:
      "Nameless Current is a networked interactive artwork exploring the act of creating absence within continuous flows of information. A horizontally drifting field of ASCII characters forms a metaphor for contemporary information streams. Rather than generating more content, users interrupt and displace the flow, producing temporary voids that slowly dissolve back into the system. Multiple participants can reshape the same information landscape in real time, turning absence itself into a shared form of interaction.",

    githubUrl:
      "https://github.com/ruiqixiong7/Nameless-Current",

    externalUrl:
      "https://nameless-current.onrender.com",

    externalUrlText:
      "OPEN LIVE PROJECT",

    mainMedia: [
      {
        type: "image",
        url: "/images/namelesscurrent1.png"
      }
    ]
  },


  // =====================================================
  // ROMANCE SIGNAL
  // =====================================================
  {
    id: "romance-signal",
    title: "ROMANCE SIGNAL",
    category: "Game",
    tags: [
      "p5.js",
      "Interactive Narrative",
      "Cyberpunk",
      "Romance Game"
    ],
    year: "2026",

    thumbnail: "/images/romance-signal-1.png",

    description:
      "ROMANCE SIGNAL is a Chinese interactive narrative game staged entirely within a simulated computer desktop. A mysterious stranger who claims to know the player's past suddenly appears on screen and invites them on a midnight date. Through conversations, archived messages, photographs and music, the player decides what to believe, which memories to uncover and when to disconnect. The experience combines romance, digital intimacy and psychological uncertainty, with player choices leading toward multiple endings.",

    githubUrl:
      "https://github.com/ruiqixiong7/Romance-Signal",

    mainMedia: [
      {
        type: "video",
        url: "/videos/ROMANCESIGNAL.mp4"
      },
      {
        type: "image",
        url: "/images/romance-signal-1.png"
      }
    ]
  },


  // =====================================================
  // SOFT COLLAPSE
  // =====================================================
  {
    id: "soft-collapse",
    title: "Soft Collapse",
    category: "Coding Arts",
    tags: [
      "Creative Coding",
      "Interactive Media",
      "Digital Art"
    ],
    year: "2026",

    thumbnail: "/images/Soft-collapse-1.png",

    description:
      "An experimental digital work exploring instability, fragmentation and soft forms of collapse.",

    mainMedia: [
      {
        type: "video",
        url: "/videos/Soft Collapse.mp4"
      },
      {
        type: "image",
        url: "/images/Soft-collapse-1.png"
      }
    ]
  }

];