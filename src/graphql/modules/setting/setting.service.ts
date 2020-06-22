import { CrudService } from "../../../base/crudService";
import { SettingModel } from "./setting.model";
import { sequelize } from "../../../base/baseModel";
import { SETTING_DATA } from "../../../configs/settingData";
import { SettingGroupModel } from "../settingGroup/settingGroup.model";
import { v1 } from "uuid";
class SettingService extends CrudService<typeof SettingModel> {
  constructor() {
    super(SettingModel);
  }

  static async seedingData() {
    const transaction = await sequelize.transaction();

    try {
      let settings: Array<any> = [];
      let groups = SETTING_DATA.map((value: any) => {
        value.id = v1();

        value.settings = value.settings.map((v: any) => {
          v.settingGroupId = value.id;
          v.id = v1();
          return v;
        });

        settings = [...settings, ...value.settings];

        delete value.settings;
        return value;
      });

      await SettingGroupModel.bulkCreate(groups, {
        transaction,
        ignoreDuplicates: true,
      });
      await SettingModel.bulkCreate(settings, {
        transaction,
        ignoreDuplicates: true,
      });

      transaction.commit();
    } catch (err) {
      transaction.rollback();
      throw err;
    }
  }
}

const settingService = new SettingService();

export { settingService };

SettingService.seedingData();
