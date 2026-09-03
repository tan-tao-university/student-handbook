'use client';

import React, { useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Copy01Icon,
  CheckmarkCircle02Icon,
  Building01Icon,
  Coins01Icon,
  InformationCircleIcon,
} from '@hugeicons/core-free-icons';

interface CopyableFieldProps {
  label: string;
  value: string;
  displayValue?: string;
  copyValue?: string;
}

function CopyableField({ label, value, displayValue, copyValue }: CopyableFieldProps) {
  const [copied, setCopied] = useState(false);
  const textToCopy = copyValue || value;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 transition-colors">
      <div className="flex flex-col min-w-0">
        <span className="text-[11px] font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          {label}
        </span>
        <span className="text-sm md:text-base font-semibold text-zinc-900 dark:text-zinc-100 break-all select-all">
          {displayValue || value}
        </span>
      </div>
      <button
        type="button"
        onClick={handleCopy}
        className={`inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium shrink-0 transition-all cursor-pointer ${
          copied
            ? 'bg-emerald-600 text-white dark:bg-emerald-500'
            : 'bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 hover:border-[#0d793d] dark:hover:border-[#22c55e] hover:text-[#0d793d] dark:hover:text-[#22c55e]'
        }`}
        title={`Sao chép ${label}`}
      >
        <HugeiconsIcon
          icon={copied ? CheckmarkCircle02Icon : Copy01Icon}
          size={14}
          strokeWidth={2}
        />
        <span>{copied ? 'Đã chép' : 'Sao chép'}</span>
      </button>
    </div>
  );
}

export function BankTransferCard() {
  const [activeTab, setActiveTab] = useState<'longan' | 'hcm'>('longan');

  const accounts = {
    longan: {
      bankName: 'Ngân hàng TMCP Quốc Dân',
      bankShortName: 'NCB',
      branch: 'Chi nhánh Long An',
      accountNumber: '100001166217',
      accountNumberFormatted: '10000 1166 217',
      beneficiary: 'TRƯỜNG ĐẠI HỌC TÂN TẠO',
    },
    hcm: {
      bankName: 'Ngân hàng TMCP Quốc Dân',
      bankShortName: 'NCB',
      branch: 'Chi nhánh TP. Hồ Chí Minh',
      accountNumber: '100000115554',
      accountNumberFormatted: '10000 0115 554',
      beneficiary: 'TRƯỜNG ĐẠI HỌC TÂN TẠO',
    },
  };

  const current = accounts[activeTab];

  return (
    <div className="my-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black p-5 md:p-6 shadow-none">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-100 dark:border-zinc-800">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center size-9 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-[#0d793d] dark:text-[#22c55e] border border-emerald-100 dark:border-emerald-900/40">
            <HugeiconsIcon icon={Coins01Icon} size={20} strokeWidth={2} />
          </div>
          <div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 my-0">
              Thông tin Chuyển khoản Học phí TTU
            </h3>
          </div>
        </div>

        {/* Tab switch */}
        <div className="flex rounded-lg bg-zinc-100 dark:bg-zinc-900 p-1 border border-zinc-200 dark:border-zinc-800 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab('longan')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-all cursor-pointer ${
              activeTab === 'longan'
                ? 'bg-white dark:bg-black text-[#0d793d] dark:text-[#22c55e] shadow-xs'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
            }`}
          >
            CN Long An
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('hcm')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-all cursor-pointer ${
              activeTab === 'hcm'
                ? 'bg-white dark:bg-black text-[#0d793d] dark:text-[#22c55e] shadow-xs'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
            }`}
          >
            CN TP.HCM
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 mt-4">
        <CopyableField
          label="Ngân hàng thụ hưởng"
          value={current.bankName}
          displayValue={`${current.bankName} (Tên viết tắt: ${current.bankShortName})`}
          copyValue={current.bankName}
        />
        <CopyableField label="Chi nhánh" value={current.branch} />
        <CopyableField
          label="Số tài khoản"
          value={current.accountNumber}
          displayValue={current.accountNumberFormatted}
          copyValue={current.accountNumber}
        />
        <CopyableField label="Tên đơn vị thụ hưởng" value={current.beneficiary} />
        <CopyableField
          label="Cú pháp nội dung chuyển khoản mẫu"
          value="23010012 Nguyen Van A Hoc phi HK1 2023-2024"
          displayValue="[Mã SV] [Họ và tên] Hoc phi [Học kỳ] [Năm học]"
          copyValue="[MSSV] [Họ tên] Hoc phi HK1 2023-2024"
        />
      </div>

      <div className="mt-4 p-3.5 rounded-lg bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed flex items-start gap-2.5">
        <span className="text-[#0d793d] dark:text-[#22c55e] shrink-0 mt-0.5">
          <HugeiconsIcon icon={InformationCircleIcon} size={16} strokeWidth={2} />
        </span>
        <div className="space-y-1">
          <p className="my-0">
            <strong>Hướng dẫn chuyển khoản 24/7 (Napas):</strong> Khi chọn ngân hàng trên ứng dụng
            Banking, sinh viên tìm kiếm theo tên <strong>"{current.bankName}"</strong> hoặc viết tắt{' '}
            <strong>"{current.bankShortName}"</strong>.
          </p>
          <p className="my-0">
            <strong>Ví dụ cú pháp mẫu:</strong>{' '}
            <code className="px-1.5 py-0.5 rounded bg-white dark:bg-zinc-800 border border-emerald-200 dark:border-emerald-800 text-[#0d793d] dark:text-[#22c55e] font-mono text-xs">
              23010012 Nguyen Van A Hoc phi HK1 2023-2024
            </code>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

export function DirectPaymentCard() {
  return (
    <div className="my-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black p-5 md:p-6 shadow-none">
      <div className="flex items-center gap-2.5 pb-3 border-b border-zinc-100 dark:border-zinc-800">
        <div className="flex items-center justify-center size-9 rounded-lg bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800">
          <HugeiconsIcon icon={Building01Icon} size={20} strokeWidth={2} />
        </div>
        <div>
          <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 my-0">
            Thanh toán Trực tiếp tại Trường
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 my-0">
            Dành cho sinh viên hoặc phụ huynh nộp tiền mặt hoặc quẹt thẻ
          </p>
        </div>
      </div>

      <div className="mt-3 space-y-2 text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
        <p className="my-1">
          - <strong>Địa điểm</strong>: Phòng Tài chính – Kế toán, Tòa nhà Điều hành, Trường Đại học
          Tân Tạo.
        </p>
        <p className="my-1">
          - <strong>Địa chỉ</strong>: Đại lộ Đại học Tân Tạo, Tân Đức E.City, Huyện Đức Hòa, Tỉnh
          Long An.
        </p>
        <p className="my-1">
          - <strong>Thời gian làm việc</strong>: Thứ Hai đến Thứ Sáu (Sáng: 8h00 – 12h00 | Chiều:
          13h00 – 17h00).
        </p>
      </div>
    </div>
  );
}
