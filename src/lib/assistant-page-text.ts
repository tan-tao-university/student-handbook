import { renderPlaceholder } from 'fumadocs-core/mdx-plugins/remark-llms.runtime';
import {
  BANK_TRANSFER_ACCOUNTS,
  BANK_TRANSFER_CONTENT_EXAMPLE,
  BANK_TRANSFER_CONTENT_PATTERN,
  DIRECT_PAYMENT_DETAILS,
  REGISTRATION_STEPS_ASSISTANT_TEXT,
} from './handbook-content';

const dynamicComponentRenderers = {
  BankTransferCard() {
    const accounts = Object.values(BANK_TRANSFER_ACCOUNTS)
      .map(
        (account) =>
          `- ${account.branch}: ${account.bankName} (${account.bankShortName}), số tài khoản ${account.accountNumber}, đơn vị thụ hưởng ${account.beneficiary}.`,
      )
      .join('\n');

    return `#### Thông tin chuyển khoản học phí TTU

${accounts}
- Nội dung chuyển khoản: ${BANK_TRANSFER_CONTENT_PATTERN}.
- Ví dụ: ${BANK_TRANSFER_CONTENT_EXAMPLE}.
- Có thể chuyển khoản 24/7 qua Napas bằng cách tìm ngân hàng NCB.`;
  },
  DirectPaymentCard() {
    return `#### Thanh toán trực tiếp tại trường

- Địa điểm: ${DIRECT_PAYMENT_DETAILS.location}.
- Địa chỉ: ${DIRECT_PAYMENT_DETAILS.address}.
- Thời gian làm việc: ${DIRECT_PAYMENT_DETAILS.officeHours}.`;
  },
  RegistrationSteps() {
    return REGISTRATION_STEPS_ASSISTANT_TEXT.map(
      (step, index) => `${index + 1}. **${step.title}:** ${step.description} Lưu ý: ${step.note}`,
    ).join('\n');
  },
};

export function renderAssistantPageText(processedMarkdown: string) {
  return renderPlaceholder(processedMarkdown, dynamicComponentRenderers);
}
