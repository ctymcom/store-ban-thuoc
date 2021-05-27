import { useEffect, useState } from "react";
import { Editor } from "../../shared/utilities/form/editor";
import { Spinner } from "../../shared/utilities/spinner";
import { PostDetailsForm } from "./component/post-details-form";
import { usePostDetailsContext } from "./providers/post-details-provider";

interface PropTypes extends ReactProps {}
export function PostDetailsPage(props: PropTypes) {
  const { post } = usePostDetailsContext();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState<any>();

  useEffect(() => {
    if (post) {
      setTitle(post.id ? "Cập nhật bài đăng" : "Tạo bài đăng mới");
      setContent(post.content);
    }
  }, [post]);

  useEffect(() => {
    if (content !== undefined) {
      post.content = content;
    }
  }, [content]);

  return (
    <>
      <div className="flex justify-between items-center h-12">
        <div className="text-xl text-gray-800 font-semibold">{title}</div>
      </div>
      {!post ? (
        <Spinner />
      ) : (
        <div className="flex max-w-7xl pt-2">
          <div className="flex-grow">
            <Editor minHeight="850px" maxHeight="850px" value={content} onChange={setContent} />
          </div>
          <div className="flex-grow-0 w-96">
            <PostDetailsForm />
          </div>
        </div>
      )}
    </>
  );
}
