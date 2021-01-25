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
    ],
  },
];
