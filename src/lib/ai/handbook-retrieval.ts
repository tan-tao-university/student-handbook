export interface HandbookPageInput {
  url: string;
  title: string;
  description: string;
  content: string;
}

export interface HandbookChunk extends HandbookPageInput {
  id: string;
  heading: string;
  normalizedText: string;
}

interface RetrieveOptions {
  currentPageUrl?: string;
  limit?: number;
}

const MAX_CHUNK_CHARACTERS = 1400;
const STOP_WORDS = new Set([
  'ban',
  'cach',
  'can',
  'cho',
  'cua',
  'duoc',
  'gi',
  'hay',
  'hoi',
  'lam',
  'minh',
  'mot',
  'nhu',
  'nhung',
  'sinh',
  'the',
  'theo',
  'toi',
  'trong',
  'va',
  've',
]);

const QUERY_EXPANSIONS: Record<string, string[]> = {
  ktx: ['ky', 'tuc', 'xa', 'luu', 'tru'],
  mssv: ['ma', 'so', 'sinh', 'vien'],
  hocphi: ['hoc', 'phi', 'thanh', 'toan'],
  wifi: ['internet', 'mang'],
};

function normalizeSearchText(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLocaleLowerCase('vi')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function splitSection(content: string, maxCharacters = MAX_CHUNK_CHARACTERS) {
  const paragraphs = content.split(/\n{2,}/).filter(Boolean);
  const chunks: string[] = [];
  let current = '';

  for (const paragraph of paragraphs) {
    if (current && current.length + paragraph.length + 2 > maxCharacters) {
      chunks.push(current);
      current = '';
    }

    if (paragraph.length > maxCharacters) {
      if (current) chunks.push(current);
      for (let index = 0; index < paragraph.length; index += maxCharacters) {
        chunks.push(paragraph.slice(index, index + maxCharacters));
      }
      continue;
    }

    current = current ? `${current}\n\n${paragraph}` : paragraph;
  }

  if (current) chunks.push(current);
  return chunks;
}

export function createHandbookChunks(pages: HandbookPageInput[]): HandbookChunk[] {
  return pages.flatMap((page) => {
    const sections: Array<{ heading: string; content: string }> = [];
    let heading = page.title;
    let lines: string[] = [];

    const flush = () => {
      const content = lines.join('\n').trim();
      if (content) sections.push({ heading, content });
      lines = [];
    };

    for (const line of page.content.split('\n')) {
      const match = /^(#{2,4})\s+(.+)$/.exec(line.trim());
      if (match) {
        flush();
        heading = match[2].replace(/[*_`]/g, '').trim();
      } else {
        lines.push(line);
      }
    }
    flush();

    if (sections.length === 0) sections.push({ heading: page.title, content: page.content });

    let chunkIndex = 0;
    return sections.flatMap((section) =>
      splitSection(section.content).map((content) => {
        const id = `${page.url}::${chunkIndex++}`;
        return {
          ...page,
          id,
          heading: section.heading,
          content,
          normalizedText: normalizeSearchText(
            `${page.title} ${page.description} ${section.heading} ${content}`,
          ),
        };
      }),
    );
  });
}

function getQueryTerms(query: string) {
  const normalized = normalizeSearchText(query);
  const terms = normalized.split(' ').filter((term) => term.length > 1 && !STOP_WORDS.has(term));

  for (const [trigger, expansions] of Object.entries(QUERY_EXPANSIONS)) {
    if (normalized.includes(trigger)) terms.push(...expansions);
  }

  return [...new Set(terms)];
}

function isPageScopedQuery(query: string) {
  const normalized = normalizeSearchText(query);
  return ['trang nay', 'noi dung trang', 'trang dang xem'].some((term) =>
    normalized.includes(term),
  );
}

function scoreChunk(chunk: HandbookChunk, query: string, currentPageUrl?: string) {
  const normalizedQuery = normalizeSearchText(query);
  const normalizedTitle = normalizeSearchText(chunk.title);
  const normalizedHeading = normalizeSearchText(chunk.heading);
  const normalizedContent = normalizeSearchText(chunk.content);
  const terms = getQueryTerms(query);
  let score = 0;
  let matchedTerms = 0;

  for (const term of terms) {
    let matched = false;
    if (normalizedHeading.includes(term)) {
      score += 9;
      matched = true;
    }
    if (normalizedTitle.includes(term)) {
      score += 5;
      matched = true;
    }
    if (normalizedContent.includes(term)) {
      score += 2;
      matched = true;
    }
    if (matched) matchedTerms++;
  }

  if (terms.length > 0) score += (matchedTerms / terms.length) * 24;
  if (normalizedQuery && chunk.normalizedText.includes(normalizedQuery)) score += 30;
  if (isPageScopedQuery(query) && chunk.url === currentPageUrl) score += 100;

  return score;
}

export function retrieveHandbookChunks(
  chunks: HandbookChunk[],
  query: string,
  { currentPageUrl, limit = 3 }: RetrieveOptions = {},
) {
  return chunks
    .map((chunk) => ({ chunk, score: scoreChunk(chunk, query, currentPageUrl) }))
    .filter(({ score }) => score > 0)
    .sort((left, right) => right.score - left.score)
    .slice(0, limit)
    .map(({ chunk }) => chunk);
}
