import { createElement, type ReactNode } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import * as HugeIcons from '@hugeicons/core-free-icons';

type IconDefinition = Parameters<typeof HugeiconsIcon>[0]['icon'];

const iconMap: Record<string, IconDefinition> = {
  // Category mappings for sidebar folders
  GraduationCap: HugeIcons.GraduationCapIcon,
  Building: HugeIcons.Building01Icon,
  Users: HugeIcons.UserGroupIcon,
  Award: HugeIcons.Award01Icon,
  ShieldAlert: HugeIcons.Shield01Icon,
  Shield: HugeIcons.Shield01Icon,
  BookOpen: HugeIcons.BookOpen01Icon,
  DollarSign: HugeIcons.Coins01Icon,
  Phone: HugeIcons.Call02Icon,
  HelpCircle: HugeIcons.HelpCircleIcon,
  Home: HugeIcons.Home01Icon,

  // Direct names
  GraduationCapIcon: HugeIcons.GraduationCapIcon,
  Mortarboard01Icon: HugeIcons.Mortarboard01Icon,
  Building01Icon: HugeIcons.Building01Icon,
  UserGroupIcon: HugeIcons.UserGroupIcon,
  Award01Icon: HugeIcons.Award01Icon,
  Shield01Icon: HugeIcons.Shield01Icon,
  BookOpen01Icon: HugeIcons.BookOpen01Icon,
  Coins01Icon: HugeIcons.Coins01Icon,
  Call02Icon: HugeIcons.Call02Icon,
  HelpCircleIcon: HugeIcons.HelpCircleIcon,
  File01Icon: HugeIcons.File01Icon,
};

export function resolveHugeIcon(icon?: string): ReactNode {
  if (!icon) return undefined;

  let IconDef = iconMap[icon];

  if (!IconDef) {
    const allIcons = HugeIcons as Record<string, unknown>;
    if (allIcons[icon]) {
      IconDef = allIcons[icon] as IconDefinition;
    } else if (allIcons[`${icon}Icon`]) {
      IconDef = allIcons[`${icon}Icon`] as IconDefinition;
    } else if (allIcons[`${icon}01Icon`]) {
      IconDef = allIcons[`${icon}01Icon`] as IconDefinition;
    }
  }

  if (!IconDef) {
    return undefined;
  }

  return createElement(HugeiconsIcon, {
    icon: IconDef,
    size: 18,
    strokeWidth: 1.6,
    className: 'shrink-0',
  });
}
