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
  `);
}

export const NotificationService = new NotificationRepository();
