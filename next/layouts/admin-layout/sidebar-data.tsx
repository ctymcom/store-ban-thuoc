export const SidebarData = [
  {
    title: "Quản trị",
    path: "/admin",
    // icon: <IconAdmin />,
    isOpen: true,
    subNav: [
      {
        title: "Bài viết",
        path: "/admin/post/list-post",
      },
      {
        title: "Đăng bài",
        path: "/admin/post/create-post",
        new: false,
      },
      {
        title: "Cấu hình giao diện",
        path: "/admin/post/list-post",
        new: false,
      },
    ],
  },
];
