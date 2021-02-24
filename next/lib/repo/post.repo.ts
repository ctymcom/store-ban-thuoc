import { BaseModel, CrudRepository } from "./crud.repo";
import { Tag } from "./tag.repo";
export interface Post extends BaseModel {
  title?: string; // Tiêu đề
  excerpt?: string; // Đoạn trích
  slug?: string; // từ khoá
  status?: string; // Trạng thái
  publishedAt?: Date; // Ngày công khai
  featureImage?: string; // Hình đại diện
  metaDescription?: string; // Mô tả meta tag
  metaTitle?: string; // Tiêu đề meta tag
  content?: string; // Nội dung html
  tagIds?: string[]; // Danh sách tag
  ogDescription?: string; // Mô tả open graph
  ogImage?: string; // Hình ảnh open graph
  ogTitle?: string; // Tiêu đề open graph
  twitterDescription?: string; // Mô tả twitter
  twitterImage?: string; // Hình ảnh twitter
  twitterTitle?: string; // Tiêu đề twitter
  priority?: number; // Độ ưu tiên
  tags?: Tag[];
}
export class PostRepository extends CrudRepository<Post> {
  apiName: string = "Post";
  shortFragment: string = "id title excerpt status featureImage slug createdAt priority";
  fullFragment: string = this.parseFragment(`
    id: String
    createdAt: DateTime
    updatedAt: DateTime
    title: String
    excerpt: String
    slug: String
    status: String
    publishedAt: DateTime
    featureImage: String
    metaDescription: String
    metaTitle: String
    content: String
    tagIds: [ID]
    ogDescription: String
    ogImage: String
    ogTitle: String
    twitterDescription: String
    twitterImage: String
    twitterTitle: String
    priority: Int
    tags { id name }: [Tag]
  `);
}

export const PostService = new PostRepository();
