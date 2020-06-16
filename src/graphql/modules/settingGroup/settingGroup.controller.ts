import { CrudController } from "../../../base/crudController";
import { SettingGroupModel } from "./settingGroup.model";
class SettingGroupController extends CrudController<typeof SettingGroupModel> {
  constructor() {
    super(SettingGroupModel);
  }
}

const settingGroupController = new SettingGroupController();

export { settingGroupController };
