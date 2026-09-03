import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { Tabs, Tab } from 'fumadocs-ui/components/tabs';
import { Steps, Step } from 'fumadocs-ui/components/steps';
import { Accordion, Accordions } from 'fumadocs-ui/components/accordion';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    Tabs,
    Tab,
    Steps,
    Step,
    Accordion,
    Accordions,
    ...components,
  } satisfies MDXComponents;
}

declare global {
  type MDXProvidedComponents = MDXComponents;
}
