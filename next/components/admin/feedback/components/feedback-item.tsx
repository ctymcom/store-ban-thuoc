import { Button } from "../../../shared/utilities/form/button";
import { Img } from "../../../shared/utilities/img";
import { Feedback } from "./../../../../lib/repo/feedback.repo";

interface PropsType extends ReactProps {
  feedback: Feedback;
  onRemoveFeedback: () => Promise<any>;
  onSaveFeedback: () => Promise<any>;
}

export default function FeedbackItem({ feedback, ...props }: PropsType) {
  return (
    <div className="bg-white border border-gray-200 box-sm p-4 rounded flex">
      <div className="w-16 flex-shrink-0 flex-grow-0">
        <Img src={feedback.avatar} avatar />
      </div>
      <div className="pl-4 flex-grow">
        <div className="text-primary text-lg font-bold">{feedback.name}</div>
        <div className="text-gray-800 text-lg font-semibold">{feedback.title}</div>
        <p className="text-gray-700 mt-2">{feedback.content}</p>
        <div className="flex justify-end">
          <Button outline text="Cập nhật" onClick={props.onSaveFeedback} />
          <Button outline text="Xoá" asyncLoading onClick={props.onRemoveFeedback} />
        </div>
      </div>
    </div>
  );
}
