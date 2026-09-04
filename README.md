# 🎓 Sổ tay Sinh viên Đại học Tân Tạo (TTU Student Handbook)

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16.3-000000?style=flat-square&logo=nextdotjs&logoColor=white" alt="Next.js 16">
  <img src="https://img.shields.io/badge/Fumadocs-16.15-0d793d?style=flat-square" alt="Fumadocs">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React 19">
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS 4">
  <img src="https://img.shields.io/badge/TypeScript-6-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript 6">
  <img src="https://img.shields.io/badge/Bun-1.4+-FBF0DF?style=flat-square&logo=bun&logoColor=black" alt="Bun">
  <img src="https://img.shields.io/badge/License-Internal_TTU-0d793d?style=flat-square" alt="TTU License">
</p>

> **Hệ thống Cẩm nang Thông tin Toàn diện dành cho Sinh viên Trường Đại học Tân Tạo**  
> _"Per Sapientiam Ad Astra" — Đường đến đỉnh cao vinh quang bằng con đường tri thức._

---

## 📌 Giới thiệu tổng quan

**Sổ tay Sinh viên TTU (Student Handbook)** là nền tảng tài liệu số hóa chính thức của Trường Đại học Tân Tạo (Tan Tao University), được xây dựng trên nền tảng Next.js 16 và Fumadocs. Dự án cung cấp cho sinh viên, giảng viên và cán bộ quản lý công cụ tra cứu thông tin học vụ, ký túc xá, rèn luyện kỹ năng mềm, chính sách học bổng và các thủ tục hành chính trực quan, nhanh chóng và chuẩn xác.

Toàn bộ nội dung được số hóa trực tiếp từ tài liệu **Sổ tay Sinh viên Năm học 2026–2027** (`so_tay_sinh_vien_26_27.docx`) và hệ thống quy chế đào tạo, công tác sinh viên mới nhất của Nhà trường.
---

## 🚀 Cấu trúc Sổ tay & Các Chuyên mục Cốt lõi

```
                                    ┌────────────────────────────────────┐
                                    │    Trang chủ Sổ tay Sinh viên TTU  │
                                    │         (https://ttu.edu.vn)       │
                                    └─────────────────┬──────────────────┘
                                                      │
         ┌─────────────────────────┬──────────────────┴──────────────────┬─────────────────────────┐
         ▼                         ▼                                     ▼                         ▼
┌──────────────────┐      ┌──────────────────┐                  ┌──────────────────┐      ┌──────────────────┐
│ Học vụ & Đào tạo │      │ Lưu trú & KTX    │                  │Đánh giá Rèn luyện│      │Tài chính & H.Bổng│
│• Đăng ký môn học │      │• Tiêu chuẩn KTX  │                  │• Điểm rèn luyện  │      │• Học phí cố định │
│• Thang điểm 4.0  │      │• Nội quy nhà ăn  │                  │• TCKNM (120h/60h)│      │• HB Tài năng ITA │
│• Rút bớt học phần│      │• Khung kỷ luật   │                  │• Chuẩn tốt nghiệp│      │• HB Vượt khó     │
│• Liêm chính học  │      │• Xe buýt nội bộ  │                  │• Tiêu chí 100đ   │      │• Vay vốn ưu đãi  │
└──────────────────┘      └──────────────────┘                  └──────────────────┘      └──────────────────┘
         │                         │                                     │                         │
         └─────────────────────────┴──────────────────┬──────────────────┴─────────────────────────┘
                                                      │
                                                      ▼
                                   ┌────────────────────────────────────┐
                                   │       Hỗ trợ & Dịch vụ Đời sống    │
                                   │ • Thư viện TTU (lib.ttu.edu.vn)    │
                                   │ • Email SV (@student.ttu.edu.vn)   │
                                   │ • CLB, Hội Sinh viên & Thể thao    │
                                   │ • Quy tắc ứng xử & Khen thưởng     │
                                   │ • Thủ tục Một cửa & Danh bạ liên hệ│
                                   └────────────────────────────────────┘
```

### 1. 🎓 Học tập & Đào tạo (`/hoc-vu/`)

- **Đăng ký môn học**: Khung giờ tiết học chuẩn (50 phút/tiết), các bước đăng ký trực tuyến trên [my.ttu.edu.vn](https://my.ttu.edu.vn), hạn chót trước 15 ngày, quy định học vượt và chương trình song bằng/song ngành.
- **Rút bớt học phần**: Hạn chót nghiêm ngặt trong **01 tuần đầu tiên** của học kỳ, quy định tài chính từ tuần thứ 2 không giải quyết rút môn/học phí.
- **Đánh giá & Điểm số**: Thang điểm 10 quy đổi thang chữ và thang 4.0, điều kiện đạt môn (từ điểm D trở lên), cách tính GPA, xếp hạng tốt nghiệp và danh hiệu danh giá **Latin Honors** (Summa cum laude, Magna cum laude, Cum laude).
- **Quy chế học tập & Liêm chính**: Quy định chuyên cần $\ge 80\%$, xử lý gian lận thi cử theo 4 mức độ, ngưỡng cảnh báo học vụ theo từng năm học và các điều kiện buộc thôi học.
- **Chuẩn Ngoại ngữ**: Phân loại hệ chương trình, chuẩn tiếng Anh đầu ra theo từng Khoa và bảng so sánh quy đổi tương đương giữa TOEFL iBT, IELTS, TOEIC và Cambridge English Certificate.
- **Khóa luận & Đồ án tốt nghiệp**: Tiêu chuẩn đăng ký (GPA $\ge 3.00$ hoặc $\ge 2.80$ có NCKH), quy cách 30–80 trang, cơ cấu chấm điểm GV hướng dẫn (10đ) và Hội đồng (10đ).

### 2. 🏢 Lưu trú & Ký túc xá (`/luu-tru/`)

- **Tổng quan KTX**: Quy định lưu trú bắt buộc năm nhất, cơ sở vật chất phòng ở khép kín, giờ mở cửa cổng (5h00 – 22h00), giờ tiếp khách (7h00 – 20h00 / 8h00 tối), xe buýt nội bộ và các tuyến xe buýt công cộng (81, 71, 626, 627).
- **Nhà ăn & Dịch vụ**: Chế độ ăn uống, hotline y tế học đường & cấp cứu BV ĐH Y Tân Tạo 24/7 (`0704.911.115`), mạng Internet KTX miễn phí.
- **Nội quy & Khung kỷ luật**: Khung xử lý kỷ luật lũy tiến các hành vi vi phạm (đỗ xe sai 3 lần cấm xe, nấu nướng, cờ bạc, tàng trữ ma túy buộc thôi học).

### 3. 👥 Đời sống Sinh viên (`/doi-song-sinh-vien/`)

- **Hoạt động & Câu lạc bộ**: Hệ thống CLB học thuật, văn hóa nghệ thuật, thể thao và tình nguyện trực thuộc Phòng CTSV quản lý.
- **Hỗ trợ Sinh viên**: Kênh hỗ trợ đời sống, tư vấn tâm lý học đường, chính sách hỗ trợ vay vốn không tính lãi suất Quỹ ITA.
- **Quy tắc Ứng xử**: 10 quy tắc văn hóa ứng xử của sinh viên TTU, quy định đồng phục polo lịch sự và quy định đeo thẻ sinh viên bắt buộc.

### 4. 🏅 Đánh giá Rèn luyện & Kỹ năng mềm (`/ren-luyen/`)

- **Điểm rèn luyện (ĐRL)**: Đánh giá thang điểm 100 theo 5 tiêu chí chính, xếp loại, các trường hợp ưu tiên (khuyết tật, mồ côi) và bảo lưu khi nghỉ tạm thời.
- **Tín chỉ Kỹ năng mềm (TCKNM)**: 1 TC = 30 giờ; điều kiện tốt nghiệp bắt buộc: **4 tín chỉ (120 giờ)** cho các khối ngành và **2 tín chỉ (60 giờ)** cho Khoa Y, Điều dưỡng & KTXNYH; chế độ điểm cộng khuyến khích từ 1 đến 5 điểm; khiếu nại trong 15 ngày.

### 5. ⚖️ Quy chế Công tác Sinh viên (`/quy-che-cong-tac-sv/`)

- **Quyền & Nhiệm vụ**: Nhiệm vụ học tập, rèn luyện, đóng học phí, BHYT đúng hạn và thực hiện cam kết học bổng.
- **Khen thưởng & Kỷ luật**: Danh hiệu cá nhân (Khá, Giỏi, Xuất sắc), danh hiệu tập thể (Lớp Tiên tiến, Lớp Xuất sắc); bảng khung xử lý kỷ luật 27 hành vi vi phạm; quy trình 5 bước; thời hạn chấm dứt hiệu lực kỷ luật: **03 tháng** (Khiển trách) và **06 tháng** (Cảnh cáo).

### 6. 📚 Thư viện & Tài nguyên số (`/tai-nguyen/`)

- **Thư viện TTU**: Giờ mở cửa 8h00 – 17h00 Thứ 2 – Thứ 6, bộ sưu tập gần 17.000 cuốn sách in (cập nhật 5/2026), CSDL ProQuest, học liệu mở quốc tế, 9 điều nội quy và hệ thống Koha.
- **Email & Mạng Internet**: Cấp tài khoản `@student.ttu.edu.vn`, quy tắc an toàn thông tin mạng và thông tin Ban CNTT.
- **Nghiên cứu Khoa học & Đổi mới sáng tạo**: Tài trợ đề tài NCKH sinh viên tối đa 30.000.000 VNĐ/đề tài (4 giai đoạn), Hội thảo NCKH thường niên, Ngày hội STEAM Day, Tạp chí TJS 2026 và kết nối khởi nghiệp tỉnh Tây Ninh.

### 7. 💵 Tài chính & Học bổng (`/tai-chinh/`)

- **Học phí**: Chính sách cam kết học phí cố định, hướng dẫn kiểm tra học phí trên MyTTU, thông tin Kế toán trưởng và tài khoản thanh toán NCB.
- **Học bổng Quỹ ITA**: Học bổng Tài năng ITA và Vượt khó ITASS (mức 100%, 75%, 50%), Hỗ trợ vay 0% lãi suất, điều kiện duy trì học bổng từng kỳ ($\ge 80\%$ hoạt động truyền thông), nghĩa vụ phục vụ quê hương ITASS và quy trình xét cấp 9 bước.

### 8. 📞 Hỗ trợ & Danh bạ Liên hệ (`/lien-he/`)

- **Thủ tục Một cửa & FAQ**: Quy trình cấp giấy xác nhận SV, tạm hoãn NVQS, bảng điểm, phúc khảo thi (5 ngày), hồ sơ học bổng Quỹ ITA.
- **Danh bạ Toàn diện**: Thông tin liên hệ Ban Giám hiệu, 8 phòng ban chức năng, Ban Thư viện, Ban CNTT, trường TTS, các trung tâm và Ban Chủ nhiệm & Thư ký của cả 7 Khoa chuyên môn.

---

## 🛠️ Công nghệ & Thư viện (Tech Stack)

- **Core Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **UI & Content Engine**: [Fumadocs](https://fumadocs.dev/) (`fumadocs-core`, `fumadocs-ui`, `fumadocs-mdx`)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icon Set**: [Hugeicons Free](https://hugeicons.com/) (`@hugeicons/core-free-icons`, `@hugeicons/react`)
- **Runtime / Package Manager**: [Bun](https://bun.sh/) (`v1.4+`)
- **Dev & Quality Tools**:
  - `oxlint`: Linter siêu tốc
  - `oxfmt`: Code formatter tốc độ cao
  - `jscpd`: Phát hiện trùng lặp mã nguồn
  - `knip`: Quét dependencies và file mồ côi
  - `commitlint`: Kiểm soát định dạng Git commit message
  - `lefthook`: Quản lý Git hooks tự động

---

## 💻 Hướng dẫn Cài đặt & Khởi chạy

### Yêu cầu Môi trường

- **Bun**: `^1.4.0` (Cài đặt qua: `curl -fsSL https://bun.sh/install | bash`)
- **Node.js**: `^22.0.0` hoặc `^24.0.0` (cho runtime tương thích)

### Các bước Cài đặt

```bash
# 1. Clone repository về máy
git clone https://github.com/tan-tao-university/student-handbook.git
cd student-handbook

# 2. Cài đặt các gói phụ thuộc bằng Bun
bun install

# 3. Kích hoạt Git hooks (Lefthook)
bun run prepare

# 4. Khởi chạy môi trường phát triển
bun run dev

# 5. Chạy môi trường Production bằng PM2 (port mặc định 65200)
bun run build
bun run pm2:start
```

Truy cập ứng dụng tại địa chỉ: `http://localhost:3000` (dev) hoặc `http://localhost:65200` (production).
---

## 🧪 Kiểm tra Chất lượng Mã nguồn (Quality Assurance)

Dự án tích hợp bộ công cụ kiểm thử tự động, đảm bảo chất lượng code trước khi đẩy lên remote:

```bash
# Kiểm tra định dạng mã nguồn (Oxfmt)
bun run format:check

# Tự động sửa định dạng mã nguồn (Oxfmt)
bun run format

# Kiểm tra cú pháp và linter (Oxlint)
bun run lint

# Kiểm tra trùng lặp mã nguồn (JSCPD)
bun run check:duplication

# Quét dependencies thừa và dead code (Knip)
bun run check:deps

# Kiểm tra kiểu dữ liệu TypeScript
bun run types:check

# Biên dịch kiểm thử toàn diện (Production Build)
bun run build
```

---

## 📁 Cấu trúc Thư mục Dự án

```
student-handbook/
├── content/
│   └── docs/                        # Nội dung các trang tài liệu MDX
│       ├── meta.json                # Cấu hình danh mục và thứ tự sidebar chính
│       ├── index.mdx                # Trang chủ Sổ tay Sinh viên (/)
│       ├── hoc-vu/                  # Chuyên mục Học vụ & Đào tạo
│       ├── luu-tru/                 # Chuyên mục Ký túc xá & Lưu trú
│       ├── doi-song-sinh-vien/      # Chuyên mục Đời sống Sinh viên
│       ├── ren-luyen/               # Chuyên mục Điểm rèn luyện & Kỹ năng mềm
│       ├── quy-che-cong-tac-sv/     # Chuyên mục Quy chế Công tác Sinh viên
│       ├── tai-nguyen/              # Chuyên mục Thư viện & CNTT
│       ├── tai-chinh/               # Chuyên mục Học phí & Học bổng ITA
│       └── lien-he/                 # Chuyên mục Thủ tục Một cửa & Danh bạ
├── public/
│   └── logo-ttu.png                 # Logo khiên chính thức Đại học Tân Tạo
├── src/
│   ├── app/
│   │   ├── (docs)/                  # Route group phục vụ tài liệu tại root (/)
│   │   │   ├── [[...slug]]/page.tsx # Dynamic catch-all MDX page renderer
│   │   │   └── layout.tsx           # Docs layout bọc DocsLayout từ Fumadocs
│   │   ├── api/search/route.ts      # API endpoint tìm kiếm toàn văn Fumadocs
│   │   ├── icon.png                 # Favicon tự động của Next.js
│   │   ├── global.css               # Theme tùy biến: Pure White Light / Pure Black Dark
│   │   └── layout.tsx               # Root layout bọc RootProvider
│   ├── components/
│   │   └── mdx.tsx                  # Component MDX (Cards, Tabs, Steps, Callouts...)
│   └── lib/
│       ├── hugeicons-resolver.tsx   # Bộ giải mã icon Hugeicons cho sidebar
│       ├── layout.shared.tsx        # Cấu hình header, logo TTU và navbar links
│       ├── shared.ts                # Khai báo hằng số appName, docsRoute, gitConfig
│       └── source.ts                # Loader cấu hình nguồn tài liệu Fumadocs
├── .commitlintrc.json               # Cấu hình kiểm tra commit message
├── .jscpd.json                      # Cấu hình kiểm tra trùng lặp code
├── .oxfmtrc.json                    # Cấu hình trình định dạng Oxfmt
├── .oxlintrc.json                   # Cấu hình linter Oxlint
├── AGENTS.md                        # Hướng dẫn chi tiết dành cho AI coding agents
├── CLAUDE.md                        # Hướng dẫn dành riêng cho Claude Code
├── knip.json                        # Cấu hình quét dead code và unused deps
├── lefthook.yml                     # Cấu hình Git hooks tự động trước commit
├── next.config.mjs                  # Cấu hình Next.js kèm Fumadocs MDX plugin
└── package.json                     # Danh mục dependencies và scripts
```

---

## 🎨 Quy chuẩn Nhận diện Thương hiệu (Brand Guidelines)

- **Màu sắc Nhận diện TTU**:
  - Mã màu chủ đạo: **`#0d793d`** (trích xuất chuẩn xác từ chiếc khiên logo TTU).
  - Tên trường trong Header: "ĐẠI HỌC TÂN TẠO" sử dụng mã `#0d793d` (ở Dark mode tự động chuyển sang `#22c55e` để tương phản tối ưu).
- **Quy tắc Giao diện Tương phản Cao**:
  - **Light Mode**: Sử dụng nền **trắng tinh khiết (`#ffffff`)**, thẻ card trắng, viền sáng sạch sẽ (`#e4e4e7`), tuyệt đối không dùng nền nhờ nhờ/lợt lợt.
  - **Dark Mode**: Sử dụng nền **đen tuyền (`#000000`)**, nền thẻ đen bóng sâu (`#09090b`), viền tối `#27272a`.
- **Hệ thống Icon**: Toàn bộ icon danh mục điều hướng sử dụng bộ icon bản quyền miễn phí sắc nét **Hugeicons** (`@hugeicons/core-free-icons`).

---

## 🤝 Quy định Đóng góp (Contribution Guide)

1. Mọi commit phải tuân thủ chuẩn **Conventional Commits**:
   - `feat: ...` : Tính năng mới hoặc bổ sung trang tài liệu
   - `fix: ...` : Sửa lỗi hiển thị, sửa thông tin học vụ
   - `docs: ...` : Cập nhật tài liệu hướng dẫn
   - `style: ...` : Cải thiện giao diện, màu sắc, typography
   - `chore: ...` : Nâng cấp dependencies hoặc cấu hình tooling
2. Trước khi tạo Pull Request, đảm bảo toàn bộ lệnh kiểm thử đều vượt qua:
   ```bash
   bun run format:check && bun run lint && bun run check:duplication && bun run types:check && bun run build
   ```

---

## 👥 Đơn vị Chủ quản & Bản quyền

- **Đơn vị phát triển**: Ban Công nghệ Thông tin phối hợp cùng Phòng Quản lý Đào tạo & Phòng Công tác Sinh viên — **Trường Đại học Tân Tạo (Tan Tao University)**.
- **Trụ sở**: Đại lộ Đại học Tân Tạo, Tân Đức E.City, Huyện Đức Hòa, Tỉnh Long An.
- **Website**: [https://ttu.edu.vn](https://ttu.edu.vn) | **Email**: [info@ttu.edu.vn](mailto:info@ttu.edu.vn) | **Hotline**: (+84) 272 376 9216
- **Bản quyền**: © 2024–2026 Tan Tao University. Lưu hành nội bộ phục vụ đào tạo và hỗ trợ sinh viên TTU.
