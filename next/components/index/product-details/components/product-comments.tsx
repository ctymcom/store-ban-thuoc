import { Button } from "../../../shared/utilities/form/button";
import { useProductDetailsContext } from "../providers/product-details-provider";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import { HiPlus, HiStar } from "react-icons/hi";
import { useEffect, useState } from "react";
import { Form } from "../../../shared/utilities/form/form";
import { Input } from "../../../shared/utilities/form/input";
import { useAuth } from "./../../../../lib/providers/auth-provider";
import { Textarea } from "../../../shared/utilities/form/textarea";
import { Select } from "../../../shared/utilities/form/select";
import { useToast } from "../../../../lib/providers/toast-provider";

export function ProductComments() {
  const {
    comments,
    commentTotal,
    loadComments,
    postComment,
    setComments,
  } = useProductDetailsContext();
  const [commentOpen, setCommentOpen] = useState(false);
  const [reviewer, setReviewer] = useState("");
  const [content, setContent] = useState("");
  const [star, setStar] = useState(5);
  const [isPosting, setIsPosting] = useState(false);
  const { user } = useAuth();
  const toast = useToast();

  useEffect(() => {
    if (user) {
      setReviewer(user.nickname);
    }
  }, [user]);

  const onPostComment = async () => {
    if (!reviewer || !content) {
      toast.warn("Yêu cầu nhập đầy đủ nội dung trước khi đăng bài");
      return;
    }

    setIsPosting(true);
    try {
      await postComment({ reviewerName: reviewer, content, imark: star });
      setComments([
        { reviewer, content, imark: star, createdAt: new Date().toISOString() },
        ...comments,
      ]);
      toast.success("Đăng đánh giá thành công");
      setCommentOpen(false);
    } catch (err) {
      toast.error("Đăng đánh giá thất bại. " + err.message);
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <>
      <div className="flex w-full bg-white mt-4">
        <a className="text-lg font-semibold px-1 mr-2 text-primary uppercase border-gray-200 border-b-2 whitespace-nowrap">
          Đánh giá
        </a>
        <Button
          className="pb-2"
          text="Viết đánh giá"
          icon={<HiPlus />}
          onClick={() => setCommentOpen(!commentOpen)}
        />
      </div>
      <div>
        {commentOpen && (
          <Form className="max-w-sm animate-emerge-up">
            <Input
              className="mt-2"
              readonly={isPosting}
              value={reviewer}
              onChange={(val) => setReviewer(val)}
            />
            <Textarea
              className="mt-2"
              placeholder="Nhập nội dung đánh giá"
              readonly={isPosting}
              value={content}
              onChange={(val) => setContent(val)}
            />
            <div className="flex mt-2">
              <Select
                className="flex-grow mr-2"
                value={star}
                disabled={isPosting}
                onChange={(val) => setStar(val)}
                options={[1, 2, 3, 4, 5].map((star) => ({ label: star + " sao", value: star }))}
              />
              <Button
                primary
                large
                submit
                className="w-40"
                text="Đăng đánh giá"
                isLoading={isPosting}
                onClick={onPostComment}
              />
            </div>
          </Form>
        )}
        {comments?.map((comment) => (
          <div className="py-3">
            <div className="text-gray-700 font-semibold">{comment.reviewer || "Ẩn danh"}</div>
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <i
                  className={`text-lg pr-1 ${
                    star <= comment.imark ? "text-yellow-400" : "text-gray-400"
                  }`}
                >
                  <HiStar />
                </i>
              ))}
              <span className="text-gray-500 ml-2">
                {format(parseISO(comment.createdAt), "dd/MM/yyyy HH:mm")}
              </span>
            </div>
            <p className="text-gray-600">{comment.content}</p>
          </div>
        ))}
        {comments?.length < commentTotal && (
          <div className="flex justify-center border-t border-gray-200">
            <Button
              className="mx-auto mt-2 text-primary hover:text-primary-dark"
              text={`Xem thêm ${commentTotal - comments.length} đánh giá`}
              asyncLoading
              onClick={loadComments}
            />
          </div>
        )}
      </div>
    </>
  );
}
