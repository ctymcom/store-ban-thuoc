import { Feedback } from "../../../lib/repo/feedback.repo";
import { Spinner } from "../../shared/utilities/spinner";
import { useFeedbackContext } from "./providers/feedback-provider";
import FeedbackItem from "./components/feedback-item";
import { Dialog } from "../../shared/utilities/dialog/dialog";
import { useState } from "react";
import { Form } from "../../shared/utilities/form/form";
import { Label } from "./../../shared/utilities/form/label";
import { ImageInput } from "../../shared/utilities/form/image-input";
import { Input } from "../../shared/utilities/form/input";
import { Textarea } from "../../shared/utilities/form/textarea";
import { Button } from "../../shared/utilities/form/button";
import { HiPlus } from "react-icons/hi";
import { useToast } from "../../../lib/providers/toast-provider";

interface PropsType extends ReactProps {}

export default function FeedbackPage({ ...props }: PropsType) {
  const [currentFeedback, setCurrentFeedback] = useState<Feedback>(null);
  const { feedbacks, removeFeedback, saveFeedback } = useFeedbackContext();
  const toast = useToast();

  const onSaveFeedback = async (feedback: Feedback = null) => {
    if (feedback) {
      setCurrentFeedback({ ...feedback });
    } else {
      setCurrentFeedback({});
    }
  };
  const onRemoveFeedback = async (id: string) => {
    if (confirm("Xoá cảm nhận")) {
      await removeFeedback(id);
    }
  };
  const onSubmitFeedback = async () => {
    if (
      !currentFeedback.avatar ||
      !currentFeedback.name ||
      !currentFeedback.title ||
      !currentFeedback.content
    ) {
      toast.warn("Bắt buộc nhập đầy đủ các trường");
      return;
    }

    try {
      await saveFeedback(currentFeedback);
      toast.success(`${currentFeedback.id ? "Cập nhật" : "Tạo"} thành công.`);
    } catch (err) {
      console.error(err);
      toast.error(`${currentFeedback.id ? "Cập nhật" : "Tạo"} thất bại. ${err.message}`);
    } finally {
      setCurrentFeedback(null);
    }
  };

  return (
    <>
      {!feedbacks ? (
        <Spinner />
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4">
            {feedbacks.map((feedback) => (
              <FeedbackItem
                key={feedback.id}
                feedback={feedback}
                onSaveFeedback={() => onSaveFeedback(feedback)}
                onRemoveFeedback={() => onRemoveFeedback(feedback.id)}
              />
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <Button
              className="bg-white"
              outline
              icon={<HiPlus />}
              text="Thêm cảm nhận"
              onClick={onSaveFeedback}
            />
          </div>
        </>
      )}
      {!!currentFeedback && (
        <Dialog
          width="600px"
          isOpen={!!currentFeedback}
          title={`${currentFeedback.id ? "Cập nhật" : "Tạo"} cảm nhận`}
          onClose={setCurrentFeedback}
        >
          <Dialog.Body>
            <Form>
              <Label htmlFor="image" text="Hình ảnh" />
              <ImageInput
                className="mb-3"
                name="image"
                value={currentFeedback.avatar}
                onChange={(val) => setCurrentFeedback({ ...currentFeedback, avatar: val })}
              />
              <Label htmlFor="name" text="Tên ngườI cảm nhận" />
              <Input
                className="mb-3"
                name="name"
                value={currentFeedback.name}
                onChange={(val) => setCurrentFeedback({ ...currentFeedback, name: val })}
              />
              <Label htmlFor="title" text="Danh hiệu người cảm nhận" />
              <Input
                className="mb-3"
                name="title"
                value={currentFeedback.title}
                onChange={(val) => setCurrentFeedback({ ...currentFeedback, title: val })}
              />
              <Label htmlFor="content" text="Nội dung cảm nhận" />
              <Textarea
                className="mb-3"
                rows={3}
                name="content"
                value={currentFeedback.content}
                onChange={(val) => setCurrentFeedback({ ...currentFeedback, content: val })}
              />
              <Button
                className="block ml-auto mb-3"
                text={`${currentFeedback.id ? "Cập nhật" : "Tạo"} sản phẩm`}
                submit
                primary
                large
                asyncLoading
                onClick={onSubmitFeedback}
              />
            </Form>
          </Dialog.Body>
        </Dialog>
      )}
    </>
  );
}
