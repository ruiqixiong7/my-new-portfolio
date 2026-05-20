import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // 开启纯静态导出
  images: {
    unoptimized: true, // 静态网站必须关闭 Next.js 自带的动态图片优化
  },
};

export default nextConfig;