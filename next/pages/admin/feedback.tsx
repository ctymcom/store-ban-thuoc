import { AdminLayout } from "../../layouts/admin-layout";
import { FeedbackProvider } from "../../components/admin/feedback/providers/feedback-provider";
import FeedbackPage from "../../components/admin/feedback/feedback-page";

export default function Feedback() {
  return (
    <FeedbackProvider>
      <FeedbackPage />
    </FeedbackProvider>
  );
}

Feedback.Layout = AdminLayout;
