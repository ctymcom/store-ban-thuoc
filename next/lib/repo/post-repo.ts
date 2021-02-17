import { GraphRepository } from "../graphql/graph-repository";
import { Tag } from "./tag-repo";
export type Post = {
  id?: string;
  createdAt: Date;
  updateAt: Date;
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
};
export class PostRepository extends GraphRepository<Post> {
  shortFragment: string = "id title excerpt status featureImage slug";
  fullFragment: string = `
    id
    createdAt
    updatedAt

    title
    excerpt
    slug
    status
    publishedAt
    featureImage
    metaDescription
    metaTitle
    content
    tagIds
    ogDescription
    ogImage
    ogTitle
    twitterDescription
    twitterImage
    twitterTitle

    tags { id name }`;
  apiName: string = "Post";
}
