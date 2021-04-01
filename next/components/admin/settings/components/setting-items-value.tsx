import { Input } from "../../../shared/utilities/form/input";
import { HiOutlineTrash } from "react-icons/hi";
import { Switch } from "./../../../shared/utilities/form/switch";
import { ImageInput } from "./../../../shared/utilities/form/image-input";

interface PropTypes extends ReactProps {
  items: any[];
  options: SettingItemsOption[];
  onItemsChange: (items) => any;
}

export interface SettingItemsOption extends Option {
  type: "string" | "number" | "boolean" | "image" | "richText";
}

export function SettingItemsValue({ items, options, ...props }: PropTypes) {
  const onValueChange = (value: any, key: string, index: number) => {
    let item = items[index];
    item[key] = value;
    props.onItemsChange([...items]);
  };

  const onAddItem = () => {
    props.onItemsChange([
      ...items,
      options.reduce((item, option) => ({ ...item, [option.value]: "" }), {}),
    ]);
  };

  const onDeleteItem = (index: number) => {
    props.onItemsChange([...items.slice(0, index), ...items.slice(index + 1)]);
  };

  return (
    <div className="">
      {items.map((item, index) => (
        <div key={index} className="flex items-start mb-2 group">
          <div
            className={`flex justify-center items-center border h-10 text-lg w-10 font-bold bg-gray-100 border-r-0 border-gray-400 rounded-l-lg`}
          >
            {index + 1}
          </div>
          <div className="flex-grow">
            {options.map((option, optionIndex) => (
              <div className="flex" key={option.value}>
                <div
                  className={
                    `form-input flex items-center w-auto hover:border-gray-400 flex-grow-0 flex-shrink-0 bg-gray-100 border-r-0 rounded-none ` +
                    `${optionIndex == items.length - 1 ? "rounded-bl" : ""}`
                  }
                  style={{ minWidth: "9rem" }}
                >
                  {option.label}
                </div>
                {option.type == "boolean" && (
                  <div
                    className={
                      `form-input flex-grow flex items-center rounded-none ` +
                      `${optionIndex == 0 ? "rounded-tr" : ""} ${
                        optionIndex == items.length - 1 ? "rounded-br" : ""
                      }`
                    }
                  >
                    <Switch
                      value={item[option.value]}
                      onChange={(val) => onValueChange(val, option.value, index)}
                    />
                  </div>
                )}
                {option.type == "image" && (
                  <ImageInput
                    value={item[option.value]}
                    onChange={(val) => onValueChange(val, option.value, index)}
                    className={
                      `form-input flex-grow rounded-none ` +
                      `${optionIndex == 0 ? "rounded-tr" : ""} ${
                        optionIndex == items.length - 1 ? "rounded-br" : ""
                      }`
                    }
                  />
                )}
                {(option.type == "string" || option.type == "number") && (
                  <input
                    className={
                      `form-input flex-grow rounded-none ` +
                      `${optionIndex == 0 ? "rounded-tr" : ""} ${
                        optionIndex == items.length - 1 ? "rounded-br" : ""
                      }`
                    }
                    value={item[option.value]}
                    type={option.type == "number" ? "number" : "text"}
                    onChange={(e) => onValueChange(e.target.value, option.value, index)}
                  />
                )}
                {option.type == "richText" && (
                  <textarea
                    className={
                      `form-input flex-grow rounded-none ` +
                      `${optionIndex == 0 ? "rounded-tr" : ""} ${
                        optionIndex == items.length - 1 ? "rounded-br" : ""
                      }`
                    }
                    value={item[option.value]}
                    rows={3}
                    onChange={(e) => onValueChange(e.target.value, option.value, index)}
                  />
                )}
              </div>
            ))}
          </div>
          <button
            className="btn-default btn-icon hover-danger p-0 w-10 opacity-0 group-hover:opacity-100"
            type="button"
            onClick={() => onDeleteItem(index)}
          >
            <i className="text-lg">
              <HiOutlineTrash />
            </i>
          </button>
        </div>
      ))}
      <div className="flex pl-10">
        <button type="button" className="btn-outline bg-gray-100" onClick={onAddItem}>
          <span>Thêm mục mới</span>
        </button>
      </div>
    </div>
  );
}
