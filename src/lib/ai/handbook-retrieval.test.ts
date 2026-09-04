import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { createHandbookChunks, retrieveHandbookChunks } from './handbook-retrieval';

const pages = [
  {
    url: '/tai-chinh/hoc-phi',
    title: 'Quy định Học phí & Thanh toán',
    description: 'Hướng dẫn học phí tại TTU.',
    content: `## Chính sách học phí\n\nHọc phí được giữ ổn định.\n\n## Chuyển khoản ngân hàng\n\nNgân hàng NCB, số tài khoản 100001166217. Nội dung: [MSSV] [Họ tên] Hoc phi [Học kỳ] [Năm học].`,
  },
  {
    url: '/luu-tru/tong-quan-ktx',
    title: 'Tổng quan Ký túc xá',
    description: 'Thông tin lưu trú.',
    content: '## Giờ giấc\n\nSinh viên phải về ký túc xá đúng giờ quy định.',
  },
  {
    url: '/doi-song-sinh-vien/quy-tac-ung-xu',
    title: 'Quy tắc Ứng xử Sinh viên TTU',
    description: 'Chuẩn mực ứng xử.',
    content: '## Tôn trọng\n\nSinh viên giao tiếp văn minh và tôn trọng cộng đồng.',
  },
];

describe('handbook retrieval', () => {
  const chunks = createHandbookChunks(pages);

  test('ưu tiên đúng đoạn chứa toàn bộ cụm ý', () => {
    const [result] = retrieveHandbookChunks(chunks, 'làm thế nào chuyển khoản học phí');

    assert.equal(result.url, '/tai-chinh/hoc-phi');
    assert.match(result.heading, /Chuyển khoản/);
    assert.match(result.content, /100001166217/);
  });

  test('tìm được câu hỏi không dấu và từ viết tắt', () => {
    const [result] = retrieveHandbookChunks(chunks, 'gio ve ktx');

    assert.equal(result.url, '/luu-tru/tong-quan-ktx');
  });

  test('chỉ tăng hạng trang hiện tại cho câu hỏi về trang này', () => {
    const [scoped] = retrieveHandbookChunks(chunks, 'tóm tắt trang này', {
      currentPageUrl: '/doi-song-sinh-vien/quy-tac-ung-xu',
    });
    const [global] = retrieveHandbookChunks(chunks, 'chuyển khoản học phí', {
      currentPageUrl: '/doi-song-sinh-vien/quy-tac-ung-xu',
    });

    assert.equal(scoped.url, '/doi-song-sinh-vien/quy-tac-ung-xu');
    assert.equal(global.url, '/tai-chinh/hoc-phi');
  });
});
