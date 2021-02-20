import { GraphRepository } from "../graphql/graph.repo";
export type Tag = {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  name?: string; // Tên tag
  slug?: string; // Từ khoá
  description?: string; // Mô tả
  accentColor?: string; // Mã màu
  featureImage?: string; // Hình ảnh đại diện
};
export class TagRepository extends GraphRepository<Tag> {
  shortFragment: string = "id slug name";
  fullFragment: string = `id createdAt updatedAt name slug description accentColor featureImage`;
  apiName: string = "Tag";
}
