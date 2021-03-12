import { createContext, useContext, useEffect, useState } from "react";
import { Feedback, FeedbackService } from "./../../../../lib/repo/feedback.repo";

export const FeedbackContext = createContext<
  Partial<{
    feedbacks: Feedback[];
    removeFeedback: (id: string) => Promise<any>;
    saveFeedback: (data: Feedback) => Promise<any>;
  }>
>({});

export function FeedbackProvider({ children }: any) {
  const [feedbacks, setFeedbacks] = useState(null);

  useEffect(() => {
    loadFeedbacks();
  }, []);

  const loadFeedbacks = () => {
    FeedbackService.getAll({ query: { limit: 0 } }).then((res) => {
      setFeedbacks(res.data);
    });
  };

  const saveFeedback = async (feedback: Feedback) => {
    let { id, __typename, createdAt, updatedAt, ...data } = feedback;
    await FeedbackService.createOrUpdate({ id, data }).then((res) => {
      loadFeedbacks();
    });
  };

  const removeFeedback = async (id: string) => {
    await FeedbackService.delete({ id }).then(() => {
      loadFeedbacks();
    });
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedbacks,
        saveFeedback,
        removeFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
}

export const useFeedbackContext = () => useContext(FeedbackContext);
