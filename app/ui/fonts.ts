// custom Google fonts
// next/font字体优化，build构建时会自动下载对应font文件并与静态资源部署在一起，避免额外网络请求，造成布局移动layout shift
// 初始使用系统字体，等自定义字体加载并适用，会有字体大小、间距、布局改变，造成布局移动
import { Inter, Lusitana } from 'next/font/google';

export const inter = Inter({ subsets: ['latin'] });

export const lusitana = Lusitana({ subsets: ['latin'], weight: ['400', '700'] });
