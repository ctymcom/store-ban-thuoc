import { CrudController } from "../../../base/crudController";
import { SettingModel } from "./setting.model";
class SettingController extends CrudController<typeof SettingModel> {
  constructor() {
    super(SettingModel);
  }
}

const settingController = new SettingController();

export { settingController };
