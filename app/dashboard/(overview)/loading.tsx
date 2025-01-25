// page level streaming(将路由拆分为多个chunks, 每个组件可以认为是一个chunk)
// loading.tsx组件会will be embedded as part of the static file, and sent first
// layout.tsx中的<SideNav>是静态的，会被立即渲染

// loading.tsx会被应用在invoices路由里，因为层级关系
// 使用 route groups, 将loading.tsx和page.tsx放在(overview)文件夹里，就形成了一个 route group，loading.tsx就只会应用在/dashboard里
import DashboardSkeleton from '@/app/ui/skeletons';

export default function Loading() {
  return <DashboardSkeleton />;
}
