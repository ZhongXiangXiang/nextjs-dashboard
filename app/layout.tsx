// 将全局样式导入layout根组件中，运用于全局
import '@/app/ui/global.css';

import { inter } from '@/app/ui/fonts';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
