import { GraphRepository } from "../graphql/graph-repository";
export type Feedback = {
  id?: string;
  createdAt: Date;
  updatedAt: Date;
  name?: string; // Tên người phản hồi
  title?: string; // Tiêu đề phản hồi
  avatar?: string; // Hình đại diện
  content?: string; // Nội dung phản hồi
  priority?: number; // Độ ưu tiên
};

export class FeedbackRepository extends GraphRepository<Feedback> {
  shortFragment: string = "id name title avatar content";
  fullFragment: string = "id name title avatar content";
  apiName: string = "Feedback";
}
