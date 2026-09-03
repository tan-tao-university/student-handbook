import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Image from 'next/image';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span className="flex items-center gap-3 text-foreground py-0.5">
          <Image
            src="/logo-ttu.png"
            alt="Logo Đại học Tân Tạo"
            width={36}
            height={42}
            className="h-9 w-auto object-contain shrink-0 drop-shadow-xs"
            priority
          />
          <span className="flex flex-col text-left justify-center">
            <span className="text-[14px] font-extrabold tracking-tight text-[#0d793d] dark:text-[#22c55e] uppercase leading-tight">
              ĐẠI HỌC TÂN TẠO
            </span>
            <span className="text-[13px] font-semibold text-zinc-900 dark:text-zinc-100 leading-tight mt-0.5">
              Sổ tay Sinh viên
            </span>
          </span>
        </span>
      ),
      url: '/',
    },
    links: [
      {
        type: 'main',
        text: 'Cổng thông tin TTU',
        url: 'https://ttu.edu.vn',
        external: true,
      },
    ],
  };
}
