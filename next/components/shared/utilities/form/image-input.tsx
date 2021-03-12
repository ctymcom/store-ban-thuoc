import { ChangeEvent, MutableRefObject, useRef, useState } from "react";
import { useToast } from "../../../../lib/providers/toast-provider";
import { ImageDialog } from "../dialog/image-dialog";
import { Imgur } from "./../../../../lib/imgur";
import { Button } from "./button";

interface PropsType extends ReactProps {
  value: any;
  placeholder?: string;
  name?: string;
  inputClassName?: string;
  prefix?: string;
  prefixClassName?: string;
  onChange?: (val: string) => any;
}
export function ImageInput({ className = "", inputClassName = "", ...props }: PropsType) {
  const ref: MutableRefObject<HTMLInputElement> = useRef();
  const [showImage, setShowImage] = useState("");
  const [uploading, setUploading] = useState(false);

  const toast = useToast();

  const onFileChanged = async (e: ChangeEvent<HTMLInputElement>) => {
    let files = e.target.files;
    if (files.length == 0) return;

    let file = files[0];
    try {
      setUploading(true);
      let res = await Imgur.uploadImage(file);
      props.onChange(res.link);
    } catch (err) {
      console.error(err);
      toast.error(`Upload ảnh thất bại. Xin thử lại bằng url thay vì upload.`);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  return (
    <div
      className={`form-input relative flex items-center focus-within:border-primary-dark group px-0 ${
        className || ""
      }`}
    >
      <img
        className="w-10 h-10 p-1 object-cover cursor-pointer"
        src={props.value || "/assets/img/default.png"}
        onClick={() => setShowImage(props.value)}
        onError={(e) => {
          (e.target as any).src = "/assets/img/default.png";
        }}
      />
      <input
        className={`flex-grow h-9 px-1 ${inputClassName || ""}`}
        name={props.name}
        value={props.value}
        placeholder={props.placeholder}
        onChange={(e) => props.onChange(e.target.value)}
      />
      <Button
        className="border-l h-9 rounded-none border-gray-300"
        isLoading={uploading}
        text="Upload"
        onClick={() => ref.current?.click()}
      ></Button>
      <input hidden type="file" accept="image/*" ref={ref} onChange={onFileChanged} />
      <ImageDialog isOpen={!!showImage} image={showImage} onClose={() => setShowImage("")} />
    </div>
  );
}
