import { SettingType } from "../graphql/modules/setting/setting.model";

export enum SettingGroupSlug {
  CAU_HINH_CHUNG = "CAU_HINH_CHUNG",
  TRANG_CHU = "TRANG_CHU",
}
export enum SettingKey {
  // Cấu hình chung
  TITLE = "TITLE", // Tiêu đề ứng dụng
  LOGO = "LOGO", // Hình logo
  SEO_DESCRIPTION = "SEO_DESCRIPTION", // Mô tả website
  SEO_IMAGE = "SEO_IMAGE", // Hình ảnh SEO
  SEO_KEYWORDS = "SEO_KEYWORDS", // Từ khoá SEO
  POLICY = "POLICY", // Link điều khoản sử dụng
  HIDDEN_MENUS = "HIDDEN_MENUS", // Danh sách menu ẩn
  HIDDEN_CATEGORIES = "HIDDEN_CATEGORIES", // Danh sách danh mục ẩn
  HIDDEN_PRODUCT_OF_CATEGORIES = "HIDDEN_PRODUCT_OF_CATEGORIES", // Danh sách danh mục cần ẩn sản phẩm
  HIDDEN_TAGS = "HIDDEN_TAGS", // Danh sách tag ẩn
  // Cấu hình trang chủ
  TOP_MENU = "TOP_MENU", // Cấu hình top menu
  BANNER_1 = "BANNER_1", // Cấu hình banner 1
  BANNER_2 = "BANNER_2", // Cấu hình banner 2
  BANNER_3 = "BANNER_3", // Cấu hình banner 3
  HOTLINE = "HOTLINE", // Cấu hình hotline
  FEATURE = "FEATURE", // Cấu hình tính năng
  FOOTER_INTRO = "FOOTER_INTRO", // Cấu hình giới thiệu footer
  FOOTER_MENU = "FOOTER_MENU", // Cấu hình menu ở footer
  SOCIAL = "SOCIAL", // Cấu hình các liên kết mạng xã hội
  POPUP = "POPUP", // Cấu hình popup
  FACEBOOK_MESSENGER = "FACEBOOK_MESSENGER", //
}
export const SETTING_DATA = [
  {
    slug: SettingGroupSlug.CAU_HINH_CHUNG,
    name: "Cấu hình chung",
    desc: "Các cấu hình chung",
    readOnly: true,
    settings: [
      {
        type: SettingType.string,
        name: "Tiêu đề ứng dụng",
        key: SettingKey.TITLE,
        value: `Kho thuốc sỉ`,
        isActive: true,
        isPrivate: false,
        readOnly: false,
      },
      {
        type: SettingType.string,
        name: "Hình Logo",
        key: SettingKey.LOGO,
        value: `https://i.ibb.co/GM2tfmz/Group-38443.png`,
        isActive: true,
        isPrivate: false,
        readOnly: false,
      },
      {
        type: SettingType.string,
        name: "SEO: Mô tả",
        key: SettingKey.SEO_DESCRIPTION,
        value: `khothuocsi.vn là website thuộc sở hữu của Công ty TNHH Một thành viên Dược phẩm 150 COPHAVINA.`,
        isActive: true,
        isPrivate: false,
        readOnly: false,
      },
      {
        type: SettingType.string,
        name: "SEO: Hình ảnh",
        key: SettingKey.SEO_IMAGE,
        value: `https://i.ibb.co/pxFSgD3/Banner-1000-x-560-px-06.jpg`,
        isActive: true,
        isPrivate: false,
        readOnly: false,
      },
      {
        type: SettingType.string,
        name: "SEO: Từ khoá",
        key: SettingKey.SEO_KEYWORDS,
        value: `kho thuốc sĩ, khothuocsi`,
        isActive: true,
        isPrivate: false,
        readOnly: false,
      },
      {
        type: SettingType.string,
        name: "Link Điều khoản sử dụng",
        key: SettingKey.POLICY,
        value: `https://khothuocsi.arito.vn/post/dieu-khoan-su-dung`,
        isActive: true,
        isPrivate: false,
        readOnly: false,
      },
      {
        type: SettingType.array,
        name: "Danh sách menu ẩn",
        key: SettingKey.HIDDEN_MENUS,
        value: [],
        isActive: true,
        isPrivate: false,
        readOnly: false,
      },
      {
        type: SettingType.array,
        name: "Danh sách danh mục ẩn",
        key: SettingKey.HIDDEN_CATEGORIES,
        value: [],
        isActive: true,
        isPrivate: false,
        readOnly: false,
      },
      {
        type: SettingType.array,
        name: "Danh sách danh mục cần ẩn sản phẩm",
        key: SettingKey.HIDDEN_PRODUCT_OF_CATEGORIES,
        value: [],
        isActive: true,
        isPrivate: false,
        readOnly: false,
      },
      {
        type: SettingType.array,
        name: "Danh sách tag ẩn",
        key: SettingKey.HIDDEN_TAGS,
        value: [],
        isActive: true,
        isPrivate: false,
        readOnly: false,
      },
    ],
  },
  {
    slug: SettingGroupSlug.TRANG_CHU,
    name: "Cấu hình trang chủ",
    desc: "Các cấu giao diện trang chủ",
    readOnly: true,
    settings: [
      {
        type: SettingType.object,
        name: "Menu Trên",
        key: SettingKey.TOP_MENU,
        value: {
          items: [
            {
              name: "Góc sức khoẻ",
              link: "/tags/goc-suc-khoe",
            },
            {
              name: "Tuyển dụng",
              link: "/tuyen-dung",
            },
          ],
        },
        isActive: true,
        isPrivate: false,
        readOnly: false,
      },
      {
        type: SettingType.object,
        name: "Banner 1",
        key: SettingKey.BANNER_1,
        value: {
          items: [
            {
              image: "https://i.imgur.com/XMTJQSx.png",
              link: "https://arito-store.mcom.app",
              visible: false,
            },
            {
              image: "https://i.imgur.com/jriMx2e.jpg",
              link: "https://arito-store.mcom.app",
              visible: false,
            },
            {
              image: "https://i.imgur.com/ycOejfb.png",
              link: "https://arito-store.mcom.app",
              visible: false,
            },
          ],
        },
        isActive: true,
        isPrivate: false,
        readOnly: false,
      },
      {
        type: SettingType.object,
        name: "Banner 2",
        key: SettingKey.BANNER_2,
        value: {
          items: [
            {
              image: "https://i.imgur.com/jriMx2e.jpg",
              link: "https://arito-store.mcom.app",
              visible: false,
            },
          ],
        },
        isActive: true,
        isPrivate: false,
        readOnly: false,
      },
      {
        type: SettingType.object,
        name: "Banner 3",
        key: SettingKey.BANNER_3,
        value: {
          items: [
            {
              image: "https://i.imgur.com/XMTJQSx.png",
              link: "https://arito-store.mcom.app",
              visible: false,
            },
            {
              image: "https://i.imgur.com/jriMx2e.jpg",
              link: "https://arito-store.mcom.app",
              visible: false,
            },
            {
              image: "https://i.imgur.com/ycOejfb.png",
              link: "https://arito-store.mcom.app",
              visible: false,
            },
            {
              image: "https://i.imgur.com/OY7IIUM.png",
              link: "https://arito-store.mcom.app",
              visible: false,
            },
            {
              image: "https://i.imgur.com/i9lJPRX.png",
              link: "https://arito-store.mcom.app",
              visible: false,
            },
            {
              image: "https://i.imgur.com/y3RgrFT.jpg",
              link: "https://arito-store.mcom.app",
              visible: false,
            },
          ],
        },
        isActive: true,
        isPrivate: false,
        readOnly: false,
      },
      {
        type: SettingType.object,
        name: "HOTLINE",
        key: SettingKey.HOTLINE,
        value: {
          text: "HOTLINE: 1900 6067 (miễn phí)",
          phone: "1900 6067",
          footerText: "HOTLINE MIỄN PHÍ (7H-22H)",
          items: [
            {
              display: "Tư vấn bán hàng: 1900 6067",
              phone: "1900 6067",
            },
            {
              display: "Góp ý dịch vụ: 1900 6067",
              phone: "1900 6067",
            },
            {
              display: "Lắng nghe khiếu nại: 1900 6067",
              phone: "1900 6067",
            },
          ],
        },
        isActive: true,
        isPrivate: false,
        readOnly: false,
      },
      {
        type: SettingType.object,
        name: "Tính năng",
        key: SettingKey.FEATURE,
        value: {
          items: [
            {
              image: "https://placehold.it/16x16",
              title: "MIỄN PHÍ GIAO VẬN",
              contnet:
                "Miễn phí vận chuyển cho các đơn hàng trên 300,000VNĐ và nhận hàng nhanh chóng.",
            },
            {
              image: "https://placehold.it/16x16",
              title: "TẬN TÂM PHỤC VỤ",
              contnet:
                "Dịch vụ chăm sóc khách hàng chuyên nghiệp luôn sẵn sàng giải đáp mọi thắc mắc của bạn. Hotline miễn phí: 1800 6821",
            },
            {
              image: "https://placehold.it/16x16",
              title: "CỬA HÀNG GẦN BẠN",
              contnet:
                "ThuocSi.vn đang mở rộng hệ thống cửa hàng gần bạn để chăm sóc bạn tốt hơn. Hãy ghé thăm và trải nghiệm nhé!",
            },
            {
              image: "https://placehold.it/16x16",
              title: "MUA HÀNG TRỰC TUYẾN",
              contnet:
                "Giá bán trên trang chỉ áp dụng khi mua sắm trên trang thương mại điện tử của ThuocSi.vn",
            },
          ],
        },
        isActive: true,
        isPrivate: false,
        readOnly: false,
      },
      {
        type: SettingType.object,
        name: "Giới thiệu Footer",
        key: SettingKey.FOOTER_INTRO,
        value: {
          content: `Thuocsi.vn được thành lập từ năm 2018, là một trong những startup thành công trong lĩnh vực công nghệ về y tế
          Hiện tại là cổng điện tử cung cấp thuốc cho hơn 1.000 nhà thuốc và phòng khám trên khắp Việt Nam.`,
          more: `Là một trong những nơi làm việc thu hút các tài năng trẻ với đam mê ứng dụng công nghệ 4.0 vào nền Y Tế`,
          link: "https://arito-store.mcom.app",
          copyright: "Copyright © CÔNG TY TNHH MTV DƯỢC PHẨM 150 COPHAVINA",
        },
        isActive: true,
        isPrivate: false,
        readOnly: false,
      },
      {
        type: SettingType.object,
        name: "Menu Footer",
        key: SettingKey.FOOTER_MENU,
        value: {
          items: [
            { text: "Quy định sử dụng Website", link: "https://arito-store.mcom.app" },
            { text: "Chính sách bảo mật", link: "https://arito-store.mcom.app" },
            { text: "Chính sách bán hàng", link: "https://arito-store.mcom.app" },
            { text: "Chính sách vận chuyển", link: "https://arito-store.mcom.app" },
            { text: "Hướng dẫn thanh toán", link: "https://arito-store.mcom.app" },
            { text: "Chính sách giải quyết khiếu nại", link: "https://arito-store.mcom.app" },
            { text: "Các câu hỏi thường gặp", link: "https://arito-store.mcom.app" },
            { text: "Liên hệ", link: "https://arito-store.mcom.app" },
          ],
        },
        isActive: true,
        isPrivate: false,
        readOnly: false,
      },
      {
        type: SettingType.object,
        name: "Icon Social",
        key: SettingKey.SOCIAL,
        value: {
          facebook: { link: "https://facebook.com", visible: true },
          youtube: { link: "https://youtube.com", visible: true },
          zalo: { link: "https://chat.zalo.me", visible: true },
        },
        isActive: true,
        isPrivate: false,
        readOnly: false,
      },
      {
        type: SettingType.object,
        name: "Popup Trang chủ",
        key: SettingKey.POPUP,
        value: {
          enable: false, // Bật / tắt popup
          enableApp: false, // Bật / tắt popup app
          image: "",
          link: "https://khothuocsi.vn",
        },
        isActive: true,
        isPrivate: false,
        readOnly: false,
      },
      {
        type: SettingType.object,
        name: "Facebook messenger",
        key: SettingKey.FACEBOOK_MESSENGER,
        value: {
          enable: false, // Bật messenger chat plugin
          pageID: "", // ID trang fanpage
        },
        isActive: true,
        isPrivate: false,
        readOnly: false,
      },
    ],
  },
];
