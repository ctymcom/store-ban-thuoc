import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { Imgur } from '../../../../lib/imgur';
import { Input } from '../../../shared/form/input';
import { PostDetailsContext } from '../providers/post-details-provider';

const ReactQuill = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

export function PostDetailsContent() {
  const [EditorModules, setEditorModules] = useState<any>();
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
      <PostDetailsContext.Consumer>
        {({ post }) => {
          if (!post) return null;
          return (
              <div className="bg-white p-5 w-full min-h-screen rounded-l rounded-bl">
                <div className="font-semibold text-gray-600 py-1">Tiêu đề</div>
                <Input
                  placeholder="Nhập tiêu đề"
                  value={post.title}
                  onChanged={(value) => (post.title = value)}
                />
                <div className="font-semibold text-gray-600 p-1 mt-3">Nội dung</div>
                {!!EditorModules && (
                  <ReactQuill
                    theme="snow"
                    value={post.content}
                    onChange={(value) => (post.content = value)}
                    modules={EditorModules}
                    placeholder="Nhập nội dung"
                  />
                )}
              </div>
          );
        }}
      </PostDetailsContext.Consumer>
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
