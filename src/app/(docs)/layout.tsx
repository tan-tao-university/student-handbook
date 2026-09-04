import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import { AISearch, AISearchPanel, AISearchTrigger } from '@/components/ai/search';
import { SidebarIconRail } from '@/components/docs/sidebar-rail';
import { getSidebarRailItems } from '@/lib/sidebar-rail';

export default function Layout({ children }: LayoutProps<'/'>) {
  const tree = source.getPageTree();

  return (
    <DocsLayout tree={tree} {...baseOptions()}>
      <SidebarIconRail items={getSidebarRailItems(tree)} />
      <AISearch>
        <AISearchPanel />
        <AISearchTrigger position="float" />
        {children}
      </AISearch>
    </DocsLayout>
  );
}
