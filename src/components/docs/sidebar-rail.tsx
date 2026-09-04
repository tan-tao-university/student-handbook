'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSidebar } from 'fumadocs-ui/components/sidebar/base';
import { HugeiconsIcon } from '@hugeicons/react';
import { SidebarLeft01Icon } from '@hugeicons/core-free-icons';
import { cn } from '@/lib/cn';
import { Tooltip, TooltipProvider } from '@/components/ui/tooltip';
import type { RailItem } from '@/lib/sidebar-rail';

const railButtonClass =
  'flex size-9 shrink-0 items-center justify-center rounded-lg text-fd-muted-foreground transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d793d]';

/**
 * Icon-only rail shown in place of the sidebar once it's collapsed, so
 * navigation and branding stay reachable instead of disappearing entirely.
 * Hovering an icon reveals its label via tooltip; clicking it navigates
 * without re-expanding the sidebar.
 */
export function SidebarIconRail({ items }: { items: RailItem[] }) {
  const { collapsed, setCollapsed } = useSidebar();
  const pathname = usePathname();

  if (!collapsed) return null;

  return (
    <TooltipProvider delay={150}>
      <nav
        aria-label="Điều hướng thu gọn"
        className="fixed inset-y-2 start-2 z-20 hidden w-18 flex-col items-center gap-1 rounded-xl border border-fd-border bg-fd-card py-3 md:flex"
      >
        <Tooltip content="Sổ tay Sinh viên TTU" side="right">
          <Link href="/" aria-label="Trang chủ" className={railButtonClass}>
            <Image
              src="/logo-ttu.png"
              alt=""
              width={20}
              height={23}
              className="h-5 w-[17px] object-contain"
            />
          </Link>
        </Tooltip>

        <Tooltip content="Mở rộng thanh điều hướng" side="right">
          <button
            type="button"
            aria-label="Mở rộng thanh điều hướng"
            onClick={() => setCollapsed(false)}
            className={railButtonClass}
          >
            <HugeiconsIcon icon={SidebarLeft01Icon} size={18} strokeWidth={1.8} />
          </button>
        </Tooltip>

        <div className="my-1.5 h-px w-7 shrink-0 bg-fd-border" />

        <div className="flex min-h-0 flex-1 flex-col items-center gap-1 overflow-y-auto">
          {items.map((item) => {
            const active = item.matchUrls.some(
              (url) => pathname === url || pathname.startsWith(`${url}/`),
            );

            return (
              <Tooltip key={item.key} content={item.name} side="right">
                <Link
                  href={item.href}
                  aria-label={typeof item.name === 'string' ? item.name : undefined}
                  data-active={active}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    railButtonClass,
                    active && 'bg-fd-accent text-fd-accent-foreground',
                  )}
                >
                  {item.icon}
                </Link>
              </Tooltip>
            );
          })}
        </div>
      </nav>
    </TooltipProvider>
  );
}
