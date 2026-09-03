# AGENTS.md — TTU Student Handbook

Hệ thống tài liệu hướng dẫn và quy tắc dành cho các AI Coding Agents khi làm việc trên dự án **Sổ tay Sinh viên Trường Đại học Tân Tạo (TTU)**.

---

## 1. Tổng quan Dự án

- **Tên dự án**: Sổ tay Sinh viên Đại học Tân Tạo (Tan Tao University - TTU)
- **Mục tiêu**: Cung cấp cẩm nang tra cứu trực tuyến toàn diện, hiện đại về quy chế học vụ, ký túc xá, đời sống, điểm rèn luyện, tín chỉ kỹ năng mềm, học bổng và danh bạ liên hệ cho sinh viên TTU.
- **Tài liệu nguồn gốc**: `So_tay_sinh_vien.pdf` và website chính thức `https://ttu.edu.vn`.

---

## 2. Công nghệ & Thư viện (Tech Stack)

| Thành phần                    | Công nghệ / Thư viện                                                  | Ghi chú                                             |
| :---------------------------- | :-------------------------------------------------------------------- | :-------------------------------------------------- |
| **Runtime & Package Manager** | **Bun** (`v1.4+`)                                                     | Bắt buộc sử dụng `bun`, không dùng `npm` hay `yarn` |
| **Framework**                 | **Next.js 16** (App Router, Turbopack)                                | Typed routes, React 19 Server Components            |
| **Documentation Engine**      | **Fumadocs** (`fumadocs-core`, `fumadocs-ui`, `fumadocs-mdx`)         | Headless loader, search modal, page tree            |
| **Styling**                   | **Tailwind CSS v4** + `@import 'fumadocs-ui/css/neutral.css'`         | High-contrast custom theme variables                |
| **Iconography**               | **Hugeicons Free** (`@hugeicons/core-free-icons`, `@hugeicons/react`) | Tích hợp qua `src/lib/hugeicons-resolver.tsx`       |
| **Quality Tooling**           | `oxlint`, `oxfmt`, `knip`, `jscpd`, `commitlint`, `lefthook`          | Bộ công cụ kiểm thử & định dạng siêu tốc            |

---

## 3. Quy chuẩn Thiết kế & Nhận diện Thương hiệu

### Màu sắc (Brand Colors)

- **Màu xanh nhận diện TTU**: **`#0d793d`** (trích xuất chuẩn xác từ chiếc khiên logo trường).
  - Light mode: text `#0d793d`, accent background `#eef8f2`.
  - Dark mode: text `#22c55e` hoặc `#10b981`.
- **Light mode**: Bắt buộc sử dụng nền **trắng tinh khiết (`#ffffff`)**, thẻ card trắng, viền `#e4e4e7`, chữ `#09090b`. **Tuyệt đối không sử dụng nền lợt lợt / nhờ nhờ / ám xanh**.
- **Dark mode**: Bắt buộc sử dụng nền **đen tuyền (`#000000`)**, nền thẻ đen bóng sâu (`#09090b`), viền tối `#27272a`.

### Logo & Favicon

- Logo chính: `public/logo-ttu.png` (cũng được đặt tại `src/app/icon.png` làm favicon tự động).
- Header: Logo chiều cao `h-9` kèm tên trường "ĐẠI HỌC TÂN TẠO" (`#0d793d`, in hoa) và "Sổ tay Sinh viên" (`text-[13px] font-semibold`).

---

## 4. Cấu trúc Thư mục & Routing

- **Docs tại Root (`/`)**: Toàn bộ tài liệu được phục vụ trực tiếp từ trang chủ `/` (không có tiền tố `/docs/`).
- **Route Group**: `src/app/(docs)/[[...slug]]/page.tsx` và `layout.tsx`.
- **Thư mục nội dung**: `content/docs/`:
  - `index.mdx`: Trang chủ giới thiệu, lãnh đạo và các thẻ truy cập nhanh.
  - `hoc-vu/`: Đăng ký môn học, rút môn, đánh giá & điểm số, liêm chính học thuật.
  - `luu-tru/`: Ký túc xá năm nhất, nhà ăn, nội quy & khung xử lý vi phạm.
  - `doi-song-sinh-vien/`: Hoạt động câu lạc bộ, Hội Sinh viên, hỗ trợ y tế, thẻ sinh viên, quy tắc ứng xử.
  - `ren-luyen/`: Quy chế điểm rèn luyện (thang 100), tín chỉ kỹ năng mềm (30 giờ/tín chỉ; 4 TC khối ngành, 2 TC Y khoa).
  - `quy-che-cong-tac-sv/`: Quyền và nhiệm vụ sinh viên, khen thưởng & 4 mức kỷ luật.
  - `tai-nguyen/`: Cẩm nang Thư viện TTU (`lib.ttu.edu.vn`), email sinh viên & an toàn mạng.
  - `tai-chinh/`: Quy định học phí, học bổng Tài năng ITA & Vượt khó ITASS (50% - 100%).
  - `lien-he/`: Hướng dẫn thủ tục hành chính, câu hỏi thường gặp (FAQ) và danh bạ liên hệ.

---

## 5. Lệnh Phát triển & Kiểm tra Chất lượng (CLI Commands)

Tất cả câu lệnh **bắt buộc chạy bằng Bun**:

```bash
# Khởi chạy môi trường phát triển
bun run dev

# Kiểm tra kiểu dữ liệu TypeScript
bun run types:check

# Kiểm tra cú pháp và linter (Oxlint)
bun run lint

# Định dạng mã nguồn (Oxfmt)
bun run format
bun run format:check

# Kiểm tra trùng lặp mã nguồn (JSCPD)
bun run check:duplication

# Kiểm tra file và dependencies thừa (Knip)
bun run check:deps

# Biên dịch kiểm tra bản phát hành (Production Build)
bun run build

# Cài đặt Git Hooks (Lefthook)
bun run prepare
```

---

## 6. Quy tắc khi Chỉnh sửa & Viết tiếp Nội dung

1. **Cú pháp MDX**:
   - Không chèn biểu thức toán học LaTeX bằng dấu `$$` hoặc `{}` tự do trong văn bản vì acorn parser của MDX sẽ xem đó là JSX expression và gây lỗi biên dịch.
   - Các công thức tính toán cần đặt bên trong code block (ví dụ: ` ```txt ... ``` `).
2. **Iconography — QUY TẮC BẮT BUỘC: CHỈ SỬ DỤNG ICON CỦA HUGEICONS DẠNG FREE**:
   - Dự án **chỉ được phép sử dụng icon từ gói Hugeicons miễn phí (`@hugeicons/core-free-icons` và `@hugeicons/react`)**.
   - **Tuyệt đối không sử dụng** icon từ các thư viện khác (như Lucide, Heroicons, FontAwesome, v.v.) hoặc các icon Pro/trả phí của Hugeicons.
   - Khi cần thêm icon trong `meta.json`, component hoặc trang MDX:
     - Khai báo tên icon hợp lệ trong `src/lib/hugeicons-resolver.tsx` (ví dụ: `GraduationCap`, `Building`, `Users`, `Award`, `Shield`, `BookOpen`, `DollarSign`, `Phone`).
     - Hoặc import trực tiếp từ `@hugeicons/core-free-icons` (ví dụ: `import { Menu01Icon, Alert02Icon } from '@hugeicons/core-free-icons'`).
   - Icon nút đóng/mở sidebar trên cả Desktop và Mobile được chuyển đổi đồng bộ sang icon 3 gạch `Menu01Icon` của Hugeicons Free.
3. **Commit Message**: Tuân thủ quy chuẩn Conventional Commits (`feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `chore:`). Lefthook và Commitlint sẽ tự động kiểm tra trước khi commit.
