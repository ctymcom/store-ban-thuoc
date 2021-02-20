import { createContext, useContext, useEffect, useState } from "react";
import { Feedback, FeedbackRepository } from "../../../../lib/repo/feedback.repo";
export const FeedbackContext = createContext<{
  [x: string]: any;
  feedbacks?: Feedback[]
}>({});

export function FeedbackProvider(props) {
  let [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const feedbackRepo = new FeedbackRepository();

  const loadFeedback = () => {
    feedbackRepo.getAll({ query: { order: { priority: -1 }} }).then(res => {
      setFeedbacks(JSON.parse(JSON.stringify(res.data)));
    })
  }

  useEffect(() => {
    loadFeedback();
  }, []);

  return <FeedbackContext.Provider value={{ feedbacks }}>{props.children}</FeedbackContext.Provider>;
}

export const useFeedbackContext = () => useContext(FeedbackContext);