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

  async findByKey(key: string) {
    return await this.model.findOne({
      where: {
        key,
      },
    });
  }
 
  static async seedingData() {
    const transaction = await sequelize.transaction();

    try {
      let slugs = SETTING_DATA.map((data) => data.slug);
      let groups = await SettingGroupModel.findAll({
        where: {
          slug: {
            $in: slugs,
          },
        },
      });

      for (let group of SETTING_DATA) {
        let settingGroup = groups.find((rec) => rec.slug === group.slug);
        if (!settingGroup) {
          settingGroup = await SettingGroupModel.create(group, { transaction });
        }

        group.settings = group.settings.map((v: any) => {
          v.settingGroupId = settingGroup.id;
          return v;
        });

        await SettingModel.bulkCreate(group.settings, {
          transaction,
          ignoreDuplicates: true,
        });
      }

      transaction.commit();

      console.log("SEED DATA SETTING SUCCESSFULLY!");

      return;
    } catch (err) {
      console.log("SEED DATA SETTING ERROR!");
      transaction.rollback();
      throw err;
    }
  }
}

const settingService = new SettingService();

SettingService.seedingData();

export { settingService };
