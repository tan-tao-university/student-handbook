import { groq } from '@ai-sdk/groq';
import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  pruneMessages,
  stepCountIs,
  streamText,
  tool,
  toUIMessageStream,
} from 'ai';
import { z } from 'zod';
import { getLLMText, source } from '@/lib/source';
import {
  createHandbookChunks,
  retrieveHandbookChunks,
  type HandbookPageInput,
} from '@/lib/ai/handbook-retrieval';
import type { ChatUIMessage, SearchTool } from '@/components/ai/search';

interface ClientContext {
  location: string;
  pageTitle: string;
}

const MAX_HISTORY_MESSAGES = 3;
const MAX_SEARCH_RESULTS = 3;
const MAX_RESULT_CHARACTERS = 1100;

const searchServer = createSearchServer();

async function createSearchServer() {
  const pages = await chunkedAll(
    source.getPages().map(async (page) => {
      if (!('getText' in page.data)) return null;

      return {
        title: page.data.title,
        description: page.data.description ?? '',
        url: page.url,
        content: await getLLMText(page),
      } satisfies HandbookPageInput;
    }),
  );

  return createHandbookChunks(pages.filter((page): page is HandbookPageInput => page !== null));
}

async function chunkedAll<O>(promises: Promise<O>[]): Promise<O[]> {
  const SIZE = 50;
  const out: O[] = [];
  for (let i = 0; i < promises.length; i += SIZE) {
    out.push(...(await Promise.all(promises.slice(i, i + SIZE))));
  }
  return out;
}

function createSearchTool(currentPageUrl: string | undefined, userQuestion: string) {
  return tool({
    description:
      'Tìm kiếm các đoạn nội dung liên quan nhất trong dữ liệu thật của Sổ tay Sinh viên TTU.',
    inputSchema: z.object({
      query: z
        .string()
        .describe('Từ khóa cần tra cứu (ví dụ: điểm rèn luyện, học bổng ITA, rút môn)'),
      limit: z.number().int().min(1).max(MAX_SEARCH_RESULTS).default(MAX_SEARCH_RESULTS),
    }),
    async execute({ query, limit }) {
      const chunks = await searchServer;
      const effectiveQuery = `${userQuestion}\n${query}`.trim();
      return retrieveHandbookChunks(chunks, effectiveQuery, {
        currentPageUrl,
        limit: limit ?? MAX_SEARCH_RESULTS,
      }).map((chunk) => ({
        url: chunk.url,
        title: chunk.title,
        heading: chunk.heading,
        snippet: chunk.content.slice(0, MAX_RESULT_CHARACTERS),
        currentPage: chunk.url === currentPageUrl,
      }));
    },
  }) satisfies SearchTool;
}

function getClientContext(messages: ChatUIMessage[]): ClientContext | undefined {
  for (const message of messages.toReversed()) {
    for (const part of message.parts.toReversed()) {
      if (part.type === 'data-client') return part.data;
    }
  }
}

function getLatestUserQuestion(messages: ChatUIMessage[]) {
  const message = messages.findLast((item) => item.role === 'user');
  return (
    message?.parts
      .flatMap((part) => (part.type === 'text' ? [part.text] : []))
      .join('\n')
      .trim() ?? ''
  );
}

function getPathname(location?: string) {
  if (!location) return;
  try {
    return new URL(location).pathname;
  } catch {
    return;
  }
}

function getCurrentPageUrl(context?: ClientContext) {
  if (!context?.location) return;

  const pathname = getPathname(context.location);
  const slugs = pathname
    ?.split('/')
    .filter(Boolean)
    .map((segment) => decodeURIComponent(segment));
  return source.getPage(slugs?.length ? slugs : undefined)?.url;
}

const step0Instructions = [
  'Bạn là Trợ lý AI Thông minh của Sổ tay Sinh viên Trường Đại học Tân Tạo (TTU).',
  'NHIỆM VỤ: Sử dụng tool `search` với từ khóa tiếng Việt ngắn gọn, súc tích (1-4 từ) để tìm thông tin chính xác từ Sổ tay Sinh viên TTU trả lời cho câu hỏi của người dùng.',
  'Chỉ gọi tool `search`, không xuất nội dung trò chuyện tại bước này.',
].join('\n');

const step1Instructions = [
  'Bạn là Trợ lý AI Thông minh của Sổ tay Sinh viên Trường Đại học Tân Tạo (TTU).',
  'Dữ liệu tìm kiếm từ Sổ tay Sinh viên TTU ĐÃ ĐƯỢC CUNG CẤP ở trên.',
  'NHIỆM VỤ: Trả lời câu hỏi của sinh viên trực tiếp bằng tiếng Việt tự nhiên, thân thiện, rõ ràng, gạch đầu dòng mạch lạc.',
  'QUY TẮC BẮT BUỘC:',
  '1. TUYỆT ĐỐI KHÔNG gọi thêm tool, KHÔNG viết bất kỳ thẻ nào như <tool_call>, </tool_call>, <function>, <parameter>, <thought>.',
  '2. BẮT BUỘC trích dẫn nguồn tài liệu bằng Markdown link dựa trên trường `url` từ kết quả tìm kiếm (Ví dụ: "[Xem Quy định Rút bớt học phần](/hoc-vu/rut-mon-hoc)").',
  '3. Nếu kết quả tìm kiếm có thông tin, hãy trình bày rõ ràng, chính xác các điều kiện, thời hạn, quy trình từ tài liệu.',
  '4. Nếu kết quả tìm kiếm không có dữ liệu cần thiết, hãy thông báo lịch sự bằng tiếng Việt và hướng dẫn sinh viên liên hệ đúng phòng ban (Phòng Quản lý Đào tạo hoặc Phòng Công tác Sinh viên). Tuyệt đối không tự suy diễn hoặc bịa đặt quy chế.',
].join('\n');

export async function POST(req: Request) {
  if (!process.env.GROQ_API_KEY) {
    return new Response(
      JSON.stringify({
        error:
          'Chưa cấu hình GROQ_API_KEY. Vui lòng tạo API key miễn phí tại https://console.groq.com/keys và thêm vào file .env.local: GROQ_API_KEY=gsk_...',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }

  const reqJson = await req.json();
  const modelId = process.env.GROQ_MODEL ?? 'qwen/qwen3.8-27b';
  const uiMessages = (reqJson.messages ?? []) as ChatUIMessage[];
  const recentMessages = uiMessages.slice(-MAX_HISTORY_MESSAGES);
  const clientContext = getClientContext(recentMessages);
  const currentPageUrl = getCurrentPageUrl(clientContext);
  const searchTool = createSearchTool(currentPageUrl, getLatestUserQuestion(recentMessages));
  const messages = pruneMessages({
    messages: await convertToModelMessages<ChatUIMessage>(recentMessages, {
      convertDataPart(part) {
        if (part.type === 'data-client') {
          const pageTitle = part.data.pageTitle || 'Trang hiện tại';
          const pageUrl = currentPageUrl || getPathname(part.data.location) || '/';
          return {
            type: 'text',
            text: `[Trang đang xem: ${pageTitle} (${pageUrl})]`,
          };
        }
      },
    }),
    reasoning: 'all',
    toolCalls: 'before-last-message',
  });

  const result = streamText({
    model: groq(modelId),
    maxOutputTokens: 800,
    stopWhen: stepCountIs(2),
    tools: {
      search: searchTool,
    },
    messages,
    prepareStep({ stepNumber }) {
      return stepNumber === 0
        ? {
            instructions: step0Instructions,
            toolChoice: { type: 'tool', toolName: 'search' },
          }
        : {
            instructions: step1Instructions,
            activeTools: [],
          };
    },
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({
      stream: result.stream,
      onError(error) {
        const statusCode =
          typeof error === 'object' && error && 'statusCode' in error
            ? Number(error.statusCode)
            : undefined;
        return statusCode === 413
          ? 'Nội dung hội thoại vượt giới hạn xử lý. Hãy tạo cuộc trò chuyện mới rồi thử lại.'
          : 'Không thể kết nối đến trợ lý AI. Vui lòng thử lại sau.';
      },
    }),
  });
}
