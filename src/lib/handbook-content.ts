export const BANK_TRANSFER_ACCOUNTS = {
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
} as const;

export const BANK_TRANSFER_CONTENT_PATTERN = '[MSSV] [Họ tên] Hoc phi [Học kỳ] [Năm học]';
export const BANK_TRANSFER_CONTENT_EXAMPLE = '23010012 Nguyen Van A Hoc phi HK1 2023-2024';

export const DIRECT_PAYMENT_DETAILS = {
  location: 'Phòng Tài chính – Kế toán, Tòa nhà Điều hành, Trường Đại học Tân Tạo',
  address: 'Đại lộ Đại học Tân Tạo, Tân Đức E.City, Huyện Đức Hòa, Tỉnh Long An',
  officeHours: 'Thứ Hai đến Thứ Sáu, sáng 8h00–12h00 và chiều 13h00–17h00',
} as const;

export const REGISTRATION_STEPS_ASSISTANT_TEXT = [
  {
    title: 'Đăng nhập Cổng Đào tạo MyTTU',
    description:
      'Truy cập https://my.ttu.edu.vn bằng tài khoản email sinh viên TTU có đuôi @student.ttu.edu.vn.',
    note: 'Nếu quên mật khẩu hoặc lỗi đăng nhập, liên hệ Ban CNTT.',
  },
  {
    title: 'Vào giao diện Đăng ký học phần',
    description: 'Trên menu chính của MyTTU, chọn mục Đăng ký môn học.',
    note: 'Kiểm tra trạng thái học vụ và nghĩa vụ học phí trước khi đăng ký.',
  },
  {
    title: 'Tìm kiếm lớp học phần mở',
    description: 'Chọn đúng Học kỳ và Năm học, sau đó nhấn Search để xem các lớp dự kiến mở.',
    note: 'Kiểm tra mã môn, tên môn và số lượng sinh viên tối đa.',
  },
  {
    title: 'Chọn lớp và đăng ký môn học',
    description: 'Trong Danh sách môn học, chọn học phần phù hợp rồi nhấn Register.',
    note: 'Kiểm tra thời khóa biểu để tránh trùng giờ.',
  },
  {
    title: 'Rà soát danh sách và xác nhận học phí',
    description:
      'Mở Danh sách môn học đã đăng ký để kiểm tra môn, tín chỉ, phòng, giảng viên và học phí cần nộp.',
    note: 'Lưu mã môn hoặc ảnh chụp màn hình để đối chiếu khi cần.',
  },
] as const;
