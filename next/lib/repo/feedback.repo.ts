import { BaseModel, CrudRepository } from "./crud.repo";
export interface Feedback extends BaseModel {
  name?: string; // Tên người phản hồi
  title?: string; // Tiêu đề phản hồi
  avatar?: string; // Hình đại diện
  content?: string; // Nội dung phản hồi
  priority?: number; // Độ ưu tiên
}

export class FeedbackRepository extends CrudRepository<Feedback> {
  apiName: string = "Feedback";
  shortFragment: string = this.parseFragment(`
    id: String
    createdAt: DateTime
    updatedAt: DateTime
    name: String
    title: String
    avatar: String
    content: String
    priority: Int
  `);
  fullFragment: string = this.parseFragment(`
    id: String
    createdAt: DateTime
    updatedAt: DateTime
    name: String
    title: String
    avatar: String
    content: String
    priority: Int
  `);
}

export const FeedbackService = new FeedbackRepository();
