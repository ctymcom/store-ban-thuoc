import { CrudService } from "../../../base/crudService";
import { MemberModel } from "./member.model";
class MemberService extends CrudService<typeof MemberModel> {
  constructor() {
    super(MemberModel);
  }
}

const memberService = new MemberService();

export { memberService };
