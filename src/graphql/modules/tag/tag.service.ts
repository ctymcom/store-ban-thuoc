import { CrudService } from "../../../base/crudService";
import { TagModel } from "./tag.model";
class TagService extends CrudService<typeof TagModel> {
  constructor() {
    super(TagModel);
  }
}

const tagService = new TagService();

export { tagService };
