import { SettingType } from "../graphql/modules/setting/setting.model";

export enum SettingGroupSlug {
  CAU_HINH_CHUNG = "CAU_HINH_CHUNG",
  TRANG_CHU = "TRANG_CHU",
}
export enum SettingKey {
  // Cấu hình chung
  TITLE = "TITLE", // Tiêu đề ứng dụng
  LOGO = "LOGO", // Hình logo
  // Cấu hình trang chủ
  TOP_MENU = "TOP_MENU", // Cấu hình top menu
  BANNER_1 = "BANNER_1", // Cấu hình banner 1
  BANNER_2 = "BANNER_2", // Cấu hình banner 2
  BANNER_3 = "BANNER_3", // Cấu hình banner 3
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
              visable: false,
            },
            {
              image: "https://i.imgur.com/jriMx2e.jpg",
              link: "https://arito-store.mcom.app",
              visable: false,
            },
            {
              image: "https://i.imgur.com/ycOejfb.png",
              link: "https://arito-store.mcom.app",
              visable: false,
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
              visable: false,
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
              visable: false,
            },
            {
              image: "https://i.imgur.com/jriMx2e.jpg",
              link: "https://arito-store.mcom.app",
              visable: false,
            },
            {
              image: "https://i.imgur.com/ycOejfb.png",
              link: "https://arito-store.mcom.app",
              visable: false,
            },
            {
              image: "https://i.imgur.com/OY7IIUM.png",
              link: "https://arito-store.mcom.app",
              visable: false,
            },
            {
              image: "https://i.imgur.com/i9lJPRX.png",
              link: "https://arito-store.mcom.app",
              visable: false,
            },
            {
              image: "https://i.imgur.com/y3RgrFT.jpg",
              link: "https://arito-store.mcom.app",
              visable: false,
            },
          ],
        },
        isActive: true,
        isPrivate: false,
        readOnly: false,
      },
    ],
  },
];
