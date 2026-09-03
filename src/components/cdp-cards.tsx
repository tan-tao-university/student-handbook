import React, { type ComponentProps, type ReactNode } from 'react';
import Link from 'next/link';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Alert02Icon,
  InformationCircleIcon,
  CancelCircleIcon,
  CheckmarkCircle02Icon,
  ArrowUpRight01Icon,
} from '@hugeicons/core-free-icons';
import { resolveHugeIcon } from '@/lib/hugeicons-resolver';

interface CardsProps extends ComponentProps<'div'> {
  children: ReactNode;
  className?: string;
}

export function Cards({ children, className = '', ...props }: CardsProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 my-8 not-prose ${className}`} {...props}>
      {children}
    </div>
  );
}

interface CardProps extends Omit<ComponentProps<'div'>, 'title'> {
  title: ReactNode;
  description?: ReactNode;
  href?: string;
  icon?: ReactNode;
  children?: ReactNode;
  className?: string;
}

export function Card({
  title,
  description,
  href,
  icon,
  children,
  className = '',
  ...props
}: CardProps) {
  const renderedIcon = typeof icon === 'string' ? resolveHugeIcon(icon) : icon;

  const content = (
    <div
      className={`group relative flex flex-col justify-between rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black p-5 transition-all duration-200 shadow-none ${
        href
          ? 'hover:border-[#0d793d] dark:hover:border-[#22c55e] hover:bg-emerald-50/20 dark:hover:bg-emerald-950/10 hover:-translate-y-0.5 cursor-pointer'
          : ''
      } ${className}`}
      {...props}
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-3.5">
          {renderedIcon ? (
            <div className="flex items-center justify-center size-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-[#0d793d] dark:text-[#22c55e] border border-emerald-100 dark:border-emerald-900/40 [&_svg]:size-5 shadow-none transition-colors group-hover:bg-[#0d793d] group-hover:text-white dark:group-hover:bg-[#22c55e] dark:group-hover:text-black">
              {renderedIcon}
            </div>
          ) : (
            <div />
          )}
          {href && (
            <span className="text-zinc-400 dark:text-zinc-500 group-hover:text-[#0d793d] dark:group-hover:text-[#22c55e] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 shrink-0">
              <HugeiconsIcon icon={ArrowUpRight01Icon} size={20} strokeWidth={2} />
            </span>
          )}
        </div>
        <h3 className="font-semibold text-base text-zinc-900 dark:text-zinc-100 my-0 tracking-tight">
          {title}
        </h3>
        {description && (
          <p className="mt-2 mb-0 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
            {description}
          </p>
        )}
        {children && (
          <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
            {children}
          </div>
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="no-underline block">
        {content}
      </Link>
    );
  }

  return content;
}

interface CalloutProps {
  type?: 'info' | 'warn' | 'warning' | 'error' | 'success' | 'tip';
  title?: ReactNode;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

const calloutConfig = {
  warn: {
    barBgColor: 'bg-amber-500',
    iconColor: 'text-amber-500 dark:text-amber-400',
    titleColor: 'text-amber-950 dark:text-amber-200',
    icon: Alert02Icon,
  },
  warning: {
    barBgColor: 'bg-amber-500',
    iconColor: 'text-amber-500 dark:text-amber-400',
    titleColor: 'text-amber-950 dark:text-amber-200',
    icon: Alert02Icon,
  },
  error: {
    barBgColor: 'bg-red-500',
    iconColor: 'text-red-500 dark:text-red-400',
    titleColor: 'text-red-950 dark:text-red-200',
    icon: CancelCircleIcon,
  },
  success: {
    barBgColor: 'bg-emerald-500',
    iconColor: 'text-emerald-500 dark:text-emerald-400',
    titleColor: 'text-emerald-950 dark:text-emerald-200',
    icon: CheckmarkCircle02Icon,
  },
  info: {
    barBgColor: 'bg-[#0d793d] dark:bg-[#22c55e]',
    iconColor: 'text-[#0d793d] dark:text-[#22c55e]',
    titleColor: 'text-emerald-950 dark:text-emerald-200',
    icon: InformationCircleIcon,
  },
  tip: {
    barBgColor: 'bg-[#0d793d] dark:bg-[#22c55e]',
    iconColor: 'text-[#0d793d] dark:text-[#22c55e]',
    titleColor: 'text-emerald-950 dark:text-emerald-200',
    icon: InformationCircleIcon,
  },
};

export function Callout({ type = 'info', title, icon, children, className = '' }: CalloutProps) {
  const config = calloutConfig[type] || calloutConfig.info;
  const DefaultIcon = config.icon;

  return (
    <div
      className={`my-5 relative overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black p-4 md:p-5 pl-5 md:pl-6 shadow-none transition-colors ${className}`}
    >
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${config.barBgColor}`} />
      {title && (
        <div className="flex items-center gap-2 mb-2">
          {icon ?? (
            <span className={`shrink-0 ${config.iconColor}`}>
              <HugeiconsIcon icon={DefaultIcon} size={18} strokeWidth={2} />
            </span>
          )}
          <span className={`text-sm font-semibold tracking-tight ${config.titleColor}`}>
            {title}
          </span>
        </div>
      )}
      <div className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed prose-no-margin [&_p]:my-1.5 [&_ul]:my-1.5 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:my-1.5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:my-1.5">
        {children}
      </div>
    </div>
  );
}
