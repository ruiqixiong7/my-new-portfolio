import { projectsData } from '../../../data/projects';
import ProjectContent from './ProjectContent'; // 🔗 引入刚才新建的客户端组件

// 🚀 1. 静态路由参数生成函数，完美在服务端运行
export async function generateStaticParams() {
  return projectsData.map((project) => ({
    id: project.id,
  }));
}

// 🚀 2. 默认导出入口，直接返回客户端内容组件
export default function ProjectDetailPage() {
  return <ProjectContent />;
}