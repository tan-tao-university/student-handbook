import type { Folder, Node, Root } from 'fumadocs-core/page-tree';
import type { ReactNode } from 'react';

export interface RailItem {
  key: string;
  icon: ReactNode;
  name: ReactNode;
  href: string;
  matchUrls: string[];
}

function collectPageUrls(node: Node): string[] {
  if (node.type === 'page') return [node.url];
  if (node.type === 'folder') {
    const urls = node.children.flatMap(collectPageUrls);
    if (node.index) urls.push(node.index.url);
    return urls;
  }
  return [];
}

function railItemFromFolder(node: Folder, index: number): RailItem | undefined {
  if (!node.icon) return undefined;
  const matchUrls = collectPageUrls(node);
  const href = node.index?.url ?? matchUrls[0];
  if (!href) return undefined;

  return { key: node.$id ?? `folder-${index}`, icon: node.icon, name: node.name, href, matchUrls };
}

/**
 * Flattens the top level of the page tree into icon-only rail entries.
 * Only folders/pages with an icon are shown; section separators and
 * icon-less nested pages are skipped (they stay reachable once expanded).
 */
export function getSidebarRailItems(tree: Root): RailItem[] {
  const items: RailItem[] = [];

  tree.children.forEach((node, index) => {
    if (node.type === 'folder') {
      const item = railItemFromFolder(node, index);
      if (item) items.push(item);
    } else if (node.type === 'page' && node.icon) {
      items.push({
        key: node.$id ?? node.url,
        icon: node.icon,
        name: node.name,
        href: node.url,
        matchUrls: [node.url],
      });
    }
  });

  return items;
}
