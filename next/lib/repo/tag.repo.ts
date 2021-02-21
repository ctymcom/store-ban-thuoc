import { BaseModel, CrudRepository } from "./crud.repo";
export interface Tag extends BaseModel {
  name?: string; // Tên tag
  slug?: string; // Từ khoá
  description?: string; // Mô tả
  accentColor?: string; // Mã màu
  featureImage?: string; // Hình ảnh đại diện
}
export class TagRepository extends CrudRepository<Tag> {
  apiName: string = "Tag";
  shortFragment: string = "id slug name";
  fullFragment: string = `id createdAt updatedAt name slug description accentColor featureImage`;
}

export const TagService = new TagRepository();
