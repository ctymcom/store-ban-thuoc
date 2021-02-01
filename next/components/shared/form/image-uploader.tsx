import { Imgur } from "../../../lib/imgur";
import { IconUpload } from "../../../lib/svg/icon-upload";
import { FormFieldProps } from "./form-field.type";
import { useState } from "react";
import { IconInfor } from "../../../lib/svg/icon-infor";
import { Label } from "./label";
type ImageUploaderProps = FormFieldProps & {};
export function ImageUploader({
  label,
  tooltip,
  name,
  onChanged = () => {},
  ...props
}: ImageUploaderProps) {
  const [Src, setSrc] = useState<string>(props.value);
  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = async () => {
      const file = input.files[0];
      const link = await Imgur.uploadImage(file); // I'm using react, so whatever upload function
      setSrc(link);
      onChanged(link);
    };
  };
  return (
    <div className="flex flex-col space-y-1">
      {label && (
        <div className="flex items-center">
          <Label text={label} htmlFor={name} />
          {tooltip && (
            <div className="group pt-1 ml-2 w-5 tooltip">
              <i className="text-gray-400">
                <IconInfor />
              </i>
              <div className="tooltiptext bg-gray-100 text-gray-400 p-1 w-44 max-w-xl text-center ml-3 text-xs">
                {tooltip}
              </div>
            </div>
          )}
        </div>
      )}
      <div
        onClick={imageHandler}
        className="text-gray-400 bg-white w-full rounded shadow justify-center cursor-pointer h-48 flex items-center"
      >
        {!Src ? (
          <div className="flex flex-col items-center py-20">
            <div className="w-10">
              <IconUpload />
            </div>
            <p className="text-xs">Upload hình ảnh</p>
          </div>
        ) : (
          <img src={Src} className="object-cover h-48 w-full rounded" />
        )}
      </div>
    </div>
  );
}
