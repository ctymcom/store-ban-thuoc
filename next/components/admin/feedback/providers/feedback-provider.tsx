import { createContext, useContext, useEffect, useState } from "react";
import useDebounce from "../../../../lib/hooks/useDebounce";
import { Pagination } from "../../../../lib/repo/crud.repo";
import { Post, PostService } from "../../../../lib/repo/post.repo";
import { Feedback, FeedbackService } from "./../../../../lib/repo/feedback.repo";

export const FeedbackContext = createContext<
  Partial<{
    feedbacks: Feedback[];
    removeFeedback: (id: string) => Promise<any>;
    saveFeedback: (id: string, data: Feedback) => Promise<any>;
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

  const saveFeedback = async (id: string = null, data: Feedback) => {
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
