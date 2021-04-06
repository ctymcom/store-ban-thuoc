import { useState, useEffect } from "react";
import { useAuth } from "../../../lib/providers/auth-provider";
import { useToast } from "../../../lib/providers/toast-provider";
import { OrderService } from "../../../lib/repo/order.repo";
import { Dialog, DialogPropsType } from "../utilities/dialog/dialog";
import { Button } from "../utilities/form/button";
import { Form } from "../utilities/form/form";
import { Input } from "../utilities/form/input";
import { Select } from "../utilities/form/select";
import { Textarea } from "../utilities/form/textarea";

interface PropsType extends DialogPropsType {
  orderId: string;
}

export function RateOrderDialog({ ...props }: PropsType) {
  const [isPosting, setIsPosting] = useState(false);
  const [reviewer, setReviewer] = useState("");
  const [content, setContent] = useState("");
  const [star, setStar] = useState(0);
  const auth = useAuth();
  const toast = useToast();

  useEffect(() => {
    setReviewer(auth.user.nickname);
  }, [auth]);

  const onPostComment = async () => {
    if (!reviewer || !content) {
      toast.warn("Yêu cầu nhập đầy đủ nội dung trước khi đăng bài");
      return;
    }

    setIsPosting(true);
    try {
      await OrderService.rateOrder(props.orderId, reviewer, star, content);
      toast.success("Đánh giá đơn hàng thành công");
    } catch (err) {
      toast.error("Đánh giá đơn hàng thất bại. " + err.message);
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <Dialog {...props}>
      <Dialog.Body>
        <Form className="animate-emerge-up">
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
          <div className="flex justify-end mt-2">
            <Select
              className="md:w-28"
              wrapperClassName="flex-1 md:flex-grow-0 md:flex-shrink-0"
              value={star}
              disabled={isPosting}
              onChange={(val) => setStar(val)}
              options={[1, 2, 3, 4, 5].map((star) => ({ label: star + " sao", value: star }))}
            />
            <Button
              primary
              large
              submit
              className="w-40 ml-2"
              text="Đăng đánh giá"
              isLoading={isPosting}
              onClick={onPostComment}
            />
          </div>
        </Form>
      </Dialog.Body>
    </Dialog>
  );
}
