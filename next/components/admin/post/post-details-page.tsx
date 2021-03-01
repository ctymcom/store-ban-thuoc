import { PostDetailsForm } from "./component/post-details-form";
import { PostDetailsContent } from './component/post-details-content';
import { usePostDetailsContext } from "./providers/post-details-provider";
import { Spinner } from "../../shared/utilities/spinner";
import { useEffect, useState } from "react";

interface PropTypes extends ReactProps {
};
export function PostDetailsPage(props: PropTypes) {

  const { post } = usePostDetailsContext()
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (post) {
      setTitle(post.id ? 'Cập nhật bài đăng' : 'Tạo bài đăng mới')
    }
  }, [post]);

  return <>
    <div className="flex justify-between items-center h-12">
      <div className="text-xl text-gray-800 font-semibold">{ title }</div>
    </div>
    {
      !post ? <Spinner/> :
      <div className="flex max-w-7xl pt-2">
        <div className="flex-grow">
          <PostDetailsContent />
        </div>
        <div className="flex-grow-0 w-96">
          <PostDetailsForm/>
        </div>
      </div>
    }
  </>
}
