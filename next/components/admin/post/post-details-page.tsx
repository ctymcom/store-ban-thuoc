import { useEffect, useState } from "react";
import { Editor } from "../../shared/utilities/form/editor";
import { Input } from "../../shared/utilities/form/input";
import { Spinner } from "../../shared/utilities/spinner";
import { PostDetailsForm } from "./component/post-details-form";
import { PostDetailsContext, usePostDetailsContext } from "./providers/post-details-provider";

interface PropTypes extends ReactProps {}
export function PostDetailsPage(props: PropTypes) {
  const { post } = usePostDetailsContext();
  const [title, setTitle] = useState<string>();
  const [content, setContent] = useState<any>();

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
    }
  }, [post]);

  useEffect(() => {
    if (content !== undefined) {
      post.content = content;
    }
    if (title !== undefined) {
      post.title = title;
    }
  }, [content, title]);

  return (
    <>
      <div className="flex justify-between items-center h-12">
        <div className="text-xl text-gray-800 font-semibold">
          {post ? (post.id ? "Cập nhật bài đăng" : "Tạo bài đăng mới") : ""}
        </div>
      </div>
      {!post ? (
        <Spinner />
      ) : (
        <div className="flex max-w-7xl pt-2">
          <div className="flex-grow bg-white v-scrollbar p-4" style={{ height: "850px" }}>
            <PostDetailsContext.Consumer>
              {({ post }) => (
                <>
                  <Input
                    className="text-2xl border-0 focus:shadow-none font-semibold mb-2"
                    placeholder="Tiêu đề bài viết"
                    value={title}
                    onChange={setTitle}
                  />
                  <Editor
                    controlClassName=""
                    noBorder
                    noFocus
                    placeholder="Nội dung bài viết"
                    value={content}
                    onChange={setContent}
                  />
                </>
              )}
            </PostDetailsContext.Consumer>
          </div>
          <div className="flex-grow-0 w-96">
            <PostDetailsForm />
          </div>
        </div>
      )}
    </>
  );
}
