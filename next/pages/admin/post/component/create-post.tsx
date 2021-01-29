import { Input } from "../../../../components/shared/form/input";
import { SelectMulti } from "../../../../components/shared/form/select-multi";
import { TextArea } from "../../../../components/shared/form/text-area";
import { IconUpload } from "../../../../lib/svg/icon-upload";
import { Card } from "../../../../components/shared/card/card";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import React, { createRef, forwardRef, useEffect, useState } from "react";
// import ImageResize from "quill-image-resize-module";
// import ReactQuill from "react-quill";

const ReactQuill = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

export function CreatePost() {
  const [Content, setContent] = useState(``);
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
        imageResize: {
          parchment: Quill.import("parchment"),
        },

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
          handlers: {
            image: imageHandler,
          },
        },
      });
    });
  }, []);
  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center">
        <div className="text-2xl font-semibold">Đăng bài</div>
      </div>
      <div className="my-10 flex justify-between space-x-4 ">
        <Card className="m-h-screen w-full">
          <div className="px-2 py-4">
            <h3 className="text-sm font-semibold py-1">Tiêu đề</h3>
            <Input placeholder="Nhập tiêu đề" />
          </div>
          <div className="px-2 py-4">
            <h3 className="text-sm font-semibold py-1">Nội dung</h3>
            {!!EditorModules && (
              <ReactQuill
                theme="snow"
                value={Content}
                onChange={setContent}
                modules={EditorModules}
                placeholder="Nhập nội dung"
              />
            )}
          </div>
        </Card>

        <Card className="bg-gray-200 w-full max-w-sm">
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
}
function uploadImage(image) {
  return new Promise((resolve, reject) => {
    var data = new FormData();
    data.append("image", image);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://api.imgur.com/3/image", true);
    xhr.setRequestHeader("Authorization", "Client-ID " + "dd32dd3c6aaa9a0");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        var response = JSON.parse(xhr.responseText);
        if (response.status === 200 && response.success) {
          resolve(response.data.link);
        } else {
          var reader = new FileReader();
          reader.onload = function (e) {
            resolve(e.target.result);
          };
          reader.readAsDataURL(image);
        }
      }
    };
    xhr.send(data);
  });
}

async function imageHandler() {
  const input = document.createElement("input");
  input.setAttribute("type", "file");
  input.setAttribute("accept", "image/*");
  input.click();
  input.onchange = async function () {
    const file = input.files[0];
    console.log("User trying to uplaod this:", file);

    const id = await uploadImage(file); // I'm using react, so whatever upload function
    const range = this.quill.getSelection();
    const link = id;

    // this part the image is inserted
    // by 'image' option below, you just have to put src(link) of img here.
    this.quill.insertEmbed(range.index, "image", link);
  }.bind(this); // react thing
}
