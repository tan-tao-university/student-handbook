import { getPageImageUrl, source } from '@/lib/source';
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/layouts/docs/page';
import { notFound } from 'next/navigation';
import { getMDXComponents } from '@/components/mdx';
import type { Metadata } from 'next';
import { createRelativeLink } from 'fumadocs-ui/mdx';

export default async function Page(props: PageProps<'/[[...slug]]'>) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;
  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <div className="border-b border-zinc-200 dark:border-zinc-800 pb-3.5 mb-4">
        <DocsTitle className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          {page.data.title}
        </DocsTitle>
        <DocsDescription className="mb-0 mt-1.5 text-sm md:text-base text-zinc-600 dark:text-zinc-400">
          {page.data.description}
        </DocsDescription>
      </div>
      <DocsBody>
        <MDX
          components={getMDXComponents({
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: PageProps<'/[[...slug]]'>): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();
  const isRoot = !params.slug || params.slug.length === 0;
  const title = isRoot ? { absolute: 'Sổ tay Sinh viên TTU - Đại học Tân Tạo' } : page.data.title;
  const ogImage = isRoot ? '/og-image.png' : getPageImageUrl(page).url;

  return {
    title,
    description: page.data.description,
    openGraph: {
      title: isRoot
        ? 'Sổ tay Sinh viên TTU - Đại học Tân Tạo'
        : `${page.data.title} | Sổ tay Sinh viên TTU`,
      description: page.data.description,
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: isRoot
        ? 'Sổ tay Sinh viên TTU - Đại học Tân Tạo'
        : `${page.data.title} | Sổ tay Sinh viên TTU`,
      description: page.data.description,
      images: [ogImage],
    },
  };
}
