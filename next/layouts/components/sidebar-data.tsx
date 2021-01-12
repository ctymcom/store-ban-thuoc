import { IconAdmin, IconMember, IconBox, IconPoint, IconChart, IconTradeMoney, IconSpeaker } from '../../lib/svg';

export const SidebarData = [
  {
    title: "Quản trị",
    path: "/",
    icon: <IconAdmin />,
    isOpen: false,
    subNav: [
      {
        title: "Bảng điều khiển",
        path: "/",
        new: false,
      },
      {
        title: "Tài khoản",
        path: "/",
        new: false,
      },
      {
        title: "Cấu hình hệ thống",
        path: "/",
        new: false,
      },
      {
        title: "Phân quyền",
        path: "/",
        new: false,
      }, {
        title: "Tài khoản",
        path: "/",
        new: false,
      }, {
        title: "Báo cáo",
        path: "/",
        new: false,
      }, {
        title: "Lịch sử thao tác",
        path: "/",
        new: false,
      },
    ],
  },
  {
    title: "Hội viên",
    path: "/",
    icon: <IconMember />,
    isOpen: false,
    subNav: [
      {
        title: "Phân khúc",
        path: "/",
        new: true,
      },
      {
        title: "Hạng hội viên",
        path: "/",
        new: false,
      },
      {
        title: "Kỳ xét hạng",
        path: "/",
        new: false,
      }, {
        title: "Nhóm hội viên",
        path: "/",
        new: false,
      }, {
        title: "Giới thiệu hội viên",
        path: "/",
        new: false,
      }, {
        title: "Xử lí nghi vấn",
        path: "/",
        new: false,
      },
    ],
  },
  {
    title: "Sản phẩm",
    path: "/",
    icon: <IconBox />,
    isOpen: false,
    subNav: [
      {
        title: "Danh sách",
        path: "/",
        new: false,
      },
      {
        title: "Nhóm sản phẩm",
        path: "/",
        new: true,
      },

    ],
  },
  {
    title: "Nguyên tắc tích điểm",
    path: "/",
    icon: <IconPoint />,
    isOpen: false,
    subNav: [
      {
        title: "Giao dịch",
        path: "/",
        new: false,
      },
      {
        title: "Sự kiện",
        path: "/",
        new: false,
      },
      {
        title: "Hoạt động",
        path: "/",
        new: false,
      },
    ],
  },
  {
    title: "Chiến dịch",
    path: "/",
    icon: <IconChart />,
    isOpen: false,
    subNav: [
      {
        title: "Danh sách",
        path: "/",
        new: false,
      },
      {
        title: "Voucher",
        path: "/",
        new: false,
      },
      {
        title: "Đổi quà",
        path: "/",
        new: false,
      },
    ],
  },
  {
    title: "Giao dịch",
    path: "/",
    icon: <IconTradeMoney />,
    isOpen: false,
    subNav: [
      {
        title: "Lịch sử giao dịch",
        path: "/",
        new: false,
      },
      {
        title: "Nhập giao dịch",
        path: "/",
        new: false,
      },
      {
        title: "Hoàn giao dịch",
        path: "/",
        new: false,
      },
    ],
  },
  {
    title: "Truyền thông",
    path: "/",
    icon: <IconSpeaker />,
    isOpen: false,
    subNav: [
      {
        title: "Biểu mẫu",
        path: "/",
        new: false,
      },
      {
        title: "Sự kiện",
        path: "/",
        new: false,
      },
      {
        title: "Tin tức",
        path: "/",
        new: false,
      },
    ],
  }
];
