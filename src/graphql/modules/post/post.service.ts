import { CrudService } from "../../../base/crudService";
import { PostModel } from "./post.model";
class PostService extends CrudService<typeof PostModel> {
  constructor() {
    super(PostModel);
  }
}

const postService = new PostService();

export { postService };
