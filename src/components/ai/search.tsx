'use client';

import {
  type ComponentProps,
  createContext,
  type ReactNode,
  type SyntheticEvent,
  use,
  useCallback,
  useEffect,
  useEffectEvent,
  useMemo,
  useRef,
  useState,
} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Add01Icon,
  ArrowRight01Icon,
  ArrowUp01Icon,
  Award01Icon,
  Building01Icon,
  CheckmarkCircle02Icon,
  CustomerSupportIcon,
  Delete02Icon,
  File01Icon,
  GraduationCapIcon,
  MoreHorizontalIcon,
  PanelRightCloseIcon,
  StopIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
} from '@hugeicons/core-free-icons';
import { cn } from '@/lib/cn';
import { useChat, type UseChatHelpers } from '@ai-sdk/react';
import { DefaultChatTransport, type Tool, type UIMessage, type UIToolInvocation } from 'ai';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export type ChatUIMessage = UIMessage<
  never,
  {
    client: {
      location: string;
      pageTitle: string;
    };
  }
>;

export type SearchTool = Tool<{ query: string; limit: number }, any>;

interface AISearchContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  chat: UseChatHelpers<ChatUIMessage>;
  handleSuggestionClick: (prompt: string) => void;
}

const Context = createContext<AISearchContextValue | null>(null);

interface QuickActionItem {
  title: string;
  prompt: string;
  icon: Parameters<typeof HugeiconsIcon>[0]['icon'];
}

interface CurrentPageDetails {
  pageTitle: string;
  sectionTitles: string[];
}
function cleanAssistantText(text: string): string {
  return text
    .replace(/<tool_call[\s\S]*?(?:<\/tool_call>|$)/gi, '')
    .replace(/<function[\s\S]*?(?:<\/function>|$)/gi, '')
    .replace(/<parameter[\s\S]*?(?:<\/parameter>|$)/gi, '')
    .trim();
}

function MarkdownRenderer({ text }: { text: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        a: ({ href, children, ...props }) => (
          <a
            href={href}
            target={href?.startsWith('http') ? '_blank' : undefined}
            rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="font-semibold text-[#0d793d] no-underline underline-offset-2 transition-opacity hover:underline dark:text-[#22c55e]"
            {...props}
          >
            {children}
          </a>
        ),
        p: ({ children }) => (
          <p className="mb-2.5 last:mb-0 leading-relaxed text-zinc-800 dark:text-zinc-200">
            {children}
          </p>
        ),
        ul: ({ children }) => (
          <ul className="list-disc pl-4 mb-2.5 space-y-1 text-zinc-800 dark:text-zinc-200 marker:text-zinc-400 dark:marker:text-zinc-500">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal pl-4 mb-2.5 space-y-1 text-zinc-800 dark:text-zinc-200 marker:text-zinc-400 dark:marker:text-zinc-500 font-medium">
            {children}
          </ol>
        ),
        li: ({ children }) => <li className="leading-relaxed font-normal">{children}</li>,
        strong: ({ children }) => (
          <strong className="font-semibold text-zinc-950 dark:text-zinc-50">{children}</strong>
        ),
        code: ({ children, className }) => (
          <code
            className={cn(
              'px-1.5 py-0.5 rounded text-xs font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-zinc-200/80 dark:border-zinc-700/80',
              className,
            )}
          >
            {children}
          </code>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-2 border-zinc-300 dark:border-zinc-700 pl-3 italic my-2.5 text-zinc-600 dark:text-zinc-400 text-xs">
            {children}
          </blockquote>
        ),
        table: ({ children }) => (
          <div className="overflow-x-auto my-3 rounded-xl border border-zinc-200 dark:border-zinc-800">
            <table className="w-full text-xs text-left border-collapse">{children}</table>
          </div>
        ),
        th: ({ children }) => (
          <th className="bg-zinc-50 dark:bg-zinc-900 p-2 font-semibold text-zinc-900 dark:text-zinc-100 border-b border-zinc-200 dark:border-zinc-800">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="p-2 border-b border-zinc-100 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200">
            {children}
          </td>
        ),
      }}
    >
      {text}
    </ReactMarkdown>
  );
}

/**
 * Notion-style Top Bar (Matching Image #2 & Image #3)
 */
function AISearchPanelHeader() {
  const { setOpen } = useAISearchContext();
  const { messages, setMessages } = useAISearchContext().chat;
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  return (
    <header className="relative shrink-0 border-b border-zinc-200/80 bg-white dark:border-zinc-800 dark:bg-black">
      <div className="flex h-12 items-center justify-between px-3">
        <div className="flex min-w-0 items-center gap-2">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
            <Image src="/logo-ttu.png" alt="" width={18} height={21} />
          </span>
          <span className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Trợ lý sinh viên TTU
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Tạo cuộc trò chuyện mới"
            title="Tạo cuộc trò chuyện mới"
            className="flex size-7 cursor-pointer items-center justify-center rounded-md text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d793d] dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
            onClick={() => setMessages([])}
          >
            <HugeiconsIcon icon={Add01Icon} size={16} strokeWidth={2} />
          </button>

          <div className="relative" ref={menuRef}>
            <button
              type="button"
              aria-label="Tùy chọn khác"
              aria-expanded={menuOpen}
              title="Tùy chọn khác"
              className="flex size-7 cursor-pointer items-center justify-center rounded-md text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d793d] dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <HugeiconsIcon icon={MoreHorizontalIcon} size={16} strokeWidth={2} />
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-8 z-50 w-52 rounded-lg border border-zinc-200 bg-white p-1 text-xs shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
                <Link
                  href="/lien-he/danh-ba-lien-he"
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors font-medium no-underline"
                  onClick={() => setMenuOpen(false)}
                >
                  <HugeiconsIcon icon={CustomerSupportIcon} size={14} strokeWidth={2} />
                  <span>Danh bạ liên hệ TTU</span>
                </Link>

                {messages.length > 0 && (
                  <button
                    type="button"
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors font-medium cursor-pointer"
                    onClick={() => {
                      setMessages([]);
                      setMenuOpen(false);
                    }}
                  >
                    <HugeiconsIcon icon={Delete02Icon} size={14} strokeWidth={2} />
                    <span>Xóa lịch sử chat</span>
                  </button>
                )}
              </div>
            )}
          </div>

          <button
            type="button"
            aria-label="Đóng"
            title="Đóng (Esc)"
            className="flex size-7 cursor-pointer items-center justify-center rounded-md text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d793d] dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
            onClick={() => setOpen(false)}
          >
            <HugeiconsIcon icon={PanelRightCloseIcon} size={16} strokeWidth={2} />
          </button>
        </div>
      </div>
    </header>
  );
}

const StorageKeyInput = '__ai_search_input';

function getCurrentPageTitle() {
  return (
    document.querySelector<HTMLElement>('#nd-docs-layout h1')?.textContent?.trim() ||
    document.title.split('|')[0]?.trim() ||
    'Trang hiện tại'
  );
}

function getCurrentPageContext() {
  return {
    location: location.href,
    pageTitle: getCurrentPageTitle(),
  };
}

function readCurrentPageDetails(): CurrentPageDetails {
  return {
    pageTitle: getCurrentPageTitle(),
    sectionTitles: Array.from(document.querySelectorAll<HTMLElement>('#nd-docs-layout article h2'))
      .map((heading) => heading.textContent?.trim())
      .filter((heading): heading is string => Boolean(heading))
      .slice(0, 2),
  };
}

function useCurrentPageDetails() {
  const pathname = usePathname();
  const [details, setDetails] = useState<CurrentPageDetails>({
    pageTitle: 'Trang hiện tại',
    sectionTitles: [],
  });

  useEffect(() => {
    const frame = requestAnimationFrame(() => setDetails(readCurrentPageDetails()));
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return details;
}

function getQuickActions({ pageTitle, sectionTitles }: CurrentPageDetails): QuickActionItem[] {
  const actions: QuickActionItem[] = [
    {
      title: 'Tóm tắt nội dung trang này',
      prompt: `Hãy tóm tắt nội dung quan trọng của trang “${pageTitle}”.`,
      icon: File01Icon,
    },
    ...sectionTitles.map((sectionTitle, index) => ({
      title: `Giải thích: ${sectionTitle}`,
      prompt: `Hãy giải thích rõ mục “${sectionTitle}” trong trang “${pageTitle}”.`,
      icon: index === 0 ? GraduationCapIcon : Award01Icon,
    })),
    {
      title: 'Tôi cần lưu ý hoặc thực hiện điều gì?',
      prompt: `Dựa trên trang “${pageTitle}”, sinh viên cần lưu ý hoặc thực hiện những việc gì?`,
      icon: Building01Icon,
    },
  ];

  return actions.slice(0, 4);
}

/**
 * Notion-style Floating Input Card (Matching Image #2 & Image #3)
 */
function AISearchInput() {
  const { status, sendMessage, stop } = useAISearchContext().chat;
  const { pageTitle } = useCurrentPageDetails();
  const [input, setInput] = useState(() => {
    if (typeof window === 'undefined') return '';
    return localStorage.getItem(StorageKeyInput) ?? '';
  });
  const isLoading = status === 'streaming' || status === 'submitted';

  const onStart = (e?: SyntheticEvent) => {
    e?.preventDefault();
    const message = input.trim();
    if (message.length === 0 || isLoading) return;

    void sendMessage({
      role: 'user',
      parts: [
        {
          type: 'data-client',
          data: getCurrentPageContext(),
        },
        {
          type: 'text',
          text: message,
        },
      ],
    });
    setInput('');
    localStorage.removeItem(StorageKeyInput);
  };

  return (
    <div className="shrink-0 bg-white px-3 pb-3 pt-2 dark:bg-black">
      <form
        onSubmit={onStart}
        className={cn(
          'relative flex flex-col rounded-2xl border p-2.5 transition-[border-color,box-shadow] duration-200',
          'border-zinc-300 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-950',
          'focus-within:border-[#0d793d] focus-within:ring-2 focus-within:ring-[#0d793d]/15 dark:focus-within:border-[#22c55e] dark:focus-within:ring-[#22c55e]/15',
        )}
      >
        <div className="mb-1.5 flex select-none items-center gap-1.5">
          <span
            className="inline-flex min-w-0 max-w-full items-center gap-1.5 rounded-md border border-zinc-200/80 bg-zinc-50 px-2 py-0.5 text-[11px] font-medium text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400"
            title={`Đang xem: ${pageTitle}`}
          >
            <Image src="/logo-ttu.png" alt="" width={11} height={13} />
            <span className="truncate">{pageTitle}</span>
          </span>
        </div>

        <textarea
          id="nd-ai-input"
          aria-label="Câu hỏi dành cho Trợ lý sinh viên TTU"
          value={input}
          placeholder="Hỏi về học vụ, học bổng, ký túc xá..."
          rows={2}
          disabled={isLoading}
          className="w-full resize-none bg-transparent py-1 text-sm leading-relaxed text-zinc-900 placeholder:text-zinc-400 focus:outline-hidden disabled:cursor-wait dark:text-zinc-100 dark:placeholder:text-zinc-500"
          onChange={(e) => {
            setInput(e.target.value);
            localStorage.setItem(StorageKeyInput, e.target.value);
          }}
          onKeyDown={(event) => {
            if (event.nativeEvent.isComposing || event.keyCode === 229) return;
            if (!event.shiftKey && event.key === 'Enter') {
              event.preventDefault();
              onStart(event);
            }
          }}
        />

        <div className="mt-1 flex items-center justify-between pt-1">
          <span className="text-[10px] text-zinc-400 dark:text-zinc-500">
            Enter để gửi · Shift + Enter xuống dòng
          </span>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-medium text-zinc-400 dark:text-zinc-500">
              Tự động
            </span>

            {isLoading ? (
              <button
                type="button"
                aria-label="Dừng sinh câu trả lời"
                className="flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-full bg-zinc-900 text-white shadow-xs transition-all hover:opacity-90 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d793d] dark:bg-zinc-100 dark:text-black"
                onClick={stop}
                title="Dừng sinh câu trả lời"
              >
                <HugeiconsIcon icon={StopIcon} size={12} strokeWidth={2.5} />
              </button>
            ) : (
              <button
                type="submit"
                aria-label="Gửi câu hỏi"
                disabled={input.trim().length === 0}
                className={cn(
                  'flex size-7 shrink-0 items-center justify-center rounded-full shadow-xs transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d793d]',
                  input.trim().length > 0
                    ? 'cursor-pointer bg-zinc-900 text-white hover:scale-105 active:scale-95 dark:bg-zinc-100 dark:text-black'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-600 cursor-not-allowed opacity-60',
                )}
                title="Gửi câu hỏi (Enter)"
              >
                <HugeiconsIcon icon={ArrowUp01Icon} size={15} strokeWidth={2.5} />
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

function List(props: Omit<ComponentProps<'div'>, 'dir'>) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    function callback() {
      const container = containerRef.current;
      if (!container) return;

      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth',
      });
    }

    const observer = new ResizeObserver(callback);
    callback();

    const element = containerRef.current?.firstElementChild;
    if (element) {
      observer.observe(element);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      {...props}
      className={cn('overflow-y-auto min-w-0 flex flex-col', props.className)}
    >
      {props.children}
    </div>
  );
}

type AgentStepState = 'waiting' | 'active' | 'complete';

interface AgentStep {
  label: string;
  state: AgentStepState;
}

function useElapsedSeconds() {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const startedAt = performance.now();
    const interval = window.setInterval(() => {
      setElapsed((performance.now() - startedAt) / 1000);
    }, 100);

    return () => window.clearInterval(interval);
  }, []);

  return elapsed;
}

function AgentThinkingIndicator({ label }: { label: string }) {
  const elapsed = useElapsedSeconds();

  return (
    <div
      data-agent-thinking=""
      role="status"
      className="flex min-h-7 items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400"
    >
      <span className="ai-agent-dot-grid" aria-hidden="true">
        {Array.from({ length: 9 }, (_, index) => (
          <span key={index} />
        ))}
      </span>
      <span className="ai-agent-thinking-label font-medium">{label}</span>
      <span className="ms-auto tabular-nums text-[10px] text-zinc-400 dark:text-zinc-500">
        {elapsed.toFixed(1)}s
      </span>
    </div>
  );
}

function AgentProgress({ steps, active }: { steps: AgentStep[]; active: boolean }) {
  const completeCount = steps.filter((step) => step.state === 'complete').length;
  const finished = completeCount === steps.length;
  const [expanded, setExpanded] = useState(!finished);

  return (
    <section
      data-agent-progress=""
      aria-label="Tiến trình xử lý câu hỏi"
      className="mb-3 rounded-lg border border-zinc-200 bg-zinc-50/70 dark:border-zinc-800 dark:bg-zinc-900/60"
    >
      <button
        type="button"
        aria-expanded={expanded}
        className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-2.5 py-2 text-left focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#0d793d]"
        onClick={() => setExpanded((value) => !value)}
      >
        <span className="relative size-3.5 shrink-0 rounded-full border border-zinc-300 dark:border-zinc-700">
          <span
            className={cn(
              'absolute inset-0.5 rounded-full bg-[#0d793d] transition-transform dark:bg-[#22c55e]',
              active ? 'ai-agent-progress-pulse scale-100' : 'scale-75',
            )}
          />
        </span>
        <span className="flex-1 text-[11px] font-semibold text-zinc-700 dark:text-zinc-300">
          {finished ? 'Đã hoàn tất các bước' : `${steps.length - completeCount} bước đang xử lý`}
        </span>
        <span className="text-[10px] tabular-nums text-zinc-400">
          {completeCount}/{steps.length}
        </span>
        <HugeiconsIcon
          icon={ArrowRight01Icon}
          size={13}
          strokeWidth={2}
          className={cn(
            'text-zinc-400 transition-transform duration-200 motion-reduce:transition-none',
            expanded && 'rotate-90',
          )}
        />
      </button>

      {expanded && (
        <ol className="space-y-1 border-t border-zinc-200/80 px-2.5 py-2 dark:border-zinc-800">
          {steps.map((step) => (
            <li
              key={step.label}
              data-state={step.state}
              className="flex items-center gap-2 text-[11px] text-zinc-500 dark:text-zinc-400"
            >
              {step.state === 'complete' ? (
                <HugeiconsIcon
                  icon={CheckmarkCircle02Icon}
                  size={13}
                  strokeWidth={2}
                  className="shrink-0 text-[#0d793d] dark:text-[#22c55e]"
                />
              ) : (
                <span
                  className={cn(
                    'ms-0.5 size-2.5 shrink-0 rounded-full border',
                    step.state === 'active'
                      ? 'ai-agent-progress-pulse border-[#0d793d] bg-[#0d793d]/20 dark:border-[#22c55e] dark:bg-[#22c55e]/20'
                      : 'border-zinc-300 dark:border-zinc-700',
                  )}
                />
              )}
              <span
                className={cn(
                  step.state === 'active' && 'font-medium text-zinc-800 dark:text-zinc-200',
                )}
              >
                {step.label}
              </span>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}

/**
 * Notion-style Chat Message (Matching Image #3)
 */
function Message({ message, active }: { message: ChatUIMessage; active: boolean }) {
  let markdown = '';
  const searchCalls: UIToolInvocation<SearchTool>[] = [];

  for (const part of message.parts ?? []) {
    if (part.type === 'text') {
      markdown += part.text;
      continue;
    }

    if (part.type.startsWith('tool-')) {
      const toolName = part.type.slice('tool-'.length);
      const p = part as UIToolInvocation<SearchTool>;

      if (toolName === 'search' && p.toolCallId) {
        searchCalls.push(p);
      }
    }
  }

  const isUser = message.role === 'user';

  if (isUser) {
    return (
      <div className="ms-10 flex items-end justify-end">
        <div className="max-w-[88%] rounded-[1.125rem] bg-zinc-100 px-3.5 py-2 text-sm font-normal leading-relaxed text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100">
          <p className="my-0 whitespace-pre-wrap">{markdown}</p>
        </div>
      </div>
    );
  }

  const searchStarted = searchCalls.length > 0;
  const searchComplete = searchCalls.some((call) => Array.isArray(call.output));
  const sourceCount = searchCalls.reduce(
    (total, call) => total + (Array.isArray(call.output) ? call.output.length : 0),
    0,
  );
  const cleanedMarkdown = isUser ? markdown : cleanAssistantText(markdown);
  const hasAnswer = cleanedMarkdown.trim().length > 0;
  const steps: AgentStep[] = [
    {
      label: 'Phân tích câu hỏi',
      state: searchStarted || hasAnswer ? 'complete' : active ? 'active' : 'waiting',
    },
    {
      label: sourceCount > 0 ? `Tra cứu Sổ tay TTU · ${sourceCount} nguồn` : 'Tra cứu Sổ tay TTU',
      state: searchComplete ? 'complete' : searchStarted ? 'active' : 'waiting',
    },
    {
      label: 'Soạn câu trả lời',
      state: !hasAnswer ? 'waiting' : active ? 'active' : 'complete',
    },
  ];
  const thinkingLabel = searchStarted
    ? searchComplete
      ? 'Đang soạn câu trả lời'
      : 'Đang tra cứu Sổ tay TTU'
    : 'Đang phân tích câu hỏi';

  return (
    <div className="me-2 flex items-start gap-2.5">
      <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
        <Image src="/logo-ttu.png" alt="" width={14} height={17} className="h-4 w-auto" />
      </span>

      <div className="flex-1 min-w-0">
        {(active || searchStarted) && (
          <AgentProgress key={active ? 'active' : 'complete'} steps={steps} active={active} />
        )}
        {active && <AgentThinkingIndicator label={thinkingLabel} />}

        {hasAnswer ? (
          <div className="text-sm text-zinc-900 dark:text-zinc-100 leading-relaxed font-normal">
            <MarkdownRenderer text={cleanedMarkdown} />
          </div>
        ) : !active && !isUser ? (
          <div className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed italic">
            Xin lỗi bạn, trợ lý chưa tổng hợp được câu trả lời phù hợp từ dữ liệu hiện tại. Bạn vui
            lòng thử lại hoặc diễn đạt câu hỏi chi tiết hơn nhé!
          </div>
        ) : null}

        {!active && hasAnswer && (
          <div className="flex items-center gap-1.5 mt-2 pt-0.5 text-zinc-400">
            <button
              type="button"
              aria-label="Đánh giá câu trả lời hữu ích"
              className="p-1 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors cursor-pointer"
              title="Hữu ích"
            >
              <HugeiconsIcon icon={ThumbsUpIcon} size={14} strokeWidth={1.8} />
            </button>
            <button
              type="button"
              aria-label="Báo câu trả lời chưa chính xác"
              className="p-1 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors cursor-pointer"
              title="Chưa chính xác"
            >
              <HugeiconsIcon icon={ThumbsDownIcon} size={14} strokeWidth={1.8} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export function AISearch({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const chat = useChat<ChatUIMessage>({
    id: 'ttu-handbook-ai-search',
    transport: new DefaultChatTransport({
      api: '/api/chat',
    }),
  });

  const handleSuggestionClick = useCallback(
    (prompt: string) => {
      void chat.sendMessage({
        role: 'user',
        parts: [
          {
            type: 'data-client',
            data:
              typeof window !== 'undefined'
                ? getCurrentPageContext()
                : { location: '', pageTitle: 'Trang hiện tại' },
          },
          {
            type: 'text',
            text: prompt,
          },
        ],
      });
    },
    [chat],
  );

  const contextValue = useMemo(
    () => ({ chat, open, setOpen, handleSuggestionClick }),
    [chat, open, handleSuggestionClick],
  );

  useEffect(() => {
    document.documentElement.toggleAttribute('data-ai-chat-open', open);
    return () => document.documentElement.removeAttribute('data-ai-chat-open');
  }, [open]);

  return <Context value={contextValue}>{children}</Context>;
}

/**
 * Notion-style Floating Launcher Button (Image #1 bottom right)
 */
export function AISearchTrigger({
  position = 'default',
  className,
  ...props
}: ComponentProps<'button'> & { position?: 'default' | 'float' }) {
  const { open, setOpen } = useAISearchContext();

  return (
    <button
      type="button"
      data-ai-chat-trigger=""
      data-state={open ? 'open' : 'closed'}
      aria-controls="ttu-ai-chat-panel"
      aria-expanded={open}
      className={cn(
        position === 'float' && [
          'group fixed bottom-4 right-4 z-40 cursor-pointer rounded-full p-[1.5px] shadow-md',
          'md:bottom-5 md:right-5',
          'lg:bottom-6 lg:right-6',
          'transition-[transform,opacity,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d793d]',
          open && 'pointer-events-none translate-y-4 opacity-0',
        ],
        className,
      )}
      onClick={() => setOpen(!open)}
      {...props}
    >
      <span className="flex items-center gap-2 rounded-full bg-white py-1.5 pr-3 pl-1.5 md:gap-2.5 md:py-2 md:pr-4 md:pl-2 lg:gap-3 lg:py-2.5 lg:pr-5 lg:pl-2.5 dark:bg-zinc-950">
        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#eef8f2] md:size-8 lg:size-9 dark:bg-white/10">
          <Image
            src="/logo-ttu.png"
            alt=""
            width={24}
            height={28}
            className="h-4 w-3.5 object-contain transition-transform duration-200 group-hover:scale-105 md:h-[23px] md:w-5 lg:h-7 lg:w-6"
          />
        </span>
        <span className="text-xs leading-none font-semibold whitespace-nowrap text-zinc-900 md:text-[13px] lg:text-sm dark:text-zinc-50">
          Trợ lý sinh viên TTU
        </span>
      </span>
    </button>
  );
}

/**
 * Notion-style Right Sidebar Panel (Matching Image #2 & Image #3)
 */
export function AISearchPanel() {
  const { open, setOpen } = useAISearchContext();
  const [actualOpen, setActualOpen] = useState(open);
  const openedOnce = useRef(false);
  useHotKey();

  if (open && !actualOpen) setActualOpen(open);

  useEffect(() => {
    if (open) {
      openedOnce.current = true;
      requestAnimationFrame(() => document.getElementById('nd-ai-input')?.focus());
      return;
    }

    if (openedOnce.current) {
      document.querySelector<HTMLButtonElement>('[data-ai-chat-trigger]')?.focus();
    }
  }, [open]);

  return (
    <>
      {actualOpen && (
        <div
          aria-hidden="true"
          className={cn(
            'fixed inset-0 z-40 bg-black/25 backdrop-blur-[1px] transition-opacity duration-200 dark:bg-black/50 lg:hidden',
            open ? 'opacity-100' : 'opacity-0 pointer-events-none',
          )}
          onClick={() => setOpen(false)}
          onTransitionEnd={() => {
            if (!open) setActualOpen(false);
          }}
        />
      )}
      {actualOpen && (
        <div
          id="ttu-ai-chat-panel"
          data-ai-chat-panel=""
          role="complementary"
          aria-label="Trợ lý sinh viên TTU"
          aria-hidden={!open}
          inert={!open}
          className={cn(
            'fixed inset-y-0 right-0 z-50 flex w-full flex-col lg:w-[var(--ai-chat-width)]',
            'border-l border-zinc-200 bg-white text-zinc-900 shadow-2xl dark:border-zinc-800 dark:bg-black dark:text-zinc-100 lg:shadow-none',
            'transition-transform duration-300 ease-out motion-reduce:transition-none',
            open ? 'translate-x-0' : 'translate-x-full',
          )}
          onTransitionEnd={() => {
            if (!open) setActualOpen(false);
          }}
        >
          <AISearchPanelHeader />
          <AISearchPanelList className="flex-1" />
          <AISearchInput />
        </div>
      )}
    </>
  );
}

/**
 * Notion-style List / Welcome Screen (Matching Image #2)
 */
function AISearchPanelList({ className, style, ...props }: ComponentProps<'div'>) {
  const { chat, handleSuggestionClick } = useAISearchContext();
  const currentPage = useCurrentPageDetails();
  const quickActions = getQuickActions(currentPage);
  const messages = chat.messages.filter((msg) => msg.role !== 'system');
  const isWorking = chat.status === 'streaming' || chat.status === 'submitted';
  const lastMessage = messages.at(-1);

  return (
    <List
      role="log"
      aria-label="Nội dung hội thoại với Trợ lý sinh viên TTU"
      aria-live="polite"
      className={cn('space-y-4 p-4', className)}
      style={style}
      {...props}
    >
      {messages.length === 0 ? (
        <div className="flex min-h-full flex-col justify-end px-1 pb-7">
          <div className="mb-5 flex flex-col items-center text-center">
            <div className="mb-3 flex size-12 items-center justify-center rounded-full border border-zinc-200 bg-white shadow-xs dark:border-zinc-800 dark:bg-zinc-950">
              <Image src="/logo-ttu.png" alt="" width={27} height={32} />
            </div>
            <h3 className="my-0 text-base font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
              Bạn cần hỗ trợ gì?
            </h3>
          </div>

          <div className="space-y-1">
            {quickActions.map((item) => (
              <button
                key={item.title}
                type="button"
                className="group flex w-full cursor-pointer items-center justify-between gap-3 rounded-md px-2.5 py-2 text-left text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-950 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#0d793d] dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-zinc-50"
                onClick={() => handleSuggestionClick(item.prompt)}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-200 transition-colors shrink-0">
                    <HugeiconsIcon icon={item.icon} size={15} strokeWidth={2} />
                  </span>
                  <span className="truncate leading-normal">{item.title}</span>
                </div>

                <span className="shrink-0 text-zinc-300 transition-colors group-hover:text-zinc-500 dark:text-zinc-700 dark:group-hover:text-zinc-400">
                  <HugeiconsIcon icon={ArrowRight01Icon} size={13} strokeWidth={2} />
                </span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {chat.error && (
            <div
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400"
            >
              <p className="font-bold mb-1">Không thể kết nối đến AI:</p>
              <p className="my-0 leading-relaxed">{chat.error.message}</p>
            </div>
          )}
          {messages.map((item, index) => (
            <Message
              key={item.id}
              message={item}
              active={isWorking && index === messages.length - 1 && item.role === 'assistant'}
            />
          ))}
          {isWorking && lastMessage?.role === 'user' && (
            <div className="me-2 flex items-start gap-2.5">
              <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
                <Image src="/logo-ttu.png" alt="" width={14} height={17} />
              </span>
              <div className="min-w-0 flex-1">
                <AgentThinkingIndicator label="Đang phân tích câu hỏi" />
              </div>
            </div>
          )}
        </div>
      )}
    </List>
  );
}

function useHotKey() {
  const { open, setOpen } = useAISearchContext();

  const onKeyPress = useEffectEvent((e: KeyboardEvent) => {
    if (e.key === 'Escape' && open) {
      setOpen(false);
      e.preventDefault();
    }

    if (e.key === '/' && (e.metaKey || e.ctrlKey)) {
      setOpen(!open);
      e.preventDefault();
    }
  });

  useEffect(() => {
    window.addEventListener('keydown', onKeyPress);
    return () => window.removeEventListener('keydown', onKeyPress);
  }, []);
}

function useAISearchContext() {
  const ctx = use(Context);
  if (!ctx) {
    throw new Error('useAISearchContext must be used within an <AISearch> provider');
  }
  return ctx;
}
