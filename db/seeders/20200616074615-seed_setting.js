"use strict";
var faker = require("faker");
var { SETTING_DATA } = require("../../dist/configs/settingData");

module.exports = {
  up: (queryInterface, Sequelize) => {
    let settings = [];
    let groups = SETTING_DATA.map((value) => {
      value.id = faker.random.uuid();
      value.settings = value.settings.map((v) => {
        v.settingGroupId = value.id;
        v.id = faker.random.uuid();
        return v;
      });
      settings = [...settings, ...value.settings];
      delete value.settings;
      return value;
    });
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.bulkInsert("tbl_setting_group", groups, { transaction: t }),
        queryInterface.bulkInsert("tbl_setting", settings, { transaction: t }),
      ]);
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.bulkDelete("tbl_setting_group", null, {}),
        queryInterface.bulkDelete("tbl_setting", null, {})
      ]);
    })
  },
};
