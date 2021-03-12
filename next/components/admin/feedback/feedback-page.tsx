import { Feedback } from "../../../lib/repo/feedback.repo";
import { Spinner } from "../../shared/utilities/spinner";
import { useFeedbackContext } from "./providers/feedback-provider";
import FeedbackItem from "./components/feedback-item";
import { Dialog } from "../../shared/utilities/dialog/dialog";
import { useState } from "react";
import { Form } from "../../shared/utilities/form/form";
import { Label } from "./../../shared/form/label";
import { ImageInput } from "../../shared/utilities/form/image-input";

interface PropsType extends ReactProps {}

export default function FeedbackPage({ ...props }: PropsType) {
  const [currentFeedback, setCurrentFeedback] = useState<Feedback>(null);
  const { feedbacks, removeFeedback, saveFeedback } = useFeedbackContext();

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
  const submitFeedback = async () => {};

  return (
    <>
      {!feedbacks ? (
        <Spinner />
      ) : (
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
      )}
      {/* <Dialog isOpen={!!currentFeedback} title={`${currentFeedback ? "Cập nhật" : "Tạo"} cảm nhận`}>
        <Dialog.Body>
          <Form onSubmit={submitFeedback}>
            <Label htmlFor="image" text="Hình ảnh" />
            <ImageInput name="image" value={currentFeedback.avatar} onChange={val => setCurrentFeedback({...currentFeedback, avatar: val})}/>
            <Label htmlFor="image" text="Hình ảnh" />
            <ImageInput name value={currentFeedback.avatar} onChange={val => setCurrentFeedback({...currentFeedback, avatar: val})}/>
          </Form>
        </Dialog.Body>
      </Dialog> */}
    </>
  );
}
