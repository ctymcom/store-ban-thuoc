import { BaseModel, CrudRepository } from "./crud.repo";

export interface Notification extends BaseModel {
  id: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  code: string;
  title: string;
  content: string;
  link: string;
  controller: string;
  status: number;
}

export class NotificationRepository extends CrudRepository<Notification> {
  apiName = "Notification";
  shortFragment = this.parseFragment(`
    id: String
    userId: String
    code: String
    title: String
    content: String
    link: String
    controller: String
    createdAt: DateTime
    status: Int
  `);
  fullFragment = this.parseFragment(`
    id: String
    createdAt: DateTime
    updatedAt: DateTime
    userId: String
    code: String
    title: String
    content: String
    controller: String
    link: String
    status: Int
  `);
  async markNotifyAsRead(id: string) {
    return this.mutate({
      mutation: `markNotifyAsRead(notifyId: "${id}")`,
    }).then((res) => res.g0);
  }
}

export const NotificationService = new NotificationRepository();
