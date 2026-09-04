import React from 'react';
import Link from 'next/link';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  ComputerIcon,
  Menu01Icon,
  Search01Icon,
  CheckmarkCircle02Icon,
  Coins01Icon,
  ArrowUpRight01Icon,
} from '@hugeicons/core-free-icons';

interface StepItem {
  step: string;
  title: string;
  icon: typeof ComputerIcon;
  actionText: React.ReactNode;
  note?: React.ReactNode;
}

const stepsData: StepItem[] = [
  {
    step: 'Bước 01',
    title: 'Đăng nhập Cổng Đào tạo MyTTU',
    icon: ComputerIcon,
    actionText: (
      <>
        Truy cập cổng đào tạo chính thức tại địa chỉ{' '}
        <Link
          href="https://my.ttu.edu.vn"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-semibold text-[#0d793d] dark:text-[#22c55e] hover:underline underline-offset-4"
        >
          <span>my.ttu.edu.vn</span>
          <HugeiconsIcon icon={ArrowUpRight01Icon} size={14} strokeWidth={2} />
        </Link>{' '}
        bằng tài khoản email sinh viên TTU (
        <code className="text-xs px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-mono">
          @student.ttu.edu.vn
        </code>
        ) được cấp khi nhập học.
      </>
    ),
    note: 'Nếu quên mật khẩu hoặc lỗi đăng nhập, liên hệ ngay Ban CNTT.',
  },
  {
    step: 'Bước 02',
    title: 'Vào Giao diện Đăng ký Học phần',
    icon: Menu01Icon,
    actionText: (
      <>
        Trên thanh công cụ / menu điều hướng chính của trang quản lý sinh viên, nhấn chọn trực tiếp
        vào biểu tượng hoặc mục{' '}
        <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-medium text-xs border border-zinc-200 dark:border-zinc-700">
          Đăng ký môn học
        </span>
        .
      </>
    ),
    note: 'Kiểm tra trạng thái học vụ trước khi đăng ký để đảm bảo không bị khóa cổng do nợ học phí.',
  },
  {
    step: 'Bước 03',
    title: 'Tìm kiếm Lớp Học phần Mở',
    icon: Search01Icon,
    actionText: (
      <>
        Chọn đúng trường dữ liệu{' '}
        <span className="font-semibold text-zinc-900 dark:text-zinc-100">"Học kỳ"</span> và{' '}
        <span className="font-semibold text-zinc-900 dark:text-zinc-100">"Năm học"</span> cần học,
        sau đó nhấn nút{' '}
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-semibold text-xs shadow-xs">
          Search
        </span>{' '}
        để hệ thống hiển thị danh sách tất cả các lớp học phần dự kiến mở trong kỳ.
      </>
    ),
    note: 'Đọc kỹ mã môn học, tên môn và ghi chú số lượng sinh viên tối đa của từng lớp.',
  },
  {
    step: 'Bước 04',
    title: 'Chọn Lớp & Đăng ký Môn học',
    icon: CheckmarkCircle02Icon,
    actionText: (
      <>
        Tại bảng{' '}
        <span className="font-semibold text-zinc-900 dark:text-zinc-100">"Danh sách môn học"</span>,
        duyệt đến học phần muốn học và nhấn nút{' '}
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-[#0d793d] dark:bg-[#22c55e] text-white dark:text-zinc-950 font-bold text-xs shadow-xs">
          Register
        </span>{' '}
        kế bên để thêm vào danh sách học phần cá nhân.
      </>
    ),
    note: 'Đặc biệt lưu ý thời khóa biểu, tránh chọn các lớp có khung giờ trùng lặp với môn chính khóa.',
  },
  {
    step: 'Bước 05',
    title: 'Rà soát Danh sách & Xác nhận Học phí',
    icon: Coins01Icon,
    actionText: (
      <>
        Chuyển sang mục{' '}
        <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-semibold text-xs border border-zinc-200 dark:border-zinc-700">
          Danh sách môn học đã đăng ký
        </span>{' '}
        để kiểm tra lại toàn bộ danh mục môn học, số tín chỉ, phòng học, giảng viên và xem chính xác
        mức học phí tương ứng cần nộp.
      </>
    ),
    note: 'Chụp lại màn hình hoặc lưu mã môn để đối chiếu khi cần hoàn thiện nghĩa vụ học phí.',
  },
];

export function RegistrationSteps() {
  return (
    <div className="not-prose my-6 space-y-3.5">
      {stepsData.map((item, index) => {
        const IconComponent = item.icon;
        return (
          <div
            key={item.step}
            className="group relative rounded-xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4 md:p-5 shadow-xs transition-all hover:border-[#0d793d]/50 dark:hover:border-[#22c55e]/40 hover:shadow-sm"
          >
            <div className="flex items-start gap-3.5 md:gap-4">
              {/* Step indicator badge */}
              <div className="shrink-0 flex items-center justify-center w-9 h-9 md:w-10 md:md:h-10 rounded-lg bg-[#eef8f2] dark:bg-emerald-950/50 text-[#0d793d] dark:text-emerald-400 border border-[#0d793d]/20 dark:border-emerald-500/20 font-bold text-xs md:text-sm">
                0{index + 1}
              </div>

              {/* Step details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <h4 className="text-sm md:text-base font-bold text-zinc-900 dark:text-zinc-100 leading-snug">
                    {item.title}
                  </h4>
                  <div className="shrink-0 text-zinc-400 dark:text-zinc-500 group-hover:text-[#0d793d] dark:group-hover:text-[#22c55e] transition-colors">
                    <HugeiconsIcon icon={IconComponent} size={18} strokeWidth={1.8} />
                  </div>
                </div>

                <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  {item.actionText}
                </p>

                {item.note && (
                  <div className="mt-2.5 pt-2 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center gap-1.5 text-[11px] md:text-xs text-zinc-500 dark:text-zinc-400">
                    <span className="font-semibold text-zinc-700 dark:text-zinc-300">Lưu ý:</span>
                    <span>{item.note}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
