import { SettingTypeEnum } from "../constants";

export enum SettingGroupSlug {
  EXAMPLE_SLUG = "EXAMPLE_SLUG"
}
export enum SettingKey {
  EXAMPLE = "EXAMPLE"
}
export const SETTING_DATA = [
  {
    slug: SettingGroupSlug.EXAMPLE_SLUG,
    name: "Mẫu config Group",
    desc: "Nội dung mẫu config",
    readOnly: true,
    settings: [
      {
        type: SettingTypeEnum.string,
        name: "Config string",
        key: SettingKey.EXAMPLE,
        value: `Sample string`,
        isActive: true,
        isPrivate: true,
        readOnly: false,
      }
    ],
  },
];
