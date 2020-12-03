import { SettingType } from "../graphql/modules/setting/setting.model";

export enum SettingGroupSlug {
  CAU_HINH_CHUNG = "CAU_HINH_CHUNG",
}
export enum SettingKey {
  TITLE = "TITLE",
  LOGO = "LOGO",
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
        value: `Mobifone - AShop`,
        isActive: true,
        isPrivate: true,
        readOnly: false,
      },
      {
        type: SettingType.string,
        name: "Logo ứng dụng",
        key: SettingKey.LOGO,
        value: `https://mb-ashop.web.app/assets/img/logo.png`,
        isActive: true,
        isPrivate: true,
        readOnly: false,
      },
    ],
  },
];
