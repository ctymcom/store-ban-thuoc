import { useEffect, useState } from "react";
import { ImageInput } from "../../../../shared/utilities/form/image-input";

import { Input } from "../../../../shared/utilities/form/input";
import { Textarea } from "../../../../shared/utilities/form/textarea";
import { SettingItemsOption, SettingItemsValue } from "../setting-items-value";
import { MutableSetting } from "../setting-list";
import { SettingName } from "../setting-name";
import { Switch } from "./../../../../shared/utilities/form/switch";

interface PropTypes extends ReactProps {
  settings: MutableSetting[];
  onSettingsChange: (settings: MutableSetting[]) => any;
}

const TOP_MENU_ITEMS_OPTIONS: SettingItemsOption[] = [
  { value: "name", label: "Tên mục", type: "string" },
  { value: "link", label: "Đường dẫn", type: "string" },
];

const BANNER_ITEMS_OPTIONS: SettingItemsOption[] = [
  { value: "image", label: "Hình ảnh", type: "image" },
  { value: "link", label: "Đường dẫn", type: "string" },
  { value: "visible", label: "Hiển thị", type: "boolean" },
];

const HOTLINE_ITEM_OPTIONS: SettingItemsOption[] = [
  { value: "display", label: "Hiển thị", type: "string" },
  { value: "phone", label: "Số điện thoại", type: "string" },
];

const FEATURE_ITEM_OPTIONS: SettingItemsOption[] = [
  { value: "image", label: "Hình ảnh", type: "image" },
  { value: "title", label: "Tiêu đề", type: "string" },
  { value: "content", label: "Nội dung", type: "string" },
];

const FOOTER_MENUS_ITEM_OPTIONS: SettingItemsOption[] = [
  { value: "text", label: "Hiển thị", type: "string" },
  { value: "link", label: "Đường dẫn", type: "string" },
];

export function HomepageSettings({ settings, ...props }: PropTypes) {
  const onItemsChanged = (items, index) => {
    settings[index].value.items = items;
    props.onSettingsChange([...settings]);
  };

  const onValueChanged = (key, value, index) => {
    settings[index].value[key] = value;
    props.onSettingsChange([...settings]);
  };

  const inputProps = {
    wrapperClassName: "mb-2",
    className: "rounded-l-none form-input",
    prefixClassName: "rounded-l w-36",
  };

  return (
    <>
      {settings.map((setting, index) => (
        <div key={setting.id} className="mb-6">
          <SettingName name={setting.name} />
          {setting.key == "TOP_MENU" && (
            <>
              <SettingItemsValue
                items={setting.value.items}
                options={TOP_MENU_ITEMS_OPTIONS}
                onItemsChange={(items) => onItemsChanged(items, index)}
              />
            </>
          )}
          {(setting.key == "BANNER_1" ||
            setting.key == "BANNER_2" ||
            setting.key == "BANNER_3") && (
            <>
              <SettingItemsValue
                items={setting.value.items}
                options={BANNER_ITEMS_OPTIONS}
                onItemsChange={(items) => onItemsChanged(items, index)}
              />
            </>
          )}
          {setting.key == "HOTLINE" && (
            <>
              <Input
                value={setting.value.headerText}
                prefix="Hotline header"
                {...inputProps}
                onChange={(val) => onValueChanged("headerText", val, index)}
              />
              <Input
                value={setting.value.footerText}
                prefix="Hotline footer"
                {...inputProps}
                onChange={(val) => onValueChanged("footerText", val, index)}
              />
              <Input
                value={setting.value.phone}
                prefix="Số điện thoại"
                {...inputProps}
                onChange={(val) => onValueChanged("phone", val, index)}
              />
              <SettingItemsValue
                items={setting.value.items}
                options={HOTLINE_ITEM_OPTIONS}
                onItemsChange={(items) => onItemsChanged(items, index)}
              />
            </>
          )}
          {setting.key == "FEATURE" && (
            <>
              <SettingItemsValue
                items={setting.value.items}
                options={FEATURE_ITEM_OPTIONS}
                onItemsChange={(items) => onItemsChanged(items, index)}
              />
            </>
          )}
          {setting.key == "FOOTER_INTRO" && (
            <>
              <Input
                value={setting.value.link}
                prefix="Link footer"
                {...inputProps}
                onChange={(val) => onValueChanged("link", val, index)}
              />
              <Textarea
                value={setting.value.content}
                prefix="Nội dung footer"
                {...inputProps}
                onChange={(val) => onValueChanged("content", val, index)}
              />
              <Textarea
                value={setting.value.more}
                prefix="Xem thêm"
                {...inputProps}
                onChange={(val) => onValueChanged("more", val, index)}
              />
              <Input
                value={setting.value.copyright}
                prefix="Copyright"
                {...inputProps}
                onChange={(val) => onValueChanged("copyright", val, index)}
              />
            </>
          )}
          {setting.key == "FOOTER_MENU" && (
            <>
              <SettingItemsValue
                items={setting.value.items}
                options={FOOTER_MENUS_ITEM_OPTIONS}
                onItemsChange={(items) => onItemsChanged(items, index)}
              />
            </>
          )}
          {setting.key == "SOCIAL" && (
            <>
              <Input
                value={setting.value.facebook.link}
                prefix="Link Facebook"
                className="rounded-none rounded-tr form-input"
                prefixClassName="rounded-tl w-36"
                onChange={(val) =>
                  onValueChanged("facebook", { ...setting.value.facebook, link: val }, index)
                }
              />
              <div className="flex mb-2">
                <div className="form-input flex items-center hover:border-gray-400 w-36 bg-gray-100 border-r-0 rounded-none rounded-bl">
                  Hiện Facebook
                </div>
                <div className="form-input flex items-center flex-grow rounded-none rounded-br">
                  <Switch
                    value={setting.value.facebook.visible}
                    onChange={(val) =>
                      onValueChanged("facebook", { ...setting.value.facebook, visible: val }, index)
                    }
                  />
                </div>
              </div>

              <Input
                value={setting.value.youtube.link}
                prefix="Link Youtube"
                className="rounded-none rounded-tr form-input"
                prefixClassName="rounded-tl w-36"
                onChange={(val) =>
                  onValueChanged("youtube", { ...setting.value.youtube, link: val }, index)
                }
              />
              <div className="flex mb-2">
                <div className="form-input flex items-center hover:border-gray-400 w-36 bg-gray-100 border-r-0 rounded-none rounded-bl">
                  Hiện Youtube
                </div>
                <div className="form-input flex items-center flex-grow rounded-none rounded-br">
                  <Switch
                    value={setting.value.youtube.visible}
                    onChange={(val) =>
                      onValueChanged("youtube", { ...setting.value.youtube, visible: val }, index)
                    }
                  />
                </div>
              </div>

              <Input
                value={setting.value.zalo.link}
                prefix="Link Zalo"
                className="rounded-none rounded-tr form-input"
                prefixClassName="rounded-tl w-36"
                onChange={(val) =>
                  onValueChanged("zalo", { ...setting.value.zalo, link: val }, index)
                }
              />
              <div className="flex mb-2">
                <div className="form-input flex items-center hover:border-gray-400 w-36 bg-gray-100 border-r-0 rounded-none rounded-bl">
                  Hiện Zalo
                </div>
                <div className="form-input flex items-center flex-grow rounded-none rounded-br">
                  <Switch
                    value={setting.value.zalo.visible}
                    onChange={(val) =>
                      onValueChanged("zalo", { ...setting.value.zalo, visible: val }, index)
                    }
                  />
                </div>
              </div>
            </>
          )}
          {setting.key == "POPUP" && (
            <>
              <div className="flex mb-2">
                <div className="form-input flex items-center hover:border-gray-400 w-36 bg-gray-100 border-r-0 rounded-none rounded-bl">
                  Hiện Popup
                </div>
                <div className="form-input flex items-center flex-grow rounded-none rounded-br">
                  <Switch
                    value={setting.value.enable}
                    onChange={(val) => onValueChanged("enable", val, index)}
                  />
                </div>
              </div>
              <ImageInput
                value={setting.value.image}
                onChange={(val) => onValueChanged("image", val, index)}
                className={`form-input flex-grow rounded-none rounded-tr`}
              />
              <Input
                value={setting.value.link}
                prefix="Đường dẫn liên kết"
                {...inputProps}
                onChange={(val) => onValueChanged("link", val, index)}
              />
            </>
          )}
        </div>
      ))}
    </>
  );
}
