import 'react-quill/dist/quill.snow.css';

import dynamic from 'next/dynamic';
import { createRef, useEffect, useState } from 'react';

import { Card } from '../../../../components/shared/card/card';
import { ImageUploader } from '../../../../components/shared/form/image-uploader';
import { Input } from '../../../../components/shared/form/input';
import { SelectMulti } from '../../../../components/shared/form/select-multi';
import { TextArea } from '../../../../components/shared/form/text-area';
import { Imgur } from '../../../../lib/imgur';
import { Button } from '../../../shared/form/button';
import { EditPostContext } from '../providers/edit-post-provider';

const ReactQuill = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

export function CreatePost() {
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
    <div className="flex flex-col">
      <div className="flex justify-between items-center">
        <div className="text-2xl font-semibold">Đăng bài</div>
      </div>
      <EditPostContext.Consumer>
        {({ post, publish, tags }) => {
          if (!post) return null;
          return (
            <div className="my-10 flex justify-between space-x-4 ">
              <Card className="m-h-screen w-full">
                <div className="px-2 py-4">
                  <h3 className="text-sm font-semibold py-1">Tiêu đề</h3>
                  <Input
                    placeholder="Nhập tiêu đề"
                    value={post.title}
                    onChanged={(value) => (post.title = value)}
                  />
                </div>
                <div className="px-2 py-4">
                  <h3 className="text-sm font-semibold py-1">Nội dung</h3>
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
              </Card>
              <div className="w-full max-w-sm ">
                <Card className="bg-gray-200 flex flex-col space-y-4 px-2">
                  <ImageUploader
                    label="Hình đại diện"
                    value={post.featureImage}
                    onChanged={(value) => (post.featureImage = value)}
                  />
                  <Input
                    label="Link đăng bài"
                    placeholder="Nhập link đăng bài"
                    value={post.slug}
                    onChanged={(value) => (post.slug = value)}
                  />
                  <Input
                    inputType="datetime-local"
                    label="Ngày đăng bài"
                    value={post.publishedAt ? post.publishedAt.toString() : null}
                    onChanged={(value) => (post.publishedAt = new Date(value))}
                  />
                  <SelectMulti
                    label="Tag trong bài đăng"
                    placeholder="Nhập tên tag"
                    addOnEmpty
                    values={post.tags.map((t) => ({ value: t.id, display: t.name }))}
                    options={tags.map(t => ({ value: t.id, display: t.name }))}
                    style="bg-white"
                  />
                  <TextArea
                    label="Trích dẫn"
                    placeholder="Nhập trích dẫn"
                    value={post.excerpt}
                    onChanged={(value) => (post.excerpt = value)}
                  />
                  <Button primary onClick={publish}>
                    Đăng
                  </Button>
                </Card>
              </div>
            </div>
          );
        }}
      </EditPostContext.Consumer>
    </div>
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
