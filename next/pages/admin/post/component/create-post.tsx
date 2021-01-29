import "react-quill/dist/quill.snow.css";

import dynamic from "next/dynamic";
import { createRef, useContext, useEffect, useState } from "react";

import { Card } from "../../../../components/shared/card/card";
import { Input } from "../../../../components/shared/form/input";
import { SelectMulti } from "../../../../components/shared/form/select-multi";
import { TextArea } from "../../../../components/shared/form/text-area";
import { Imgur } from "../../../../lib/imgur";
import { IconUpload } from "../../../../lib/svg/icon-upload";
import { EditPostContext, EditPostProvider } from "../providers/edit-post-provider";

const ReactQuill = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

export function CreatePost() {
  const [Content, setContent] = useState(`<img src="https://placekitten.com/1024" />`);
  const [EditorModules, setEditorModules] = useState<any>();
  const editor = createRef();
  useEffect(() => {
    Promise.all([
      import("react-quill"),
      import("quill-image-resize-module-react"),
      // import("quill-html-edit-button"),
    ]).then(([{ Quill }, { default: ImageResize }]) => {
      Quill.register("modules/imageResize", ImageResize);
      // Quill.register("modules/htmlEditButton", htmlEditButton);
      setEditorModules({
        imageResize: { parchment: Quill.import("parchment") },
        toolbar: {
          container: [
            ["bold", "italic", "underline", "strike"], // toggled buttons
            ["blockquote", "code-block"],
            ["link", "image"],

            [{ header: 1 }, { header: 2 }], // custom button values
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }], // superscript/subscript
            [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
            [{ direction: "rtl" }], // text direction

            [{ size: ["small", false, "large", "huge"] }], // custom dropdown
            [{ header: [1, 2, 3, 4, 5, 6, false] }],

            [{ color: [] }, { background: [] }], // dropdown with defaults from theme
            [{ font: [] }],
            [{ align: [] }],

            ["clean"],
          ],
          handlers: { image: imageHandler },
        },
      });
    });
  }, []);
  return (
    <EditPostProvider>
      <div className="flex flex-col">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-semibold">Đăng bài</div>
        </div>
        <EditPostContext.Consumer>
          {({ Post }) => {
            if (!Post) return null;
            return (
              <div className="my-10 flex justify-between space-x-4 ">
                <Card className="m-h-screen w-full">
                  <div className="px-2 py-4">
                    <h3 className="text-sm font-semibold py-1">Tiêu đề</h3>
                    <Input
                      placeholder="Nhập tiêu đề"
                      value={Post.title}
                      onChanged={(value) => (Post.title = value)}
                    />
                  </div>
                  <div className="px-2 py-4">
                    <h3 className="text-sm font-semibold py-1">Nội dung</h3>
                    {!!EditorModules && (
                      <ReactQuill
                        theme="snow"
                        value={Post.content}
                        onChange={(value) => (Post.content = value)}
                        modules={EditorModules}
                        placeholder="Nhập nội dung"
                      />
                    )}
                  </div>
                </Card>
                <div className="w-full max-w-sm">
                  <Card className="bg-gray-200 ">
                    <div className="">
                      <h3 className="text-sm font-semibold py-4 px-2">Thiết lập</h3>
                      <div className="text-gray-400 bg-white rounded shadow m-2 flex flex-col items-center justify-center px-20 py-10">
                        <div className="w-10">
                          <IconUpload />
                        </div>
                        <p className="text-xs">Upload hình ảnh</p>
                      </div>
                    </div>
                    <div className="px-2 py-4">
                      <h3 className="text-sm font-semibold py-1">Link đăng bài</h3>
                      <Input placeholder="Nhập link đăng bài" />
                    </div>
                    <div className="px-2 py-4">
                      <h3 className="text-sm font-semibold py-1">Ngày đăng bài</h3>
                      <div className="text-gray-400 rounded shadow  grid grid-cols-2 gap-5">
                        <div className="bg-white px-2 py-2 rounded">16:26</div>
                        <div className="bg-white px-2 py-2 rounded">28/1/2020</div>
                      </div>
                    </div>
                    <div className="px-2 py-4">
                      <h3 className="text-sm font-semibold py-1">Tag trong bài đăng</h3>
                      <div className="text-gray-400 rounded shadow  grid grid-cols-1 gap-5">
                        <SelectMulti options={["Marketing", "Coder"]} style="bg-white" />
                      </div>
                    </div>
                    <div className="px-2 py-4">
                      <h3 className="text-sm font-semibold py-1">Trích dẫn</h3>
                      <TextArea placeholder="Nhập trích dẫn" />
                    </div>
                  </Card>
                </div>
              </div>
            );
          }}
        </EditPostContext.Consumer>
      </div>
    </EditPostProvider>
  );
}

async function imageHandler() {
  const input = document.createElement("input");
  input.setAttribute("type", "file");
  input.setAttribute("accept", "image/*");
  input.click();
  input.onchange = async function () {
    const file = input.files[0];
    console.log("User trying to uplaod this:", file);

    const id = await Imgur.uploadImage(file); // I'm using react, so whatever upload function
    const range = this.quill.getSelection();
    const link = id;

    // this part the image is inserted
    // by 'image' option below, you just have to put src(link) of img here.
    this.quill.insertEmbed(range.index, "image", link);
  }.bind(this); // react thing
}
